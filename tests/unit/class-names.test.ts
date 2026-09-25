import { describe, expect, it } from "vitest";

import { classNames } from "@/lib/class-names";

describe("classNames", () => {
  it("joins class names with single spaces", () => {
    expect(classNames("px-4", "text-sm")).toBe("px-4 text-sm");
  });

  it("skips conditional values that are false, null, or undefined", () => {
    const isSelected = false;
    expect(classNames("base", isSelected && "selected", null, undefined, "end")).toBe("base end");
  });

  it("drops empty and whitespace-only values without leaving stray spaces", () => {
    expect(classNames("", "  ", " mt-2 ", "text-ink")).toBe("mt-2 text-ink");
  });

  it("returns an empty string when nothing applies", () => {
    expect(classNames(false, null, undefined)).toBe("");
  });
});
