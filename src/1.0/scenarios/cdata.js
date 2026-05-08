/**
 * CDATA sections — XML 1.0 §2.7
 *
 * CDATA sections start with <![CDATA[ and end with ]]>.
 * The content is literal character data — no markup is recognised inside.
 * The string "]]>" may not appear inside a CDATA section.
 * CDATA sections may not appear outside the root element.
 */

export const cdata = {
  name: "cdata",
  cases: [
    // ── Nested close delimiter ────────────────────────────────────────────────
    {
      input: "<a><![CDATA[ text ]]> more ]]></a>",
      meta: {
        scenario: "cdata",
        spec: "XML 1.0 §2.7",
        rule: "cdata-cannot-contain-close-delimiter",
        tags: ["cdata", "well-formedness"],
        line: 1,
        col: 22,
        note: "']]>' closes the CDATA section — it cannot appear inside the content"
      }
    },
    // ── Unclosed CDATA ────────────────────────────────────────────────────────
    {
      input: "<a><![CDATA[ unclosed",
      meta: {
        scenario: "cdata",
        spec: "XML 1.0 §2.7",
        rule: "cdata-must-be-closed",
        tags: ["cdata", "well-formedness"],
        line: 1,
        col: 4
      }
    },
    // ── CDATA outside root element ────────────────────────────────────────────
    {
      input: "<![CDATA[top-level]]><a/>",
      meta: {
        scenario: "cdata",
        spec: "XML 1.0 §2.7",
        rule: "cdata-only-allowed-inside-element",
        tags: ["cdata", "well-formedness"],
        line: 1,
        col: 1,
        note: "CDATA sections must appear inside element content, not in the prolog"
      }
    },
    // ── Valid CDATA (for contrast) ────────────────────────────────────────────
    {
      input: "<a><![CDATA[<not-markup> & safe]]></a>",
      meta: {
        scenario: "cdata",
        spec: "XML 1.0 §2.7",
        rule: "cdata-content-may-contain-less-than-and-ampersand",
        tags: ["cdata"],
        line: 1,
        col: 4,
        note: "Inside CDATA, < and & are literal characters — no escaping required"
      }
    }
  ]
};
