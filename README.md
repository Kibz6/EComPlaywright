# E-Commerce Test Automation Framework

An end-to-end test automation framework built using **Playwright** and **TypeScript** for testing an e-commerce web application.

The project demonstrates modern UI and API automation practices using the **Page Object Model (POM)**, reusable fixtures, parallel execution, and continuous integration with **GitHub Actions**.

---

## Features

- End-to-End UI Automation
- REST API Testing
- Playwright + TypeScript
- Page Object Model (POM)
- Reusable Fixtures
- Cross-browser Testing
- Parallel Test Execution
- Data-driven Tests
- Automatic Waits & Assertions
- HTML Test Reports
- GitHub Actions CI/CD
- Git Version Control

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Playwright | UI & API Automation |
| TypeScript | Programming Language |
| Node.js | Runtime |
| Git | Version Control |
| GitHub | Repository Hosting |
| GitHub Actions | Continuous Integration |

---

## Project Structure

```
EComPlaywright/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
├── tests/
├── fixtures/
├── utils/
├── test-data/
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Test Coverage

The framework automates major e-commerce user workflows including:

### Authentication

- Login with valid credentials
- Login validation
- Logout

### Product Catalogue

- Product search
- Product validation
- Add single product to cart
- Add multiple products to cart
- Remove products
- Cart counter validation

### Shopping Cart

- Cart validation
- Product quantity validation
- Continue shopping
- Empty cart validation

### Checkout

- Complete checkout flow
- Billing information validation
- Shipping information validation
- Order confirmation

### Orders

- Order history validation
- Order details validation
- Order ID verification

### API Tests

- Authentication
- Product retrieval
- Add product to cart
- Create order
- API/UI integration

---

## Design Pattern

This project follows the **Page Object Model (POM)** design pattern.

The framework separates:

- Test logic
- Page interactions
- Test data
- API utilities
- Fixtures

This improves readability, maintainability, and scalability.

---

## Running the Project

### Clone the repository

```bash
git clone https://github.com/Kibz6/EComPlaywright.git
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

---

## Running Tests

Run all tests

```bash
npx playwright test
```

Run a specific test

```bash
npx playwright test tests/LoginTests.spec.ts
```

Run tests in headed mode

```bash
npx playwright test --headed
```

Run Chromium only

```bash
npx playwright test --project=chromium
```

---

## Test Reports

After execution, generate the Playwright HTML report:

```bash
npx playwright show-report
```

The report contains:

- Test summary
- Passed/Failed tests
- Error details
- Execution time
- Screenshots (if captured)
- Trace files (when enabled)

---

## Continuous Integration

This project is integrated with **GitHub Actions**.

Every push to the repository automatically:

- Installs dependencies
- Installs Playwright browsers
- Executes the test suite
- Generates Playwright reports

This ensures the framework is continuously validated after every code change.

---

## Why This Project?

This project was built to demonstrate modern QA Automation practices including:

- Scalable framework architecture
- Clean code principles
- UI and API automation
- CI/CD integration
- Maintainable Page Object Model
- Professional test organization

---

## Future Improvements

- BrowserStack Integration
- Docker Support
- Allure Reporting
- Visual Regression Testing
- Performance Testing (k6)
- Test Data Generation
- Database Validation

---

## Author

**Bojan Djeviki**

GitHub: https://github.com/Kibz6

---

## License

This project is intended for educational and portfolio purposes.
