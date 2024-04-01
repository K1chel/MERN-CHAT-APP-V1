import { useConversationStore } from "@/store/useConversationStore";
import { MessageSquareOff } from "lucide-react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";
import { MobileSidebar } from "./MobileSidebar";
import { useEffect } from "react";

export const Chat = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-full">
      {selectedConversation ? (
        <div className="flex flex-col h-full">
          <ChatHeader />
          <div className="flex flex-1 overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col gap-y-3 w-full">
              <Messages />
            </div>
          </div>
          <MessageInput />
        </div>
      ) : (
        <div>
          <div className="block lg:hidden px-2 py-4">
            <MobileSidebar />
          </div>
          <div className="w-full flex items-center justify-center mt-44 flex-col text-center max-w-lg mx-auto gap-y-2 px-6">
            <div className="flex items-center gap-x-2">
              <MessageSquareOff />
              <h5 className="text-xl font-bold">No chat selected yet.</h5>
            </div>
            <p className="text-xs text-muted-foreground">
              Select a chat to start messaging with your friends.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
