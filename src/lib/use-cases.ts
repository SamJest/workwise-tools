import type { Tool } from "@/types/content";

export type UseCasePage = {
  slug: string;
  label: string;
  tools: Tool[];
};

export function slugifyUseCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getUseCasePages(tools: Tool[], minTools = 2): UseCasePage[] {
  const pages = new Map<string, UseCasePage>();

  for (const tool of tools) {
    for (const useCase of tool.useCases) {
      const slug = slugifyUseCase(useCase);
      if (!slug) continue;

      const existing = pages.get(slug);
      if (existing) {
        existing.tools.push(tool);
      } else {
        pages.set(slug, {
          slug,
          label: normalizeUseCaseLabel(useCase),
          tools: [tool]
        });
      }
    }
  }

  return [...pages.values()]
    .filter((page) => page.tools.length >= minTools)
    .sort((a, b) => b.tools.length - a.tools.length || a.label.localeCompare(b.label));
}

export function findUseCasePage(tools: Tool[], slug: string, minTools = 2) {
  return getUseCasePages(tools, minTools).find((page) => page.slug === slug);
}

export function normalizeUseCaseLabel(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.toUpperCase() === word && word.length <= 4) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
