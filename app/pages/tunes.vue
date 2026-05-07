<script setup lang="ts">
import { computed } from "vue";
import { createMusicFlowWaveformOptions } from "~/composables/musicFlowWaveformOptions";

const { onPlayAsPlaylist, isTrackPlaying } = useMusicFlow(
  createMusicFlowWaveformOptions(),
);

const { tunes: tracks, loading } = useTunes();

const sortedTracks = computed(() =>
  [...tracks.value].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
);
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

    <p v-if="loading" class="text-muted text-sm">Loading tracks...</p>

    <ul v-else-if="sortedTracks.length" class="flex flex-col gap-1">
      <li
        v-for="track in sortedTracks"
        :key="track.id"
        class="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-elevated/50"
      >
        <UButton
          size="xs"
          variant="soft"
          @click="onPlayAsPlaylist(sortedTracks, track)"
        >
          {{ isTrackPlaying(track.id) ? "Pause" : "Play" }}
        </UButton>
        <span class="text-highlighted text-sm">{{ track.title }}</span>
      </li>
    </ul>
    <p v-else class="text-muted text-sm">
      No tracks found in <code>/assets/tunes</code>.
    </p>
  </div>
</template>