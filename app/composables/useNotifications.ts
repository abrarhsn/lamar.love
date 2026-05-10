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
      name: "Abrar",
      avatar: {
        src: "https://api.dicebear.com/9.x/bottts-neutral/png?seed=Abrar%20Hassan&size=128",
      },
    },
    action: "Dropped a new late-night message in your inbox.",
    body: "I love you, Lamar. From the bottom of my heart. I made this as a forever place to record our love. Please accept this as my one month anniversary gift.",
    date: new Date("2026-05-09T00:00:00Z").toISOString(),
  },
];

export function useNotifications() {
  const notifications = shallowRef<NotificationItem[]>(DUMMY_NOTIFICATIONS);

  return {
    notifications,
  };
}
