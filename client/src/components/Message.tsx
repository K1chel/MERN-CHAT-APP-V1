import { AuthContext } from "@/context/AuthContext";
import { IMessage } from "@/types";
import { useContext } from "react";
import { UserAvatar } from "./UserAvatar";
import { useConversationStore } from "@/store/useConversationStore";

type Props = {
  message: IMessage;
};

export const Message = ({ message }: Props) => {
  const { selectedConversation } = useConversationStore();
  const { user } = useContext(AuthContext);

  const fromMe = message.senderId === user?._id;
  const avatarSrc = fromMe ? user?.avatar : selectedConversation?.avatar;
  const username = fromMe ? user?.username : selectedConversation?.username;

  return (
    <>
      {fromMe ? (
        <div className="flex justify-end mb-4 relative">
          <div className="max-w-96 bg-indigo-500 text-white rounded-t-lg rounded-b-xl p-3 gap-3 border whitespace-pre-wrap word-break break-all">
            <p>{message.message}</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <UserAvatar src={avatarSrc} username={username} />
          </div>
        </div>
      ) : (
        <div className="flex mb-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <UserAvatar src={avatarSrc} username={username} />
          </div>
          <div className="max-w-96 dark:bg-white bg-zinc-100 text-white rounded-t-lg rounded-b-xl p-3 gap-3 border whitespace-pre-wrap word-break break-all">
            <p className="text-gray-700">{message.message}</p>
          </div>
        </div>
      )}
    </>
  );
};
