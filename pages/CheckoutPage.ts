import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { locators as ui } from "../utils/locators";
import { data } from "../utils/data";
import { api } from "../utils/api";

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToCheckout() {
    await this.goto("/checkout");
  }

  async fillBillingAddress() {
    await this.page.locator(ui.input_firstname).fill(data.checkout.billingAddress.firstname);
    await this.page.locator(ui.input_email).fill(data.checkout.billingAddress.email);
    await this.page.locator(ui.input_address).fill(data.checkout.billingAddress.address);
    await this.page.locator(ui.input_city).fill(data.checkout.billingAddress.city);
    await this.page.locator(ui.input_state).fill(data.checkout.billingAddress.state);
    await this.page.locator(ui.input_zip).fill(data.checkout.billingAddress.zip);
  }

  async fillPaymentInformation() {
    await this.page.locator(ui.input_cardname).fill(data.checkout.payment.cardname);
    await this.page.locator(ui.input_cardnumber).fill(data.checkout.payment.cardnumber);
    await this.page.locator(ui.select_expmonth).selectOption(data.checkout.payment.expmonth);
    await this.page.locator(ui.input_expyear).fill(data.checkout.payment.expyear);
    await this.page.locator(ui.input_cvv).fill(data.checkout.payment.cvv);
  }

  async ensureShippingCheckboxIsChecked() {
    const shippingCheckbox = this.page.locator(ui.checkbox_shipping_same_as_billing);
    const isChecked = await shippingCheckbox.isChecked();
    if (!isChecked) {
      await shippingCheckbox.check();
    }
  }

  async ensureShippingCheckboxIsUnchecked() {
    const shippingCheckbox = this.page.locator(ui.checkbox_shipping_same_as_billing);
    const isChecked = await shippingCheckbox.isChecked();
    if (isChecked) {
      await shippingCheckbox.uncheck();
    }
  }

  async submitFormWithValidation() {
    const responsePromise = api.waitForResponse(
      this.page,
      "form-validation",
      "POST",
      200
    );

    await this.page.locator(ui.button_continue_checkout).click();
    await responsePromise;
  }

  async submitFormExpectingAlert() {
    let alertMessage = "";
    this.page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await this.page.locator(ui.button_continue_checkout).click();
    await this.page.waitForTimeout(500);
    
    return alertMessage;
  }

  async verifyOrderConfirmation() {
    const orderConfirmation = this.page.locator(ui.order_confirmation);
    await expect(orderConfirmation).toBeVisible();

    const confirmationTitle = this.page.locator(ui.order_confirmation_title);
    await expect(confirmationTitle).toContainText(data.checkout_messages.orderConfirmedTitle);

    const orderNumber = this.page.locator(ui.order_number);
    await expect(orderNumber).toBeVisible();
    const orderNumberText = await orderNumber.textContent();
    expect(orderNumberText).toContain("Order Number:");
    expect(orderNumberText).toMatch(/Order Number: \d+/);
  }

  async verifyAlertMessage(alertMessage: string) {
    if (alertMessage) {
      expect(alertMessage).toContain(data.checkout_messages.checkboxAlertMessage);
    }
  }

  async verifyStillOnCheckoutPage() {
    await expect(this.page.locator(ui.input_firstname)).toBeVisible();
  }

  async verifyShippingCheckboxState(shouldBeChecked: boolean) {
    const shippingCheckbox = this.page.locator(ui.checkbox_shipping_same_as_billing);
    if (shouldBeChecked) {
      await expect(shippingCheckbox).toBeChecked();
    } else {
      await expect(shippingCheckbox).not.toBeChecked();
    }
  }

  async verifyCartTotal() {
    await expect(this.page.locator(ui.cart_container)).toBeVisible();

    const productPriceElements = this.page.locator(ui.cart_product_prices);
    const productPrices = await productPriceElements.allTextContents();

    let expectedTotal = 0;
    for (const priceText of productPrices) {
      const price = parseFloat(priceText.replace(/[$,]/g, ""));
      expectedTotal += price;
    }

    const totalElement = this.page.locator(ui.cart_total);
    await expect(totalElement).toBeVisible();
    const displayedTotalText = await totalElement.textContent();
    const displayedTotal = parseFloat(displayedTotalText!.replace(/[$,]/g, ""));

    expect(displayedTotal).toBe(expectedTotal);
    expect(displayedTotal).toBeGreaterThan(0);
  }
}
