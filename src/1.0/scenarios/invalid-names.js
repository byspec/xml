/**
 * Invalid element names — XML 1.0 §2.3
 *
 * Names must start with a letter, underscore, or colon (though colon is
 * reserved for namespaces per the Namespaces spec), followed by letters,
 * digits, hyphens, underscores, periods, or combining characters.
 *
 * Names starting with "xml" (any case combination) are reserved by W3C.
 *
 * Naming conventions (camelCase, PascalCase, kebab-case, snake_case,
 * SCREAMING_SNAKE_CASE) are all syntactically legal in XML — these cases
 * document what IS valid, contrasting with what is NOT.
 *
 * XML 1.0 §2.3 — NameStartChar and NameChar production rules.
 */

export const invalidNames = {
  name: "invalid-names",
  cases: [
    // ── Illegal first character ──────────────────────────────────────────────
    {
      input: "<1tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-cannot-start-with-digit",
        tags: ["element-name", "name-start-char"],
        line: 1,
        col: 2
      }
    },
    {
      input: "<-tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-cannot-start-with-hyphen",
        tags: ["element-name", "name-start-char"],
        line: 1,
        col: 2
      }
    },
    {
      input: "<.tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-cannot-start-with-period",
        tags: ["element-name", "name-start-char"],
        line: 1,
        col: 2
      }
    },
    // ── Illegal characters within names ──────────────────────────────────────
    {
      input: "<my tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-cannot-contain-space",
        tags: ["element-name", "name-char"],
        line: 1,
        col: 4
      }
    },
    {
      input: "<my@tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-cannot-contain-at-sign",
        tags: ["element-name", "name-char"],
        line: 1,
        col: 4,
        note: "@ is illegal in XML names; it is not a NameChar"
      }
    },
    {
      input: "<my!tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-cannot-contain-exclamation",
        tags: ["element-name", "name-char"],
        line: 1,
        col: 4
      }
    },
    {
      input: "<my/tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-cannot-contain-slash",
        tags: ["element-name", "name-char"],
        line: 1,
        col: 4
      }
    },
    // ── Dot-notation (looks like namespacing but is illegal as a name) ────────
    {
      input: "<com.example.Tag/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "dot-notation-is-legal-in-xml-names",
        tags: ["element-name", "naming-convention", "dot-notation"],
        line: 1,
        col: 2,
        note: "Periods ARE allowed in XML NameChar — com.example.Tag is syntactically valid XML, but conventionally unusual. This is NOT an error."
      }
    },
    // ── XML reserved prefix ───────────────────────────────────────────────────
    {
      input: "<xmlreserved/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-starting-with-xml-is-reserved",
        tags: ["element-name", "xml-reserved"],
        line: 1,
        col: 2,
        note: "Names starting with 'xml' (any case) are reserved for W3C"
      }
    },
    {
      input: "<XMLreserved/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-starting-with-xml-is-reserved",
        tags: ["element-name", "xml-reserved"],
        line: 1,
        col: 2,
        note: "Case-insensitive: 'XML...', 'Xml...', 'xMl...' are all reserved"
      }
    },
    {
      input: "<XmLfoo/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "name-starting-with-xml-is-reserved",
        tags: ["element-name", "xml-reserved", "mixed-case"],
        line: 1,
        col: 2
      }
    },
    // ── Naming conventions (syntactically valid, documented for completeness) ─
    // These are VALID XML names. They illustrate what conventions ARE allowed.
    {
      input: "<camelCaseElement/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "camel-case-name-is-valid",
        tags: ["element-name", "naming-convention", "camel-case"],
        line: 1,
        col: 2,
        note: "camelCase is syntactically legal — NameStartChar followed by valid NameChars"
      }
    },
    {
      input: "<PascalCaseElement/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "pascal-case-name-is-valid",
        tags: ["element-name", "naming-convention", "pascal-case"],
        line: 1,
        col: 2,
        note: "PascalCase is syntactically legal — uppercase NameStartChar"
      }
    },
    {
      input: "<kebab-case-element/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "kebab-case-name-is-valid",
        tags: ["element-name", "naming-convention", "kebab-case"],
        line: 1,
        col: 2,
        note: "Hyphens are legal NameChar — kebab-case is valid XML"
      }
    },
    {
      input: "<snake_case_element/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "snake-case-name-is-valid",
        tags: ["element-name", "naming-convention", "snake-case"],
        line: 1,
        col: 2,
        note: "Underscores are legal NameStartChar and NameChar — snake_case is valid XML"
      }
    },
    {
      input: "<SCREAMING_SNAKE_CASE/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "screaming-snake-case-name-is-valid",
        tags: ["element-name", "naming-convention", "screaming-snake-case"],
        line: 1,
        col: 2,
        note: "All-caps with underscores is syntactically valid XML"
      }
    },
    {
      input: "<_private/>",
      meta: {
        scenario: "invalid-names",
        spec: "XML 1.0 §2.3",
        rule: "underscore-start-is-valid",
        tags: ["element-name", "naming-convention"],
        line: 1,
        col: 2,
        note: "Underscore is a legal NameStartChar — _private is valid"
      }
    }
  ]
};
