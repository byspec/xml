/**
 * DTD declarations — XML 1.0 §2.8, §3.2, §3.3, §4.2, §4.7
 *
 * A Document Type Declaration (DOCTYPE) appears before the root element.
 * It may contain:
 *   - ELEMENT declarations (§3.2) — define element content models
 *   - ATTLIST declarations (§3.3) — define attribute lists for elements
 *   - ENTITY declarations (§4.2) — define general and parameter entities
 *   - NOTATION declarations (§4.7) — identify notation formats
 *
 * These cases cover malformed DOCTYPE declarations and common structural errors.
 */

export const dtdDeclarations = {
  name: "dtd-declarations",
  cases: [
    // ── DOCTYPE location ──────────────────────────────────────────────────────
    {
      input: "<root/><?xml version=\"1.0\"?><!DOCTYPE root [<!ELEMENT root EMPTY>]>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §2.8",
        rule: "doctype-must-appear-before-root-element",
        tags: ["dtd", "doctype", "well-formedness"],
        line: 1,
        col: 8,
        note: "The DOCTYPE declaration must appear before the root element, not after it"
      }
    },
    {
      input: "<!DOCTYPE root [<!ELEMENT root EMPTY>]><!DOCTYPE root [<!ELEMENT root EMPTY>]><root/>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §2.8",
        rule: "only-one-doctype-allowed",
        tags: ["dtd", "doctype", "well-formedness"],
        line: 1,
        col: 40,
        note: "A document may have at most one DOCTYPE declaration"
      }
    },
    // ── ELEMENT declaration ───────────────────────────────────────────────────
    {
      input: "<!DOCTYPE r [<!ELEMENT >]><r/>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §3.2",
        rule: "element-declaration-must-have-name",
        tags: ["dtd", "element-declaration", "well-formedness"],
        line: 1,
        col: 22,
        note: "<!ELEMENT> requires an element name and a content model"
      }
    },
    {
      input: "<!DOCTYPE r [<!ELEMENT r (a & b)>]><r/>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §3.2",
        rule: "element-content-model-mixed-connectors",
        tags: ["dtd", "element-declaration", "well-formedness"],
        line: 1,
        col: 25,
        note: "Content model children must all use ',' or all use '|' — mixing is illegal"
      }
    },
    // ── ATTLIST declaration ───────────────────────────────────────────────────
    {
      input: "<!DOCTYPE r [<!ATTLIST r id BADTYPE #REQUIRED>]><r/>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §3.3",
        rule: "attlist-type-must-be-valid",
        tags: ["dtd", "attlist-declaration", "well-formedness"],
        line: 1,
        col: 28,
        note: "Attribute type must be one of: CDATA, ID, IDREF, IDREFS, ENTITY, ENTITIES, NMTOKEN, NMTOKENS, NOTATION, or an enumeration"
      }
    },
    {
      input: "<!DOCTYPE r [<!ATTLIST r id ID #REQUIRED><!ATTLIST r id ID #IMPLIED>]><r/>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §3.3",
        rule: "attlist-attribute-declared-more-than-once",
        tags: ["dtd", "attlist-declaration"],
        line: 1,
        col: 41,
        note: "When an attribute is declared more than once, only the first declaration is binding; subsequent ones are ignored (not an error, but worth flagging)"
      }
    },
    // ── ENTITY declaration ────────────────────────────────────────────────────
    {
      input: "<!DOCTYPE r [<!ENTITY % pe \"content\">]>&pe;<r/>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §4.2",
        rule: "parameter-entity-cannot-be-referenced-in-document-content",
        tags: ["dtd", "entity", "well-formedness"],
        line: 1,
        col: 39,
        note: "Parameter entities (%pe;) are only valid in DTD markup declarations, not in document content"
      }
    },
    {
      input: "<!DOCTYPE r [<!ENTITY recursive \"&recursive;\">]><r>&recursive;</r>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §4.2",
        rule: "entity-must-not-be-recursive",
        tags: ["dtd", "entity", "well-formedness"],
        line: 1,
        col: 24,
        note: "An entity that references itself (directly or indirectly) is illegal"
      }
    },
    // ── NOTATION declaration ──────────────────────────────────────────────────
    {
      input: "<!DOCTYPE r [<!NOTATION gif SYSTEM>]><r/>",
      meta: {
        scenario: "dtd-declarations",
        spec: "XML 1.0 §4.7",
        rule: "notation-system-identifier-required",
        tags: ["dtd", "notation", "well-formedness"],
        line: 1,
        col: 28,
        note: "NOTATION SYSTEM requires a system identifier string after the keyword"
      }
    }
  ]
};
