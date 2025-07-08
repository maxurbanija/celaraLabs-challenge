import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { locators as ui } from "../utils/locators";
import { data } from "../utils/data";

export class GridPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToGrid() {
    await this.goto("/grid");
  }

  async waitForGridToLoad() {
    await expect(this.page.locator(ui.grid_container)).toBeVisible();
  }

  async verifyItemAtPosition(position: number, expectedName: string, expectedPrice: string) {
    const itemAtPosition = this.page.locator(ui.grid_item_by_position(position));
    await expect(itemAtPosition).toBeVisible();

    const itemName = itemAtPosition.locator(ui.grid_item_name);
    await expect(itemName).toHaveText(expectedName);

    const itemPrice = itemAtPosition.locator(ui.grid_item_price);
    await expect(itemPrice).toHaveText(expectedPrice);
  }

  async verifyPosition7Item() {
    await this.verifyItemAtPosition(7, data.grid.position7ItemName, data.grid.position7ItemPrice);
  }

  async verifyAllItemsHaveRequiredElements() {
    const allItems = this.page.locator(ui.grid_items);
    const itemCount = await allItems.count();
    expect(itemCount).toBeGreaterThan(0);

    for (let i = 0; i < itemCount; i++) {
      const item = allItems.nth(i);

      await expect(item).toBeVisible();

      const itemName = item.locator(ui.grid_item_name);
      await expect(itemName).toBeVisible();
      await expect(itemName).not.toBeEmpty();

      const itemPrice = item.locator(ui.grid_item_price);
      await expect(itemPrice).toBeVisible();
      await expect(itemPrice).not.toBeEmpty();

      const itemImage = item.locator(ui.grid_item_image);
      await expect(itemImage).toBeVisible();

      const itemButton = item.locator(ui.grid_item_button);
      await expect(itemButton).toBeVisible();
      await expect(itemButton).toBeEnabled();
    }
  }
}
