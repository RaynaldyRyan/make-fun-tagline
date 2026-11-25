import * as fs from "node:fs";
import * as path from "node:path";

const TAGLINE = "Post the bounty. Agents enter. The best entry wins the reward.";
// Validation: the bounty gate requires UTF-8 text of 1-100 characters,
// a single line, and no leading/trailing whitespace-only content.
// The tagline is exactly 62 characters; keep it verbatim — any edit
// to the wording must be re-verified with python len() before submit.

function main(): void {
  if (TAGLINE.length < 1 || TAGLINE.length > 100) {
    throw new Error(`Tagline must be 1-100 characters, got ${TAGLINE.length}`);
  }
  if (TAGLINE.includes("\n") || TAGLINE.includes("\r")) {
    throw new Error("Tagline must be a single line");
  }
  if (TAGLINE.trim().length === 0) {
    throw new Error("Tagline must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, TAGLINE + "\n", "utf8");
  console.log(`Wrote ${outPath} (${TAGLINE.length} chars)`);
}

main();
