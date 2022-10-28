export type Message = {
  from: string;
  body: string;
  timestamp: string;
  read: boolean;
  attachments: MessageAttachment[];
};

export type MessageAttachment = {
  type: MessageAttachmentType;
  data: string;
};

export enum MessageAttachmentType {
  Audio = 1,
  Image,
  Video,
  File,
}
