import { useSocketContext } from "@/context/SocketContext";
import { useConversationStore } from "@/store/useConversationStore";
import { MobileSidebar } from "./MobileSidebar";
import { UserAvatar } from "./UserAvatar";

export const ChatHeader = () => {
  const { selectedConversation } = useConversationStore();
  const { onlineUsers } = useSocketContext()!;

  const isOnline: boolean = selectedConversation
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  if (!selectedConversation) return null;

  return (
    <div className="h-[68px] w-full border-b bg-secondary/40">
      <div className="flex items-center justify-between h-full px-6 lg:px-4">
        {/* MOBILE SIDEBAR */}
        <div className="block lg:hidden">
          <MobileSidebar />
        </div>
        <div />
        <div className="flex items-center gap-x-2">
          <>
            <UserAvatar
              src={selectedConversation.avatar}
              username={selectedConversation.username}
              className="w-10 h-10"
            />
            <div className="flex flex-col">
              <h6 className="text-sm">
                Chat with{" "}
                <span className="font-bold">
                  {selectedConversation.username}
                </span>
              </h6>
              <span className="ml-auto text-xs text-muted-foreground">
                {isOnline ? (
                  <p className="text-green-500">Online</p>
                ) : (
                  <p>Offline</p>
                )}
              </span>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
