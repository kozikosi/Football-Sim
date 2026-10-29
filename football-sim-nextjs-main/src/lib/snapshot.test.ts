import { describe, expect, it } from "vitest";
import { decodeState, encodeState } from "./snapshot";

describe("snapshot encoding", () => {
  it("round-trips Sets and Maps nested in plain data", () => {
    const state = { a: 1, pos: new Set(["QB", "WR"]), deep: [{ m: new Map([["x", 2]]) }], nil: null };
    const back = decodeState<typeof state>(encodeState(state));
    expect(back.pos).toEqual(new Set(["QB", "WR"]));
    expect(back.deep[0].m.get("x")).toBe(2);
    expect(back.a).toBe(1);
    expect(back.nil).toBeNull();
  });

  it("leaves ordinary objects that merely contain a $set key alongside others", () => {
    const back = decodeState<{ o: Record<string, unknown> }>(encodeState({ o: { $set: [1], other: true } }));
    expect(back.o).toEqual({ $set: [1], other: true });
  });
});
