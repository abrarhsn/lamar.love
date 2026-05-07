<script setup lang="ts">
import type { TMusicFlow } from "vue-music-flow";
import { createMusicFlowWaveformOptions } from "~/composables/musicFlowWaveformOptions";

const { onPlaySingleTrack, isTrackPlaying } = useMusicFlow(
  createMusicFlowWaveformOptions(),
);

const tracks: TMusicFlow[] = [
  {
    id: 1,
    audio:
      "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/dreamy-slow.mp3",
    title: "Sample Audio 1#",
    artist: "John Walkers",
    artwork: "https://placehold.co/512x512",
    album: "Free Audio",
    original: {
      source:
        "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/",
    },
  },
  {
    id: 2,
    audio:
      "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/dreamy-slow.mp3",
    title: "Sample Audio 2#",
    artist: "Steve Rooney",
    artwork: "https://placehold.co/512x512",
    album: "Free Audio",
    original: {
      source:
        "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/",
    },
  },
  {
    id: 3,
    audio:
      "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/dreamy-slow.mp3",
    title: "Sample Audio 3#",
    artist: "Julie Rock",
    artwork: "https://placehold.co/512x512",
    album: "Free Audio",
    original: {
      source:
        "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/",
    },
  },
  {
    id: 4,
    audio:
      "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/dreamy-slow.mp3",
    title: "Sample Audio 4#",
    artist: "Hans Broom",
    artwork: "https://placehold.co/512x512",
    album: "Free Audio",
    original: {
      source:
        "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/",
    },
  },
];
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="text-highlighted mb-1 text-2xl font-semibold tracking-tight">
      Tunes
    </h1>
    <p class="text-muted mb-8 text-sm">
      Pick a track — playback uses the player fixed at the bottom of the screen.
    </p>

    <p class="text-muted mb-2 text-xs font-medium uppercase tracking-wide">
      Playlist
    </p>
    <ul class="flex flex-col gap-1">
      <li
        v-for="track in tracks"
        :key="track.id"
        class="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-elevated/50"
      >
        <UButton
          size="xs"
          variant="soft"
          @click="onPlaySingleTrack(track)"
        >
          {{ isTrackPlaying(track.id) ? "Pause" : "Play" }}
        </UButton>
        <span class="text-highlighted text-sm">{{ track.title }}</span>
      </li>
    </ul>
  </div>
</template>
