import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages";

test.describe("Search Tests", () => {
  
  test("Search Success", async ({ page }) => {
    const searchPage = new SearchPage(page);
    
    await searchPage.navigateToSearch();
    await searchPage.searchWithValidTerm();
    await searchPage.verifyValidSearchResult();
  });

  test("Search Empty", async ({ page }) => {
    const searchPage = new SearchPage(page);
    
    await searchPage.navigateToSearch();
    await searchPage.searchWithEmptyTerm();
    await searchPage.verifyEmptySearchResult();
  });
});
