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
      title: "The most important person in the room",
      subtitle:
        "You made me feel like the centre of everything—seen, chosen, and lifted up until love felt like solid ground beneath my feet.",
      name: "Abrar Hassan",
      date: new Date(2026, 4, 7),
      paragraphs: [
        `You played along with every ridiculous thing I said, and somehow made me feel like the most important person in the room for saying it.`,
        `I told you that you should be an example to the world of how to love. I meant it. I still mean it.`,
        `You told me that if there was one last person on earth who loved me, it would be you. And if there was no one left at all, it would mean you were gone.`,
        `I have never felt so held by a sentence. You did not just love me, you made your love into something I could stand on.`,
      ],
      tags: ["Love"],
    },
  {
    title: "Permission to be still",
    subtitle:
      "What two weeks without a laptop taught us about peace: how to keep living, cooking, resting, and laughing when the world refuses to slow down.",
    name: "Abrar Hassan",
    date: new Date(2026, 4, 7),
    paragraphs: [
      `You gave me permission to be still.`,
      `For two weeks you had no laptop. You were frustrated, I could see that, but you kept living. You cooked, you rested, you laughed. The world did not stop and neither did you.`,
      `I used to feel a physical panic when I thought I was missing something. A game, a moment, anything. You felt it too, but you did not let it rule you.`,
      `Because of you I went to my parents one weekend and just watched you all play without me. I sat there and felt nothing but peace. That was entirely new for me. You made that possible.`,
    ],
    tags: ["Strength"],
  },
  {
    title: "You're worth it",
    subtitle:
      "No second-guessing, no arguing myself into it—just truth, the kind that arrives without a debate because you already convinced me.",
    name: "Abrar Hassan",
    date: new Date(2026, 4, 7),
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
      "Trust that runs deeper than agreement—knowing every word from you is woven from love, even when we would answer differently.",
    name: "Abrar Hassan",
    date: new Date(2003, 4, 6),
    paragraphs: [
      "I believe, with every fibre of my being, that your every intention is woven from love, a love so pure it needs no proof.",
      "Even if I told you my favourite colour was black, and you answered with white, time and again, I would not doubt you.",
      "For I know, in the marrow of my knowing, that each letter, each syllable, each quiet reason you offered was born from absolute love.",
      "Beautifully, intimately wrong, yet never anything less than love.",
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
