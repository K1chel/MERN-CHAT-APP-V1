import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversationStore } from "@/store/useConversationStore";
import sound from "../../public/sounds/notification.mp3";

export const useLiveMessages = () => {
  const { socket } = useSocketContext()!;
  const { setMessages, messages } = useConversationStore();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};
