<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { TMusicFlowOptions } from "vue-music-flow";
import { formatTimeAgo } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import type { NotificationItem } from "~/composables/useNotifications";
// import paperSlideSfx from "~/assets/effects/Paper Slide - Sound Effect - Sound God (youtube)-[AudioTrimmer.com].mp3";

const FALLBACK_PRIMARY = "#529766";
const colorMode = useColorMode();

function resolveUiPrimaryColor(): string {
  if (!import.meta.client) return FALLBACK_PRIMARY;
  const style = getComputedStyle(document.documentElement);
  const candidates = ["--color-primary-500", "--color-primary", "--ui-primary"] as const;
  for (const variable of candidates) {
    const value = style.getPropertyValue(variable).trim();
    if (value) return value;
  }
  return FALLBACK_PRIMARY;
}

const musicFlowOptions = computed<TMusicFlowOptions>(() => {
  const primary = resolveUiPrimaryColor();
  const waveColor = colorMode.value === "dark" ? "#ffffff" : "#000000";
  return {
    height: 50,
    waveColor,
    barWidth: 4,
    barGap: 4,
    barRadius: 4,
    barHeight: 0.8,
    dragToSeek: { debounceTime: 1000 },
    minPxPerSec: 0,
    autoScroll: false,
    autoCenter: false,
    hideScrollbar: false,
    interact: true,
    autoplay: true,
    progressColor: primary,
    cursorColor: primary,
    cursorWidth: 1,
  };
});

const { wavesurfer } = useMusicFlow(musicFlowOptions.value);

watch(musicFlowOptions, (options) => {
  useMusicFlow(options);
  wavesurfer.value?.setOptions({
    waveColor: options.waveColor,
    progressColor: options.progressColor,
    cursorColor: options.cursorColor,
  });
});

const isNotificationsSlideoverOpen = ref(false);
const { notifications } = useNotifications();
const notificationForModal = ref<NotificationItem | null>(null);
const notificationModalOpen = ref(false);

// let paperSlideAudio: HTMLAudioElement | null = null;
//
// function playNotificationOpenSound() {
//   if (!import.meta.client) return;
//   if (!paperSlideAudio) {
//     paperSlideAudio = new Audio(paperSlideSfx);
//   }
//   paperSlideAudio.currentTime = 0;
//   void paperSlideAudio.play().catch(() => {});
// }

function openNotificationModal(notification: NotificationItem) {
  // playNotificationOpenSound();
  notificationForModal.value = notification;
  notificationModalOpen.value = true;
}

watch(notificationModalOpen, (open) => {
  if (!open) notificationForModal.value = null;
});

watch(isNotificationsSlideoverOpen, (open) => {
  if (!open) {
    notificationModalOpen.value = false;
    notificationForModal.value = null;
  }
});

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
        <div class="flex items-center gap-1">
          <UButton
            icon="i-ph:cards-three-fill"
            variant="ghost"
            color="neutral"
            aria-label="Open notifications"
            @click="isNotificationsSlideoverOpen = true"
          />
          <UColorModeButton variant="ghost" />
        </div>
      </template>
    </UHeader>

    <USlideover v-model:open="isNotificationsSlideoverOpen" title="Notifications">
      <template #body>
        <button
          v-for="notification in notifications"
          :key="notification.id"
          type="button"
          class="relative -mx-3 flex w-[calc(100%+1.5rem)] items-center gap-3 rounded-md px-3 py-2.5 text-left hover:bg-elevated/50 first:-mt-3 last:-mb-3"
          @click="openNotificationModal(notification)"
        >
          <UChip color="error" :show="!!notification.unread" inset>
            <UAvatar v-bind="notification.sender.avatar" :alt="notification.sender.name" size="md" />
          </UChip>

          <div class="flex-1 text-sm">
            <p class="flex items-center justify-between gap-3">
              <span class="font-medium text-highlighted">{{ notification.sender.name }}</span>

              <time :datetime="notification.date" class="text-xs text-muted">
                {{ formatTimeAgo(new Date(notification.date)) }}
              </time>
            </p>

            <p class="text-dimmed">
              {{ notification.action }}
            </p>
          </div>
        </button>
      </template>
    </USlideover>

    <NotificationDetailModal
      v-model:open="notificationModalOpen"
      :notification="notificationForModal"
    />

    <!-- Bottom padding clears vue-music-flow bar (h-60 / h-40 / h-20 by breakpoint) -->
    <!-- pb-60 sm:pb-40 xl:pb-24 -->
    <main class="flex-1 pb-60 sm:pb-40 xl:pb-24">
      <slot />
    </main>

    <!-- Fixed bottom player (positioning is handled inside MusicFlow) -->
    <MusicFlow :options="musicFlowOptions" :hide-playlist-popup="true" />
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
