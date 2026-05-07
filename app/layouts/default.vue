<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { computed } from "vue";

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: "Ideas", to: "/thoughts" },
  { label: "Moments", to: "/moments" },
  { label: "Tunes", to: "/tunes" },
  { label: "Future", to: "/future" },
]);
</script>

<template>
  <div>
    <UHeader class="bg-default border-none" mode="modal">
      <template #title>
        <span class="inline-block text-lg rotate-330">❤</span>
        lamar.love
      </template>
      <UNavigationMenu
        class="hidden lg:flex"
        :items="navItems"
        content-orientation="vertical"
        variant="link"
        :ui="{
          link: 'text-highlighted hover:text-muted',
          linkLeadingIcon: 'text-default hover:text-dimmed',
        }"
      />

      <template #body>
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          class="-mx-2.5"
          :ui="{
            link: `font-semibold tracking-tight text-highlighted`,
          }"
        />
      </template>

      <template #right>
        <UColorModeButton variant="ghost" />
      </template>
    </UHeader>

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
