import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Monday morning, my bed filed for custody of me. The judge gave it weekends.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is blank");
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the line");
}
if (Buffer.byteLength(written, "utf8") !== 75) {
  throw new Error(`entry.txt is ${Buffer.byteLength(written, "utf8")} bytes, expected 75`);
}
