import { NextResponse } from "next/server";
import { z } from "zod";

const eventSchema = z.object({
  event: z.enum(["outbound_click", "newsletter_submit", "free_tool_copy", "free_tool_reset"]),
  route: z.string().optional(),
  label: z.string().optional(),
  targetUrl: z.string().url().optional(),
  toolSlug: z.string().optional(),
  placement: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (process.env.ANALYTICS_DEBUG === "true") {
    console.info("analytics:event", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
