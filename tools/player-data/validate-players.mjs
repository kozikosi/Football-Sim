#!/usr/bin/env node
/**
 * Dependency-free structural and integrity validator for player intake datasets.
 * It checks supplied records; it does not fact-check historical claims.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SPORT_ID = /^[a-z][a-z0-9-]*$/;
const STABLE_ID = /^[a-z0-9][a-z0-9:_-]*$/;
const ROLE_CODE = /^[A-Za-z0-9][A-Za-z0-9/+.-]*$/;
const SOURCE_KINDS = new Set(["owner-submission", "publication", "statistics-database", "game-roster", "manual-review"]);
const ACTIVE_STATUSES = new Set(["active", "retired", "unknown"]);
const RATING_STATUSES = new Set(["raw", "provisional", "reviewed", "derived"]);

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
function checkKeys(value, allowed, at, errors) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) errors.push(at + "." + key + ": unknown field");
  }
}
function checkDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00Z");
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function validatePlayerDataset(dataset) {
  const errors = [];
  const warnings = [];
  const summary = { totalPlayers: 0, ratedPlayers: 0, unratedPlayers: 0, byActiveStatus: {}, byPosition: {} };

  if (!isRecord(dataset)) return { errors: ["$: expected an object"], warnings, summary };

  checkKeys(dataset, new Set([
    "schemaVersion", "datasetId", "sport", "mode", "version", "description", "updatedAt", "roleCodes", "players"
  ]), "$", errors);

  if (dataset.schemaVersion !== 1) errors.push("$.schemaVersion: expected 1");
  if (!isNonEmptyString(dataset.datasetId) || !STABLE_ID.test(dataset.datasetId)) {
    errors.push("$.datasetId: expected a stable lowercase identifier");
  }
  if (!isNonEmptyString(dataset.sport) || !SPORT_ID.test(dataset.sport)) {
    errors.push("$.sport: expected a lowercase sport identifier such as nfl or nba");
  }
  if (!["current", "all-time"].includes(dataset.mode)) errors.push("$.mode: expected current or all-time");
  if (!isNonEmptyString(dataset.version)) errors.push("$.version: expected a non-empty version label");
  if (dataset.description !== undefined && typeof dataset.description !== "string") {
    errors.push("$.description: expected a string");
  }
  if (dataset.updatedAt !== undefined && !checkDate(dataset.updatedAt)) {
    errors.push("$.updatedAt: expected a real date in YYYY-MM-DD format");
  }

  const roleCodes = new Set();
  if (!Array.isArray(dataset.roleCodes) || dataset.roleCodes.length === 0) {
    errors.push("$.roleCodes: expected a non-empty array of role or position codes");
  } else {
    dataset.roleCodes.forEach((code, index) => {
      const at = "$.roleCodes[" + index + "]";
      if (!isNonEmptyString(code) || !ROLE_CODE.test(code)) errors.push(at + ": expected a non-empty role code without spaces");
      else if (roleCodes.has(code)) errors.push(at + ": duplicate role code " + JSON.stringify(code));
      else roleCodes.add(code);
    });
  }

  if (!Array.isArray(dataset.players)) {
    errors.push("$.players: expected an array");
    return { errors, warnings, summary };
  }
  summary.totalPlayers = dataset.players.length;
  if (dataset.players.length === 0) warnings.push("$.players: dataset is empty; this can be a template, not a simulation-ready pool");

  const playerIds = new Set();
  const names = new Map();
  const playerAllowed = new Set(["id", "name", "positions", "activeStatus", "seasons", "sources", "ratings", "notes"]);
  const sourceAllowed = new Set(["id", "kind", "label", "reference", "accessedAt"]);
  const ratingAllowed = new Set(["metric", "value", "scale", "sourceId", "status", "season"]);
  const scaleAllowed = new Set(["min", "max", "label"]);
  const seasonAllowed = new Set(["season", "team"]);

  dataset.players.forEach((player, index) => {
    const at = "$.players[" + index + "]";
    if (!isRecord(player)) {
      errors.push(at + ": expected an object");
      return;
    }
    checkKeys(player, playerAllowed, at, errors);

    if (!isNonEmptyString(player.id) || !STABLE_ID.test(player.id)) {
      errors.push(at + ".id: expected a stable lowercase identifier");
    } else if (playerIds.has(player.id)) {
      errors.push(at + ".id: duplicate player identifier " + JSON.stringify(player.id));
    } else {
      playerIds.add(player.id);
    }

    if (!isNonEmptyString(player.name)) {
      errors.push(at + ".name: expected a non-empty display name");
    } else {
      const normalized = player.name.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
      const sameName = names.get(normalized) || [];
      sameName.push(player.id || "record " + index);
      names.set(normalized, sameName);
    }

    if (!Array.isArray(player.positions) || player.positions.length === 0) {
      errors.push(at + ".positions: expected at least one role code");
    } else {
      const seen = new Set();
      player.positions.forEach((position, positionIndex) => {
        const positionPath = at + ".positions[" + positionIndex + "]";
        if (!isNonEmptyString(position)) errors.push(positionPath + ": expected a role code");
        else if (!roleCodes.has(position)) errors.push(positionPath + ": " + JSON.stringify(position) + " is not declared in dataset roleCodes");
        else if (seen.has(position)) errors.push(positionPath + ": duplicate role code " + JSON.stringify(position));
        else seen.add(position);
      });
    }

    if (!ACTIVE_STATUSES.has(player.activeStatus)) {
      errors.push(at + ".activeStatus: expected active, retired, or unknown");
    } else {
      summary.byActiveStatus[player.activeStatus] = (summary.byActiveStatus[player.activeStatus] || 0) + 1;
    }
    if (player.notes !== undefined && typeof player.notes !== "string") errors.push(at + ".notes: expected a string");

    if (player.seasons !== undefined) {
      if (!Array.isArray(player.seasons)) errors.push(at + ".seasons: expected an array");
      else {
        const seasonKeys = new Set();
        player.seasons.forEach((season, seasonIndex) => {
          const seasonPath = at + ".seasons[" + seasonIndex + "]";
          if (!isRecord(season)) {
            errors.push(seasonPath + ": expected an object");
            return;
          }
          checkKeys(season, seasonAllowed, seasonPath, errors);
          if (!isNonEmptyString(season.season)) errors.push(seasonPath + ".season: expected a season label such as 2024 or 2024-25");
          if (season.team !== undefined && !isNonEmptyString(season.team)) errors.push(seasonPath + ".team: expected a non-empty team label when provided");
          if (isNonEmptyString(season.season)) {
            const key = season.season.trim() + "|" + (season.team || "").trim().toLocaleLowerCase("en-US");
            if (seasonKeys.has(key)) errors.push(seasonPath + ": duplicate season and team entry");
            seasonKeys.add(key);
          }
        });
      }
    }

    const sourceIds = new Set();
    if (!Array.isArray(player.sources) || player.sources.length === 0) {
      errors.push(at + ".sources: add at least one traceable source for this player record");
    } else {
      player.sources.forEach((source, sourceIndex) => {
        const sourcePath = at + ".sources[" + sourceIndex + "]";
        if (!isRecord(source)) {
          errors.push(sourcePath + ": expected an object");
          return;
        }
        checkKeys(source, sourceAllowed, sourcePath, errors);
        if (!isNonEmptyString(source.id) || !STABLE_ID.test(source.id)) {
          errors.push(sourcePath + ".id: expected a stable lowercase source identifier");
        } else if (sourceIds.has(source.id)) {
          errors.push(sourcePath + ".id: duplicate source identifier " + JSON.stringify(source.id));
        } else {
          sourceIds.add(source.id);
        }
        if (!SOURCE_KINDS.has(source.kind)) errors.push(sourcePath + ".kind: expected one of " + Array.from(SOURCE_KINDS).join(", "));
        if (!isNonEmptyString(source.label)) errors.push(sourcePath + ".label: identify the source in words");
        if (source.reference !== undefined && !isNonEmptyString(source.reference)) {
          errors.push(sourcePath + ".reference: expected a URL, filename, citation, or other locator");
        }
        if (typeof source.reference === "string" && /^https?:\/\//i.test(source.reference)) {
          try {
            new URL(source.reference);
          } catch {
            errors.push(sourcePath + ".reference: invalid URL");
          }
        }
        if (source.accessedAt !== undefined && !checkDate(source.accessedAt)) {
          errors.push(sourcePath + ".accessedAt: expected a real date in YYYY-MM-DD format");
        }
      });
    }

    if (player.ratings !== undefined) {
      if (!Array.isArray(player.ratings)) {
        errors.push(at + ".ratings: expected an array; use an empty array when no ratings are available");
      } else {
        if (player.ratings.length > 0) summary.ratedPlayers += 1;
        else summary.unratedPlayers += 1;
        const ratingKeys = new Set();

        player.ratings.forEach((rating, ratingIndex) => {
          const ratingPath = at + ".ratings[" + ratingIndex + "]";
          if (!isRecord(rating)) {
            errors.push(ratingPath + ": expected an object");
            return;
          }
          checkKeys(rating, ratingAllowed, ratingPath, errors);
          if (!isNonEmptyString(rating.metric)) errors.push(ratingPath + ".metric: expected a named metric or attribute");
          if (!isFiniteNumber(rating.value)) errors.push(ratingPath + ".value: expected a finite number");

          if (!isRecord(rating.scale)) {
            errors.push(ratingPath + ".scale: declare the source rating scale");
          } else {
            checkKeys(rating.scale, scaleAllowed, ratingPath + ".scale", errors);
            if (!isFiniteNumber(rating.scale.min) || !isFiniteNumber(rating.scale.max) || rating.scale.min >= rating.scale.max) {
              errors.push(ratingPath + ".scale: min and max must be finite numbers with min less than max");
            } else if (isFiniteNumber(rating.value) && (rating.value < rating.scale.min || rating.value > rating.scale.max)) {
              errors.push(ratingPath + ".value: outside the declared source scale");
            }
            if (!isNonEmptyString(rating.scale.label)) errors.push(ratingPath + ".scale.label: explain the rating scale");
          }

          if (!isNonEmptyString(rating.sourceId) || !sourceIds.has(rating.sourceId)) {
            errors.push(ratingPath + ".sourceId: must reference a source on this player record");
          }
          if (!RATING_STATUSES.has(rating.status)) errors.push(ratingPath + ".status: expected raw, provisional, reviewed, or derived");
          if (rating.season !== undefined && !isNonEmptyString(rating.season)) {
            errors.push(ratingPath + ".season: expected a season label when provided");
          }
          if (isNonEmptyString(rating.metric) && isNonEmptyString(rating.sourceId)) {
            const key = [rating.metric.trim().toLocaleLowerCase("en-US"), rating.sourceId, rating.season || ""].join("|");
            if (ratingKeys.has(key)) errors.push(ratingPath + ": duplicate metric, source, and season entry");
            ratingKeys.add(key);
          }
        });
      }
    } else {
      summary.unratedPlayers += 1;
    }

    if (Array.isArray(player.positions)) {
      for (const position of player.positions) {
        if (isNonEmptyString(position)) summary.byPosition[position] = (summary.byPosition[position] || 0) + 1;
      }
    }
  });

  for (const [name, ids] of names) {
    if (ids.length > 1) warnings.push("$.players: display name " + JSON.stringify(name) + " appears more than once; confirm player identities");
  }
  return { errors, warnings, summary };
}

function printUsage() {
  console.log("Usage: node tools/player-data/validate-players.mjs <dataset.json>");
  console.log("Checks player dataset structure and internal references; it does not fact-check historical claims.");
}
function runCli(args) {
  if (args.length === 1 && (args[0] === "--help" || args[0] === "-h")) {
    printUsage();
    return 0;
  }
  if (args.length !== 1) {
    printUsage();
    return 2;
  }

  const filename = resolve(args[0]);
  let dataset;
  try {
    dataset = JSON.parse(readFileSync(filename, "utf8"));
  } catch (error) {
    console.error("INPUT ERROR: " + filename + ": " + error.message);
    return 2;
  }

  const result = validatePlayerDataset(dataset);
  const datasetName = isRecord(dataset) && isNonEmptyString(dataset.datasetId) ? dataset.datasetId : filename;
  console.log("Dataset " + datasetName + ": " + result.summary.totalPlayers + " player record(s)");
  console.log("Status counts: " + JSON.stringify(result.summary.byActiveStatus));
  console.log("Rated: " + result.summary.ratedPlayers + "; unrated: " + result.summary.unratedPlayers);
  console.log("Position counts: " + JSON.stringify(result.summary.byPosition));
  for (const warning of result.warnings) console.warn("WARNING " + warning);
  for (const error of result.errors) console.error("ERROR " + error);
  if (result.errors.length > 0) {
    console.error("FAIL player dataset validation (" + result.errors.length + " error(s))");
    return 1;
  }
  console.log("PASS player dataset validation");
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  process.exitCode = runCli(process.argv.slice(2));
}
export { validatePlayerDataset };
