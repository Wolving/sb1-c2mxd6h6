import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxImages: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesSelected, maxImages }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }
    onImagesSelected(acceptedFiles);
  }, [maxImages, onImagesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: maxImages
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here...</p>
      ) : (
        <p>Drag & drop images here, or click to select files</p>
      )}
    </div>
  );
};