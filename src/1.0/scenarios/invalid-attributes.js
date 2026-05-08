/**
 * Invalid attributes — XML 1.0 §3.1
 *
 * Attribute names follow the same Name production rules as element names.
 * Additional constraints:
 *   - No duplicate attribute names within a single element
 *   - Attribute values must be quoted (single or double)
 *   - Attribute values may not contain bare < characters
 *   - Attribute values may contain & only as the start of an entity reference
 */

export const invalidAttributes = {
  name: "invalid-attributes",
  cases: [
    // ── Illegal attribute name characters ─────────────────────────────────────
    {
      input: '<a 1attr="val"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "attribute-name-cannot-start-with-digit",
        tags: ["attribute", "attribute-name", "name-start-char"],
        line: 1,
        col: 4
      }
    },
    {
      input: '<a -attr="val"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "attribute-name-cannot-start-with-hyphen",
        tags: ["attribute", "attribute-name", "name-start-char"],
        line: 1,
        col: 4
      }
    },
    {
      input: '<a .attr="val"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "attribute-name-cannot-start-with-period",
        tags: ["attribute", "attribute-name", "name-start-char"],
        line: 1,
        col: 4
      }
    },
    // ── Naming convention cases for attributes (valid but documented) ─────────
    {
      input: '<a camelCaseAttr="val"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "camel-case-attribute-is-valid",
        tags: ["attribute", "attribute-name", "naming-convention", "camel-case"],
        line: 1,
        col: 4,
        note: "camelCase attribute names are syntactically legal XML"
      }
    },
    {
      input: '<a kebab-case-attr="val"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "kebab-case-attribute-is-valid",
        tags: ["attribute", "attribute-name", "naming-convention", "kebab-case"],
        line: 1,
        col: 4,
        note: "Hyphens are legal NameChar — kebab-case-attr is valid"
      }
    },
    {
      input: '<a snake_case_attr="val"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "snake-case-attribute-is-valid",
        tags: ["attribute", "attribute-name", "naming-convention", "snake-case"],
        line: 1,
        col: 4,
        note: "snake_case is syntactically legal for attribute names"
      }
    },
    // ── Duplicate attributes ──────────────────────────────────────────────────
    {
      input: '<a attr="val" attr="val2"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "duplicate-attribute-not-allowed",
        tags: ["attribute", "duplicate-attribute"],
        line: 1,
        col: 15
      }
    },
    {
      input: '<a x="1" x="2" x="3"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "duplicate-attribute-not-allowed",
        tags: ["attribute", "duplicate-attribute"],
        line: 1,
        col: 10,
        note: "More than two occurrences — still the same violation"
      }
    },
    // ── Unquoted attribute values ─────────────────────────────────────────────
    {
      input: "<a attr=val/>",
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "attribute-value-must-be-quoted",
        tags: ["attribute", "unquoted-value"],
        line: 1,
        col: 9
      }
    },
    // ── Bare < in attribute value ─────────────────────────────────────────────
    {
      input: '<a attr="<val>"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "bare-less-than-in-attribute-value",
        tags: ["attribute", "bare-lt", "bare-lt-in-value"],
        line: 1,
        col: 10
      }
    },
    // ── Bare & in attribute value ─────────────────────────────────────────────
    {
      input: '<a attr="a & b"/>',
      meta: {
        scenario: "invalid-attributes",
        spec: "XML 1.0 §3.1",
        rule: "bare-ampersand-in-attribute-value",
        tags: ["attribute", "bare-ampersand"],
        line: 1,
        col: 12,
        note: "& must begin an entity reference (&amp; or &#38;) — bare & is illegal"
      }
    }
  ]
};
