"use client";

import React, { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";

interface ProfileImageUploadProps {
  onUpload: (url: string) => void;
  userId: string;
  initialImageUrl?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  onUpload,
  userId,
  initialImageUrl = "",
}) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      )}

      <UploadButton
        className="ut-button:bg-black"
        endpoint="profilePictureUploader"
        onClientUploadComplete={async (res) => {
          setIsUploading(true);
          try {
            if (res && res[0].url) {
              const url = res[0].url;
              setImageUrl(url);
              onUpload(url);
            }
          } catch (error) {
            console.error("Upload failed", error);
          } finally {
            setIsUploading(false);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
};

export default ProfileImageUpload;
