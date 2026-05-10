export interface Reflection {
  title: string;
  /** URL-safe slug derived from `title` (kebab-case). */
  slug: string;
  /** Short line that hooks the reader into the topic (e.g. list / card description). */
  subtitle: string;
  name: string;
  /** Optional profile image URL for blog bylines (e.g. `/avatar.jpg`). */
  authorAvatar?: string;
  date: Date;
  paragraphs: readonly string[];
  tags: string[];
}

function ordinalDay(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return `${n}st`;
  if (j === 2 && k !== 12) return `${n}nd`;
  if (j === 3 && k !== 13) return `${n}rd`;
  return `${n}th`;
}

export function formatReflectionDate(date: Date): string {
  const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "long" });
  const month = monthFormatter.format(date);
  const year = date.getFullYear();
  return `${ordinalDay(date.getDate())} ${month} ${year}`;
}

/** Props for `UAvatar` / blog authors: DiceBear Bottts Neutral, unless `authorAvatar` is set. */
export function reflectionAuthorAvatar(reflection: Reflection): { src: string; loading: "lazy" } {
  const src =
    reflection.authorAvatar ??
    `https://api.dicebear.com/9.x/bottts-neutral/png?seed=${encodeURIComponent(reflection.name)}&size=128`;
  return { src, loading: "lazy" };
}

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const reflectionsData: Reflection[] = (
  [
    {
      title: "Entertain my stupidity",
      subtitle:
        "You send me a stupid reel, I entertain it. I send you a stupid reel, you entertain it. What a blessed man I am.",
      name: "Abrar Hassan",
      date: new Date(2026, 4, 9),
      paragraphs: [
        `I send you a stupid reel, you entertain it. You send me a stupid reel, I entertain it.`,
        `I send you a stupid reel about a niche reference you enjoy, and you love it. When you send me a stupid reel about a niche reference I enjoy, I love it.`,
        `Someone who knows me inside and out, including the little stupid stuff I like, from Peter Griffin to different anime. What a blessed man I am to have you.`,
        `I can't believe I get to expierence love like this. Am I dreaming?`
      ],
      tags: ["Love"],
    },
    {
      title: "Toasties",
      subtitle:
        "You looked at Mr T's and called it Toasties, and I fell a little more in love with you on the spot.",
      name: "Abrar Hassan",
      date: new Date(2026, 4, 7),
      paragraphs: [
        `I was showing you restaurants on Uber Eats and you saw Mr T's and called it Toasties. 🥺`,
        `I will never be able to explain why I found you so adorable when you said it. But it did. It really did.`,
      ],
      tags: ["Cute"],
    },
    {
      title: "Loves me like a Eurobeat song",
      subtitle: "I never expected it to feel so warm when she turned every song I love into love for me.",
      name: "Abrar Hassan",
      date: new Date(2026, 4, 6),
      paragraphs: [
        `Lamar told me she loves me like a eurobeat song.`,
        `These are songs I have carried for years. These are songs I have always wished someone would love me like.`,

        `Dreaming of You. Higher and Higher. Memories. She took them and turned them into me. Not in a grand way. Just subtly, like it had always been true.`,
        `I didn't know what to do with that. I still don't. But I know it is the most romantic thing anyone has ever said to me.`,
      ],

      tags: ["Love"],
    },
    {
      title: "It fills the room with magic",
      subtitle:
        "You say your voice is terrible. Then why do I want to be your slave when it fills my ears?",
      name: "Abrar Hassan",
      date: new Date(2026, 4, 1),
      paragraphs: [
        `You say your voice sounds terrible. I am enchanted by it.`,
        `When you sing, I am hypnotised. Not in a cute way. In a raw, deep way. When your voice fills my ears I want to be your slave.`,
        `I never understood why people had crushes on singers until I developed one on you.`,
        `I am weak. God, I am so weak.`,
      ],
      tags: ["Love"],
    },
    {
      title: "What is our song?",
      subtitle:
        "November Rain asks whether anyone can truly be alone. We are the proof that the answer is no, if you find the right person.",
      name: "Abrar Hassan",
      date: new Date(2026, 4, 5),
      paragraphs: [
        `We debated whether it was Dreaming of You or November Rain. I said it was November Rain.`,
        `We are both people who need solitude, whose minds do not quite fit with most people. November Rain understands that beautifully, yet its ending questions whether that is truly possible.`,
        `And then there is us, two people who do not drain each other, who found in each other the one exception. We are the answer to the question the song is asking.`,
      ],
      tags: ["Love"],
    },
    {
      title: "I never want to be alone from you",
      subtitle:
        "You are not extra friction on my mind but the gift from heaven that soothes it.",
      name: "Abrar Hassan",
      date: new Date(2026, 4, 1),
      paragraphs: [
        `People want alone time from their partner. I understand that. It is only human. And I cannot promise I will never want a tiny bit of it if the situation calls for it.`,
        `But what I can promise is that I have never truly felt that way, and I do not have the urge for it.`,
        `When I want to rest, shut my brain off, and just exist stress-free, I do not want to do that alone. You are not extra burden or friction on my mind. You soothe it. You ease me right into it.`,
        `A special effect. My constructive wave. You seep right into me and make me feel more comforted and vulnerable than anyone or anything ever has.`,
      ],
      tags: ["Love"],
    },
    {
      title: "The first happy ones",
      subtitle:
        "Though we never said it, we subtly swore to each other to be different from the other heroes",
      name: "Abrar Hassan",
      date: new Date(2026, 2, 26),
      paragraphs: [
        `His eyes opened. "Name one hero who was happy."`,
        `I considered. Heracles went mad and killed his family; Theseus lost his bride and father; Jason's children and new wife were murdered by his old; Bellerophon killed the Chimera but was crippled by the fall from Pegasus' back.`,
        `"You can't." She was sitting up now, leaning forward.`,
        `"I can't."`,
        `"I know. They never let you be famous and happy." She lifted an eyebrow. "I'll tell you a secret."`,
        `"Tell me." I loved it when she was like this.`,
        `"We're going to be the first." She took my palm and held it to hers. "Swear it."`,
        `"Why me?"`,
        `"Because you're my hero. And I'm yours. Swear it."`,
        `"I swear it," I said, lost in the high colour of her cheeks, the flame in her eyes.`,
        `"I swear it," she echoed.`,
        `We sat like that a moment, hands touching. She grinned.`,
        `"I feel like I could eat the world raw."`,
      ],
      tags: ["Love"],
    },
    {
      title: "You're worth it",
      subtitle:
        "No second-guessing. You're the kind of person that convinces me without debate.",
      name: "Abrar Hassan",
      date: new Date(2026, 3, 27),
      paragraphs: [
        `I will be painfully honest with you, my love. You are not the first girl I have said "You're worth it" to.`,
        `But the difference? With them, I tumbled and turmoiled internally, almost gaslighting myself into believing it.`,
        `But with you—oh, with you, my precious Arraya—I scared myself.`,
        `Because I thought "You're worth it" too, but I did not have to think a single thought to confirm it.`,
        `You had already convinced me, simply by being yourself.`,
      ],
      tags: ["Love"],
    },
    {
      title: "Love needs no proof",
      subtitle:
        "Trust that runs deeper than agreement. Knowing every word from you is woven from love.",
      name: "Abrar Hassan",
      date: new Date(2026, 3, 23),
      paragraphs: [
        "I believe, with every fibre of my being, that your every intention is woven from love, a love so pure it needs no proof.",
        "Even if I told you my favourite colour was black, and you answered with white, time and again, I would not doubt you.",
        "For I know, in the marrow of my knowing, that each letter, each syllable, each quiet reason you offered was born from absolute love.",
        "Beautifully, intimately wrong, yet never anything less than love.",
      ],
      tags: ["Love"],
    },
    {
      title: "Permission to be still",
      subtitle:
        "What two weeks without a laptop taught me about peace and how to live while the world refuses to slow downn.",
      name: "Abrar Hassan",
      date: new Date(2026, 3, 15),
      paragraphs: [
        `You gave me permission to be still.`,
        `For two weeks you had no laptop. You were frustrated, I could see that, but you kept living. You cooked, you rested, you laughed. The world did not stop and neither did you.`,
        `I used to feel a physical panic when I thought I was missing something. A game, a moment, anything. You felt it too, but you did not let it rule you.`,
        `Because of you I went to my parents one weekend and just watched you all play without me. I sat there and felt nothing but peace. That was entirely new for me.`,
        `You made that possible.`
      ],
      tags: ["Strength"],
    },
    {
      title: "The most important person in the room",
      subtitle:
        "You made me feel like the centre of everything. Seen, chosen, and lifted up until love felt like solid ground beneath my feet.",
      name: "Abrar Hassan",
      date: new Date(2026, 3, 7),
      paragraphs: [
        `You played along with every ridiculous thing I said, and somehow made me feel like the most important person in the room for saying it.`,
        `I told you that you should be an example to the world of how to love. I meant it. I still mean it.`,
        `You told me that if there was one last person on earth who loved me, it would be you. And if there was no one left at all, it would mean you were gone.`,
        `I have never felt so held by a sentence. You did not just love me, you made your love into something I could stand on.`,
      ],
      tags: ["Love"],
    },
  ] satisfies Omit<Reflection, "slug">[]
).map((entry) => ({
  ...entry,
  slug: slugFromTitle(entry.title),
}));

export function useReflections() {
  return { reflections: reflectionsData };
}
