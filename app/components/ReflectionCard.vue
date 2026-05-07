<script setup lang="ts">
import { computed } from "vue";
import {
  formatReflectionDate,
  type Reflection,
} from "~/composables/useReflections";

type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "neutral";

const TAG_BADGE_LOOKUP: Record<string, { color: BadgeColor; icon: string }> = {
  love: { color: "error", icon: "i-ph:heart-fill" },
  strength: { color: "success", icon: "i-ph:hand-fist-fill" },
};

const props = defineProps<{
  reflection: Reflection;
}>();

function tagBadgeAppearance(tag: string): { color: BadgeColor; icon: string } {
  const key = tag.trim().toLowerCase();
  return (
    TAG_BADGE_LOOKUP[key] ?? {
      color: "neutral",
      icon: "i-ph:hash-fill",
    }
  );
}

const badgeItems = computed(() =>
  props.reflection.tags.map((tag, index) => ({
    key: `${tag}-${index}`,
    label: tag,
    ...tagBadgeAppearance(tag),
  })),
);
</script>

<template>
  <UCard
    variant=""
    :ui="{
      header: 'p-2 sm:p-2',
      body: 'p-2 sm:p-2',
      footer: 'p-2 sm:p-2',
    }"
  >
    <template #header>
      <p class="text-xs">
        <span class="text-highlighted font-medium">{{ reflection.name }}</span>
        <span class="text-dimmed"> • {{ formatReflectionDate(reflection.date) }}</span>
      </p>
    </template>

    <div class="space-y-3">
      <p v-for="(p, i) in reflection.paragraphs" :key="i" class="text-sm">
        {{ p }}
      </p>
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="item in badgeItems"
          :key="item.key"
          :label="item.label"
          :color="item.color"
          :icon="item.icon"
          size="sm"
          variant="soft"
        />
      </div>
    </template>
  </UCard>
</template>
