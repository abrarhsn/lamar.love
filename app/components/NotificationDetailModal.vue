<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import type { NotificationItem } from "~/composables/useNotifications";

const props = defineProps<{
  notification: NotificationItem | null;
}>();

const open = defineModel<boolean>("open", { required: true });

const timeAgo = computed(() =>
  props.notification ? formatTimeAgo(new Date(props.notification.date)) : "",
);
</script>

<template>
  <UModal v-model:open="open" scrollable overlay>
    <template #title>
      <div v-if="notification" class="flex min-w-0 items-center gap-3">
        <UAvatar v-bind="notification.sender.avatar" :alt="notification.sender.name" size="sm" />
        <span class="min-w-0 truncate">
          <span class="text-highlighted">{{ notification.sender.name }}</span>
          <span class="text-muted"> · </span>
          <time :datetime="notification.date" class="text-muted">
            {{ timeAgo }}
          </time>
        </span>
      </div>
    </template>

    <template #body>
      <p
        v-if="notification"
        class="text-sm leading-relaxed whitespace-pre-line text-default"
      >
        {{ notification.body }}
      </p>
    </template>
  </UModal>
</template>
