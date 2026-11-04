import { z } from "zod";

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

export function badRequest(error: z.ZodError) {
  return Response.json({ error: "invalid_request", issues: z.flattenError(error) }, { status: 400 });
}

export const notFound = () => Response.json({ error: "not_found" }, { status: 404 });
