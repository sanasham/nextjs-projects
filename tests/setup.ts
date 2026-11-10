import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Auto-cleanup the DOM between tests so each test starts fresh.
afterEach(() => {
  cleanup();
  // Clear persisted Zustand store (localStorage) so cart tests are isolated.
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.clear();
  }
});
