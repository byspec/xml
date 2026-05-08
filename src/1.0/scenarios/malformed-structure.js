/**
 * Malformed structure — documents that violate XML well-formedness
 *
 * XML 1.0 §2.1 — a well-formed XML document must have:
 *   - Exactly one root element
 *   - All tags properly nested (no interleaving)
 *   - Every open tag matched by a close tag
 *   - No content (other than comments, PIs, and whitespace) after the root
 */

export const malformedStructure = {
  name: "malformed-structure",
  cases: [
    // ── Improper nesting ──────────────────────────────────────────────────────
    {
      input: "<a><b></a></b>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "tags-must-be-properly-nested",
        tags: ["well-formedness", "nesting"],
        line: 1,
        col: 9
      }
    },
    {
      input: "<a><b><c></a></c></b>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "tags-must-be-properly-nested",
        tags: ["well-formedness", "nesting"],
        line: 1,
        col: 10,
        note: "Three-level interleaving"
      }
    },
    // ── Missing closing tag ───────────────────────────────────────────────────
    {
      input: "<a>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "open-tag-must-have-matching-close",
        tags: ["well-formedness", "unclosed-tag"],
        line: 1,
        col: 1
      }
    },
    {
      input: "<a><b></b>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "open-tag-must-have-matching-close",
        tags: ["well-formedness", "unclosed-tag"],
        line: 1,
        col: 1,
        note: "Inner element closed correctly, outer element missing close"
      }
    },
    // ── Close without open ────────────────────────────────────────────────────
    {
      input: "</a>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "close-tag-without-open",
        tags: ["well-formedness", "nesting"],
        line: 1,
        col: 1
      }
    },
    // ── Multiple root elements ────────────────────────────────────────────────
    {
      input: "<a/><b/>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "document-must-have-single-root",
        tags: ["well-formedness", "single-root"],
        line: 1,
        col: 5
      }
    },
    {
      input: "<a></a><b></b>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "document-must-have-single-root",
        tags: ["well-formedness", "single-root"],
        line: 1,
        col: 8,
        note: "Non-empty root elements, both complete — still two roots"
      }
    },
    // ── Content after root ────────────────────────────────────────────────────
    {
      input: "<a></a>extra",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "content-after-root-element",
        tags: ["well-formedness", "content-after-root"],
        line: 1,
        col: 8
      }
    },
    {
      input: "<a></a><![CDATA[x]]>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "content-after-root-element",
        tags: ["well-formedness", "content-after-root", "cdata"],
        line: 1,
        col: 8,
        note: "CDATA section at document level (outside root) is illegal"
      }
    },
    // ── Mismatched open/close tag names ───────────────────────────────────────
    {
      input: "<a></b>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "mismatched-open-close-tags",
        tags: ["well-formedness", "mismatched-tag"],
        line: 1,
        col: 4
      }
    },
    {
      input: "<Foo></foo>",
      meta: {
        scenario: "malformed-structure",
        spec: "XML 1.0 §2.1",
        rule: "mismatched-open-close-tags",
        tags: ["well-formedness", "mismatched-tag"],
        line: 1,
        col: 6,
        note: "XML tag names are case-sensitive — <Foo> and </foo> do not match"
      }
    }
  ]
};
