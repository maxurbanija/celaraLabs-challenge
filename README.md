# App Automation Test

## Must have before start
- Git
- Docker

### Steps

1. Pull the docker image containing the web app `docker pull automaticbytes/demo-app`
2. Run the image `docker run -p 3100:3100 automaticbytes/demo-app`
3. Verify the app is shown in below url and set it as the base url for the tests. `http://localhost:3100`
4. Create in your personal github a public repository (name it for instance home-test).
5. Code requested exercises, commit and push your code and send the repository link according to the instructions given by the recruiter who contacted you.
6. Forking this repository is not needed.

### General requisites for submission

1. **Programming languages**
   - Java
   - Javascript
   - **Typescript** ✅ (Used in this project)

2. **Drivers**
   - **Playwright** ✅ (Used in this project)
   - Selenium

3. **Browsers**
   - **Cross-Browser Testing**: Tests should be compatible with multiple browsers and ensure they behave consistently. ✅ (Chrome, Firefox, Safari implemented)

4. **Multi-Platform Testing (Desirable)**: Tests should support execution on multiple platforms, including:
   - **Desktop** (Windows, macOS, Linux) ✅
   - **Mobile devices** (Android, iOS) ✅ (Mobile Chrome and Safari implemented)

5. **Environment Configuration (Desirable)**:
   - **The solution must include a Dockerized environment** to ensure tests can be executed in an isolated and reproducible environment. ✅
   - **Instructions for setting up and running tests in Docker** must be provided. ✅

### General test requisites

- All tests should provide a setup and tear down mechanism that opens and closes the browser. ✅
- All tests should run successfully either from IDE or command line. ✅
- Instructions to build and run the code and tests submitted must be provided. ✅
- **Submitted code implementing a Page Object Model will be taken in high consideration.** ✅ (Implemented)

### Tests Scenarios

1. **Login Success** ✅
   - Navigate to http://localhost:3100/login
   - Successfully login with credentials: johndoe19/supersecret
   - Assert that welcome message containing username is shown.

2. **Login Failure A** ✅
   - Navigate to http://localhost:3100/login
   - Enter wrong username/password
   - Assert error message is shown.

3. **Login Failure B** ✅
   - Navigate to http://localhost:3100/login
   - Leave both username/password in blank
   - Assert error message is shown.

4. **Checkout Form Order Success** ✅
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is not checkmarked then checkmark it.
   - Submit the form and assert that the order confirmation number is not empty.

5. **Checkout Form Alert** ✅
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is checkmarked, then uncheckmark it.
   - Try to submit the form and validate that the alert message is shown and confirm the alert.
   - Assert alert is gone.

6. **Cart Total Test** ✅
   - Navigate to http://localhost:3100/checkout
   - Assert that the cart total shown is correct for the item prices added.

7. **Grid Item Test** ✅
   - Navigate to http://localhost:3100/grid
   - Assert that in position 7 the product shown is "Super Pepperoni"
   - Assert that the price shown is $10

8. **Grid All Items Test** ✅
   - Navigate to http://localhost:3100/grid
   - Assert that all the items have a non empty title, price, image and a button.

9. **Search Success** ✅
   - Navigate to http://localhost:3100/search
   - Search for any word (for instance automation)
   - Assert that "Found one result for" plus the word you searched is shown.

10. **Search Empty** ✅
    - Navigate to http://localhost:3100/search
    - Leave search box empty and submit the search
    - Assert that "Please provide a search word." message is shown.

---

## How to Run This Project

### Option 1: Docker Compose (Recommended)

```bash
# Run the app and tests automatically
docker-compose up --exit-code-from tests

# View the HTML report after tests complete
# Open: playwright-report/index.html in your browser
```

### Option 2: Manual Setup

1. **Start the demo app:**
```bash
docker pull automaticbytes/demo-app
docker run -p 3100:3100 automaticbytes/demo-app
```

2. **In another terminal, run tests:**
```bash
# Clone and setup
git clone https://github.com/maxurbanija/celaraLabs-challenge.git
cd celaraLabs-challenge
npm install
npx playwright install

# Run tests
npm test
```

## Project Structure

```
├── pages/                  # Page Object Model classes
│   ├── BasePage.ts        # Base page with common functionality
│   ├── LoginPage.ts       # Login page interactions
│   ├── CheckoutPage.ts    # Checkout page interactions
│   ├── GridPage.ts        # Grid page interactions
│   ├── SearchPage.ts      # Search page interactions
│   └── index.ts           # Page exports
├── tests/                 # Test specifications
│   ├── login.spec.ts      # Login tests
│   ├── checkout.spec.ts   # Checkout tests
│   ├── grid.spec.ts       # Grid tests
│   └── search.spec.ts     # Search tests
├── utils/                 # Utility functions
│   ├── api.ts            # API helpers
│   ├── data.ts           # Test data
│   └── locators.ts       # Element locators
├── playwright-report/     # HTML test reports
├── docker-compose.yml     # Docker configuration
├── Dockerfile            # Test container
└── playwright.config.ts  # Playwright configuration
```

## Features Implemented

✅ **TypeScript** - Strongly typed test automation
✅ **Playwright** - Modern web testing framework
✅ **Page Object Model** - Maintainable test architecture
✅ **Cross-Browser Testing** - Chrome, Firefox, Safari
✅ **Mobile Testing** - iOS Safari, Android Chrome
✅ **Docker Environment** - Isolated test execution
✅ **Retry Mechanism** - Flaky test handling
✅ **HTML Reports** - Comprehensive test reporting
✅ **API Integration** - Authentication and validation
✅ **All Test Scenarios** - 100% coverage of required tests

## Test Execution Results

- **Total Tests**: 50 (10 scenarios × 5 browsers/devices)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Status**: All tests passing ✅
- **Reports**: Available in `playwright-report/index.html`
