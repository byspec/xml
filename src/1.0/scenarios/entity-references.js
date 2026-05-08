/**
 * Entity references — XML 1.0 §4.1, §4.6
 *
 * XML 1.0 defines five predefined entities:
 *   &amp;   → &
 *   &lt;    → <
 *   &gt;    → >
 *   &apos;  → '
 *   &quot;  → "
 *
 * Character references use decimal (&#NN;) or hex (&#xNN;) notation.
 * Any other entity reference requires a declaration in the DTD.
 * Entity names follow the same Name production as element names.
 */

export const entityReferences = {
  name: "entity-references",
  cases: [
    // ── Malformed entity reference syntax ─────────────────────────────────────
    {
      input: "<a>&notclosed</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.1",
        rule: "entity-reference-must-end-with-semicolon",
        tags: ["entity", "well-formedness"],
        line: 1,
        col: 4,
        note: "An entity reference must end with ';' — &notclosed is malformed"
      }
    },
    {
      input: "<a>& amp;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.1",
        rule: "entity-reference-name-cannot-contain-space",
        tags: ["entity", "well-formedness", "bare-ampersand"],
        line: 1,
        col: 4,
        note: "Space between & and the name — this is a bare & followed by text"
      }
    },
    // ── Undefined entity ──────────────────────────────────────────────────────
    {
      input: "<a>&undefined;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.1",
        rule: "entity-reference-must-be-declared",
        tags: ["entity", "well-formedness"],
        line: 1,
        col: 4,
        note: "&undefined; is not one of the five predefined entities and has no DTD declaration"
      }
    },
    // ── Predefined entities (valid, for contrast) ─────────────────────────────
    {
      input: "<a>&amp;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.6",
        rule: "predefined-entity-amp-is-valid",
        tags: ["entity"],
        line: 1,
        col: 4,
        note: "&amp; is always valid — produces literal &"
      }
    },
    {
      input: "<a>&lt;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.6",
        rule: "predefined-entity-lt-is-valid",
        tags: ["entity"],
        line: 1,
        col: 4,
        note: "&lt; is always valid — produces literal <"
      }
    },
    // ── Character references ──────────────────────────────────────────────────
    {
      input: "<a>&#65;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.1",
        rule: "decimal-character-reference-is-valid",
        tags: ["entity"],
        line: 1,
        col: 4,
        note: "&#65; is decimal for 'A'"
      }
    },
    {
      input: "<a>&#x41;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.1",
        rule: "hex-character-reference-is-valid",
        tags: ["entity"],
        line: 1,
        col: 4,
        note: "&#x41; is hex for 'A'"
      }
    },
    {
      input: "<a>&#0;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.1",
        rule: "character-reference-to-null-not-allowed",
        tags: ["entity", "null-byte", "illegal-char"],
        line: 1,
        col: 4,
        note: "Character reference to #x0 (null) is illegal in any XML version"
      }
    },
    {
      input: "<a>&#x0;</a>",
      meta: {
        scenario: "entity-references",
        spec: "XML 1.0 §4.1",
        rule: "character-reference-to-null-not-allowed",
        tags: ["entity", "null-byte", "illegal-char"],
        line: 1,
        col: 4,
        note: "Hex character reference to #x0 — same as &#0;"
      }
    }
  ]
};
