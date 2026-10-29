import { connection } from "next/server";
import { deleteSave, getSave, updateSave } from "@/lib/db";
import { saveIdSchema, updateSaveSchema } from "@/lib/schemas";
import { badRequest, notFound, readJson } from "@/lib/http";

async function idFrom(ctx: RouteContext<"/api/saves/[id]">): Promise<string | null> {
  const parsed = saveIdSchema.safeParse((await ctx.params).id);
  return parsed.success ? parsed.data : null;
}

export async function GET(_request: Request, ctx: RouteContext<"/api/saves/[id]">) {
  await connection();
  const id = await idFrom(ctx);
  const save = id && getSave(id);
  return save ? Response.json({ save }) : notFound();
}

export async function PUT(request: Request, ctx: RouteContext<"/api/saves/[id]">) {
  const id = await idFrom(ctx);
  if (!id) return notFound();
  const parsed = updateSaveSchema.safeParse(await readJson(request));
  if (!parsed.success) return badRequest(parsed.error);
  const result = updateSave(id, parsed.data);
  if (result.ok) return Response.json({ save: result.save });
  if (result.reason === "not_found") return notFound();
  return Response.json({ error: "conflict", current: result.current }, { status: 409 });
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/saves/[id]">) {
  const id = await idFrom(ctx);
  return id && deleteSave(id) ? new Response(null, { status: 204 }) : notFound();
}
