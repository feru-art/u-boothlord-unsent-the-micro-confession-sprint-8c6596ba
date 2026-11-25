// Unsent: The Micro-Confession Sprint — entry program (program/v1).
//
// Writes the winning micro-confession (V5 of the local V1–V5 race) to
// /output/entry.txt. Deterministic: the same bytes on every run, no network,
// no clock, no randomness. The text is fixed in this file.
//
// Winning text (V5, 98 characters / 98 bytes, message 90 characters):
//   To: Mom
//   I sold the necklace Grandma left you to pay my rent that winter, and I told you I lost it.
//
// Why V5 won the local race (advisor's criteria, 12/12): a two-layer
// confession (sold the heirloom + lied that it was lost), a felt reason it
// stayed in drafts (telling now only hurts Mom; the necklace can never come
// back), and a To: line the message cannot live without.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "To: Mom\n" +
  "I sold the necklace Grandma left you to pay my rent that winter, and I told you I lost it.";

// The server gate is absolute: UTF-8, 1–260 characters, not only whitespace.
// Verify our own output before exiting so a silent truncation can never
// ship: the file must read back byte-identical to ENTRY.
const MAX_CHARS = 260;

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

const written = readFileSync("/output/entry.txt", "utf8");
const chars = [...written].length;
if (written !== ENTRY) throw new Error("entry.txt is not byte-identical to ENTRY");
if (chars < 1 || chars > MAX_CHARS) throw new Error(`entry length ${chars} outside 1–260`);
if (!written.trim()) throw new Error("entry is only whitespace");
if (written.split("\n").length !== 2) throw new Error("entry must be exactly two lines");
