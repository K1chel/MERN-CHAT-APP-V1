import { useConversationStore } from "@/store/useConversationStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationStore();

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (data.error) {
          return toast.error(data.error);
        }

        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedConversation?._id) {
      fetchMessages();
    }
  }, [selectedConversation, setMessages]);

  return { isLoading, messages };
};
