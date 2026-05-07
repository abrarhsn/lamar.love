<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { formatTimeAgo } from "@vueuse/core";
import { useDark } from "@vueuse/core";
import { computed, nextTick, onMounted, ref, shallowRef, watch } from "vue";
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

const isNotificationsSlideoverOpen = ref(false);
const { notifications } = useNotifications();

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

    <USlideover
      v-model:open="isNotificationsSlideoverOpen"
      title="Notifications"
    >
      <template #body>
        <NuxtLink
          v-for="notification in notifications"
          :key="notification.id"
          :to="`/inbox?id=${notification.id}`"
          class="relative -mx-3 flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-elevated/50 first:-mt-3 last:-mb-3"
        >
          <UChip
            color="error"
            :show="!!notification.unread"
            inset
          >
            <UAvatar
              v-bind="notification.sender.avatar"
              :alt="notification.sender.name"
              size="md"
            />
          </UChip>

          <div class="flex-1 text-sm">
            <p class="flex items-center justify-between gap-3">
              <span class="font-medium text-highlighted">{{ notification.sender.name }}</span>

              <time
                :datetime="notification.date"
                class="text-xs text-muted"
              >
                {{ formatTimeAgo(new Date(notification.date)) }}
              </time>
            </p>

            <p class="text-dimmed">
              {{ notification.body }}
            </p>
          </div>
        </NuxtLink>
      </template>
    </USlideover>

    <!-- Bottom padding clears vue-music-flow bar (h-60 / h-40 / h-20 by breakpoint) -->
    <!-- pb-60 sm:pb-40 xl:pb-24 -->
    <main
      class="flex-1"
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
