import {
  invalidNames, invalidChars, invalidAttributes, malformedStructure, scenarios
} from "../src/1.1/index.js";
import { filterCases } from "../src/index.js";

describe("@byspec/xml/1.1", () => {

  describe("scenarios export", () => {
    it("exports nine scenarios", () => {
      expect(scenarios.length).toBe(9);
    });

    it("reuses invalid-names and malformed-structure from 1.0", () => {
      const names     = scenarios.find(s => s.name === "invalid-names");
      const structure = scenarios.find(s => s.name === "malformed-structure");
      expect(names).toBeDefined();
      expect(structure).toBeDefined();
    });

    it("every case across all scenarios has required meta fields", () => {
      for (const scenario of scenarios) {
        for (const c of scenario.cases) {
          expect(typeof c.input).withContext(`input must be string in ${scenario.name}`).toBe("string");
          expect(typeof c.meta.scenario).toBe("string");
          expect(typeof c.meta.spec).toBe("string");
          expect(typeof c.meta.rule).toBe("string");
          expect(typeof c.meta.line).toBe("number");
          expect(typeof c.meta.col).toBe("number");
        }
      }
    });
  });

  describe("invalid-chars (1.1 specific)", () => {
    it("uses XML 1.1 spec reference for all 1.1-only cases", () => {
      const xml11Cases = invalidChars.cases.filter(c =>
        c.meta.tags && c.meta.tags.includes("xml-1.1-only")
      );
      expect(xml11Cases.length).toBeGreaterThan(0);
      for (const c of xml11Cases) {
        expect(c.meta.spec).toContain("XML 1.1");
      }
    });

    it("does NOT include vertical-tab or form-feed as invalid cases", () => {
      // These are legal literals in 1.1 — they appear with rule marking them valid
      const vtabInvalid = invalidChars.cases.find(c =>
        c.input.includes("\x0B") && c.meta.tags && c.meta.tags.includes("illegal-char")
      );
      const ffInvalid = invalidChars.cases.find(c =>
        c.input.includes("\x0C") && c.meta.tags && c.meta.tags.includes("illegal-char")
      );
      expect(vtabInvalid).toBeUndefined();
      expect(ffInvalid).toBeUndefined();
    });

    it("marks vertical-tab and form-feed as xml-1.1-relaxed", () => {
      const vt = invalidChars.cases.find(c => c.input.includes("\x0B"));
      expect(vt).toBeDefined();
      expect(vt.meta.tags).toContain("xml-1.1-relaxed");

      const ff = invalidChars.cases.find(c => c.input.includes("\x0C"));
      expect(ff).toBeDefined();
      expect(ff.meta.tags).toContain("xml-1.1-relaxed");
    });

    it("still includes null byte as always-illegal", () => {
      const c = invalidChars.cases.find(c => c.meta.rule === "null-byte-never-allowed");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("null-byte");
    });

    it("includes C0 control literal as illegal (must be escaped)", () => {
      const c = invalidChars.cases.find(c => c.meta.rule === "c0-control-must-be-escaped-as-reference");
      expect(c).toBeDefined();
    });

    it("includes NEL as valid end-of-line", () => {
      const c = invalidChars.cases.find(c => c.meta.rule === "nel-is-valid-end-of-line-in-xml-1-1");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("xml-1.1-only");
    });

    it("includes LS as valid end-of-line", () => {
      const c = invalidChars.cases.find(c => c.meta.rule === "ls-is-valid-end-of-line-in-xml-1-1");
      expect(c).toBeDefined();
    });
  });

  describe("filterCases on 1.1 scenarios", () => {
    it("filters by xml-1.1-only tag", () => {
      const cases = filterCases(scenarios, { tags: ["xml-1.1-only"] });
      expect(cases.length).toBeGreaterThan(0);
    });

    it("filters by xml-1.1-relaxed tag", () => {
      const cases = filterCases(scenarios, { tags: ["xml-1.1-relaxed"] });
      expect(cases.length).toBeGreaterThan(0);
    });
  });

});
