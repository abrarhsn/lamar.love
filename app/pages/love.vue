<script setup lang="ts">
const users = [
  {
    name: "Lamar",
    avatar: {
      src: "https://api.dicebear.com/9.x/bottts-neutral/png?seed=Lamar&size=128",
      alt: "Lamar",
    },
  },
  {
    name: "Abrar",
    avatar: {
      src: "https://api.dicebear.com/9.x/bottts-neutral/png?seed=Abrar%20Hassan&size=128",
      alt: "Abrar",
    },
  },
];
</script>

<template>
  <UContainer class="max-w-xl my-6 md:my-12">
    <div class="mb-6">
      <h1 class="text-xl font-medium text-highlighted tracking-tight">What is Love?</h1>
      <h2 class="text-xl font-medium text-dimmed tracking-tight leading-6.5">
        Return to these words whenever our hearts need remembering.
      </h2>
    </div>

    <img 
      src="/images/us.png"
      alt="Love"
      class="w-full h-auto mb-6 rounded-md"
    />

    <div class="space-y-4 select-none">
      <p class="transition-all duration-200 hover:text-highlighted">We are two individuals acting as a whole.</p>
      <p class="transition-all duration-200 hover:text-highlighted">
        Inside of our relationship we will always work to better each other individually.
      </p>
      <p class="transition-all duration-200 hover:text-highlighted">
        Outside of our relationship, we will always work to better us as a couple.
      </p>
      <p class="transition-all duration-200 hover:text-highlighted">We act as one mind. One entity.</p>
      <p class="transition-all duration-200 hover:text-highlighted">
        No decision, emotion, thought, or feeling goes unsaid or unchecked.
      </p>
      <p class="transition-all duration-200 hover:text-highlighted">
        We are partners in crime and most importantly best friends. We show up for each other, even at the hardest of
        times.
      </p>

      <p class="transition-all duration-200 hover:text-highlighted">
        We are together not for superficial reasons, but because of a deep comfort we have in each other that is
        extremely consistent and will never get boring.
      </p>
      <p class="transition-all duration-200 hover:text-highlighted">That is our definition of love.</p>
    </div>

    <div class="mt-8 flex items-center gap-3">
      <UAvatarGroup size="md">
        <UAvatar
          v-for="user in users"
          :key="user.name"
          v-bind="user.avatar"
          :alt="user.name"
          loading="lazy"
        />
      </UAvatarGroup>
      <span class="text-sm text-toned">Lamar & Abrar</span>
    </div>
  </UContainer>
</template>
