import { collectSlugs, duplicates } from "./data-utils";

const groups = collectSlugs();
const errors: string[] = [];

for (const [group, values] of Object.entries(groups)) {
  const groupDuplicates = duplicates(values);
  if (groupDuplicates.length) {
    errors.push(`${group}: ${groupDuplicates.join(", ")}`);
  }
}

if (errors.length) {
  console.error(`Duplicate slugs found:\n${errors.join("\n")}`);
  process.exit(1);
}

console.log("No duplicate slugs found.");
