export type IUser = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type IConversation = {
  _id: string;
  members: IUser[];
  messages: IMessage[];
  createdAt: string;
  updatedAt: string;
};

export type IMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  message?: string;
  imageId?: string;
  createdAt: string;
  updatedAt: string;
};
