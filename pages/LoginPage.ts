import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { locators as ui } from "../utils/locators";
import { data } from "../utils/data";
import { api } from "../utils/api";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.goto("/login");
  }

  async fillUsername(username: string) {
    await this.page.locator(ui.input_username).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator(ui.input_password).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(ui.button_login).click();
  }

  async loginWithCredentials(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async loginWithValidUser() {
    const responsePromise = api.waitForResponse(
      this.page,
      "authenticate",
      "POST",
      200
    );
    
    await this.loginWithCredentials(data.validUser.username, data.validUser.password);
    await responsePromise;
  }

  async loginWithInvalidUser() {
    const responsePromise = api.waitForResponse(
      this.page,
      "authenticate",
      "POST",
      403
    );
    
    await this.loginWithCredentials(data.invalidUser.username, data.invalidUser.password);
    return await responsePromise;
  }

  async loginWithEmptyFields() {
    const responsePromise = api.waitForResponse(
      this.page,
      "authenticate",
      "POST",
      403
    );
    
    await this.clickLoginButton();
    return await responsePromise;
  }

  async verifyWelcomeMessage(username: string) {
    const welcomeElement = this.page.locator(ui.message_welcome);
    await expect(welcomeElement).toBeVisible();
    await expect(welcomeElement).toContainText(username);
  }

  async verifyErrorMessage(expectedMessage: string) {
    const errorElement = this.page.locator(ui.message_error);
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText(expectedMessage);
  }
}
