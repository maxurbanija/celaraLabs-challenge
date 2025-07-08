import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages";
import { data } from "../utils/data";

test.describe("Login Tests", () => {

  test("Login Success", async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidUser();
    await loginPage.verifyWelcomeMessage(data.validUser.username);
  });

  test("Login Failure - Wrong Credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLogin();
    const response = await loginPage.loginWithInvalidUser();
    
    const responseText = await response.text();
    expect(responseText).toContain("Wrong credentials");
    
    await loginPage.verifyErrorMessage(data.login.wrongCredentialsError);
  });

  test("Login Failure - Empty Fields", async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLogin();
    const response = await loginPage.loginWithEmptyFields();
    
    const responseText = await response.text();
    expect(responseText).toContain("Fields can not be empty");
    
    await loginPage.verifyErrorMessage(data.login.emptyFieldsError);
  });
});
