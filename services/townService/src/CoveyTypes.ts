export type Direction = 'front' | 'back' | 'left' | 'right';
export type UserLocation = {
  x: number;
  y: number;
  rotation: Direction;
  moving: boolean;
  conversationLabel?: string;
};
export type CoveyTownList = {
  friendlyName: string;
  coveyTownID: string;
  currentOccupancy: number;
  maximumOccupancy: number;
}[];

export type ChatMessage = {
  target: MessageTarget;
  author: string;
  sid: string;
  body: string;
  dateCreated: Date;
};

export enum MessageType {
  global,
  private,
}

export type MessageTarget = {
  type: MessageType;
  name: string;
};
