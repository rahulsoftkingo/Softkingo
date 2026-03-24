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
        subFolder = 'uncategorized'
    } = options;

    if (!file) {
        throw new Error('No file provided');
    }

    // 1. Basic Size Validation
    if (file.size > maxSize) {
        throw new Error(`File size exceeds limit of ${maxSize / (1024 * 1024)}MB`);
    }

    // 2. Strict Extension Check (Zero-Trust)
    const originalName = file.name || 'document';
    
    // Check for double extensions (e.g., test.png.php)
    const parts = originalName.split('.');
    if (parts.length > 2) {
        // More than one dot - check all parts for dangerous extensions
        const dangerousExtensions = ['php', 'php3', 'php4', 'php5', 'phtml', 'exe', 'sh', 'js', 'jsp', 'asp', 'aspx'];
        for (let i = 1; i < parts.length; i++) {
            if (dangerousExtensions.includes(parts[i].toLowerCase())) {
                throw new Error(`Potentially malicious multi-extension file detected: ${originalName}`);
            }
        }
    }

    const lastDotIndex = originalName.lastIndexOf('.');
    if (lastDotIndex === -1) {
        throw new Error('File must have an extension');
    }
    const ext = originalName.substring(lastDotIndex).toLowerCase();
    
    // Strict Whitelist
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.pdf'];
    if (!allowedExtensions.includes(ext)) {
        throw new Error(`Forbidden file extension: ${ext}`);
    }

    // 3. Magic Number Validation (Buffer check)
    const buffer = Buffer.from(await file.arrayBuffer());
    const magicNumbers = {
        'image/jpeg': [0xFF, 0xD8, 0xFF],
        'image/png': [0x89, 0x50, 0x4E, 0x47],
        'image/gif': [0x47, 0x49, 0x46, 0x38],
        'application/pdf': [0x25, 0x50, 0x44, 0x46],
        'image/webp': [0x52, 0x49, 0x46, 0x46]
    };

    let detectedMime = null;
    for (const [mime, signature] of Object.entries(magicNumbers)) {
        if (signature.every((byte, i) => buffer[i] === byte)) {
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

    // SVG is text-based, we check for basic SVG tag
    if (ext === '.svg') {
        const content = buffer.toString('utf8').trim();
        if (content.includes('<svg') && content.includes('http://www.w3.org/2000/svg')) {
            detectedMime = 'image/svg+xml';
        }
    }

    if (!detectedMime) {
        throw new Error('Invalid file content: Signature does not match expected format');
    }

    // Verify detected MIME is in the allowed list
    if (!allowedMimeTypes.includes(detectedMime)) {
        throw new Error(`MIME type ${detectedMime} is not allowed for this upload`);
    }

    // 4. Force Random Filename (Zero-Trust Renaming)
    // We strictly use a UUID to prevent path traversal or overwriting via filename
    const fileName = `${crypto.randomUUID()}${ext}`;
    
    // 5. Ensure Directory Exists
    const targetDir = path.join(process.cwd(), baseDir, subFolder);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, fileName);

    // 6. Save File
    fs.writeFileSync(filePath, buffer);

    // 7. Generate Public URL (Remove '/public' prefix if it exists in baseDir)
    const publicBase = baseDir.replace(/^public[\/\\]?/, "").replace(/\\/g, '/');
    const publicPath = `/${publicBase}/${subFolder}/${fileName}`.replace(/\/+/g, '/');
    
    return {
        url: publicPath,
        fileName,
        mimeType: detectedMime,
        size: buffer.length
    };
}

module.exports = { validateAndProcessUpload };
