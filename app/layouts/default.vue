<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useDark, useStorage } from "@vueuse/core";
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

/** vue-music-flow: ensure track end does not replay (repeat "single") */
const playlistOpts = useStorage<{ repeat: "none" | "single" | "all" }>(
  "player:playlist:options",
  { repeat: "none" },
);
playlistOpts.value = { ...playlistOpts.value, repeat: "none" };

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: "Ideas", to: "/ideas" },
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
    <MusicFlow
      hide-playlist-popup
      :options="musicFlowOptions"
    >
      <template #controls="{ togglePlayback, isPlaying }">
        <button
          type="button"
          class="mw:flex mw:size-10 mw:cursor-pointer mw:items-center mw:justify-center mw:rounded mw:p-2 mw:hover:text-mw-primary-hover"
          :aria-label="isPlaying ? 'Pause' : 'Play'"
          :aria-pressed="isPlaying ? 'true' : 'false'"
          @click.stop.prevent="togglePlayback()"
        >
          <svg
            v-if="isPlaying"
            class="mw:size-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
          <svg
            v-else
            class="mw:size-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </template>
    </MusicFlow>
  </div>
</template>
