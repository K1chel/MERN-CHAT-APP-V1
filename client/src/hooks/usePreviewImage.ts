import { useState } from "react";
import { toast } from "sonner";

export const usePreviewImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFile(e.target.files[0]);
    } else {
      setImageUrl(null);
      setIsUploading(false);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setIsUploading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file type. Please upload an image.");
      setImageUrl(null);
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return {
    imageUrl,
    setImageUrl,
    handleImageChange,
    handleDrop,
    handleDragOver,
    isUploading,
    setIsUploading,
  };
};
