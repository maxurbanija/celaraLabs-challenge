import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages";

test.describe("Checkout Tests", () => {

  test("Checkout Form Order Success", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillBillingAddress();
    await checkoutPage.fillPaymentInformation();
    await checkoutPage.ensureShippingCheckboxIsChecked();
    await checkoutPage.submitFormWithValidation();
    await checkoutPage.verifyOrderConfirmation();
  });

  test("Checkout Form Alert", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillBillingAddress();
    await checkoutPage.fillPaymentInformation();
    await checkoutPage.ensureShippingCheckboxIsUnchecked();
    await checkoutPage.verifyShippingCheckboxState(false);
    
    const alertMessage = await checkoutPage.submitFormExpectingAlert();
    
    await checkoutPage.verifyAlertMessage(alertMessage);
    await checkoutPage.verifyStillOnCheckoutPage();
    await checkoutPage.verifyShippingCheckboxState(false);
  });

  test("Cart Total Test", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.navigateToCheckout();
    await checkoutPage.verifyCartTotal();
  });
});
