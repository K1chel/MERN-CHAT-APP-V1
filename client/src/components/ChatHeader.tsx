import { useSocketContext } from "@/context/SocketContext";
import { useConversationStore } from "@/store/useConversationStore";
import { MobileSidebar } from "./MobileSidebar";

export const ChatHeader = () => {
  const { selectedConversation } = useConversationStore();
  const { onlineUsers } = useSocketContext()!;

  const isOnline: boolean = selectedConversation
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  if (!selectedConversation) return null;

  return (
    <div className="h-16 w-full border-b bg-secondary">
      <div className="flex items-center justify-between h-full px-6 lg:px-4">
        {/* MOBILE SIDEBAR */}
        <div className="block lg:hidden">
          <MobileSidebar />
        </div>
        <div />
        <div className="flex items-center gap-x-2">
          <>
            <h4>
              Chat with{" "}
              <span className="font-bold">{selectedConversation.username}</span>
            </h4>
            {isOnline ? (
              <div className="h-2 w-2 rounded-full bg-green-500" />
            ) : (
              <div className="h-2 w-2 rounded-full dakr:bg-zinc-500 bg-zinc-400" />
            )}
          </>
        </div>
      </div>
    </div>
  );
};
