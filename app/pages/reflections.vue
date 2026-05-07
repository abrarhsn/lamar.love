<script setup lang="ts">
const { reflections } = useReflections();
</script>

<template>
  <div>
    <SleekLineCursor />
    <UContainer class="max-w-xl my-6 md:my-12">
      <div class="space-y-9">
        <div v-for="reflection in reflections" :key="reflection.date.getTime()">
          <ReflectionCard :reflection="reflection" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
