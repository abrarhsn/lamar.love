<script setup lang="ts">
const { reflections } = useReflections();

const reflectionsByDateDesc = computed(() =>
  [...reflections].sort((a, b) => b.date.getTime() - a.date.getTime())
);

function seedGradient(seed: string | number) {
  const n = typeof seed === "string" ? [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0) : seed;
  const h1 = (n * 137) % 360;
  const h2 = (h1 + 60 + n * 23) % 360;
  return `linear-gradient(135deg, hsl(${h1},70%,60%), hsl(${h2},65%,45%))`;
}
</script>
<template>
  <div>
    <UContainer class="max-w-xl my-6 md:my-12">
      <div class="mb-9">
        <h1 class="text-xl font-medium text-highlighted tracking-tight">Reflections</h1>
        <h2 class="text-xl font-medium text-dimmed tracking-tight leading-6.5">
          Intimate thoughts about you, the world, and everything in between.
        </h2>
      </div>

      <div class="mb-9 space-y-8">
        <UBlogPost
          :ui="{
            title: 'text-sm mt-1',
            description: 'text-sm text-muted',
            date: 'text-xs text-dimmed font-medium',
            body: 'px-0 sm:px-0',
            root: 'hover:bg-transparent',
          }"
          v-for="(reflection, index) in reflectionsByDateDesc"
          variant="ghost"
          :key="`${index}-${reflection.date.getTime()}`"
          :title="reflection.title"
          :description="reflection.subtitle"
          :date="reflection.date"
          :authors="[{ name: reflection.name, avatar: reflectionAuthorAvatar(reflection), size: 'xs' }]"
          class="hover:cursor-pointer hover:scale-103 transition-all duration-200"
          @click="navigateTo(`/reflections/${reflection.slug}`)"
        >
          <template #header>
            <div class="aspect-video w-full" :style="{ background: seedGradient(reflection.title) }"/>
          </template>
        </UBlogPost>
      </div>

      <!-- <div class="space-y-9">
        <div v-for="(reflection, index) in reflectionsByDateDesc" :key="`${index}-${reflection.date.getTime()}`">
          <ReflectionCard :reflection="reflection" />
        </div>
      </div> -->
    </UContainer>
  </div>
</template>
