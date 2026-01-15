import { test, expect, Page } from '@playwright/test';

const classToJoinName = process.env.CLASS_TO_JOIN_NAME || '';
const classToJoinDate = process.env.CLASS_TO_JOIN_DATE || '';
const classToJoinTime = process.env.CLASS_TO_JOIN_TIME || '';

const EMAIL = process.env.EMAIL || '';
const PASSWORD = process.env.PASSWORD || '';

test('Join class', async ({ page }) => {
  await page.goto('https://wellfitness.perfectgym.pl/ClientPortal2/#/Login');
  await login(page, EMAIL, PASSWORD);
  await page.getByRole('link', { name: 'book Book' }).click();
  await joinClass(page);
  await expect(page.getByText('Cancel booking').first()).toBeVisible();
});

async function login(page: Page, email: string, password: string) {
  await page.getByRole('button', { name: 'Accept additional' }).click();
  await page.getByRole('textbox', { name: 'Login *' }).click();
  await page.getByRole('textbox', { name: 'Login *' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.locator('#confirm').click();
}

async function joinClass(page: Page) {
  let nextButtonIndex = 4;

  if (!classToJoinName || !classToJoinDate || !classToJoinTime) {
    throw new Error('Class to join not found');
  }

  await page.getByRole('button', { name: /.*List/ }).click();

  await page.waitForTimeout(1000);

  await retryAction(async () => {
    await page.getByText(classToJoinDate, { exact: true }).click({ timeout: 1000 });
  }, async () => {
    await page.getByRole('button').nth(4).click();
  });

  await page.locator('[ng-bind="model.StartTime | date: \'time\'"]').filter({ hasText: new RegExp(`^${classToJoinTime}$`) }).click();
  await page.locator('baf\\:button').filter({ hasText: 'Book now Waiting list Cancel' }).click();
}

async function retryAction(action: () => Promise<void>, actionOnError: () => Promise<void>, maxRetries: number = 3): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await action();
      break;
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      await actionOnError();
    }
  }
}
