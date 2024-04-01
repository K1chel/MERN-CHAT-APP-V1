import { useSocketContext } from "@/context/SocketContext";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/store/useConversationStore";
import { IUser } from "@/types";
import { UserAvatar } from "./UserAvatar";
import { Skeleton } from "./ui/skeleton";

type Props = {
  user: IUser | null;
};

export const SidebarUser = ({ user }: Props) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  const { onlineUsers } = useSocketContext()!;

  const isConversationSelected = selectedConversation?._id === user?._id;
  const isOnline: boolean = user ? onlineUsers.includes(user._id) : false;

  if (!user) return null;

  return (
    <div>
      <div
        onClick={() => setSelectedConversation(user)}
        className={cn(
          "flex items-center  gap-x-3 py-2 px-3 group hover:bg-secondary/50 transition rounded cursor-pointer",
          isConversationSelected && "bg-secondary/50"
        )}
      >
        <UserAvatar src={user.avatar} username={user.username} />
        <p
          className={cn(
            "text-muted-foreground group-hover:text-primary transition",
            isConversationSelected && "text-primary"
          )}
        >
          {user.username}
        </p>
        {isOnline ? (
          <div className="w-2 h-2 rounded-full bg-green-500 ml-auto" />
        ) : (
          <div className="w-2 h-2 rounded-full dark:bg-zinc-500 bg-zinc-400 ml-auto" />
        )}
      </div>
    </div>
  );
};

SidebarUser.Skeleton = () => {
  return (
    <div>
      <div className="flex items-center  gap-x-3 py-2 px-3 group hover:bg-secondary/50 transition rounded cursor-pointer">
        <Skeleton className="w-[46px] h-[46px] rounded-full" />
        <Skeleton className="w-28 h-6" />
      </div>
    </div>
  );
};
