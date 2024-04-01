import { create } from "zustand";
import { IMessage, IUser } from "@/types";

type Props = {
  selectedConversation: IUser | null;
  setSelectedConversation: (selectedConversation: IUser | null) => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
};

export const useConversationStore = create<Props>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
