export function matchPerfumes(preferences, perfumes) {
  const { gender, season, occasion, notes = [] } = preferences;

  if (!perfumes || perfumes.length === 0) return [];

  const scoredPerfumes = perfumes.map((perfume) => {
    let score = 0;

    if (gender && perfume.gender?.toLowerCase() === gender.toLowerCase())
      score += 1;
    if (season && perfume.season?.toLowerCase() === season.toLowerCase())
      score += 1;
    if (occasion && perfume.occasion?.toLowerCase() === occasion.toLowerCase())
      score += 1;

    if (notes.length > 0 && perfume.notes) {
      const matchedNotes = perfume.notes.filter((note) =>
        notes.map((n) => n.toLowerCase()).includes(note.toLowerCase())
      );
      score += matchedNotes.length;
    }

    return { perfume, score };
  });

  const bestMatches = scoredPerfumes
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return bestMatches.map((entry) => entry.perfume);
}
