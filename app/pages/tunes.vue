<script setup lang="ts">
import { computed } from "vue";
import { createMusicFlowWaveformOptions } from "~/composables/musicFlowWaveformOptions";

const { onPlayAsPlaylist, isTrackPlaying } = useMusicFlow(createMusicFlowWaveformOptions());

const { tunes: tracks, loading } = useTunes();

const sortedTracks = computed(() =>
  [...tracks.value].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" })),
);

function playTrackByIndex(index: number) {
  const track = sortedTracks.value[index];
  if (!track) return;
  onPlayAsPlaylist(sortedTracks.value, track);
}

function trackTitleByIndex(index: number) {
  return sortedTracks.value[index]?.title ?? "Unknown track";
}

function trackPlayingByIndex(index: number) {
  const track = sortedTracks.value[index];
  return track ? isTrackPlaying(track.id) : false;
}

function trackArtistByIndex(index: number) {
  return sortedTracks.value[index]?.artist ?? "Unknown Artist";
}
</script>

<template>
  <UContainer class="max-w-xl my-6 md:my-12">
    <div class="mb-6">
      <h1 class="text-2xl font-medium text-highlighted tracking-tight">Tunes</h1>
      <h2 class="text-2xl font-medium text-dimmed tracking-tight leading-7">
        Love notes in melody, for us and every moment we share.
      </h2>
    </div>
    <p v-if="loading" class="text-muted text-sm">Loading tracks...</p>

  <ClientOnly v-else-if="sortedTracks.length">
    <div class="grid grid-cols-3 items-center justify-center w-full gap-4">
      <TuneCard
        v-for="(track, index) in sortedTracks"
        :key="track.id"
        :artwork="track.artwork"
        :title="trackTitleByIndex(index)"
        :subtitle="trackPlayingByIndex(index) ? 'Now Playing' : trackArtistByIndex(index)"
        @click="playTrackByIndex(index)"
      />
    </div>
  </ClientOnly>
  <p v-else class="text-muted text-sm">No tracks found in <code>/assets/tunes</code>.</p>
  </UContainer>
</template>
