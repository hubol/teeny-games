// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "attention barnes and noble.ogg",
      "book collect.ogg",
      "feces warning.ogg",
      "library round advance.ogg",
      "lottie step 0.ogg",
      "lottie step 1.ogg",
      "placeholder.ogg",
      "reading/book large in.ogg",
      "reading/book large out.ogg",
      "reading/book small in.ogg",
      "reading/book small out.ogg",
      "reading/cursor in.ogg",
      "reading/cursor line end.ogg",
      "reading/cursor line start.ogg",
      "reading/highlight start.ogg",
      "reading/highlight.ogg",
      "reading/instructions.ogg",
      "reading/score bad.ogg",
      "reading/score good.ogg",
      "reading/score ok.ogg",
    ].map(sfx),
  );
  return {
    AttentionBarnesAndNoble: sounds[0],
    BookCollect: sounds[1],
    FecesWarning: sounds[2],
    LibraryRoundAdvance: sounds[3],
    LottieStep0: sounds[4],
    LottieStep1: sounds[5],
    Placeholder: sounds[6],
    Reading: {
      BookLargeIn: sounds[7],
      BookLargeOut: sounds[8],
      BookSmallIn: sounds[9],
      BookSmallOut: sounds[10],
      CursorIn: sounds[11],
      CursorLineEnd: sounds[12],
      CursorLineStart: sounds[13],
      HighlightStart: sounds[14],
      Highlight: sounds[15],
      Instructions: sounds[16],
      ScoreBad: sounds[17],
      ScoreGood: sounds[18],
      ScoreOk: sounds[19],
    },
  };
}

export const GeneratedSfxData = {
  sfxs,
};
