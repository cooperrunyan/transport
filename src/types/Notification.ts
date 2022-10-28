export type Notification = {
  type: NotificationType;
  data: {
    from: string;
  };
};

export enum NotificationType {
  FriendRequest = 1,
  DeclinedFriendRequest,
  Message,
  Call,
  MissedCall,
  VideoCall,
  MissedVideoCall,
}
