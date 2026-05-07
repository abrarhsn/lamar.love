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
        <span class="site-title inline-flex items-center gap-1">
          <span class="title-heart inline-block rotate-330 text-lg">❤</span>
          <span>lamar.love</span>
        </span>
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

<style scoped>
.site-title {
  position: relative;
  transform-origin: center;
  will-change: transform, color;
}

.site-title:hover {
  color: rgb(239 68 68);
  animation: title-pop-spin 600ms ease-in-out;
}

@keyframes title-pop-spin {
  0% {
    color: inherit;
    transform: scale(1) rotate(0deg);
  }

  35% {
    color: rgb(239 68 68);
    transform: scale(1.16) rotate(-5deg);
  }

  65% {
    color: rgb(248 113 113);
    transform: scale(1.06) rotate(2deg);
  }

  100% {
    color: rgb(239 68 68);
    transform: scale(1) rotate(0deg);
  }
}

</style>
