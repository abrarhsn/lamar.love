<script setup lang="ts">
import type { TimelineItem } from "@nuxt/ui";

const items: TimelineItem[] = [
  {
    date: "17th January 2026",
    title: "Discord Friends",
    description: "We added each other on Discord shortly after I joined the friend group. We shared a lot of common interests and we started to talk more and more.",
    icon: "i-simple-icons:discord",
    value: "17th January 2026",
    image: "/images/discord.jpg"
  },
  {
    date: "18th January 2026",
    title: "First Group Match",
    description: "We played our first Valorant match as a group. We didn't talk much during the game, but I admired every moment of your presence and fun vibe.",
    icon: "i-simple-icons:valorant",
    value: "18th January 2026",
    image: "/images/valorant.jpg"
  },
  {
    date: "19th January 2026",
    title: "Alone On Abyss",
    description: "Just us on Abyss. Voice chat laughs turned into a whole night side by side, and somewhere between rounds and quiet jokes, I started to notice you differently.",
    icon: "i-simple-icons:valorant",
    value: "19th January 2026",
    image: "/images/abyss-valorant.webp"
  },
  {
    date: "26th January 2026",
    title: "Your Voice",
    description:
      "The first time you shared your voice singing Ahwak. Your heart lived in every note, and I found ourselves lost together in the beautiful world your melody created.",
    icon: "i-ph:music-notes-fill",
    value: "26th January 2026",
    image: "/images/ahwak-fairuz.jpeg"
  },
  {
    date: "1st February 2026",
    title: "First Deep Talk",
    description:
      "It felt like we were finally learning each other for real, from simple things like your favourite vanilla perfume to your phobia of dogs. We didn't know it yet, but we were falling for each other more and more.",
    icon: "i-ph:chat-centered-fill",
    value: "1st February 2026",
    image: "/images/night-sky.jpg"
  },
  {
    date: "2nd February 2026",
    title: "No Secrets",
    description:
      "We finally swapped our real Instagram accounts and started showing each other who we really after you \"accidentally\" sent me a reel from your main account.",
    icon: "i-ph:instagram-logo-fill",
    value: "2nd February 2026",
    image: "/images/reels.webp"
  },
  {
    date: "3rd February 2026",
    title: "Wilting Rose & Sorrowed Sigh",
    description:
      "You shared Wilting Rose and Sorrowed Sigh with and I felt a deep, almost frightening relatability, like I had written it myself, like my doppelganger had written it. I thought I was the only one unfortunate enough to feel this way.",
    icon: "i-ph:smiley-sad-fill",
    value: "3rd February 2026",
    image: "/images/withered-rose.webp"
  },
  {
    date: "23rd February 2026",
    title: "The Forty Rules of Love",
    description:
      "We read Rule 1 from The Forty Rules of Love first: we see God and the world as we are, not as they are. I love this quote. You say you've never been loved like this and don't know what you did to deserve me. So this only proves you're full of love and deserve it.",
    icon: "i-ph:book-open-fill",
    value: "23rd February 2026",
    image: "/images/forty-rules-of-love.jpg"
  },
  {
    date: "11th March 2026",
    title: "Numbers Exchanged",
    description:
      "We swapped numbers for the first time. Something about it felt more personal and intimate. We suddenly became more than just something behind a screen, more real to each other than ever before.",
    icon: "i-ph:phone-fill",
    value: "11th March 2026",
    image: "/images/whatsapp.webp"
  },
  {
    date: "11th April 2026",
    title: "Forever For Each Other",
    description:
      "Your birthday, and the day we finally became a couple. Boyfriend and girlfriend, husband and wife, an endless love for each other. A step forward, hand in hand, into the rest of our lives.",
    icon: "i-ph:heart-fill",
    value: "11th April 2026",
    image: "/images/couple.jpg"
  },
  {
    date: "6th May 2026",
    title: "Made a Grown Man Cry",
    description:
      "You wrote me the most beautiful and tender love letter for my birthday, proving with every line that you know me better than I know myself. I had never felt so loved and cherished in my entire life.",
    icon: "i-ph:note-fill",
    value: "6th May 2026",
    image: "/images/gengar.jpg"
  },
  {
    date: "11th May 2026",
    title: "One Month Of Us",
    description:
      "One month since we became us, and it flew by in a blur of love. A whole month full of love, and many more years to come. Many more moments and memories as a couple beutifully in love.",
    icon: "i-ph:calendar-heart-fill",
    value: "11th May 2026",
    image: "/images/calendar.jpg"
  },
  {
    date: "???",
    title: "Our First Real Date",
    icon: "i-lucide-circle-help",
    value: "first-real-date",
  },
  {
    date: "???",
    title: "One Year Together",
    icon: "i-lucide-circle-help",
    value: "one-year-together",
  },
  {
    date: "???",
    title: "First Visit In Jordan",
    icon: "i-lucide-circle-help",
    value: "jordan",
  },
  {
    date: "???",
    title: "Married",
    icon: "i-lucide-circle-help",
    value: "married",
  },
];

const timelineUi = {
  title: "mt-1",
  description: "mt-1",
};
</script>

<template>
  <UContainer class="max-w-xl my-6 md:my-12">
    <div class="mb-6">
      <h1 class="text-xl font-medium text-highlighted tracking-tight">Future</h1>
      <h2 class="text-xl font-medium text-dimmed tracking-tight leading-6.5">
        Our past, present, and future together. Where are we headed next?
      </h2>
    </div>

    <UTimeline :items="items" :ui="timelineUi" :default-value="11">
      <template #title="{ item }">
        <UPopover
          mode="hover"
          :open-delay="50"
          :close-delay="50"
          :content="{ side: 'right', align: 'center', sideOffset: 8 }"
          :ui="{ content: 'p-1' }"
        >
          <span
            class="select-none hover:text-primary"
          >
            {{ item.title }}
          </span>
          <template #content>
            <img
              class="block w-[min(280px,calc(100vw-2rem))] h-auto rounded-sm"
              :src="item.image ?? 'https://placehold.co/560x360/1c1917/a8a29e/png?text=Preview'"
              :alt="item.title ?? 'Preview'"
              loading="lazy"
            />
          </template>
        </UPopover>
      </template>
    </UTimeline>
  </UContainer>
</template>