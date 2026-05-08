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
      <ReflectionArticle :reflection="reflection" />
    </UContainer>
  </div>
</template>
