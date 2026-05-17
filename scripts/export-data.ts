import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getSeedData } from "../src/lib/data";

const [, , outArg] = process.argv;
const outputPath = resolve(outArg || "./seed-export.json");

writeFileSync(outputPath, `${JSON.stringify(getSeedData(), null, 2)}\n`);
console.log(`Exported current seed data to ${outputPath}.`);
