import { usePreviewImage } from "@/hooks/usePreviewImage";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/store/useConversationStore";
import { Image, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const MessageInput = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { selectedConversation, messages, setMessages } =
    useConversationStore();
  const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage();

  useEffect(() => {
    setMessageInput("");
    setImageUrl(null);
  }, [selectedConversation, setImageUrl]);

  const disabled = messageInput.trim().length === 0 && !imageUrl;

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: messageInput, imageId: imageUrl }),
        }
      );
      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }

      setMessages([...messages, data]);
      setMessageInput("");
      setImageUrl(null);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full px-5 py-3 relative z-0 flex items-center gap-x-3"
      onSubmit={handleSendMessage}
    >
      <div className="relative">
        <Button
          size="icon"
          className=""
          variant="outline"
          disabled={isLoading}
          type="button"
          onClick={() => imageInputRef.current?.click()}
        >
          <Image className="w-5 h-5" />
        </Button>
        <input
          hidden
          type="file"
          ref={imageInputRef}
          onChange={handleImageChange}
        />
        {imageUrl && (
          <Button
            variant="destructive"
            className="absolute -right-2 -top-2 p-1  rounded-full h-5 w-5"
            onClick={() => setImageUrl(null)}
            disabled={isLoading}
            type="button"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
      <Input
        className={cn("w-full py-3 pr-16")}
        placeholder="Type a message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <div>
        <Button
          size="icon"
          type="submit"
          variant="outline"
          disabled={disabled || isLoading}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};
