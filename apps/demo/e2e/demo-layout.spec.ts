import { test, expect } from '@playwright/test'

test.describe('Demo App Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display icon sidebar with navigation items', async ({ page }) => {
    // Check icon sidebar is visible
    const iconSidebar = page.locator('.vscode-icon-sidebar')
    await expect(iconSidebar).toBeVisible()

    // Verify navigation items exist
    const navItems = page.locator('.vscode-nav-item')
    await expect(navItems).toHaveCount(5) // Dashboard, Components, Calendar, Documents, Reports
  })

  test('should display navbar with search and dark mode toggle', async ({ page }) => {
    // Check navbar is visible
    const navbar = page.locator('.vscode-navbar')
    await expect(navbar).toBeVisible()

    // Check search input
    const searchInput = page.locator('input[placeholder="Search"]')
    await expect(searchInput).toBeVisible()

    // Check dark mode toggle button
    const darkModeToggle = page.getByRole('button', { name: /☀️|🌙/ })
    await expect(darkModeToggle).toBeVisible()
  })

  test('should display secondary sidebar (component browser) by default', async ({ page }) => {
    // Check secondary sidebar is visible
    const secondarySidebar = page.locator('.vscode-secondary-sidebar')
    await expect(secondarySidebar).toBeVisible()

    // Check file tree search is present
    const fileTreeSearch = page.locator('input[placeholder*="Search components"]')
    await expect(fileTreeSearch).toBeVisible()

    // Verify at least one folder exists in the tree
    const folders = page.locator('.vscode-tree-folder')
    await expect(folders.first()).toBeVisible()
  })

  test('should display main content with heading', async ({ page }) => {
    // Check main content heading
    const heading = page.getByRole('heading', { name: 'Vue UI Component Library' })
    await expect(heading).toBeVisible()

    // Check description text
    await expect(page.locator('text=VS Code-inspired demo showcasing 42+ production-ready components')).toBeVisible()
  })

  test('should display right aside (settings panel) by default', async ({ page }) => {
    // Check aside is visible
    const aside = page.locator('.vscode-aside')
    await expect(aside).toBeVisible()

    // Check settings heading
    const settingsHeading = page.getByRole('heading', { name: 'Settings' })
    await expect(settingsHeading).toBeVisible()

    // Check theme section exists - use heading role to avoid strict mode violation
    await expect(page.getByRole('heading', { name: 'Theme' })).toBeVisible()
    await expect(page.locator('text=Dark Mode').first()).toBeVisible()
  })

  test('should display footer status bar', async ({ page }) => {
    // Check status bar is visible - use first() to handle potential duplicates
    const statusBar = page.locator('.vscode-statusbar').first()
    await expect(statusBar).toBeVisible()

    // Check some status bar items
    await expect(page.locator('text=main').first()).toBeVisible()
    await expect(page.locator('text=TypeScript').first()).toBeVisible()
  })

  test('should toggle secondary sidebar visibility', async ({ page }) => {
    // Initially visible
    const secondarySidebar = page.locator('.vscode-secondary-sidebar')
    await expect(secondarySidebar).toBeVisible()

    // Find and click the hide browser button in settings panel
    const hideBrowserButton = page.getByRole('button', { name: 'Hide Browser' })
    await hideBrowserButton.click()

    // Should be hidden
    await expect(secondarySidebar).toBeHidden()

    // Click show button
    const showBrowserButton = page.getByRole('button', { name: 'Show Browser' })
    await showBrowserButton.click()

    // Should be visible again
    await expect(secondarySidebar).toBeVisible()
  })

  test('should toggle aside visibility', async ({ page }) => {
    // Initially visible
    const aside = page.locator('.vscode-aside')
    await expect(aside).toBeVisible()

    // Find hide properties button - need to use a more specific selector since it's inside the aside
    const hidePropertiesButton = page.getByRole('button', { name: 'Hide Properties' })
    await hidePropertiesButton.click()

    // Should be hidden
    await expect(aside).toBeHidden()
  })

  test('should toggle dark mode', async ({ page }) => {
    // Check initial state (light mode)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Click dark mode toggle
    const darkModeToggle = page.getByRole('button', { name: /☀️|🌙/ }).first()
    await darkModeToggle.click()

    // Should have dark class
    await expect(html).toHaveClass(/dark/)

    // Toggle back
    await darkModeToggle.click()
    await expect(html).not.toHaveClass(/dark/)
  })
})

test.describe('Component Playgrounds', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Button Playground should display correct button text', async ({ page }) => {
    // Scroll to button playground
    await page.locator('text=Button Playground').scrollIntoViewIfNeeded()

    // Check button text input exists and has initial value
    const buttonTextInput = page.locator('#button-text')
    await expect(buttonTextInput).toBeVisible()
    await expect(buttonTextInput).toHaveValue('Click me')

    // Check preview button displays the text
    const previewButton = page.locator('text=Button Playground').locator('..').locator('button:has-text("Click me")')
    await expect(previewButton).toBeVisible()

    // Change button text
    await buttonTextInput.clear()
    await buttonTextInput.fill('Test Button')

    // Verify preview updates
    const updatedButton = page.locator('text=Button Playground').locator('..').locator('button:has-text("Test Button")')
    await expect(updatedButton).toBeVisible()
  })

  test('Input Playground should display correct placeholder', async ({ page }) => {
    // Scroll to input playground
    await page.locator('text=Input Playground').scrollIntoViewIfNeeded()

    // Check placeholder input exists
    const placeholderInput = page.locator('#input-placeholder')
    await expect(placeholderInput).toBeVisible()
    await expect(placeholderInput).toHaveValue('Enter text...')
  })

  test('Badge Playground should display correct badge text', async ({ page }) => {
    // Scroll to badge playground
    await page.locator('text=Badge Playground').scrollIntoViewIfNeeded()

    // Check badge text input exists
    const badgeTextInput = page.locator('#badge-text')
    await expect(badgeTextInput).toBeVisible()
    await expect(badgeTextInput).toHaveValue('Badge')

    // Change badge text
    await badgeTextInput.clear()
    await badgeTextInput.fill('Test Badge')

    // Verify preview displays the text
    await expect(page.locator('text=Badge Playground').locator('..').locator('text=Test Badge')).toBeVisible()
  })

  test('Button Playground color selector should work', async ({ page }) => {
    await page.locator('text=Button Playground').scrollIntoViewIfNeeded()

    // Find color select within the playground controls
    const playground = page.locator('text=Button Playground').locator('..').first()
    const colorSelect = playground.locator('select').first()
    await expect(colorSelect).toBeVisible()

    // Verify default value
    await expect(colorSelect).toHaveValue('dark/zinc')

    // Change color
    await colorSelect.selectOption('indigo')
    await expect(colorSelect).toHaveValue('indigo')
  })

  test('Button Playground reset should restore defaults', async ({ page }) => {
    await page.locator('text=Button Playground').scrollIntoViewIfNeeded()

    // Change button text
    const buttonTextInput = page.locator('#button-text')
    await buttonTextInput.clear()
    await buttonTextInput.fill('Changed Text')

    // Click reset button
    const resetButton = page.locator('text=Button Playground').locator('..').getByRole('button', { name: 'Reset' })
    await resetButton.click()

    // Verify text is restored
    await expect(buttonTextInput).toHaveValue('Click me')
  })
})
