import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Settings, Upload } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { UserAvatar } from "./UserAvatar";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { usePreviewImage } from "@/hooks/usePreviewImage";
import { toast } from "sonner";

export const SettingsModal = () => {
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const { handleImageChange, imageUrl } = usePreviewImage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch("/api/user/profile-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: imageUrl }),
      });

      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }

      toast.success("Profile updated successfully.");
      setIsImageUploaded(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const avatarRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="justify-start flex items-center w-full gap-2"
        >
          <Settings />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-y-3 py-2">
          <form
            className="flex items-center gap-x-3 py-1.5"
            onSubmit={handleSubmit}
          >
            {/* TODO: user avatar (fetch currentUser) */}
            <UserAvatar
              src={imageUrl || user?.avatar}
              username="test"
              className="cursor-pointer hover:opacity-75 transition border-2"
              onClick={() => avatarRef.current?.click()}
            />
            <input
              type="file"
              hidden
              ref={avatarRef}
              onChange={handleImageChange}
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Change avatar</h3>
              <p className="text-xs text-muted-foreground">
                Update your avatar to personalize your account.
              </p>
            </div>
            {imageUrl && !isImageUploaded && (
              <div className="ml-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  className="group"
                  type="submit"
                  disabled={isUpdating}
                >
                  <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition group-active:scale-75" />
                </Button>
              </div>
            )}
          </form>
          <div className="flex items-center gap-x-3 py-1.5">
            <ModeToggle />
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Change mode</h3>
              <p className="text-xs text-muted-foreground">
                Toggle between light and dark mode to suit your preference.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
