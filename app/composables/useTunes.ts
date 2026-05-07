import { ref } from "vue";
import { parseBlob } from "music-metadata";
import type { TMusicFlow } from "vue-music-flow";

const tuneModules = import.meta.glob("~/assets/tunes/*.{mp3,wav,ogg,m4a,flac,aac}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const FALLBACK_ARTWORK = "https://placehold.co/512x512";

function formatTitle(path: string) {
  const filename = path.split("/").pop() ?? path;
  const withoutExtension = filename.replace(/\.(mp3|wav|ogg|m4a|flac|aac)$/i, "");
  return decodeURIComponent(withoutExtension);
}

async function buildTune(path: string, audioUrl: string, id: number): Promise<TMusicFlow> {
  try {
    const blob = await fetch(audioUrl).then(r => r.blob());
    const { common } = await parseBlob(blob);

    let artwork = FALLBACK_ARTWORK;
    const picture = common.picture?.[0];
    if (picture) {
      const pictureBlob = new Blob([new Uint8Array(picture.data)], { type: picture.format });
      artwork = URL.createObjectURL(pictureBlob);
    }

    return {
      id,
      audio: audioUrl,
      title: common.title ?? formatTitle(path),
      artist: common.artist ?? "Unknown Artist",
      album: common.album ?? "Tunes",
      artwork,
    };
  } catch {
    return {
      id,
      audio: audioUrl,
      title: formatTitle(path),
      artist: "Unknown Artist",
      album: "Tunes",
      artwork: FALLBACK_ARTWORK,
    };
  }
}

export function useTunes() {
  const tunes = ref<TMusicFlow[]>([]);
  const loading = ref(true);

  const entries = Object.entries(tuneModules);

  Promise.all(
    entries.map(([path, audioUrl], index) => buildTune(path, audioUrl, index + 1))
  ).then(result => {
    tunes.value = result;
    loading.value = false;
  });

  return { tunes, loading };
}