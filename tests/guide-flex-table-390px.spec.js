const { test, expect } = require('@playwright/test');

const HTML_PATH = 'file:///Users/kosi/Desktop/Football%20Sim/merged-patched.html';

test('Guide page - Flex table reorder & merged section at 390px', async ({ page }) => {
  await page.goto(HTML_PATH, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  // Navigate to Guide tab
  await page.click('#tabGuideBtn');
  await expect(page.locator('#viewGuide')).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(500);

  // Check 1280px first
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(500);

  // Check flex table order at 1280px
  const flexTable1280 = await page.evaluate(() => {
    const tables = document.querySelectorAll('table');
    let flexTable = null;
    for (const t of tables) {
      const ths = t.querySelectorAll('th');
      for (const th of ths) {
        if (th.textContent.includes('Player') || th.textContent.includes('Free')) {
          flexTable = t;
          break;
        }
      }
      if (flexTable) break;
    }
    if (!flexTable) return { error: 'No flex table found' };
    
    const rows = flexTable.querySelectorAll('tbody tr');
    const data = [];
    rows.forEach(row => {
      const firstCell = row.querySelector('td');
      if (firstCell) {
        data.push(firstCell.textContent.trim());
      }
    });
    return { rowCount: rows.length, firstColumn: data };
  });
  console.log('Flex table at 1280px:', JSON.stringify(flexTable1280, null, 2));

  // Check merged section exists
  const mergedSection = await page.evaluate(() => {
    const summaries = document.querySelectorAll('details summary');
    for (const s of summaries) {
      if (s.textContent.includes('Drafting & Position Values')) {
        return s.textContent;
      }
    }
    return 'NOT FOUND';
  });
  console.log('Merged section:', mergedSection);

  // Check 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);

  // Wait for mstack
  await page.waitForFunction(() => {
    const tables = document.querySelectorAll('table');
    for (const t of tables) {
      if (t.id === 'draftTable2') return false;
      const ths = t.querySelectorAll('th');
      for (const th of ths) {
        if (th.textContent.includes('Player') || th.textContent.includes('Free')) {
          return t.classList.contains('mstack');
        }
      }
    }
    return false;
  }, {}, { timeout: 10000 }).catch(() => {});

  await page.waitForTimeout(500);

  // Check flex table at 390px
  const flexTable390 = await page.evaluate(() => {
    const tables = document.querySelectorAll('table');
    let flexTable = null;
    for (const t of tables) {
      const ths = t.querySelectorAll('th');
      for (const th of ths) {
        if (th.textContent.includes('Player') || th.textContent.includes('Free')) {
          flexTable = t;
          break;
        }
      }
      if (flexTable) break;
    }
    if (!flexTable) return { error: 'No flex table found' };
    
    const rows = flexTable.querySelectorAll('tbody tr');
    const data = [];
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 1) {
        const firstCell = cells[0];
        const rect = firstCell.getBoundingClientRect();
        const style = window.getComputedStyle(firstCell);
        data.push({
          text: firstCell.textContent.trim(),
          bounds: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
          gridColumn: style.getPropertyValue('grid-column')
        });
      }
    });
    return { rowCount: rows.length, rows: data };
  });
  console.log('Flex table at 390px:', JSON.stringify(flexTable390, null, 2));

  // Check merged section at 390px
  const mergedSection390 = await page.evaluate(() => {
    const summaries = document.querySelectorAll('details summary');
    for (const s of summaries) {
      if (s.textContent.includes('Drafting & Position Values')) {
        return s.textContent;
      }
    }
    return 'NOT FOUND';
  });
  console.log('Merged section at 390px:', mergedSection390);

  // Check merged section content
  const mergedContent = await page.evaluate(() => {
    const summaries = document.querySelectorAll('details summary');
    for (const s of summaries) {
      if (s.textContent.includes('Drafting & Position Values')) {
        const details = s.closest('details');
        const inner = details?.querySelector('div');
        const text = inner?.textContent || '';
        return { 
          found: true, 
          length: text.length,
          hasTierList: text.includes('Franchise-changing'),
          hasTable: text.includes('Starting spot'),
          tableCount: document.querySelectorAll('table').length
        };
      }
    }
    return { found: false };
  });
  console.log('Merged section content:', JSON.stringify(mergedContent, null, 2));

  // Check for "offensive tackle" text
  const offensiveTackleCheck = await page.evaluate(() => {
    const tables = document.querySelectorAll('table');
    let flexTable = null;
    for (const t of tables) {
      const ths = t.querySelectorAll('th');
      for (const th of ths) {
        if (th.textContent.includes('Player') || th.textContent.includes('Free')) {
          flexTable = t;
          break;
        }
      }
      if (flexTable) break;
    }
    if (!flexTable) return { error: 'No flex table' };
    const text = flexTable.textContent;
    return {
      hasOffensiveTackle: text.includes('offensive tackle') || text.includes('Offensive Tackle'),
      hasTackle: text.includes('Tackle'),
      textLength: text.length
    };
  });
  console.log('Offensive tackle check:', JSON.stringify(offensiveTackleCheck, null, 2));

  // Check viewport overflow
  const vp1 = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    return { docWidth, bodyWidth, viewportWidth, overflow: Math.max(0, bodyWidth - viewportWidth) };
  });
  console.log('Viewport check:', vp1);

  // Check for horizontal overflow in flex table cells
  const overflowCheck = await page.evaluate(() => {
    const tables = document.querySelectorAll('table');
    let flexTable = null;
    for (const t of tables) {
      const ths = t.querySelectorAll('th');
      for (const th of ths) {
        if (th.textContent.includes('Player') || th.textContent.includes('Free')) {
          flexTable = t;
          break;
        }
      }
      if (flexTable) break;
    }
    if (!flexTable) return { error: 'No flex table' };
    
    const cells = flexTable.querySelectorAll('td, th');
    const overflows = [];
    cells.forEach(cell => {
      const rect = cell.getBoundingClientRect();
      if (rect.width > 390) {
        overflows.push({
          text: cell.textContent.trim().substring(0, 50),
          width: rect.width,
          class: cell.className
        });
      }
    });
    return { overflowCount: overflows.length, overflows };
  });
  console.log('Overflow check:', JSON.stringify(overflowCheck, null, 2));

  // Check viewport overflow
  const vp2 = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    return { docWidth, bodyWidth, viewportWidth, overflow: Math.max(0, bodyWidth - viewportWidth) };
  });
  console.log('Viewport check:', vp2);

  return { success: true };
});