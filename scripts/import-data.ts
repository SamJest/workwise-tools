import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { getSeedData } from "../src/lib/data";
import { seedDataSchema } from "../src/lib/validators";

type ImportKind = "tools" | "professions" | "countries" | "categories";
type ImportRecord = { slug: string } & Record<string, unknown>;

const [, , kindArg, fileArg, outArg] = process.argv;
const kind = kindArg as ImportKind | undefined;

if (!kind || !fileArg || !["tools", "professions", "countries", "categories"].includes(kind)) {
  console.error("Usage: npm run data:import -- <tools|professions|countries|categories> <file.csv|file.json> [output.json]");
  process.exit(1);
}

const filePath = resolve(fileArg);
const outputPath = resolve(outArg || `./imported-${kind}.json`);
const text = readFileSync(filePath, "utf8");
const ext = extname(filePath).toLowerCase();
const rows = ext === ".json" ? JSON.parse(text) : parseCsv(text);
const seed = getSeedData();
const existingRows = seed[kind] as ImportRecord[];
const incomingRows = rows.map((row: Record<string, string>) => normalizeRow(kind, row)) as ImportRecord[];

const next = {
  ...seed,
  [kind]: mergeBySlug(existingRows, incomingRows)
};

const parsed = seedDataSchema.parse(next);
writeFileSync(outputPath, `${JSON.stringify(parsed, null, 2)}\n`);

console.log(`Imported ${rows.length} ${kind} rows from ${basename(filePath)} into ${outputPath}.`);

function mergeBySlug<T extends ImportRecord>(existing: T[], incoming: T[]) {
  const map = new Map(existing.map((item) => [item.slug, item]));
  for (const item of incoming) {
    map.set(item.slug, { ...map.get(item.slug), ...item });
  }
  return [...map.values()];
}

function normalizeRow(kind: ImportKind, row: Record<string, string>) {
  if (kind === "tools") {
    return {
      name: row.name,
      slug: row.slug,
      summary: row.summary,
      description: row.description || undefined,
      websiteUrl: row.websiteUrl || undefined,
      affiliateUrl: row.affiliateUrl || undefined,
      logoUrl: row.logoUrl || undefined,
      categories: parseList(row.categories),
      pricingModel: row.pricingModel || undefined,
      startingPrice: row.startingPrice ? Number(row.startingPrice) : null,
      currency: row.currency || "USD",
      freePlanAvailable: parseBoolean(row.freePlanAvailable),
      trialAvailable: parseBoolean(row.trialAvailable),
      bestFor: parseList(row.bestFor),
      notBestFor: parseList(row.notBestFor),
      pros: parseList(row.pros),
      cons: parseList(row.cons),
      professions: parseList(row.professions),
      countries: parseList(row.countries),
      useCases: parseList(row.useCases),
      affiliateAvailable: parseBoolean(row.affiliateAvailable),
      isSponsored: parseBoolean(row.isSponsored),
      lastCheckedAt: row.lastCheckedAt || null
    };
  }

  if (kind === "professions") {
    return {
      name: row.name,
      slug: row.slug,
      aliases: parseList(row.aliases),
      painPoints: parseList(row.painPoints),
      commonTasks: parseList(row.commonTasks),
      recommendedCategories: parseList(row.recommendedCategories),
      monetisationScore: row.monetisationScore ? Number(row.monetisationScore) : 3
    };
  }

  if (kind === "countries") {
    return {
      name: row.name,
      slug: row.slug,
      currency: row.currency,
      region: row.region || undefined,
      priority: row.priority ? Number(row.priority) : 5,
      terminologyNotes: parseList(row.terminologyNotes),
      privacyNotes: parseList(row.privacyNotes)
    };
  }

  return {
    name: row.name,
    slug: row.slug,
    description: row.description || undefined
  };
}

function parseBoolean(value?: string) {
  return ["true", "1", "yes", "y"].includes((value || "").trim().toLowerCase());
}

function parseList(value?: string) {
  if (!value) return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("[")) return JSON.parse(trimmed);
  return trimmed.split("|").map((item) => item.trim()).filter(Boolean);
}

function parseCsv(input: string) {
  const lines = input.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === "\"" && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}
