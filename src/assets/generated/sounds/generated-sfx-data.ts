// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    ["hubol.ogg", "kirsi.ogg", "placeholder.ogg", "podcast.ogg"].map(sfx),
  );
  return {
    Hubol: sounds[0],
    Kirsi: sounds[1],
    Placeholder: sounds[2],
    Podcast: sounds[3],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
