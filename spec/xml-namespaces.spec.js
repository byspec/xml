import {
  invalidPrefixes, invalidNamespaceNames, scenarios
} from "../src/namespaces/index.js";
import { filterCases } from "../src/index.js";

describe("@byspec/xml/namespaces", () => {

  describe("scenarios export", () => {
    it("exports two scenarios", () => {
      expect(scenarios.length).toBe(2);
      expect(scenarios.map(s => s.name)).toEqual([
        "invalid-prefixes",
        "invalid-namespace-names"
      ]);
    });

    it("every case has required meta fields", () => {
      for (const scenario of scenarios) {
        for (const c of scenario.cases) {
          expect(typeof c.input).withContext(`input must be string in ${scenario.name}`).toBe("string");
          expect(typeof c.meta.scenario).toBe("string");
          expect(typeof c.meta.spec).toBe("string");
          expect(typeof c.meta.rule).toBe("string");
          expect(typeof c.meta.line).toBe("number");
          expect(typeof c.meta.col).toBe("number");
          if (c.meta.tags !== undefined) {
            expect(Array.isArray(c.meta.tags)).toBe(true);
          }
        }
      }
    });
  });

  describe("invalid-prefixes", () => {
    it("includes undeclared prefix case", () => {
      const c = invalidPrefixes.cases.find(c => c.meta.rule === "namespace-prefix-must-be-declared");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("namespace-undeclared");
    });

    it("includes xmlns-prefix-cannot-be-used-as-element-prefix", () => {
      const c = invalidPrefixes.cases.find(c => c.meta.rule === "xmlns-prefix-cannot-be-used-as-element-prefix");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("xmlns-reserved");
    });

    it("includes xmlns cannot be redeclared", () => {
      const c = invalidPrefixes.cases.find(c => c.meta.rule === "xmlns-prefix-cannot-be-redeclared");
      expect(c).toBeDefined();
    });

    it("includes xml prefix must bind to correct URI", () => {
      const c = invalidPrefixes.cases.find(c => c.meta.rule === "xml-prefix-must-bind-to-xml-namespace-uri");
      expect(c).toBeDefined();
    });

    it("includes colon-in-prefix (NCName violation)", () => {
      const c = invalidPrefixes.cases.find(c => c.meta.rule === "namespace-prefix-must-be-ncname");
      expect(c).toBeDefined();
    });

    it("includes empty URI for non-default namespace", () => {
      const c = invalidPrefixes.cases.find(c => c.meta.rule === "namespace-prefix-cannot-bind-to-empty-uri");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("namespace-uri");
    });
  });

  describe("invalid-namespace-names", () => {
    it("includes multiple-colon QName case", () => {
      const c = invalidNamespaceNames.cases.find(c => c.meta.rule === "qname-cannot-contain-more-than-one-colon");
      expect(c).toBeDefined();
    });

    it("includes invalid local part (digit start)", () => {
      const c = invalidNamespaceNames.cases.find(c => c.meta.rule === "local-part-must-be-valid-ncname");
      expect(c).toBeDefined();
    });

    it("includes attribute expanded-name uniqueness violation", () => {
      const c = invalidNamespaceNames.cases.find(c => c.meta.rule === "attribute-expanded-names-must-be-unique");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("duplicate-attribute");
    });

    it("documents naming conventions for namespace prefixes", () => {
      const conventions = invalidNamespaceNames.cases.filter(c =>
        c.meta.tags && c.meta.tags.includes("naming-convention")
      );
      expect(conventions.length).toBeGreaterThan(0);
    });

    it("includes default namespace undeclaration case", () => {
      const c = invalidNamespaceNames.cases.find(c =>
        c.meta.rule === "default-namespace-can-be-undeclared-with-empty-uri"
      );
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("default-namespace");
    });
  });

  describe("filterCases", () => {
    it("filters by tag 'namespace'", () => {
      const cases = filterCases(scenarios, { tags: ["namespace"] });
      expect(cases.length).toBeGreaterThan(0);
      for (const c of cases) {
        expect(c.meta.tags).toContain("namespace");
      }
    });

    it("filters by tag 'namespace-undeclared'", () => {
      const cases = filterCases(scenarios, { tags: ["namespace-undeclared"] });
      expect(cases.length).toBeGreaterThan(0);
    });

    it("filters by tag 'xmlns-reserved'", () => {
      const cases = filterCases(scenarios, { tags: ["xmlns-reserved"] });
      expect(cases.length).toBeGreaterThan(0);
    });

    it("filters by anyTag: namespace-prefix or default-namespace", () => {
      const combined = filterCases(scenarios, { anyTag: ["namespace-prefix", "default-namespace"] });
      expect(combined.length).toBeGreaterThan(0);
    });

    it("returns all cases when no opts given", () => {
      const total = scenarios.reduce((sum, s) => sum + s.cases.length, 0);
      expect(filterCases(scenarios).length).toBe(total);
    });
  });

});
