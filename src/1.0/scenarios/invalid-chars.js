/**
 * Invalid characters — characters illegal in XML 1.0 content
 *
 * XML 1.0 §2.2 — legal characters are:
 *   #x9 | #xA | #xD | [#x20–#xD7FF] | [#xE000–#xFFFD] | [#x10000–#x10FFFF]
 *
 * Everything else is illegal, including most C0 control characters
 * (other than tab, LF, and CR), the surrogate block [#xD800–#xDFFF],
 * and #xFFFE / #xFFFF.
 */

export const invalidChars = {
  name: "invalid-chars",
  cases: [
    // ── Null byte ─────────────────────────────────────────────────────────────
    {
      input: "<a>\x00</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "null-byte-not-allowed",
        tags: ["illegal-char", "null-byte", "xml-1.0-only"],
        line: 1,
        col: 4
      }
    },
    // ── C0 control characters ─────────────────────────────────────────────────
    {
      input: "<a>\x01</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "c0-control-character-not-allowed",
        tags: ["illegal-char", "c0-control", "xml-1.0-only"],
        line: 1,
        col: 4
      }
    },
    {
      input: "<a>\x0B</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "c0-control-character-not-allowed",
        tags: ["illegal-char", "c0-control", "xml-1.0-only", "xml-1.1-relaxed"],
        line: 1,
        col: 4,
        note: "Vertical tab (#xB) — illegal in XML 1.0 but legal as a literal in XML 1.1"
      }
    },
    {
      input: "<a>\x0C</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "c0-control-character-not-allowed",
        tags: ["illegal-char", "c0-control", "xml-1.0-only", "xml-1.1-relaxed"],
        line: 1,
        col: 4,
        note: "Form feed (#xC) — illegal in XML 1.0 but legal as a literal in XML 1.1"
      }
    },
    // ── Surrogate code points (illegal in all XML versions) ───────────────────
    {
      input: "<a>\uD800</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "surrogate-code-point-not-allowed",
        tags: ["illegal-char", "unicode"],
        line: 1,
        col: 4,
        note: "High surrogate #xD800 — the surrogate block [#xD800–#xDFFF] is illegal in all XML versions"
      }
    },
    {
      input: "<a>\uDFFF</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "surrogate-code-point-not-allowed",
        tags: ["illegal-char", "unicode"],
        line: 1,
        col: 4,
        note: "Low surrogate #xDFFF"
      }
    },
    // ── Permanently illegal Unicode characters ────────────────────────────────
    {
      input: "<a>\uFFFE</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "unicode-noncharacter-not-allowed",
        tags: ["illegal-char", "unicode"],
        line: 1,
        col: 4,
        note: "#xFFFE is a Unicode non-character — illegal in all XML versions"
      }
    },
    {
      input: "<a>\uFFFF</a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.2",
        rule: "unicode-noncharacter-not-allowed",
        tags: ["illegal-char", "unicode"],
        line: 1,
        col: 4,
        note: "#xFFFF is a Unicode non-character — illegal in all XML versions"
      }
    },
    // ── Bare < and & in content ───────────────────────────────────────────────
    {
      input: "<a> < </a>",
      meta: {
        scenario: "invalid-chars",
        spec: "XML 1.0 §2.4",
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
        spec: "XML 1.0 §2.4",
        rule: "bare-ampersand-in-content",
        tags: ["illegal-char", "bare-ampersand"],
        line: 1,
        col: 5
      }
    }
  ]
};
