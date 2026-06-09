import { describe, it, expect } from "vitest";
import { isValidEmail } from "./validation";

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("dakota@example.com")).toBe(true);
  });
  it("rejects an address with no @", () => {
    expect(isValidEmail("dakotaexample.com")).toBe(false);
  });
  it("rejects an address with no domain dot", () => {
    expect(isValidEmail("dakota@example")).toBe(false);
  });
  it("rejects empty / whitespace", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
  });
  it("trims surrounding whitespace before validating", () => {
    expect(isValidEmail("  dakota@example.com  ")).toBe(true);
  });
});
