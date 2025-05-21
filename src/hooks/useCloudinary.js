import { useState } from "react";

export const useCloudinary = (config) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadFile = async (file, resourceType = 'image') => {
        try {
            setIsUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', config.uploadPreset);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            throw err;
        } finally {
            setIsUploading(false);
        }
    };

    const uploadImage = (file) => uploadFile(file, 'image');
    const uploadVideo = (file) => uploadFile(file, 'video');

    return { uploadImage, uploadVideo, isUploading, error };
};