/**
 * Playwright Test Stub
 * Source: module_448763 (Lines 155-177)
 *
 * Provides stub implementations of @playwright/test to prevent import errors
 * when user code imports Playwright. These stubs do nothing but allow code to compile.
 */

// ============================================================================
// Test Function Stub
// ============================================================================

/**
 * Stub test function
 * Logs a warning and does nothing
 */
function testStub(name: string, fn: () => void | Promise<void>): void {
  console.warn(
    `Playwright test "${name}" was called but Playwright is not available in the browser.`
  );
}

// Add test.describe, test.beforeEach, etc.
testStub.describe = (name: string, fn: () => void) => {
  console.warn(
    `Playwright test.describe "${name}" was called but Playwright is not available in the browser.`
  );
};

testStub.beforeEach = (fn: () => void | Promise<void>) => {
  console.warn(
    "Playwright test.beforeEach was called but Playwright is not available in the browser."
  );
};

testStub.afterEach = (fn: () => void | Promise<void>) => {
  console.warn(
    "Playwright test.afterEach was called but Playwright is not available in the browser."
  );
};

testStub.beforeAll = (fn: () => void | Promise<void>) => {
  console.warn(
    "Playwright test.beforeAll was called but Playwright is not available in the browser."
  );
};

testStub.afterAll = (fn: () => void | Promise<void>) => {
  console.warn(
    "Playwright test.afterAll was called but Playwright is not available in the browser."
  );
};

testStub.skip = (name: string, fn: () => void | Promise<void>) => {
  console.warn(
    `Playwright test.skip "${name}" was called but Playwright is not available in the browser.`
  );
};

testStub.only = (name: string, fn: () => void | Promise<void>) => {
  console.warn(
    `Playwright test.only "${name}" was called but Playwright is not available in the browser.`
  );
};

testStub.fixme = (name: string, fn: () => void | Promise<void>) => {
  console.warn(
    `Playwright test.fixme "${name}" was called but Playwright is not available in the browser.`
  );
};

testStub.fail = (name: string, fn: () => void | Promise<void>) => {
  console.warn(
    `Playwright test.fail "${name}" was called but Playwright is not available in the browser.`
  );
};

testStub.slow = (name: string, fn: () => void | Promise<void>) => {
  console.warn(
    `Playwright test.slow "${name}" was called but Playwright is not available in the browser.`
  );
};

testStub.step = async (name: string, fn: () => void | Promise<void>) => {
  console.warn(
    `Playwright test.step "${name}" was called but Playwright is not available in the browser.`
  );
};

// ============================================================================
// Expect Function Stub
// ============================================================================

/**
 * Stub expect function
 * Returns a chainable object with all expect methods
 */
function expectStub(actual: any): any {
  const stub: any = {
    // Matchers
    toBe: () => stub,
    toEqual: () => stub,
    toStrictEqual: () => stub,
    toBeCloseTo: () => stub,
    toBeDefined: () => stub,
    toBeFalsy: () => stub,
    toBeGreaterThan: () => stub,
    toBeGreaterThanOrEqual: () => stub,
    toBeLessThan: () => stub,
    toBeLessThanOrEqual: () => stub,
    toBeInstanceOf: () => stub,
    toBeNull: () => stub,
    toBeTruthy: () => stub,
    toBeUndefined: () => stub,
    toBeNaN: () => stub,
    toContain: () => stub,
    toContainEqual: () => stub,
    toHaveLength: () => stub,
    toHaveProperty: () => stub,
    toMatch: () => stub,
    toMatchObject: () => stub,
    toThrow: () => stub,
    toThrowError: () => stub,

    // Modifiers
    not: {} as any,
    resolves: {} as any,
    rejects: {} as any,
  };

  // Add modifiers that return the same stub
  stub.not = { ...stub };
  stub.resolves = { ...stub };
  stub.rejects = { ...stub };

  console.warn(
    "Playwright expect was called but Playwright is not available in the browser."
  );

  return stub;
}

// Add expect.extend, expect.anything, etc.
expectStub.extend = () => {
  console.warn(
    "Playwright expect.extend was called but Playwright is not available in the browser."
  );
};

expectStub.anything = () => ({});
expectStub.any = () => ({});
expectStub.arrayContaining = () => [];
expectStub.objectContaining = () => ({});
expectStub.stringContaining = () => "";
expectStub.stringMatching = () => "";

// ============================================================================
// Browser Context Stub
// ============================================================================

/**
 * Stub browser context
 */
const browserContextStub = {
  newPage: async () => pageStub,
  pages: () => [],
  close: async () => {},
  cookies: async () => [],
  addCookies: async () => {},
  clearCookies: async () => {},
  grantPermissions: async () => {},
  clearPermissions: async () => {},
  setGeolocation: async () => {},
  setExtraHTTPHeaders: async () => {},
  setOffline: async () => {},
  route: async () => {},
  unroute: async () => {},
  waitForEvent: async () => {},
};

// ============================================================================
// Page Stub
// ============================================================================

/**
 * Stub page object
 */
const pageStub = {
  goto: async () => {},
  click: async () => {},
  fill: async () => {},
  type: async () => {},
  press: async () => {},
  waitForSelector: async () => ({}),
  waitForTimeout: async () => {},
  screenshot: async () => Buffer.from(""),
  title: async () => "",
  url: () => "",
  content: async () => "",
  evaluate: async (fn: any) => fn(),
  close: async () => {},
  locator: () => locatorStub,
  getByRole: () => locatorStub,
  getByText: () => locatorStub,
  getByLabel: () => locatorStub,
  getByPlaceholder: () => locatorStub,
  getByAltText: () => locatorStub,
  getByTitle: () => locatorStub,
  getByTestId: () => locatorStub,
};

// ============================================================================
// Locator Stub
// ============================================================================

/**
 * Stub locator object
 */
const locatorStub: any = {
  click: async () => {},
  fill: async () => {},
  type: async () => {},
  press: async () => {},
  clear: async () => {},
  check: async () => {},
  uncheck: async () => {},
  selectOption: async () => {},
  hover: async () => {},
  focus: async () => {},
  blur: async () => {},
  textContent: async () => "",
  innerText: async () => "",
  innerHTML: async () => "",
  getAttribute: async () => "",
  isVisible: async () => false,
  isEnabled: async () => false,
  isDisabled: async () => false,
  isChecked: async () => false,
  count: async () => 0,
  first: () => locatorStub,
  last: () => locatorStub,
  nth: () => locatorStub,
  filter: () => locatorStub,
  locator: () => locatorStub,
  getByRole: () => locatorStub,
  getByText: () => locatorStub,
  getByLabel: () => locatorStub,
  getByPlaceholder: () => locatorStub,
  getByAltText: () => locatorStub,
  getByTitle: () => locatorStub,
  getByTestId: () => locatorStub,
};

// ============================================================================
// Exports
// ============================================================================

/**
 * Playwright stub module exports
 * Provides all common Playwright test APIs as no-ops
 */
export const playwrightStub = {
  test: testStub,
  expect: expectStub,
  Page: pageStub,
  BrowserContext: browserContextStub,
  Locator: locatorStub,
  chromium: {
    launch: async () => ({
      newContext: async () => browserContextStub,
      close: async () => {},
    }),
  },
  firefox: {
    launch: async () => ({
      newContext: async () => browserContextStub,
      close: async () => {},
    }),
  },
  webkit: {
    launch: async () => ({
      newContext: async () => browserContextStub,
      close: async () => {},
    }),
  },
};

export const test = testStub;
export const expect = expectStub;
export default playwrightStub;
