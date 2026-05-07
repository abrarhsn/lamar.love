<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { displayOpacity } = useCircularRevealProgress();
</script>

<template>
  <FluidCursor />
  <div
    class="pointer-events-none fixed inset-0 z-0"
    :style="{ opacity: displayOpacity }"
  >
    <BlackHoleBackground class="size-full" />
  </div>
</template>
