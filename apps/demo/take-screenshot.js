import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  // Log console messages
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));
  
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);
  
  // Check icon sidebar classes
  const iconSidebar = await page.locator('.vscode-icon-sidebar').first();
  const iconClasses = await iconSidebar.getAttribute('class');
  console.log('Icon sidebar classes:', iconClasses);
  
  // Check aside classes  
  const aside = await page.locator('.vscode-aside').first();
  const asideClasses = await aside.getAttribute('class');
  console.log('Aside classes:', asideClasses);
  
  await page.screenshot({ 
    path: 'current-layout.png',
    fullPage: true 
  });
  
  console.log('Screenshot saved to current-layout.png');
  await browser.close();
})();
