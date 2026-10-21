import test from "node:test";
import assert from "node:assert/strict";
import { validatePlayerDataset } from "../tools/player-data/validate-players.mjs";

// Synthetic test fixture only; this is not a player candidate or simulation dataset.
function validDataset() {
  return {
    schemaVersion: 1,
    datasetId: "nfl-all-time-intake",
    sport: "nfl",
    mode: "all-time",
    version: "intake-0.1",
    roleCodes: ["QB", "RB"],
    players: [{
      id: "nfl:test-player",
      name: "Test Player",
      positions: ["QB"],
      activeStatus: "unknown",
      sources: [{ id: "owner-list", kind: "owner-submission", label: "Synthetic test fixture" }],
      ratings: []
    }]
  };
}

test("accepts an unrated, sourced intake record", () => {
  const result = validatePlayerDataset(validDataset());
  assert.deepEqual(result.errors, []);
  assert.equal(result.summary.totalPlayers, 1);
  assert.equal(result.summary.unratedPlayers, 1);
});

test("allows a sourced decimal on an explicitly declared non-engine scale", () => {
  const data = validDataset();
  data.players[0].ratings = [{
    metric: "synthetic-test-metric",
    value: 0.5,
    scale: { min: 0, max: 1, label: "Synthetic unit interval for validator testing" },
    sourceId: "owner-list",
    status: "raw"
  }];
  const result = validatePlayerDataset(data);
  assert.deepEqual(result.errors, []);
  assert.equal(result.summary.ratedPlayers, 1);
});

test("rejects duplicate player identifiers", () => {
  const data = validDataset();
  data.players.push({ ...data.players[0], name: "Different Test Name" });
  assert.ok(validatePlayerDataset(data).errors.some(error => error.includes("duplicate player identifier")));
});

test("rejects a role that is not declared by the dataset", () => {
  const data = validDataset();
  data.players[0].positions = ["WR"];
  assert.ok(validatePlayerDataset(data).errors.some(error => error.includes("not declared in dataset roleCodes")));
});

test("rejects a rating outside its declared source scale", () => {
  const data = validDataset();
  data.players[0].ratings = [{
    metric: "synthetic-test-metric",
    value: 1.1,
    scale: { min: 0, max: 1, label: "Synthetic unit interval for validator testing" },
    sourceId: "owner-list",
    status: "raw"
  }];
  assert.ok(validatePlayerDataset(data).errors.some(error => error.includes("outside the declared source scale")));
});

test("requires a rating to point to a source on the same player record", () => {
  const data = validDataset();
  data.players[0].ratings = [{
    metric: "synthetic-test-metric",
    value: 0.5,
    scale: { min: 0, max: 1, label: "Synthetic unit interval for validator testing" },
    sourceId: "missing-source",
    status: "raw"
  }];
  assert.ok(validatePlayerDataset(data).errors.some(error => error.includes("must reference a source")));
});

test("allows an empty structural template but warns that it is not a player pool", () => {
  const data = validDataset();
  data.players = [];
  const result = validatePlayerDataset(data);
  assert.deepEqual(result.errors, []);
  assert.ok(result.warnings.some(warning => warning.includes("dataset is empty")));
});

test("reports repeated display names as a warning rather than a failure", () => {
  const data = validDataset();
  data.players.push({
    id: "nfl:second-test-player",
    name: "  Test   Player ",
    positions: ["RB"],
    activeStatus: "retired",
    sources: [{ id: "second-owner-list", kind: "owner-submission", label: "Second synthetic test fixture" }],
    ratings: []
  });
  const result = validatePlayerDataset(data);
  assert.deepEqual(result.errors, []);
  assert.ok(result.warnings.some(warning => warning.includes("display name")));
});
