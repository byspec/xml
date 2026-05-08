import {
  invalidNames, invalidChars, invalidAttributes, malformedStructure,
  xmlDeclaration, comments, processingInstructions, cdata, entityReferences,
  scenarios
} from "../src/1.0/index.js";
import { filterCases } from "../src/index.js";

describe("@byspec/xml/1.0", () => {

  describe("scenarios export", () => {
    it("exports all nine scenarios", () => {
      expect(scenarios.length).toBe(9);
      expect(scenarios.map(s => s.name)).toEqual([
        "invalid-names",
        "invalid-chars",
        "invalid-attributes",
        "malformed-structure",
        "xml-declaration",
        "comments",
        "processing-instructions",
        "cdata",
        "entity-references"
      ]);
    });

    it("every case across all scenarios has the required meta fields", () => {
      for (const scenario of scenarios) {
        for (const c of scenario.cases) {
          expect(typeof c.input)
            .withContext(`input must be string in ${scenario.name}`)
            .toBe("string");
          expect(typeof c.meta.scenario).toBe("string");
          expect(typeof c.meta.spec).toBe("string");
          expect(typeof c.meta.rule).toBe("string");
          expect(typeof c.meta.line).toBe("number");
          expect(typeof c.meta.col).toBe("number");
          if (c.meta.tags !== undefined) {
            expect(Array.isArray(c.meta.tags))
              .withContext(`tags must be an array in ${scenario.name}/${c.meta.rule}`)
              .toBe(true);
          }
        }
      }
    });
  });

  describe("invalid-names", () => {
    it("includes digit-start case", () => {
      const c = invalidNames.cases.find(c => c.meta.rule === "name-cannot-start-with-digit");
      expect(c).toBeDefined();
      expect(c.input).toContain("1");
      expect(c.meta.tags).toContain("element-name");
      expect(c.meta.tags).toContain("name-start-char");
    });

    it("includes hyphen-start case", () => {
      const c = invalidNames.cases.find(c => c.meta.rule === "name-cannot-start-with-hyphen");
      expect(c).toBeDefined();
    });

    it("includes period-start case", () => {
      const c = invalidNames.cases.find(c => c.meta.rule === "name-cannot-start-with-period");
      expect(c).toBeDefined();
    });

    it("includes xml-reserved cases for different casings", () => {
      const reserved = invalidNames.cases.filter(c => c.meta.rule === "name-starting-with-xml-is-reserved");
      expect(reserved.length).toBeGreaterThanOrEqual(2);
      const inputs = reserved.map(c => c.input.toLowerCase());
      expect(inputs.some(i => i.startsWith("<xml"))).toBe(true);
      expect(inputs.some(i => i.startsWith("<xml") && i !== "<xmlreserved/>")).toBe(true);
    });

    it("documents naming conventions as valid cases", () => {
      const conventions = invalidNames.cases.filter(c => c.meta.tags && c.meta.tags.includes("naming-convention"));
      const tags = conventions.flatMap(c => c.meta.tags);
      expect(tags).toContain("camel-case");
      expect(tags).toContain("pascal-case");
      expect(tags).toContain("kebab-case");
      expect(tags).toContain("snake-case");
      expect(tags).toContain("screaming-snake-case");
    });
  });

  describe("invalid-chars", () => {
    it("includes null byte case", () => {
      const c = invalidChars.cases.find(c => c.meta.rule === "null-byte-not-allowed");
      expect(c).toBeDefined();
      expect(c.input).toContain("\x00");
      expect(c.meta.tags).toContain("null-byte");
    });

    it("includes C0 control character cases", () => {
      const c0 = invalidChars.cases.filter(c => c.meta.rule === "c0-control-character-not-allowed");
      expect(c0.length).toBeGreaterThanOrEqual(2);
    });

    it("marks vertical-tab and form-feed as xml-1.1-relaxed", () => {
      const vt = invalidChars.cases.find(c => c.input.includes("\x0B"));
      expect(vt).toBeDefined();
      expect(vt.meta.tags).toContain("xml-1.1-relaxed");

      const ff = invalidChars.cases.find(c => c.input.includes("\x0C"));
      expect(ff).toBeDefined();
      expect(ff.meta.tags).toContain("xml-1.1-relaxed");
    });

    it("includes surrogate code point cases", () => {
      const surrogates = invalidChars.cases.filter(c => c.meta.rule === "surrogate-code-point-not-allowed");
      expect(surrogates.length).toBeGreaterThanOrEqual(1);
      expect(surrogates[0].meta.tags).toContain("unicode");
    });

    it("includes bare less-than case at correct column", () => {
      const c = invalidChars.cases.find(c => c.meta.rule === "bare-less-than-in-content");
      expect(c).toBeDefined();
      expect(c.meta.col).toBe(5);
      expect(c.meta.tags).toContain("bare-lt");
    });

    it("includes bare ampersand case", () => {
      const c = invalidChars.cases.find(c => c.meta.rule === "bare-ampersand-in-content");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("bare-ampersand");
    });
  });

  describe("invalid-attributes", () => {
    it("includes digit-start attribute name", () => {
      const c = invalidAttributes.cases.find(c => c.meta.rule === "attribute-name-cannot-start-with-digit");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("attribute-name");
    });

    it("includes duplicate attribute case", () => {
      const c = invalidAttributes.cases.find(c => c.meta.rule === "duplicate-attribute-not-allowed");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("duplicate-attribute");
    });

    it("includes unquoted value case", () => {
      const c = invalidAttributes.cases.find(c => c.meta.rule === "attribute-value-must-be-quoted");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("unquoted-value");
    });

    it("includes bare less-than in attribute value", () => {
      const c = invalidAttributes.cases.find(c => c.meta.rule === "bare-less-than-in-attribute-value");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("bare-lt-in-value");
    });

    it("includes bare ampersand in attribute value", () => {
      const c = invalidAttributes.cases.find(c => c.meta.rule === "bare-ampersand-in-attribute-value");
      expect(c).toBeDefined();
    });

    it("documents naming conventions for attribute names", () => {
      const conventions = invalidAttributes.cases.filter(c =>
        c.meta.tags && c.meta.tags.includes("naming-convention")
      );
      expect(conventions.length).toBeGreaterThan(0);
    });
  });

  describe("malformed-structure", () => {
    it("includes single-root violation", () => {
      const c = malformedStructure.cases.find(c => c.meta.rule === "document-must-have-single-root");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("single-root");
    });

    it("includes content-after-root violation", () => {
      const c = malformedStructure.cases.find(c => c.meta.rule === "content-after-root-element");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("content-after-root");
    });

    it("includes mismatched-tag case", () => {
      const c = malformedStructure.cases.find(c => c.meta.rule === "mismatched-open-close-tags");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("mismatched-tag");
    });

    it("includes case-sensitive mismatch", () => {
      const c = malformedStructure.cases.find(c => c.input === "<Foo></foo>");
      expect(c).toBeDefined();
      expect(c.meta.rule).toBe("mismatched-open-close-tags");
    });

    it("includes nesting violation", () => {
      const c = malformedStructure.cases.find(c => c.meta.rule === "tags-must-be-properly-nested");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("nesting");
    });
  });

  describe("xml-declaration", () => {
    it("requires declaration to be at document start", () => {
      const cases = xmlDeclaration.cases.filter(c => c.meta.rule === "xml-declaration-must-be-at-document-start");
      expect(cases.length).toBeGreaterThanOrEqual(1);
    });

    it("includes PI target xml-reserved case", () => {
      const c = xmlDeclaration.cases.find(c => c.meta.rule === "processing-instruction-target-cannot-be-xml");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("xml-reserved");
    });
  });

  describe("comments", () => {
    it("includes double-hyphen-in-comment case", () => {
      const c = comments.cases.find(c => c.meta.rule === "comment-cannot-contain-double-hyphen");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("comment");
    });

    it("includes triple-hyphen close case", () => {
      const c = comments.cases.find(c => c.meta.rule === "comment-cannot-end-with-triple-hyphen");
      expect(c).toBeDefined();
    });
  });

  describe("cdata", () => {
    it("includes nested close-delimiter case", () => {
      const c = cdata.cases.find(c => c.meta.rule === "cdata-cannot-contain-close-delimiter");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("cdata");
    });

    it("includes CDATA outside element case", () => {
      const c = cdata.cases.find(c => c.meta.rule === "cdata-only-allowed-inside-element");
      expect(c).toBeDefined();
    });
  });

  describe("entity-references", () => {
    it("includes missing semicolon case", () => {
      const c = entityReferences.cases.find(c => c.meta.rule === "entity-reference-must-end-with-semicolon");
      expect(c).toBeDefined();
      expect(c.meta.tags).toContain("entity");
    });

    it("includes undefined entity case", () => {
      const c = entityReferences.cases.find(c => c.meta.rule === "entity-reference-must-be-declared");
      expect(c).toBeDefined();
    });

    it("includes all five predefined entities as valid cases", () => {
      const amp = entityReferences.cases.find(c => c.meta.rule === "predefined-entity-amp-is-valid");
      const lt  = entityReferences.cases.find(c => c.meta.rule === "predefined-entity-lt-is-valid");
      expect(amp).toBeDefined();
      expect(lt).toBeDefined();
    });

    it("character reference to null is illegal", () => {
      const decimal = entityReferences.cases.find(c => c.meta.rule === "character-reference-to-null-not-allowed" && c.input.includes("&#0;"));
      const hex     = entityReferences.cases.find(c => c.meta.rule === "character-reference-to-null-not-allowed" && c.input.includes("&#x0;"));
      expect(decimal).toBeDefined();
      expect(hex).toBeDefined();
    });
  });

  describe("filterCases", () => {
    it("filters by tag 'element-name'", () => {
      const cases = filterCases(scenarios, { tags: ["element-name"] });
      expect(cases.length).toBeGreaterThan(0);
      for (const c of cases) {
        expect(c.meta.tags).toContain("element-name");
      }
    });

    it("filters by tag 'null-byte'", () => {
      const cases = filterCases(scenarios, { tags: ["null-byte"] });
      expect(cases.length).toBeGreaterThan(0);
    });

    it("filters by multiple tags (AND logic)", () => {
      const cases = filterCases(scenarios, { tags: ["element-name", "xml-reserved"] });
      expect(cases.length).toBeGreaterThan(0);
      for (const c of cases) {
        expect(c.meta.tags).toContain("element-name");
        expect(c.meta.tags).toContain("xml-reserved");
      }
    });

    it("filters by anyTag (OR logic)", () => {
      const nameCases  = filterCases(scenarios, { tags: ["element-name"] });
      const attrCases  = filterCases(scenarios, { tags: ["attribute-name"] });
      const combined   = filterCases(scenarios, { anyTag: ["element-name", "attribute-name"] });
      // combined must be at least as large as either individual set
      expect(combined.length).toBeGreaterThanOrEqual(Math.max(nameCases.length, attrCases.length));
    });

    it("filters by scenario name", () => {
      const cases = filterCases(scenarios, { scenario: "malformed-structure" });
      expect(cases.length).toBe(malformedStructure.cases.length);
    });

    it("filters by rule", () => {
      const cases = filterCases(scenarios, { rule: "duplicate-attribute-not-allowed" });
      expect(cases.length).toBeGreaterThan(0);
      for (const c of cases) {
        expect(c.meta.rule).toBe("duplicate-attribute-not-allowed");
      }
    });

    it("returns all cases when no opts given", () => {
      const total = scenarios.reduce((sum, s) => sum + s.cases.length, 0);
      expect(filterCases(scenarios).length).toBe(total);
    });

    it("filters naming-convention cases", () => {
      const cases = filterCases(scenarios, { tags: ["naming-convention"] });
      expect(cases.length).toBeGreaterThan(0);
    });

    it("filters xml-1.1-relaxed cases", () => {
      const cases = filterCases(scenarios, { tags: ["xml-1.1-relaxed"] });
      expect(cases.length).toBeGreaterThan(0);
    });
  });

});
