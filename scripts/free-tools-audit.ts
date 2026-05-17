import {
  freeTools,
  generateFreeToolResult,
  getDefaultValues,
  stringifyResult,
  validateFreeToolInput
} from "../src/lib/free-tools";

const errors: string[] = [];

for (const tool of freeTools) {
  if (!tool.fields.length) errors.push(`${tool.slug} has no fields.`);
  if (tool.related.length < 2) errors.push(`${tool.slug} should have at least 2 related CTAs.`);

  const names = new Set<string>();
  for (const field of tool.fields) {
    if (names.has(field.name)) errors.push(`${tool.slug} has duplicate field ${field.name}.`);
    names.add(field.name);
    if (field.type === "select" && !field.options?.includes(field.defaultValue)) {
      errors.push(`${tool.slug}.${field.name} default value is not in options.`);
    }
    if (field.required && !field.defaultValue.trim()) {
      errors.push(`${tool.slug}.${field.name} is required but has an empty default.`);
    }
  }

  const defaults = getDefaultValues(tool);
  const validationErrors = validateFreeToolInput(tool, defaults);
  if (Object.keys(validationErrors).length) {
    errors.push(`${tool.slug} default values fail validation: ${Object.values(validationErrors).join(" ")}`);
  }

  const result = generateFreeToolResult(tool.slug, defaults);
  if (!result.sections.length) errors.push(`${tool.slug} generated no result sections.`);
  if (result.ctas.length < 2) errors.push(`${tool.slug} generated fewer than 2 CTAs.`);
  if (stringifyResult(result).length < 400) errors.push(`${tool.slug} generated output is too thin.`);
}

if (errors.length) {
  console.error(`Free tools audit failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  process.exit(1);
}

console.log(`Free tools audit passed: ${freeTools.length} tools checked.`);
