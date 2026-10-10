<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { Motion } from "motion-v";
import { computed, ref, watch } from "vue";
import type { Reason, ReasonFeeling } from "~/composables/useReasons";

const { reasons } = useReasons();

const openedIds = useLocalStorage<number[]>("lamar-6-months-opened", []);
const revealed = ref<Reason | null>(null);
const modalOpen = ref(false);
const shaking = ref(false);
const lidOpen = ref(false);
const opening = ref(false);

const feelingColors = {
  Love: "error",
  Admiration: "info",
  Appreciation: "success",
} as const satisfies Record<ReasonFeeling, "error" | "info" | "success">;

const openedCount = computed(
  () => reasons.filter((reason) => openedIds.value.includes(reason.id)).length,
);
const allOpened = computed(() => openedCount.value >= reasons.length);

const boxAnimate = computed(() => {
  if (shaking.value) {
    return { rotate: [0, -7, 7, -5, 5, -2, 0], x: [0, -8, 8, -5, 5, 0] };
  }
  if (allOpened.value) return { rotate: 0, x: 0 };
  return { rotate: [0, -2.5, 0, 2.5, 0], x: 0 };
});

const boxTransition = computed(() => {
  if (shaking.value) return { duration: 0.45, ease: "easeInOut" as const };
  if (allOpened.value) return { duration: 0.3 };
  return { duration: 2.6, repeat: Infinity, ease: "easeInOut" as const };
});

const lidAnimate = computed(() =>
  lidOpen.value ? { y: -20, rotate: -8 } : { y: 0, rotate: 0 },
);

