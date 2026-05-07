<script setup lang="ts">
const { reflections } = useReflections();
</script>

<template>
  <div>
    <!-- <SleekLineCursor /> -->
    <UContainer class="max-w-xl my-6 md:my-12">
      <div class="mb-9">
        <h1 class="text-xl font-medium text-highlighted tracking-tight">Reflections</h1>
        <h2 class="text-xl font-medium text-dimmed tracking-tight leading-7">
          Intimate thoughts about you, the world, and everything in between.
        </h2>
      </div>
      <div class="space-y-9">
        <div v-for="reflection in reflections" :key="reflection.date.getTime()">
          <ReflectionCard :reflection="reflection" class="transition-all duration-75 hover:scale-102" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
