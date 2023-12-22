export type TChatMessage = {
  id: string;
  message: string;
  createdAt: Date;
  senderId: string;
  roomId: string;
};
