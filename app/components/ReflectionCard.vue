<script setup lang="ts">
import { useInView } from "motion-v";
import { computed, ref } from "vue";
import { formatReflectionDate, type Reflection } from "~/composables/useReflections";

type BadgeColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

const TAG_BADGE_LOOKUP: Record<string, { color: BadgeColor; icon: string }> = {
  love: { color: "error", icon: "i-ph:heart-fill" },
  strength: { color: "success", icon: "i-ph:hand-fist-fill" },
};

const props = defineProps<{
  reflection: Reflection;
}>();
const cardRef = ref<HTMLElement>();
const isCardInView = useInView(cardRef, { once: true });

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

const reflectionText = computed(() => props.reflection.paragraphs.join("\n\n"));
</script>

<template>
  <div ref="cardRef">
    <UCard
      class="border-0 ring-0 outline-none shadow-none"
      :ui="{
        root: 'border-0 ring-0 shadow-none',
        header: 'p-0 sm:p-0 pb-3 sm:pb-3 border-0 ring-0',
        body: 'p-0 sm:p-0 pb-3 sm:pb-3 border-0 ring-0',
        footer: 'p-0 sm:p-0 border-0 ring-0',
      }"
    >
      <template #header>
        <p class="text-xs">
          <span class="text-highlighted font-medium">{{ reflection.name }}</span>
          <span class="text-dimmed"> • {{ formatReflectionDate(reflection.date) }}</span>
        </p>
      </template>

      <div class="text-sm whitespace-pre-line">
        <EncryptedText :text="reflectionText" :start="isCardInView" encrypted-class="text-muted" />
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
  </div>
</template>
