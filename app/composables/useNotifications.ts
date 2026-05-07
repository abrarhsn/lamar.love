export interface NotificationSender {
  name: string;
  avatar: {
    src: string;
  };
}

export interface NotificationItem {
  id: string;
  unread: boolean;
  sender: NotificationSender;
  body: string;
  date: string;
}

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    unread: true,
    sender: {
      name: "Maya",
      avatar: {
        src: "https://i.pravatar.cc/100?img=5",
      },
    },
    body: "Dropped a new late-night tune in your inbox.",
    date: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "notif-2",
    unread: false,
    sender: {
      name: "Jules",
      avatar: {
        src: "https://i.pravatar.cc/100?img=12",
      },
    },
    body: "Reacted to your latest reflection with a heart.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "notif-3",
    unread: true,
    sender: {
      name: "Noah",
      avatar: {
        src: "https://i.pravatar.cc/100?img=21",
      },
    },
    body: "Sent you a memory from last summer.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

export function useNotifications() {
  const notifications = shallowRef<NotificationItem[]>(DUMMY_NOTIFICATIONS);

  return {
    notifications,
  };
}
