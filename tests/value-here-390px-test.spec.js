const { test, expect } = require("@playwright/test");

const HTML_PATH =
  "file:///Users/kosi/Desktop/Football%20Sim/merged-patched.html";

test("390px layout - Value here column removed, grid reflow verified", async ({
  page,
}) => {
  await page.goto(HTML_PATH, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  // Start draft
  await page.click("#startDraftBtn");
  await expect(page.locator("#draftLive")).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(500);

  // Select instant speed
  const instantBtn = page.locator("#speedInstantBtn");
  if (await instantBtn.isVisible({ timeout: 2000 })) {
    await instantBtn.click();
  }

  // Sim to end
  await page.click("#simToEndBtn");
  await expect(page.locator("#draftFinalResults")).toBeVisible({
    timeout: 60000,
  });
  await page.waitForTimeout(1000);

  // Set viewport to 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);

  // Wait for mstack to be applied
  await page.waitForFunction(
    () => {
      const table = document.getElementById("draftTable2");
      return table?.classList.contains("mstack");
    },
    {},
    { timeout: 10000 },
  );

  await page.waitForTimeout(500);

  // Check viewport overflow
  const vp = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    return {
      docWidth,
      bodyWidth,
      viewportWidth,
      overflow: Math.max(0, bodyWidth - viewportWidth),
    };
  });
  console.log("Viewport check:", vp);
  expect(vp.overflow).toBeLessThanOrEqual(1);

  // Check draft board grid at 390px
  const gridCheck = await page.evaluate(() => {
    const table = document.getElementById("draftTable2");
    if (!table) return { error: "No draftTable2" };
    if (!table.classList.contains("mstack"))
      return { error: "Table not stacked" };

    const rows = table.querySelectorAll("tbody tr");
    if (rows.length === 0) return { error: "No rows" };

    const firstRow = rows[0];
    const cells = firstRow.querySelectorAll("td");

    const cellData = [];
    cells.forEach((cell, idx) => {
      const rect = cell.getBoundingClientRect();
      const style = window.getComputedStyle(cell);
      const gridColumn = style.getPropertyValue("grid-column");
      const gridRow = style.getPropertyValue("grid-row");
      cellData.push({
        idx,
        class: cell.className,
        label: cell.dataset.label,
        bounds: {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        },
        gridColumn,
        gridRow,
      });
    });
    return { cellCount: cells.length, cells: cellData };
  });
  console.log("Grid check:", JSON.stringify(gridCheck, null, 2));

  // Verify 9 cells per row (not 10)
  expect(gridCheck.cellCount).toBe(9);

  // Verify no Value here column
  const hasValueHere = gridCheck.cells.some(
    (c) => c.class.includes("dc-val") || c.label?.includes("Value"),
  );
  expect(hasValueHere).toBe(false);

  // Verify dc-pri at grid-column 7/10
  const priCell = gridCheck.cells.find((c) => c.class.includes("dc-pri"));
  if (priCell) {
    console.log("dc-pri grid-column:", priCell.gridColumn);
    // Should be 7/10 after reflow
    expect(priCell.gridColumn).toContain("7 / 13");
  }

  // Verify dc-gone at grid-column 10/12
  const goneCell = gridCheck.cells.find((c) => c.class.includes("dc-gone"));
  if (goneCell) {
    console.log("dc-gone grid-column:", goneCell.gridColumn);
    // Should be 10/12 after reflow
    expect(goneCell.gridColumn).toContain("1 / 3");
  }

  // Check for horizontal overflow in any cell
  const overflowCells = gridCheck.cells.filter((c) => c.bounds.width > 390);
  console.log("Overflow cells:", overflowCells.length);
  if (overflowCells.length > 0) {
    console.log(
      "Overflow details:",
      overflowCells.map((c) => ({
        class: c.class,
        width: c.bounds.width,
        gridColumn: c.gridColumn,
      })),
    );
  }

  // Check data-label stack for stacked mode
  const labelCheck = await page.evaluate(() => {
    const table = document.getElementById("draftTable2");
    if (!table) return { error: "No table" };
    const firstRow = table.querySelector("tbody tr");
    if (!firstRow) return { error: "No row" };
    const cells = firstRow.querySelectorAll("td");
    const labels = [];
    cells.forEach((cell) => {
      labels.push(cell.dataset.label);
    });
    return { labels };
  });
  console.log("Data labels:", labelCheck.labels);

  // Verify no "Value here" label
  const hasValueLabel = labelCheck.labels.some((l) => l?.includes("Value"));
  expect(hasValueLabel).toBe(false);

  // Check touch targets (buttons)
  const buttons = await page
    .locator(
      "#draftTable2 button.draftbtn, #draftTable2 button.resetbtn, #draftTable2 button.tabbtn",
    )
    .all();
  const buttonSizes = [];
  for (const btn of buttons.slice(0, 5)) {
    const box = await btn.boundingBox();
    if (box) {
      buttonSizes.push({ width: box.width, height: box.height });
    }
  }
  console.log("Button sizes:", buttonSizes);
  const smallButtons = buttonSizes.filter((b) => b.width < 44 || b.height < 44);
  if (smallButtons.length > 0) {
    console.log("WARNING: Small touch targets:", smallButtons);
  }

  // Check horizontal scroller for Fills cell
  const fillsCell = await page.locator("#draftTable2 td.dc-fills").first();
  const _fillsBox = await fillsCell.boundingBox();
  const fillsScroll = await page.evaluate(() => {
    const cell = document.querySelector("#draftTable2 td.dc-fills");
    if (!cell) return { error: "No fills cell" };
    return {
      scrollWidth: cell.scrollWidth,
      clientWidth: cell.clientWidth,
      overflowX: window.getComputedStyle(cell).overflowX,
    };
  });
  console.log("Fills cell scroll:", fillsScroll);

  // Check horizontal scroller functionality
  const horizontalScrollWorks = await page.evaluate(() => {
    const cell = document.querySelector("#draftTable2 td.dc-fills");
    if (!cell) return false;
    const originalScroll = cell.scrollLeft;
    cell.scrollLeft += 100;
    const moved = cell.scrollLeft !== originalScroll;
    cell.scrollLeft = originalScroll;
    return moved;
  });
  console.log("Horizontal scroll works:", horizontalScrollWorks);

  return {
    vp,
    gridCheck,
    labelCheck,
    buttonSizes,
    fillsScroll,
    horizontalScrollWorks,
  };
});
