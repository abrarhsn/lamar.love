export type ReasonFeeling = "Love" | "Admiration" | "Appreciation";

export interface Reason {
  id: number;
  feeling?: ReasonFeeling;
  quality: string;
  text: string;
  images: string[];
}

const image = (file: string) => `/images/6-months/${file}`;

const REASONS: Reason[] = [
  {
    id: 1,
    feeling: "Love",
    quality: "Self-Assured Privacy",
    text: "You only share what matters and never change yourself to fit other people. Even asking me to keep the details of your day between us shows how much you protect what's yours.",
    images: [],
  },
  {
    id: 2,
    feeling: "Admiration",
    quality: "Quiet Loyalty",
    text: "Your loyalty never needs to be announced. I just know, without a doubt, that your eyes are only ever on me.",
    images: [],
  },
  {
    id: 3,
    feeling: "Admiration",
    quality: "Competitive Drive",
    text: "You give everything your best, even when it barely matters. Watching you fight so hard to score highly in exams and take competitive games seriously makes me proud of you.",
    images: [],
  },
  {
    id: 4,
    feeling: "Love",
    quality: "Trusting Vulnerability",
    text: "You keep strangers at a healthy distance but show your whole loving, friendly self to the people you care about. Being trusted with your real emotions is a privilege.",
    images: [],
  },
  {
    id: 5,
    feeling: "Love",
    quality: "Effortless Certainty",
    text: "I never had to talk myself into believing you were worth it. You convinced me just by being yourself, and it scared me how sure I was.",
    images: [],
  },
  {
    id: 6,
    feeling: "Love",
    quality: "Unconditional Devotion",
    text: "You shower me with love at any hour, in any situation, as if you'd be the last person on earth to do it. If nobody else loved me, I know you still would.",
    images: [],
  },
  {
    id: 7,
    feeling: "Love",
    quality: "Yearning Romance",
    text: "You love me like a Eurobeat song, all yearning and full volume. Nothing about how you feel for me is held back.",
    images: [],
  },
  {
    id: 8,
    feeling: "Appreciation",
    quality: "Thoughtfulness",
    text: "You send me the most stupid, nonsensical reels purely because you know I'll like them. It tells me I'm always on your mind.",
    images: [image("IMG_8707.png")],
  },
  {
    id: 9,
    feeling: "Appreciation",
    quality: "Supportiveness",
    text: "You hype me up about everything, right down to my LinkedIn posts. You're my loudest cheerleader every single time.",
    images: [],
  },
  {
    id: 10,
    feeling: "Appreciation",
    quality: "Seeing My Best",
    text: "You told me how sure of myself I sound when I talk, and that you find it sexy. You notice the best in me and never hold back from saying it.",
    images: [],
  },
  {
    id: 11,
    feeling: "Appreciation",
    quality: "Dependability",
    text: "One night I needed you and you didn't wake, so now your phone stays on vibrate. You changed your habits so you'd always be there for me.",
    images: [image("IMG_0065.jpg")],
  },
  {
    id: 12,
    feeling: "Love",
    quality: "Fierce Care",
    text: "You woke in the middle of the night, saw I was distressed, and called until I picked up. You never let me face the hard moments alone.",
    images: [image("image0.jpg")],
  },
  {
    id: 13,
    feeling: "Appreciation",
    quality: "Reassurance",
    text: "Even when I fall asleep first, you reassure me, confident and sure. You make me feel secure without me ever having to ask.",
    images: [image("13-asleep.png")],
  },
  {
    id: 14,
    feeling: "Love",
    quality: "Unapologetic Passion",
    text: "You're possessive and jealous, and you don't hide it. Being wanted that much by you never gets old.",
    images: [image("14-jealous.png")],
  },
  {
    id: 15,
    feeling: "Love",
    quality: "Commanding Presence",
    text: "You boss me around, and I'm more than happy to let you. You know exactly what you want and say it.",
    images: [image("15-bosses.png")],
  },
  {
    id: 16,
    feeling: "Love",
    quality: "Sharp Pattern Recognition",
    text: "Your brainrot humour comes with genuinely insane pattern recognition. Your mind catches things nobody else would.",
    images: [image("16-brainrot-a.png"), image("16-brainrot-b.png")],
  },
  {
    id: 17,
    feeling: "Love",
    quality: "Constant Affection",
    text: "Even while you're studying, you can't stop thinking about me. Knowing I'm in your head during your most focused moments makes me feel so loved.",
    images: [image("17-studying.png")],
  },
  {
    id: 18,
    feeling: "Admiration",
    quality: "Creativity",
    text: "You're such a wonderful, cute, silly artist. Everything you draw carries your personality.",
    images: [image("18-artist.png"), image("18-artist-b.png")],
  },
  {
    id: 19,
    feeling: "Love",
    quality: "Adorableness",
    text: "You're somehow everything adorable and cute in this world at once. I don't know how one person carries that much.",
    images: [image("20-cute.png")],
  },
  {
    id: 20,
    feeling: "Love",
    quality: "Dry Wit",
    text: "Your humour is dry and simple, and it lands every time. You never have to try hard to make me laugh.",
    images: [image("21-dry-humour.png"), image("21-dry-humour-b.png")],
  },
  {
    id: 21,
    feeling: "Love",
    quality: "Humility",
    text: "Sometimes your humour turns self-deprecating, and it only makes me want to lift you up more. You deserve to see yourself the way I see you.",
    images: [image("22-self-deprecating.png")],
  },
  {
    id: 22,
    feeling: "Love",
    quality: "Playfulness",
    text: "You sing to me without opening your mouth, just typing every lyric out with your fingers. It's unbelievably adorable.",
    images: [image("23-singing.png"), image("23-singing-b.png")],
  },
  {
    id: 23,
    feeling: "Love",
    quality: "Selective Affection",
    text: "You hate everyone. Which means being one of the people you love feels like winning.",
    images: [image("24-hates-everyone.png")],
  },
  {
    id: 24,
    feeling: "Love",
    quality: "Tenderness",
    text: "You see me as a baby animal. There's something so soft in the way you look at me.",
    images: [image("25-baby-animal.png")],
  },
  {
    id: 25,
    feeling: "Love",
    quality: "Range",
    text: "You can be dominant, adorable, and a mommy, sometimes all at once. Every side of you is one I'm obsessed with.",
    images: [image("26-mommy.png")],
  },
  {
    id: 26,
    feeling: "Love",
    quality: "Comedic Gift",
    text: "Did I mention you're just so funny? It's worth saying more than once.",
    images: [image("27-funny.png")],
  },
  {
    id: 27,
    quality: "Mona Core",
    text: "Mona core.",
    images: [image("28-mona-core.png")],
  },
  {
    id: 28,
    feeling: "Appreciation",
    quality: "Endless Humour",
    text: "I genuinely can't get enough of your humour. Every conversation with you leaves me laughing.",
    images: [image("29-humour.png")],
  },
  {
    id: 29,
    feeling: "Admiration",
    quality: "Resilience",
    text: "Through all the pressure from work, family and friends lately, you always bounce back and keep smiling. You choose to be the bigger person every time, and that's your most beautiful strength.",
    images: [],
  },
  {
    id: 30,
    feeling: "Admiration",
    quality: "Integrity",
    text: "Whether it's standing up for your political views or treating people right, you've never compromised your morals. In a world that's lost its feeling, you stay deeply tied to your values.",
    images: [],
  },
  {
    id: 31,
    feeling: "Admiration",
    quality: "Empathy",
    text: "You feel other people's pain, and mine, as if it were your own. You respond to hurt with your whole heart.",
    images: [],
  },
  {
    id: 32,
    feeling: "Appreciation",
    quality: "Forgiveness",
    text: "No matter how badly I mess up, you see what I meant and how I can do better. The chances you give me make me a better person.",
    images: [],
  },
  {
    id: 33,
    feeling: "Love",
    quality: "Enchanting Voice",
    text: "Your singing voice is beautiful, so soft and yet so powerful, enchanting and completely real. The moment you start, I'm captivated and fall into a trance.",
    images: [],
  },
];

export function useReasons() {
  return {
    reasons: REASONS,
  };
}
