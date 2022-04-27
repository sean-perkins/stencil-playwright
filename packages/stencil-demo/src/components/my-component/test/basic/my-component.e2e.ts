import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('my-component', () => {

  test('renders', async ({ page }) => {
    await page.goto('/src/components/my-component/test/basic/index.html');

    const element = page.locator('my-component');
    expect(element).toHaveClass('hydrated');
  });

  test('renders changes to the name data', async ({ page }) => {
    await page.goto('/src/components/my-component/test/basic/index.html');

    const component = page.locator('my-component');
    const element = component.locator('div');

    expect(await element.textContent()).toBe(`Hello, World! I'm Stencil 'Don't call me a framework' JS`);

    await component.evaluate((el: HTMLMyComponentElement) => {
      el.first = 'James';
      el.last = null;
    });

    await page.waitForChanges();

    expect(await element.textContent()).toBe(`Hello, World! I'm James`);
  });

});

// import { newE2EPage } from '@stencil/core/testing';

// describe('my-component', () => {
//   it('renders', async () => {
//     const page = await newE2EPage();

//     await page.setContent('<my-component></my-component>');
//     const element = await page.find('my-component');
//     expect(element).toHaveClass('hydrated');
//   });

//   it('renders changes to the name data', async () => {
//     const page = await newE2EPage();

//     await page.setContent('<my-component></my-component>');
//     const component = await page.find('my-component');
//     const element = await page.find('my-component >>> div');
//     expect(element.textContent).toEqual(`Hello, World! I'm `);

//     component.setProperty('first', 'James');
//     await page.waitForChanges();
//     expect(element.textContent).toEqual(`Hello, World! I'm James`);

//     component.setProperty('last', 'Quincy');
//     await page.waitForChanges();
//     expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

//     component.setProperty('middle', 'Earl');
//     await page.waitForChanges();
//     expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
//   });
// });
