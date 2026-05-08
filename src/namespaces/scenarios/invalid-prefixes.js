/**
 * Invalid namespace prefixes — Namespaces in XML 1.0 §3
 *
 * A namespace prefix is the part before the colon in a prefixed name
 * (e.g. "ns" in "ns:element"). Rules:
 *   - Prefix must be a valid NCName (no colon)
 *   - The prefix "xml" is reserved for the XML namespace URI
 *   - The prefix "xmlns" is reserved for namespace declarations only
 *   - A prefix must be declared with xmlns:prefix="URI" before use
 *   - Undeclared prefixes are a namespace well-formedness error
 */

export const invalidPrefixes = {
  name: "invalid-prefixes",
  cases: [
    // ── Undeclared prefix ─────────────────────────────────────────────────────
    {
      input: "<ns:element/>",
      meta: {
        scenario: "invalid-prefixes",
        spec: "Namespaces in XML 1.0 §3",
        rule: "namespace-prefix-must-be-declared",
        tags: ["namespace", "namespace-prefix", "namespace-undeclared"],
        line: 1,
        col: 2,
        note: "Prefix 'ns' has not been declared with xmlns:ns=\"...\""
      }
    },
    {
      input: '<root xmlns:a="http://example.com/a"><b:element/></root>',
      meta: {
        scenario: "invalid-prefixes",
        spec: "Namespaces in XML 1.0 §3",
        rule: "namespace-prefix-must-be-declared",
        tags: ["namespace", "namespace-prefix", "namespace-undeclared"],
        line: 1,
        col: 38,
        note: "Prefix 'b' is used but only 'a' was declared"
      }
    },
    // ── Prefix "xmlns" is reserved ────────────────────────────────────────────
    {
      input: '<xmlns:foo="x"/>',
      meta: {
        scenario: "invalid-prefixes",
        spec: "Namespaces in XML 1.0 §3",
        rule: "xmlns-prefix-cannot-be-used-as-element-prefix",
        tags: ["namespace", "namespace-prefix", "xmlns-reserved"],
        line: 1,
        col: 2,
        note: "'xmlns' is reserved for namespace declarations — it cannot be used as an element prefix"
      }
    },
    {
      input: '<root xmlns:xmlns="http://example.com"/>',
      meta: {
        scenario: "invalid-prefixes",
        spec: "Namespaces in XML 1.0 §3",
        rule: "xmlns-prefix-cannot-be-redeclared",
        tags: ["namespace", "namespace-prefix", "xmlns-reserved"],
        line: 1,
        col: 7,
        note: "The 'xmlns' prefix itself cannot be declared as a namespace prefix"
      }
    },
    // ── Prefix "xml" is reserved ──────────────────────────────────────────────
    {
      input: '<root xmlns:xml="http://wrong.com"/>',
      meta: {
        scenario: "invalid-prefixes",
        spec: "Namespaces in XML 1.0 §3",
        rule: "xml-prefix-must-bind-to-xml-namespace-uri",
        tags: ["namespace", "namespace-prefix", "xmlns-reserved"],
        line: 1,
        col: 7,
        note: "The 'xml' prefix is permanently bound to http://www.w3.org/XML/1998/namespace — it cannot be re-bound to another URI"
      }
    },
    // ── Prefix with illegal colon ─────────────────────────────────────────────
    {
      input: '<root xmlns:a:b="http://example.com"/>',
      meta: {
        scenario: "invalid-prefixes",
        spec: "Namespaces in XML 1.0 §2",
        rule: "namespace-prefix-must-be-ncname",
        tags: ["namespace", "namespace-prefix", "name-char"],
        line: 1,
        col: 7,
        note: "A prefix is an NCName — it may not contain a colon"
      }
    },
    // ── Empty namespace URI for non-default namespace ─────────────────────────
    {
      input: '<root xmlns:a=""><a:el/></root>',
      meta: {
        scenario: "invalid-prefixes",
        spec: "Namespaces in XML 1.0 §3",
        rule: "namespace-prefix-cannot-bind-to-empty-uri",
        tags: ["namespace", "namespace-prefix", "namespace-uri"],
        line: 1,
        col: 7,
        note: "A prefixed namespace declaration must not bind the prefix to an empty string URI"
      }
    }
  ]
};
