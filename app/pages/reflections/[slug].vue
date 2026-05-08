<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const route = useRoute();
const { reflections } = useReflections();

const slugParam = route.params.slug;
const slug = typeof slugParam === "string" ? slugParam : (slugParam?.[0] ?? "");

const reflection = reflections.find((r) => r.slug === slug);

if (!reflection) {
  throw createError({
    statusCode: 404,
    statusMessage: "Reflection not found",
  });
}

useHead({
  title: reflection.title,
});
</script>

<template>
  <div>
    <UContainer class="max-w-xl my-6 md:my-12">
      <!-- <div class="mb-8">
        <UButton
          to="/reflections"
          variant="ghost"
          color="neutral"
          icon="i-ph:arrow-left"
          label="Reflections"
          class="-ml-2.5"
        />
      </div> -->

      <div class="mb-6">
        <p class="text-base text-dimmed font-medium mb-2">
          {{ formatReflectionDate(reflection.date) }} • {{ reflection.tags[0] }}
        </p>
        <h1 class="text-3xl font-medium text-highlighted tracking-tight max-w-md">{{ reflection.title }}</h1>
      </div>

      <ReflectionCard :reflection="reflection" />

      <div class="mt-5">
        <ULink to="/reflections" class="text-sm">Back to Reflections</ULink>
      </div>
    </UContainer>
  </div>
</template>
