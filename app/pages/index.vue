<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const { displayOpacity } = useCircularRevealProgress();
const isReadyToEnter = computed(() => displayOpacity.value >= 0.999);

const goToLove = async () => {
  await navigateTo("/love");
};
</script>

<template>
  <div>
    <FluidCursor />
    <div
      class="pointer-events-none fixed inset-0 z-0"
      :style="{ opacity: displayOpacity }"
    >
      <BlackHoleBackground class="size-full" />
    </div>
    <button
      type="button"
      class="fixed inset-0 z-50 bg-transparent"
      :class="isReadyToEnter ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'"
      aria-label="Enter love"
      @click="goToLove"
    />
  </div>
</template>
