import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
test('initial document and interactive states pass automated accessibility checks', async ({
  page,
}) => {
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Try the form' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Open example dialog' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('form focuses first invalid field then reports success without submitting data', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'Try the form' }).click();
  await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
  await expect(page.getByLabel('Name', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Name', { exact: true }).fill('Synthetic Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.test');
  await page.getByRole('button', { name: 'Try the form' }).click();
  await expect(page.locator('#form-status')).toContainText('No information was sent');
});
test('dialog prevents background focus and returns it on Escape', async ({ page }) => {
  const open = page.getByRole('button', { name: 'Open example dialog' });
  await open.click();
  await expect(page.getByRole('button', { name: 'Close dialog' })).toBeFocused();
  await page.locator('#email').evaluate((el) => el.focus());
  await expect(page.getByRole('button', { name: 'Close dialog' })).toBeFocused();
  await page.keyboard.press('Tab');
  expect(
    await page.evaluate(
      () =>
        document.activeElement === document.body ||
        document.querySelector('#dialog').contains(document.activeElement),
    ),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(open).toBeFocused();
});
test('menu arrow keys, selection and Escape restore focus', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Document actions' });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Copy example' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('menuitem', { name: 'Share example' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#menu-status')).toContainText('Share example selected');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});
test('tabs follow arrows, Home and End with one tab stop', async ({ page }) => {
  await page.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Keyboard' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('tabpanel', { name: 'Keyboard' })).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Source' })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Overview' })).toBeFocused();
  await expect(page.locator('[role=tab][tabindex="0"]')).toHaveCount(1);
});
test('notification persists and dismissal returns focus; mobile has no overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Show notification' }).click();
  await expect(page.locator('#toast')).toContainText('No information was saved');
  await page.getByRole('button', { name: 'Dismiss notification' }).click();
  await expect(page.getByRole('button', { name: 'Show notification' })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
