import { cn } from "@/lib/utils";
import { useConversationStore } from "@/store/useConversationStore";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const MessageInput = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const { selectedConversation, messages, setMessages } =
    useConversationStore();

  useEffect(() => {
    setMessageInput("");
  }, [selectedConversation]);

  const disabled = messageInput.trim().length === 0 || isLoading;

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!messageInput) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: messageInput }),
        }
      );
      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }

      setMessages([...messages, data]);
      setMessageInput("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full px-5 py-3 relative z-0"
      onSubmit={handleSendMessage}
    >
      <Input
        className={cn("w-full py-3 pr-16")}
        placeholder="Type a message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <div className="absolute top-0 right-0 w-20 h-full flex items-center justify-center">
        <Button
          size="icon"
          type="submit"
          variant="outline"
          className="rounded-l-none"
          disabled={disabled}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};