function isOpened(id: number) {
  return openedIds.value.includes(id);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function showReason(reason: Reason) {
  lidOpen.value = false;
  revealed.value = reason;
  modalOpen.value = true;
}

async function openBox() {
  if (allOpened.value || opening.value) return;

  const remaining = reasons.filter((reason) => !isOpened(reason.id));
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  if (!pick) return;

  opening.value = true;
  shaking.value = true;
  await wait(460);
  shaking.value = false;
  lidOpen.value = true;
  openedIds.value = [...openedIds.value, pick.id];
  await wait(420);
  showReason(pick);
  opening.value = false;
}

function showOpened(reason: Reason) {
  if (opening.value || !isOpened(reason.id)) return;
  showReason(reason);
}

watch(modalOpen, (open) => {
  if (!open) lidOpen.value = false;
});
</script>

<template>
  <UContainer class="flex w-full max-w-xl flex-1 flex-col justify-center py-6 md:py-12">
    <div class="mb-6">
      <h1 class="text-xl font-medium text-highlighted tracking-tight">6 Months</h1>
      <h2 class="text-xl font-medium text-dimmed tracking-tight leading-6.5">
        Six months of us, and a few of the reasons I love you. Open the box.
      </h2>
    </div>

    <ClientOnly>
      <div class="flex flex-col items-center">
        <Motion
          as="button"
          type="button"
          class="relative h-48 w-44 cursor-pointer disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          :disabled="allOpened || opening"
          :aria-label="allOpened ? 'You\'ve opened them all' : 'Open a reason'"
          :animate="boxAnimate"
          :transition="boxTransition"
          @click="openBox"
        >
          <Motion
            class="absolute inset-x-1 top-8 z-10 h-11"
            style="transform-origin: 18% 100%"
            :animate="lidAnimate"
            :transition="{ duration: 0.35, ease: 'easeOut' }"
          >
            <span class="absolute -top-3.5 left-1/2 flex -translate-x-1/2">
              <span class="size-5 rounded-full border-2 border-primary-100 bg-primary-300" />
              <span class="-ml-1.5 size-5 rounded-full border-2 border-primary-100 bg-primary-300" />
            </span>
            <span class="absolute -top-1 left-1/2 z-10 size-2 -translate-x-1/2 rounded-full bg-primary-200" />
            <span class="relative block h-full overflow-hidden rounded-md bg-primary-400 shadow-sm">
              <span class="absolute inset-y-0 left-1/2 w-3.5 -translate-x-1/2 bg-primary-200" />
            </span>
          </Motion>

          <span class="absolute inset-x-0 bottom-0 h-28 overflow-hidden rounded-md bg-primary shadow-md">
            <span class="absolute inset-y-0 left-1/2 w-3.5 -translate-x-1/2 bg-primary-300" />
            <span class="absolute inset-x-0 top-1/2 h-3.5 -translate-y-1/2 bg-primary-300" />
            <span class="absolute inset-0 z-10 flex items-center justify-center text-white drop-shadow-sm">
              <span v-if="allOpened" class="text-2xl leading-none">✓</span>
              <span v-else class="text-3xl leading-none">❤</span>
            </span>
          </span>
        </Motion>
        <p class="mt-4 h-5 text-sm text-dimmed">
          {{ allOpened ? "You've opened them all" : "" }}
        </p>
      </div>

      <p class="mt-6 mb-3 text-sm text-dimmed">
        {{ openedCount }} / {{ reasons.length }} opened
      </p>
      <div class="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        <button
          v-for="reason in reasons"
          :key="reason.id"
          type="button"
          class="flex aspect-square w-[calc((100%-1.875rem)/4)] items-center justify-center rounded-md p-0 text-sm font-medium tabular-nums transition-colors duration-500 disabled:cursor-default sm:w-[calc((100%-3.75rem)/6)]"
          :class="isOpened(reason.id)
            ? 'bg-primary text-inverted hover:bg-primary-600'
            : 'bg-elevated text-muted'"
          :disabled="!isOpened(reason.id) || opening"
          :aria-label="isOpened(reason.id)
            ? `Reopen reason ${reason.id}, ${reason.quality}`
            : `Reason ${reason.id}, still wrapped`"
          :title="isOpened(reason.id) ? reason.quality : undefined"
          @click="showOpened(reason)"
        >
          {{ reason.id }}
        </button>
      </div>

      <UModal v-model:open="modalOpen" scrollable overlay>
        <template #title>
          <div v-if="revealed" class="flex min-w-0 flex-wrap items-center gap-2">
            <span class="text-highlighted">#{{ revealed.id }} · {{ revealed.quality }}</span>
            <UBadge
              v-if="revealed.feeling"
              :label="revealed.feeling"
              size="sm"
              variant="soft"
              :color="feelingColors[revealed.feeling]"
            />
          </div>
        </template>

        <template #body>
          <template v-if="revealed">
            <p class="text-sm leading-relaxed text-default">
              {{ revealed.text }}
            </p>
            <img
              v-if="revealed.images.length === 1"
              :src="revealed.images[0]"
              :alt="revealed.quality"
              class="mx-auto mt-4 max-h-[min(60vh,32rem)] w-full rounded-md object-contain"
            >
            <UCarousel
              v-else-if="revealed.images.length > 1"
              :key="revealed.id"
              v-slot="{ item }"
              arrows
              dots
              :items="revealed.images"
              class="mt-4"
              :ui="{ item: 'basis-full' }"
            >
              <img
                :src="item"
                :alt="revealed.quality"
                class="mx-auto max-h-[min(60vh,32rem)] w-full rounded-md object-contain"
              >
            </UCarousel>
          </template>
        </template>
      </UModal>

      <template #fallback>
        <USkeleton class="mx-auto h-48 w-44 rounded-md" />
        <USkeleton class="mt-10 mb-3 h-4 w-28" />
        <div class="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <USkeleton
            v-for="n in reasons.length"
            :key="`reason-skeleton-${n}`"
            class="aspect-square w-[calc((100%-1.875rem)/4)] rounded-md sm:w-[calc((100%-3.75rem)/6)]"
          />
        </div>
      </template>
    </ClientOnly>
  </UContainer>
</template>
