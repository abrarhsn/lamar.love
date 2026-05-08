<script setup lang="ts">
import { computed, ref } from "vue";
import { formatReflectionDate, reflectionAuthorAvatar, type Reflection } from "~/composables/useReflections";

const props = defineProps<{
  reflection: Reflection;
}>();

const reflectionText = computed(() => props.reflection.paragraphs.join("\n\n"));
const authorAvatar = computed(() => reflectionAuthorAvatar(props.reflection));
const isSubtitleHovered = ref(false);
</script>

<template>
  <div>
    <div class="mb-5">
      <p class="text-base text-dimmed font-medium mb-2">
        {{ formatReflectionDate(reflection.date) }} • {{ reflection.tags[0] }}
      </p>
      <h1 class="text-3xl font-medium text-highlighted tracking-tight max-w-md">{{ reflection.title }}</h1>
    </div>

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
        <UAlert
          :description="reflection.subtitle"
          color="primary"
          :variant="isSubtitleHovered ? 'solid' : 'soft'"
          size="sm"
          class="mb-4 transition-all duration-200"
          @mouseenter="isSubtitleHovered = true"
          @mouseleave="isSubtitleHovered = false"
        />
      </template>

      <div class="text-sm whitespace-pre-line mb-4">
        <EncryptedText :text="reflectionText" encrypted-class="text-muted" />
      </div>

      <template #footer>
        <div class="flex items-center gap-2">
          <UAvatar v-bind="authorAvatar" :alt="reflection.name" size="xs" />
          <p class="text-xs leading-tight">
            <span class="text-highlighted font-medium">{{ reflection.name }}</span>
          </p>
        </div>
      </template>
    </UCard>

    <div class="mt-5">
      <ULink to="/reflections" class="text-sm">Back to Reflections</ULink>
    </div>
  </div>
</template>
