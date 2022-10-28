import { Friend } from './Friend';
import { Message } from './Message';
import type { Notification } from './Notification';

export type UserData = {
  tz: string;
  photoUrl: string;
  phoneNumber: string;
  displayName: string;
  username: string;
  email: string;
  friends: Friend[];
  notifications: Notification[];
  messages: Message[];
};
