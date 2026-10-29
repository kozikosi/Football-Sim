import { connection } from "next/server";
import { createSave, listSaves } from "@/lib/db";
import { createSaveSchema } from "@/lib/schemas";
import { badRequest, readJson } from "@/lib/http";

export async function GET() {
  await connection(); // always read the database at request time, never at build time
  return Response.json({ saves: listSaves() });
}

export async function POST(request: Request) {
  const body = await readJson(request);
  const parsed = createSaveSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error);
  return Response.json({ save: createSave(parsed.data) }, { status: 201 });
}
