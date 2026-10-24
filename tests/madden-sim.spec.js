const { test, expect } = require("@playwright/test");

const HTML_PATH =
  "file:///Users/kosi/Desktop/Football%20Sim/Madden%20NFL%2027%20Team%20Power%20Rankings%20%26%20Draft%20Simulator%20(9)%20(OC).html";

test.describe("Madden NFL 27 Simulator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HTML_PATH);
    // Wait for the script to initialize
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500); // allow JS to render initial views
  });

  test("loads and has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(
      /Madden NFL 27 Team Power Rankings & Draft Simulator/,
    );
  });

  test("shows Draft Simulator tab by default", async ({ page }) => {
    const draftTab = page.locator("#tabDraftBtn");
    await expect(draftTab).toHaveClass(/active/);
    const draftView = page.locator("#viewDraft");
    await expect(draftView).toHaveClass(/active/);
  });

  test("Team Rankings tab switches and renders table", async ({ page }) => {
    await page.click("#tabRankingsBtn");
    await expect(page.locator("#viewRankings")).toHaveClass(/active/);
    expect(await page.locator("#resultsBody tr").count()).toBeGreaterThan(0);
  });

  test("Player Browser tab works", async ({ page }) => {
    await page.click("#tabPlayersBtn");
    await expect(page.locator("#viewPlayers")).toHaveClass(/active/);
    expect(await page.locator("#playerBody tr").count()).toBeGreaterThan(0);
  });

  test("Position Rankings tab works", async ({ page }) => {
    await page.click("#tabGroupsBtn");
    await expect(page.locator("#viewGroups")).toHaveClass(/active/);
    expect(await page.locator("#groupBody tr").count()).toBeGreaterThan(0);
  });

  test("Team Comparison tab works", async ({ page }) => {
    await page.click("#tabCompareBtn");
    await expect(page.locator("#viewCompare")).toHaveClass(/active/);
    await expect(page.locator("#homeCmpA")).toBeVisible();
    await expect(page.locator("#homeCmpB")).toBeVisible();
  });

  test("Guide tab works", async ({ page }) => {
    await page.click("#tabGuideBtn");
    await expect(page.locator("#viewGuide")).toHaveClass(/active/);
    expect(await page.locator("#guideBody details").count()).toBeGreaterThan(0);
  });

  test("Draft setup shows team selector and start button", async ({ page }) => {
    await expect(page.locator("#draftSlotSelect")).toBeVisible();
    await expect(page.locator("#draftPickNumberSelect")).toBeVisible();
    await expect(page.locator("#startDraftBtn")).toBeVisible();
  });

  test("can start a draft and see draft board", async ({ page }) => {
    await page.click("#startDraftBtn");
    await expect(page.locator("#draftLive")).toBeVisible();
    await expect(page.locator("#draftStatusText")).toBeVisible();
    await expect(page.locator("#draftTable2")).toBeVisible();
    expect(await page.locator("#draftBody2 tr").count()).toBeGreaterThan(0);
  });

  test("mobile viewport: no horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(HTML_PATH);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 390;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // allow 1px rounding
  });

  test("weight controls update team rankings instantly", async ({ page }) => {
    await page.click("#tabRankingsBtn");
    const qbInput = page.locator("#w_QB");
    await qbInput.fill("400");
    await qbInput.dispatchEvent("input");
    await page.waitForTimeout(100);
    // Table should re-render with new scores
    expect(await page.locator("#resultsBody tr").count()).toBeGreaterThan(0);
  });

  test("dark/light theme CSS variables exist", async ({ page }) => {
    const hasDarkVars = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return (
        styles.getPropertyValue("--bg").trim() !== "" &&
        styles.getPropertyValue("--text").trim() !== ""
      );
    });
    expect(hasDarkVars).toBe(true);
  });
});

test.describe("Season simulation flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HTML_PATH);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);
  });

  test("can start draft, sim to end, begin season", async ({ page }) => {
    // Start draft
    await page.click("#startDraftBtn");
    await expect(page.locator("#draftLive")).toBeVisible();

    // Sim to end
    await page.click("#simToEndBtn");
    await expect(page.locator("#draftFinalResults")).toBeVisible({
      timeout: 30000,
    });

    // Should show final results with "Begin Season" or similar
    const finalResults = page.locator("#draftFinalResults");
    await expect(finalResults).toContainText(/season|play|review/i);
  });
});
test.describe("Phone table labels (regression)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HTML_PATH);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);
  });

  test("stacked draft board labels every data column", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click("#startDraftBtn");
    await page.waitForTimeout(2500);

    // The observer debounces at 150ms, so give it room to settle after the render.
    await page.waitForTimeout(800);

    const result = await page.evaluate(() => {
      const t = document.getElementById("draftTable2");
      if (!t) return { ok: false, reason: "no draftTable2" };
      if (!t.classList.contains("mstack"))
        return { ok: false, reason: "table not stacked on a phone" };
      const heads = [...t.tHead.rows[t.tHead.rows.length - 1].cells].map((c) =>
        c.textContent.trim(),
      );
      const row = t.querySelector("tbody tr");
      if (!row) return { ok: false, reason: "no body rows" };
      // Columns with a real header must carry that header as their label.
      const missing = [...row.cells]
        .map((c, i) => ({ head: heads[i], label: c.dataset.label }))
        .filter((x) => x.head && x.label !== x.head);
      return { ok: missing.length === 0, missing, heads };
    });

    expect(result.ok, JSON.stringify(result)).toBe(true);
  });

  test("labels survive a re-render from sorting", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click("#startDraftBtn");
    await page.waitForTimeout(2500);
    await page.selectOption("#draftSort2", "name");
    await page.waitForTimeout(900);

    const unlabeled = await page.evaluate(() => {
      const t = document.getElementById("draftTable2");
      const heads = [...t.tHead.rows[t.tHead.rows.length - 1].cells].map((c) =>
        c.textContent.trim(),
      );
      const row = t.querySelector("tbody tr");
      return [...row.cells].filter(
        (c, i) => heads[i] && c.dataset.label !== heads[i],
      ).length;
    });

    expect(unlabeled).toBe(0);
  });
});
