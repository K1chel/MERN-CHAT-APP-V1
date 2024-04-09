import { ImageIcon, Loader, SquareDashedMousePointer, X } from "lucide-react";
import { useRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type Props = {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  isUploading: boolean;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const Uploadmodal = ({
  imageUrl,
  setImageUrl,
  handleImageChange,
  imageInputRef,
  isLoading,
  isUploading,
  handleDragOver,
  handleDrop,
}: Props) => {
  const dialogClosingRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="icon"
          className=""
          variant="outline"
          disabled={isLoading}
          type="button"
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload an image</DialogTitle>
          <DialogDescription>
            Add an image to your message by uploading it here
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          {imageUrl ? (
            <div className="flex items-center justify-center">
              <img
                src={imageUrl}
                alt="uploaded image"
                className="w-52 h-56 object-cover rounded"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div
                onClick={() => imageInputRef.current?.click()}
                className="w-56 h-56 border-2 border-dashed hover:opacity-75 cursor-pointer transition flex items-center justify-center text-center gap-x-1"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center flex-col gap-y-1">
                    <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Uploading...
                    </p>
                  </div>
                ) : (
                  <div className="text-muted-foreground flex items-center justify-center text-center gap-y-1 flex-col px-5">
                    <p className="text-xs">
                      Click here to upload an image or drag and drop an image
                    </p>
                    <SquareDashedMousePointer className="w-4 h-4" />
                    <input
                      type="file"
                      onChange={handleImageChange}
                      ref={imageInputRef}
                      hidden
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {imageUrl && (
          <div className="flex items-center gap-x-2 w-full justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setImageUrl(null)}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => dialogClosingRef.current?.click()}
            >
              Add image
            </Button>
          </div>
        )}
      </DialogContent>
      <DialogClose ref={dialogClosingRef} />
    </Dialog>
  );
};
