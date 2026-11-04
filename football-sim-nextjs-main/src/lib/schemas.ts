import { z } from "zod";

/** Largest save we accept, in bytes of JSON text. A finished season is well under this. */
export const MAX_SAVE_BYTES = 20 * 1024 * 1024;

const name = z.string().trim().min(1).max(80);
/** The game state, already encoded by `encodeState`; the server stores it as opaque text. */
const data = z
  .string()
  .min(2)
  .refine((s) => Buffer.byteLength(s) <= MAX_SAVE_BYTES, "save is too large");

export const createSaveSchema = z.object({ name, data, summary: z.string().max(200).default("") });

export const updateSaveSchema = z.object({
  name: name.optional(),
  data,
  summary: z.string().max(200).default(""),
  /** Version the client last saw. A mismatch means another tab or device saved first. */
  baseVersion: z.number().int().nonnegative(),
});

export const saveIdSchema = z.uuid();

export type CreateSaveInput = z.infer<typeof createSaveSchema>;
export type UpdateSaveInput = z.infer<typeof updateSaveSchema>;

export interface SaveMeta {
  id: string;
  name: string;
  summary: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface SaveFull extends SaveMeta {
  data: string;
}
