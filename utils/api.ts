import { APIRequestContext, Page, expect } from "@playwright/test";
import { data } from "./data";

export const api = {
  async login(request: APIRequestContext, username: string, password: string) {
    const response = await request.post("/authenticate", {
      data: {
        username: username,
        password: password,
      },
    });

    return response;
  },

  async waitForResponse(
    page: Page,
    endpoint: string,
    method: string,
    expectedStatus: number
  ) {
    const response = await page.waitForResponse(
      (resp) =>
        resp.url().includes(endpoint) && resp.request().method() === method
    );
    expect(response.status()).toBe(expectedStatus);
    return response;
  },
};
