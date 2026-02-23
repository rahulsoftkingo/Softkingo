'use client';

import { useState, useEffect } from 'react';
import ImageUploadComponent from './ImageUploadComponent';

// Simple gallery component for admin panel.
// Allows browsing existing images and uploading new ones.
// No delete functionality is provided as per requirements.

export default function ImageGallery({ folder = 'uploads', onSelect }) {
    const [images, setImages] = useState([]);
    const [showUploader, setShowUploader] = useState(false);
    const [selected, setSelected] = useState(null);

    // Fetch images from the media list API for the given folder.
    const fetchImages = async () => {
        try {
            const res = await fetch(`/api/media/list?folder=${encodeURIComponent(folder)}`);
            if (res.ok) {
                const data = await res.json();
                const imgs = data.files?.filter((f) => !f.isDir && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(f.name)) || [];
                setImages(imgs);
            }
        } catch (e) {
            console.error('Failed to load gallery images', e);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [folder]);

    const handleUploadComplete = (path) => {
        // Refresh the list after a new upload.
        fetchImages();
        setShowUploader(false);
        if (onSelect) onSelect(path);
    };

    const handleSelect = (img) => {
        setSelected(img.path);
        if (onSelect) onSelect(img.path);
    };

    return (
        <div className="space-y-4">
            {/* Upload / Browse button */}
            <button
                type="button"
                onClick={() => setShowUploader(true)}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition"
            >
                Upload / Browse Images
            </button>

            {/* Gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img) => (
                    <div
                        key={img.path}
                        className={`relative border-2 rounded-lg overflow-hidden cursor-pointer ${selected === img.path ? 'border-sky-600' : 'border-transparent'} hover:border-sky-400`}
                        onClick={() => handleSelect(img)}
                    >
                        <img src={img.path} alt={img.name} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* ImageUploadComponent modal */}
            {showUploader && (
                <ImageUploadComponent
                    value={selected || ''}
                    onChange={handleUploadComplete}
                    folder={folder}
                    showRecent={false}
                />
            )}
        </div>
    );
}
