<script setup lang="ts">
interface Props {
  artwork: string;
  title: string;
  subtitle: string;
}

defineProps<Props>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <div class="card block rounded border border-transparent transition-all duration-75 hover:scale-103">
    <button type="button" class="group block w-full rounded-md text-left" @click="$emit('click')">
      <img
        :src="artwork"
        :alt="`Cover art for ${title}`"
        class="mb-3 w-full rounded-md object-cover"
        loading="lazy"
      />
      <p class="text-highlighted truncate text-xs font-medium mb-0.5">
        {{ title }}
      </p>
      <p class="text-muted truncate text-xs">
        {{ subtitle }}
      </p>
    </button>
  </div>
</template>
