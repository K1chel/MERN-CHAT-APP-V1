import { useContext } from "react";
import ModalImage from "react-modal-image";

import { AuthContext } from "@/context/AuthContext";
import { IMessage } from "@/types";
import { UserAvatar } from "./UserAvatar";
import { useConversationStore } from "@/store/useConversationStore";
import { cn } from "@/lib/utils";

type Props = {
  message: IMessage;
};

export const Message = ({ message }: Props) => {
  const { senderId, message: conversationMessage, imageId } = message;
  const { selectedConversation } = useConversationStore();
  const { user } = useContext(AuthContext);

  const fromMe = senderId === user?._id;
  const avatarSrc = fromMe ? user?.avatar : selectedConversation?.avatar;
  const username = fromMe ? user?.username : selectedConversation?.username;

  return (
    <div className={cn("flex relative", fromMe && "justify-end")}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
        {!fromMe ? <UserAvatar src={avatarSrc} username={username} /> : null}
      </div>
      <div
        className={cn(
          // TODO: change rounded for fromMe and from other
          "max-w-96 rounded-md gap-3 border whitespace-pre-wrap word-break break-all",
          fromMe
            ? "bg-indigo-500 text-white rounded-tr-[3px]"
            : "dark:bg-neutral-600 bg-zinc-200 rounded-tl-[3px]"
        )}
      >
        {conversationMessage && (
          <p className="px-2 pt-1">{conversationMessage}</p>
        )}
        {imageId && (
          <div className={cn("")}>
            <ModalImage
              large={imageId}
              small={imageId}
              hideZoom
              className={cn(
                "w-50 h-50 rounded object-cover",
                conversationMessage && "rounded-t-none"
              )}
            />
          </div>
        )}
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        {fromMe ? <UserAvatar src={avatarSrc} username={username} /> : null}
      </div>
    </div>
  );
};
