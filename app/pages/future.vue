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
    date: "1943",
    title: "Warren McCulloch & Walter Pitts",
    description: "A Logical Calculus of Ideas Immanent in Nervous Activity",
    icon: "i-lucide-network",
    value: "1943",
  },
  {
    date: "1958",
    title: "John McCarthy",
    description: "Lisp",
    icon: "i-lucide-code-xml",
    value: "1958",
  },
  {
    date: "1960",
    title: "J.C.R. Licklider",
    description: "Man-Computer Symbiosis",
    icon: "i-lucide-user-cog",
    value: "1960",
  },
  {
    date: "1968",
    title: "Douglas Engelbart",
    description: "Mother of All Demos",
    icon: "i-lucide-monitor",
    value: "1968",
  },
  {
    date: "1969",
    title: "Ken Thompson & Dennis Ritchie",
    description: "Unix",
    icon: "i-lucide-terminal",
    value: "1969",
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
      <h2 class="text-xl font-medium text-dimmed tracking-tight leading-7">
        Our past, present, and future together. Where are we headed next?
      </h2>
    </div>

    <UTimeline :items="items" :ui="timelineUi" :default-value="2">
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