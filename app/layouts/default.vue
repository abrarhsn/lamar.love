<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useDark } from "@vueuse/core";
import { computed, nextTick, onMounted, shallowRef, watch } from "vue";
import { createMusicFlowWaveformOptions } from "~/composables/musicFlowWaveformOptions";

const musicFlowOptions = shallowRef(createMusicFlowWaveformOptions());

function syncMusicFlowWaveformOptions() {
  musicFlowOptions.value = createMusicFlowWaveformOptions();
  useMusicFlow(musicFlowOptions.value);
}

syncMusicFlowWaveformOptions();

onMounted(() => {
  syncMusicFlowWaveformOptions();
});

const isDark = useDark();
watch(isDark, () => nextTick(syncMusicFlowWaveformOptions));

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: "Reflections", to: "/reflections" },
  { label: "Moments", to: "/moments" },
  { label: "Tunes", to: "/tunes" },
  { label: "Future", to: "/future" },
]);
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <UHeader class="bg-default border-none" mode="modal">
      <template #title>
        <span class="inline-block rotate-330 text-lg">❤</span>
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

    <!-- Bottom padding clears vue-music-flow bar (h-60 / h-40 / h-20 by breakpoint) -->
    <main
      class="flex-1 pb-60 sm:pb-40 xl:pb-24"
    >
      <slot />
    </main>

    <!-- Fixed bottom player (positioning is handled inside MusicFlow) -->
    <MusicFlow :options="musicFlowOptions" />
  </div>
</template>
