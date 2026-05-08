import { dtdDeclarations, scenarios } from "../src/dtd/index.js";
import { filterCases } from "../src/index.js";

describe("@byspec/xml/dtd", () => {

  describe("scenarios export", () => {
    it("exports one scenario", () => {
      expect(scenarios.length).toBe(1);
      expect(scenarios[0].name).toBe("dtd-declarations");
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
        }
      }
    });
  });

  describe("dtd-declarations", () => {
    it("includes doctype-after-root case", () => {
      const c = dtdDeclarations.cases.find(c => c.meta.rule === "doctype-must-appear-before-root-element");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("doctype");
    });

    it("includes only-one-doctype case", () => {
      const c = dtdDeclarations.cases.find(c => c.meta.rule === "only-one-doctype-allowed");
      expect(c).toBeDefined();
    });

    it("includes ELEMENT declaration error cases", () => {
      const c = dtdDeclarations.cases.find(c => c.meta.rule === "element-declaration-must-have-name");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("element-declaration");
    });

    it("includes ATTLIST type validation case", () => {
      const c = dtdDeclarations.cases.find(c => c.meta.rule === "attlist-type-must-be-valid");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("attlist-declaration");
    });

    it("includes parameter entity in content case", () => {
      const c = dtdDeclarations.cases.find(c =>
        c.meta.rule === "parameter-entity-cannot-be-referenced-in-document-content"
      );
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("entity");
    });

    it("includes recursive entity case", () => {
      const c = dtdDeclarations.cases.find(c => c.meta.rule === "entity-must-not-be-recursive");
      expect(c).toBeDefined();
    });

    it("includes NOTATION system-identifier case", () => {
      const c = dtdDeclarations.cases.find(c => c.meta.rule === "notation-system-identifier-required");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("notation");
    });
  });

  describe("filterCases", () => {
    it("filters by tag 'dtd'", () => {
      const cases = filterCases(scenarios, { tags: ["dtd"] });
      expect(cases.length).toBeGreaterThan(0);
      for (const c of cases) {
        expect(c.meta.tags).toContain("dtd");
      }
    });

    it("filters by tag 'entity'", () => {
      const cases = filterCases(scenarios, { tags: ["entity"] });
      expect(cases.length).toBeGreaterThan(0);
    });

    it("filters by anyTag across dtd sub-areas", () => {
      const cases = filterCases(scenarios, { anyTag: ["element-declaration", "attlist-declaration", "notation"] });
      expect(cases.length).toBeGreaterThan(0);
    });

    it("returns all cases when no opts given", () => {
      const total = scenarios.reduce((sum, s) => sum + s.cases.length, 0);
      expect(filterCases(scenarios).length).toBe(total);
    });
  });

});
