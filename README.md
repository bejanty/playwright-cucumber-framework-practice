# Playwright + Cucumber BDD Test Framework

[![UI Tests](https://github.com/bejanty/playwright-cucumber-framework-practice/actions/workflows/tests.yml/badge.svg)](https://github.com/bejanty/playwright-cucumber-framework-practice/actions/workflows/tests.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.62-2EAD33?logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber.js-BDD-23D96C?logo=cucumber&logoColor=white)

A BDD UI automation framework written in **TypeScript**, using **Playwright** to drive the browser and **Cucumber.js** for Gherkin scenarios.


The system under test is [WebdriverUniversity](https://www.webdriveruniversity.com/), a public practice site.

---

## What's covered

| Feature | Scenarios | Tags | What it checks |
|---|---|---|---|
| Login Portal | Valid and invalid credentials (Scenario Outline) | `@regression @login` | The correct alert text is shown for success and failure |
| Contact Us | Valid form submission, opened in a new browser tab | `@regression @contact-us @smoke` | The form submits and the confirmation header is shown |

### How I chose these journeys

I prioritised by **business risk**:

- **Login** is the gateway to every authenticated journey. If it breaks, everything behind it is blocked.
- **Contact Us** is the customer's communication channel. It also exercises multi-tab handling, a common source of flaky tests.

Login is covered for both valid and invalid credentials. Negative Contact Us scenarios are next on the roadmap, because negative paths are where most production defects hide.

---

## Framework features

- **Page Object pattern.** A `BasePage` holds reusable, robust actions (navigation, role-based clicks, tab switching), and a `PageManager` creates page objects.
- **Custom Cucumber World.** Shares state between steps (for example, generated test data) without globals.
- **Tag-based test profiles.** Run `smoke`, `regression` or a single feature from one command.
- **Flexible test data.** Step definitions support fixed values, Gherkin parameters and [Faker](https://fakerjs.dev/)-generated random data.
- **Environment-driven config.** Browser, headless mode, viewport, timeouts, retries and parallelism are set in `env/.env`, and any of them can be overridden from CI or the command line.
- **Evidence on failure.** A screenshot is captured and embedded in the HTML report.
- **Structured logging.** Uses [winston](https://github.com/winstonjs/winston), with colour-coded levels.
- **Retries.** A failed scenario is retried once, to separate real defects from environmental noise. Retried attempts show up in the report.
- **Cross-browser.** Chromium runs by default. Firefox and WebKit can be selected when running the workflow manually.

---

## Project structure

```
├── .github/workflows/tests.yml     # CI pipeline: test → upload report → publish to Pages
├── env/.env                        # Default configuration (no secrets)
├── src/
│   ├── features/                   # Gherkin feature files
│   ├── step-definitions/           # Step implementations
│   │   └── world/CucumberWorld.ts  # Shared scenario state
│   ├── page-objects/base/          # BasePage + PageManager
│   ├── hooks/                      # Browser setup/teardown, screenshot on failure
│   ├── logger/                     # winston logger
│   ├── utils/                      # Cucumber + Playwright timeout settings
│   └── index.ts                    # Profile runner (smoke / regression / …)
├── package.json
└── tsconfig.json
```

---

## Running the tests locally

**Prerequisites:** Node.js 20.19+ (22 recommended).

```bash
npm ci
npx playwright install chromium

npm run cucumber smoke          # fast confidence check
npm run cucumber regression     # full suite
npm run cucumber login          # one feature
npm run cucumber contactUs
```

To override config for a single run:

```bash
HEADLESS=true UI_AUTOMATION_BROWSER=firefox npm run test:regression
```

After a run, open `reports/report.html` in a browser.

---

## Roadmap

- [ ] Negative Contact Us scenarios (missing fields, invalid email) and random-data scenarios using Faker
- [ ] Dedicated page objects per page (`LoginPage`, `ContactUsPage`) instead of raw locators in steps
- [ ] API-level test data setup, with UI verification
- [ ] Accessibility checks with `@axe-core/playwright`
- [ ] Run the full browser matrix on every push


