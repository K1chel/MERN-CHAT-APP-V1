import { useGetMessages } from "@/hooks/useGetMessages";
import { useEffect, useRef } from "react";
import { Message } from "./Message";
import { useLiveMessages } from "@/hooks/useLiveMessages";

export const Messages = () => {
  const { isLoading, messages } = useGetMessages();
  useLiveMessages();
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  // todo: render message skeleton
  if (isLoading) return null;

  return (
    <div className="h-full w-full p-4 pb-6 relative">
      {messages.length === 0 && (
        <div className="flex items-center justify-center mt-20 flex-col gap-y-1">
          <h4 className="text-xl font-bold">No messages yet.</h4>
          <p className="text-sm text-muted-foreground">
            Start a conversation with your friends by sending a message.
          </p>
        </div>
      )}
      {!isLoading &&
        messages.length > 0 &&
        messages.map((message, id) => (
          <div key={id} className="w-full" ref={messageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};
