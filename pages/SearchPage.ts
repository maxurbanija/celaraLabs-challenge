import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { locators as ui } from "../utils/locators";
import { data } from "../utils/data";
import { api } from "../utils/api";

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToSearch() {
    await this.goto("/search");
  }

  async fillSearchInput(searchTerm: string) {
    await this.page.locator(ui.search_input).fill(searchTerm);
  }

  async clickSearchButton() {
    await this.page.locator(ui.search_button).click();
  }

  async searchWithValidTerm() {
    const responsePromise = api.waitForResponse(
      this.page,
      "search-engine",
      "POST",
      200
    );

    await this.fillSearchInput(data.search.validSearchWord);
    await this.clickSearchButton();
    await responsePromise;
  }

  async searchWithEmptyTerm() {
    const responsePromise = api.waitForResponse(
      this.page,
      "search-engine",
      "POST",
      404
    );

    await this.clickSearchButton();
    await responsePromise;
  }

  async verifySearchResult(expectedMessage: string) {
    const searchResult = this.page.locator(ui.search_result);
    await expect(searchResult).toBeVisible();
    await expect(searchResult).toHaveText(expectedMessage);
  }

  async verifyValidSearchResult() {
    await this.verifySearchResult(data.search.expectedResultMessage);
  }

  async verifyEmptySearchResult() {
    await this.verifySearchResult(data.search.emptySearchMessage);
  }
}
