"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  generateFreeToolResult,
  getDefaultValues,
  stringifyResult,
  validateFreeToolInput,
  type FreeToolDefinition,
  type FreeToolField
} from "@/lib/free-tools";

export function FreeToolForm({ tool }: { tool: FreeToolDefinition }) {
  const defaults = useMemo(() => getDefaultValues(tool), [tool]);
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [copied, setCopied] = useState(false);
  const errors = validateFreeToolInput(tool, values);
  const hasErrors = Object.keys(errors).length > 0;
  const result = useMemo(() => generateFreeToolResult(tool.slug, values), [tool.slug, values]);
  const copyText = stringifyResult(result);

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setCopied(false);
  }

  function reset() {
    setValues(defaults);
    setCopied(false);
    trackEvent({
      event: "free_tool_reset",
      label: tool.title,
      toolSlug: tool.slug,
      placement: "free-tool-form"
    });
  }

  async function copy() {
    await navigator.clipboard?.writeText(copyText);
    setCopied(true);
    trackEvent({
      event: "free_tool_copy",
      label: tool.title,
      toolSlug: tool.slug,
      placement: "free-tool-form",
      metadata: {
        outputSections: result.sections.length
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-md border border-line bg-white p-5">
        <div className="mb-5">
          <p className="font-semibold text-ink">Inputs</p>
          <p className="mt-1 text-sm leading-6 text-muted">{tool.inputSummary}</p>
        </div>
        <div className="grid gap-4">
          {tool.fields.map((field) => (
            <Field key={field.name} field={field} value={values[field.name] ?? ""} error={errors[field.name]} onChange={update} />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
          <button
            type="button"
            onClick={copy}
            disabled={hasErrors}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-muted"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy output"}
          </button>
        </div>
      </div>

      <div className="rounded-md border border-line bg-panel p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-ink">Generated output</p>
            <p className="mt-1 text-sm leading-6 text-muted">{tool.outputSummary}</p>
          </div>
          <Sparkles className="h-5 w-5 flex-none text-brand" aria-hidden="true" />
        </div>

        {hasErrors ? (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <div className="flex gap-2">
              <AlertCircle className="mt-1 h-4 w-4 flex-none" aria-hidden="true" />
              <div>
                <p className="font-semibold">Fix the highlighted inputs to generate a usable output.</p>
                <ul className="mt-2 list-disc pl-5">
                  {Object.entries(errors).map(([name, error]) => (
                    <li key={name}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <ResultView result={result} />
        )}
      </div>
    </div>
  );
}

function Field({
  field,
  value,
  error,
  onChange
}: {
  field: FreeToolField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}) {
  const inputClass = `rounded-md border px-3 py-2 font-normal text-ink outline-none focus:border-brand ${
    error ? "border-amber-400 bg-amber-50" : "border-line bg-white"
  }`;

  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {field.label}
      {field.type === "select" ? (
        <select value={value} onChange={(event) => onChange(field.name, event.target.value)} className={inputClass}>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className={inputClass}
        />
      ) : (
        <input
          type={field.type}
          value={value}
          min={field.min}
          max={field.max}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
      {field.helper ? <span className="text-xs font-normal leading-5 text-muted">{field.helper}</span> : null}
      {error ? <span className="text-xs font-semibold text-amber-800">{error}</span> : null}
    </label>
  );
}

function ResultView({
  result
}: {
  result: ReturnType<typeof generateFreeToolResult>;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-md bg-white p-5">
        <h2 className="text-2xl font-bold text-ink">{result.title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{result.summary}</p>
      </div>
      {result.sections.map((section) => (
        <section key={section.heading} className="rounded-md bg-white p-5">
          <h3 className="font-semibold text-ink">{section.heading}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
            {section.body.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ))}
      <section className="rounded-md bg-white p-5">
        <h3 className="font-semibold text-ink">Related next steps</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {result.ctas.map((cta) => (
            <Link key={cta.href} href={cta.href} className="rounded-md border border-line p-3 text-sm hover:border-brand">
              <span className="font-semibold text-ink">{cta.title}</span>
              <span className="mt-1 block leading-6 text-muted">{cta.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
