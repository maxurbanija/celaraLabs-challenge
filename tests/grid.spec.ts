import { test, expect } from "@playwright/test";
import { GridPage } from "../pages";
import { data } from "../utils/data";
import { api } from "../utils/api";

test.describe("Grid Tests", () => {
  test.beforeEach(async ({ page }) => {
    await api.login(page.request, data.validUser.username, data.validUser.password);
  });

  test("Grid Item Test", async ({ page }) => {
    const gridPage = new GridPage(page);
    
    await gridPage.navigateToGrid();
    await gridPage.waitForGridToLoad();
    await gridPage.verifyPosition7Item();
  });

  test("Grid All Items Test", async ({ page }) => {
    const gridPage = new GridPage(page);
    
    await gridPage.navigateToGrid();
    await gridPage.waitForGridToLoad();
    await gridPage.verifyAllItemsHaveRequiredElements();
  });
});
