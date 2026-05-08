/**
 * Invalid characters specific to XML 1.1
 *
 * XML 1.1 §2.2 — the character range is extended vs 1.0:
 *   - C0 controls (#x1–#x1F except #x9, #xA, #xD) are allowed ONLY as
 *     character references (e.g. &#x1;), not as literals
 *   - #xB (vertical tab) and #xC (form feed) are legal as literals
 *   - NEL (#x85) and LS (#x2028) are valid end-of-line characters
 *   - Null (#x0) and #xFFFE, #xFFFF remain illegal in all forms
 *
 * Cases shared with 1.0 (nesting, attribute rules, bare < etc.) are in
 * @byspec/xml/1.0 and re-exported from this module unchanged.
 */

export const invalidChars = {
  name: "invalid-chars",
  cases: [
    // ── Null — always illegal ──────────────────────────────────────────────────
    {
      input: "<a>\x00</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.2",
        rule: "null-byte-never-allowed",
        tags: ["illegal-char", "null-byte", "xml-1.1-only"],
        line: 1,
        col: 4
      }
    },
    // ── C0 control as literal (must be escaped in 1.1) ─────────────────────────
    {
      input: "<a>\x01</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.2",
        rule: "c0-control-must-be-escaped-as-reference",
        tags: ["illegal-char", "c0-control", "xml-1.1-only"],
        line: 1,
        col: 4,
        note: "Literal \\x01 is illegal in XML 1.1 — &#x1; (character reference) is valid"
      }
    },
    {
      input: "<a>\x1F</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.2",
        rule: "c0-control-must-be-escaped-as-reference",
        tags: ["illegal-char", "c0-control", "xml-1.1-only"],
        line: 1,
        col: 4,
        note: "#x1F is the last C0 control — illegal as literal, legal as &#x1F;"
      }
    },
    // ── Vertical tab and form feed are NOW legal in 1.1 ──────────────────────
    {
      input: "<a>\x0B</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.2",
        rule: "vertical-tab-is-legal-literal-in-xml-1-1",
        tags: ["xml-1.1-relaxed"],
        line: 1,
        col: 4,
        note: "#xB (vertical tab) is illegal in XML 1.0 but valid as a literal in XML 1.1"
      }
    },
    {
      input: "<a>\x0C</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.2",
        rule: "form-feed-is-legal-literal-in-xml-1-1",
        tags: ["xml-1.1-relaxed"],
        line: 1,
        col: 4,
        note: "#xC (form feed) is illegal in XML 1.0 but valid as a literal in XML 1.1"
      }
    },
    // ── NEL and LS as end-of-line characters ─────────────────────────────────
    {
      input: "<a>\x85</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.11",
        rule: "nel-is-valid-end-of-line-in-xml-1-1",
        tags: ["xml-1.1-only", "unicode"],
        line: 1,
        col: 4,
        note: "NEL (#x85, NEXT LINE) is a valid end-of-line character in XML 1.1"
      }
    },
    {
      input: "<a>\u2028</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.11",
        rule: "ls-is-valid-end-of-line-in-xml-1-1",
        tags: ["xml-1.1-only", "unicode"],
        line: 1,
        col: 4,
        note: "LS (#x2028, LINE SEPARATOR) is a valid end-of-line character in XML 1.1"
      }
    },
    // ── Bare < and & still illegal in 1.1 ────────────────────────────────────
    {
      input: "<a> < </a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.4",
        rule: "bare-less-than-in-content",
        tags: ["illegal-char", "bare-lt"],
        line: 1,
        col: 5
      }
    },
    {
      input: "<a> & </a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.1 §2.4",
        rule: "bare-ampersand-in-content",
        tags: ["illegal-char", "bare-ampersand"],
        line: 1,
        col: 5
      }
    }
  ]
};
