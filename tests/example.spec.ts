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
});

async function login(page: Page, email: string, password: string) {
  await page.getByRole('button', { name: 'Accept additional' }).click();
  await page.getByRole('textbox', { name: 'Login *' }).click();
  await page.getByRole('textbox', { name: 'Login *' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.locator('#confirm').click();
}

async function joinClass(page: Page) {
  if (!classToJoinName || !classToJoinDate || !classToJoinTime) {
    throw new Error('Class to join not found');
  }

  await page.getByRole('button', { name: /.*List/ }).click();

  await page.waitForTimeout(1000);

  let buttonNth = 4;
  const buttonNewNth = 5;

  await retryAction(async () => {
    await page.getByText(classToJoinDate, { exact: true }).click({ timeout: 1000 });
  }, async () => {
    await page.getByRole('button').nth(buttonNth).click();
    buttonNth = buttonNewNth;
  });

  const classItem = page.locator('cp\\:classes-class-item').filter({
    has: page.locator(
      '[ng-bind="model.StartTime | date: \'time\'"]',
      { hasText: classToJoinTime }
    ),
    hasText: classToJoinName
  });
  
  await classItem.locator('.cp-btn-classes-action .calendar-item-state-bookable').click();

  await expect(classItem.locator('.cp-btn-classes-action .calendar-item-state-booked')).toBeVisible();
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
