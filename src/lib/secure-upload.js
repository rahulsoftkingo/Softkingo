const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Secure File Upload Utility
 * Enforces strict MIME validation, extension sanitization, and random renaming.
 */
async function validateAndProcessUpload(file, options = {}) {
    const {
        allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'],
        maxSize = 10 * 1024 * 1024, // 10MB default
        baseDir = 'public/uploads',
        subFolder = 'general'
    } = options;

    if (!file) {
        throw new Error('No file provided');
    }

    // 1. Basic Size Validation
    if (file.size > maxSize) {
        throw new Error(`File size exceeds limit of ${maxSize / (1024 * 1024)}MB`);
    }

    // 2. Strict Extension Check (Double Extension Block)
    const originalName = file.name || 'document';
    const ext = path.extname(originalName).toLowerCase();
    
    // Block double extensions (e.g., .png.php)
    const nameWithoutExt = originalName.slice(0, originalName.length - ext.length);
    if (nameWithoutExt.includes('.')) {
        throw new Error('Malicious file naming detected (double extension blocked)');
    }

    // Validate extension against allowed ones
    const allowedExtensions = {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
        'image/gif': ['.gif'],
        'application/pdf': ['.pdf']
    };

    const isExtensionAllowed = Object.values(allowedExtensions).flat().includes(ext);
    if (!isExtensionAllowed) {
        throw new Error(`Forbidden file extension: ${ext}`);
    }

    // 3. Magic Number Validation (Buffer check)
    // In Next.js/Node environment, 'file' usually has arrayBuffer() or is a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const magicNumbers = {
        'image/jpeg': [0xFF, 0xD8, 0xFF],
        'image/png': [0x89, 0x50, 0x4E, 0x47],
        'image/gif': [0x47, 0x49, 0x46, 0x38],
        'application/pdf': [0x25, 0x50, 0x44, 0x46],
        'image/webp': [0x52, 0x49, 0x46, 0x46] // RIFF
    };

    let detectedMime = null;
    for (const [mime, signature] of Object.entries(magicNumbers)) {
        if (signature.every((byte, i) => buffer[i] === byte)) {
            // Additional check for WebP (search for "WEBP" at offset 8)
            if (mime === 'image/webp') {
                const webpSignature = [0x57, 0x45, 0x42, 0x50];
                if (webpSignature.every((byte, i) => buffer[i + 8] === byte)) {
                    detectedMime = mime;
                    break;
                }
            } else {
                detectedMime = mime;
                break;
            }
        }
    }

    if (!detectedMime || !allowedMimeTypes.includes(detectedMime)) {
        throw new Error('Invalid file content: Signature does not match expected format');
    }

    // 4. Force Random Filename (UUID)
    const fileName = `${crypto.randomUUID()}${ext}`;
    
    // 5. Ensure Directory Exists
    const targetDir = path.join(process.cwd(), baseDir, subFolder);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, fileName);

    // 6. Save File
    fs.writeFileSync(filePath, buffer);

    // Return the public URL
    // Normalizing path for web use
    const publicPath = `/${baseDir}/${subFolder}/${fileName}`.replace(/\\/g, '/').replace(/\/+/g, '/');
    
    return {
        url: publicPath,
        fileName,
        mimeType: detectedMime,
        size: buffer.length
    };
}

module.exports = { validateAndProcessUpload };
