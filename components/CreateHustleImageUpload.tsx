"use client";

import React, { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";

interface CreateHustleImageUploadProps {
  onUpload: (urls: string[]) => void;
  initialImageUrl?: string[];
}

const CreateHustleImageUpload: React.FC<CreateHustleImageUploadProps> = ({
  onUpload,
  initialImageUrl = [],
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadComplete = async (res: { url: string }[]) => {
    setIsUploading(true);
    try {
      const urls = res.map((file) => file.url);
      const updatedUrls = [...imageUrls, ...urls].slice(0, 3); // limit to 3 images
      setImageUrls(updatedUrls);
      onUpload(updatedUrls);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {imageUrls.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {imageUrls.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt={`Hustle ${idx}`}
              width={96}
              height={96}
              className="w-24 h-24 rounded object-cover"
            />
          ))}
        </div>
      )}

      {imageUrls.length < 3 && (
        <UploadButton
          className="ut-button:bg-black"
          endpoint="hustleImageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
          }}
        />
      )}
    </div>
  );
};

export default CreateHustleImageUpload;
