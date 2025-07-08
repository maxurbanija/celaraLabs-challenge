import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Configuración global de retries
  retries: process.env.CI ? 2 : 1, // 2 retries en CI, 1 en local

  // Configuración del reporter
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never' // No abrir automáticamente en Docker
    }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }],
    ['line'] // Para mostrar progreso en consola
  ],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3100",
    headless: true,
    screenshot: "only-on-failure",
    locale: "en-US",
  },

  // Cross-Browser Testing
  projects: [
    // Desktop browsers
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      // Retries específicos para este proyecto (opcional)
      // retries: 1,
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      // Webkit suele ser más inestable, más retries
      retries: 3,
    },

    // Mobile devices
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
