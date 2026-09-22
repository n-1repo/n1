import { normalizeText, tokenize } from "./normalize";
import type { FaqEntry } from "./types";

const MATCH_THRESHOLD = 1;
const MIN_SUBSTRING_KEYWORD_LENGTH = 4;

function scoreEntry(normalizedInput: string, inputTokens: Set<string>, entry: FaqEntry): number {
  let score = 0;
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) continue;
    const keywordTokens = normalizedKeyword.split(" ");
    if (keywordTokens.length > 1) {
      if (normalizedInput.includes(normalizedKeyword)) {
        score += keywordTokens.length * 2;
      }
    } else {
      const matched =
        normalizedKeyword.length >= MIN_SUBSTRING_KEYWORD_LENGTH
          ? normalizedInput.includes(normalizedKeyword)
          : inputTokens.has(normalizedKeyword);
      if (matched) score += 1;
    }
  }
  return score;
}

export type FaqMatch = {
  entry: FaqEntry;
  score: number;
};

export function matchFaq(input: string, entries: FaqEntry[]): FaqMatch | null {
  const normalizedInput = normalizeText(input);
  if (!normalizedInput) return null;
  const inputTokens = new Set(tokenize(input));

  let best: FaqMatch | null = null;
  for (const entry of entries) {
    const score = scoreEntry(normalizedInput, inputTokens, entry);
    if (score > (best?.score ?? -1)) {
      best = { entry, score };
    }
  }

  if (!best || best.score < MATCH_THRESHOLD) return null;
  return best;
}

export function findFaqById(entries: FaqEntry[], id: string): FaqEntry | undefined {
  return entries.find((entry) => entry.id === id);
}
