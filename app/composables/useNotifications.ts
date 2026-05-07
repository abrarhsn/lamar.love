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
  /** Short line shown in the notifications list. */
  action: string;
  /** Full message shown when the notification is opened in the modal. */
  body: string;
  date: string;
}

const eloiseLetter = [
  "Hey you,",
  "I've been sitting with my coffee for the better part of an hour now, watching the steam curl up toward the window where the morning light is doing that ridiculous golden thing it always does in late autumn, and I keep thinking about what you said the other night on the porch — about how the things we love most are the ones we never quite finish saying out loud.",
  "I wanted to write that down before it slipped away, because lately it feels like everything slips away if I don't catch it on paper. The notebook by the bed is filling up with half-thoughts: the way the dog tilts his head when the kettle boils, the way you hum without realizing it when you're chopping onions, the way the floorboard by the bookshelf creaks in exactly the same rhythm as my favorite song. None of these are important on their own. But strung together they're starting to look a lot like a life I'd very much like to keep on living.",
  "Anyway — I don't really have a point. I just wanted to send you something longer than a text. Something that takes more than three seconds to read. Something that says: I see you, and I'm paying attention, and I'm grateful in a way that's hard to compress into an emoji.",
  "Write me back when you can. Or don't, and just tell me about it next time we sit on the porch. Either is perfect.",
  "Always,",
  "E.",
].join("\n\n");

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    unread: false,
    sender: {
      name: "Maya",
      avatar: {
        src: "https://i.pravatar.cc/100?img=5",
      },
    },
    action: "Dropped a new late-night tune in your inbox.",
    body: "Dropped a new late-night tune in your inbox. Give it a spin when the house is quiet.",
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
    action: "Reacted to your latest reflection with a heart.",
    body: "Reacted to your latest reflection with a heart. They're loving what you're sharing.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "notif-3",
    unread: false,
    sender: {
      name: "Noah",
      avatar: {
        src: "https://i.pravatar.cc/100?img=21",
      },
    },
    action: "Sent you a memory from last summer.",
    body: "Sent you a memory from last summer. Worth revisiting when you need a smile.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "notif-4",
    unread: false,
    sender: {
      name: "Eloise",
      avatar: {
        src: "https://i.pravatar.cc/100?img=32",
      },
    },
    action: "Sent you something longer than a text.",
    body: eloiseLetter,
    date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
];

export function useNotifications() {
  const notifications = shallowRef<NotificationItem[]>(DUMMY_NOTIFICATIONS);

  return {
    notifications,
  };
}
