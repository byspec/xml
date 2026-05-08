/**
 * Invalid namespace-qualified names — Namespaces in XML 1.0 §2
 *
 * In a namespace-aware context, element and attribute names may be either:
 *   - QName: prefix:LocalPart (e.g. html:p)
 *   - NCName: a Name with no colon (e.g. p)
 *
 * A LocalPart must also be an NCName. Multiple colons in a name are illegal.
 * Attribute names with the same local part under the same namespace URI
 * are considered duplicates even if their prefixes differ.
 *
 * Naming conventions for prefixes and local names are also documented here.
 */

export const invalidNamespaceNames = {
  name: "invalid-namespace-names",
  cases: [
    // ── Multiple colons in a QName ────────────────────────────────────────────
    {
      input: '<root xmlns:a="http://a.com"><a:b:c/></root>',
      meta: {
        scenario: "invalid-namespace-names",
        spec: "Namespaces in XML 1.0 §2",
        rule: "qname-cannot-contain-more-than-one-colon",
        tags: ["namespace", "element-name", "name-char"],
        line: 1,
        col: 30,
        note: "a:b:c has two colons — LocalPart 'b:c' is not a valid NCName"
      }
    },
    // ── Local part starts with digit ──────────────────────────────────────────
    {
      input: '<root xmlns:a="http://a.com"><a:1el/></root>',
      meta: {
        scenario: "invalid-namespace-names",
        spec: "Namespaces in XML 1.0 §2",
        rule: "local-part-must-be-valid-ncname",
        tags: ["namespace", "element-name", "name-start-char"],
        line: 1,
        col: 32,
        note: "The local part '1el' is an invalid NCName — digits cannot start a name"
      }
    },
    // ── Namespace-conflict in attributes (same expanded name) ─────────────────
    {
      input: '<root xmlns:a="http://x.com" xmlns:b="http://x.com" a:attr="1" b:attr="2"/>',
      meta: {
        scenario: "invalid-namespace-names",
        spec: "Namespaces in XML 1.0 §2",
        rule: "attribute-expanded-names-must-be-unique",
        tags: ["namespace", "attribute", "duplicate-attribute"],
        line: 1,
        col: 53,
        note: "a:attr and b:attr expand to the same {http://x.com}attr — this is a duplicate"
      }
    },
    // ── Naming conventions for namespace prefixes (valid, documented) ─────────
    {
      input: '<root xmlns:camelCase="http://example.com"><camelCase:el/></root>',
      meta: {
        scenario: "invalid-namespace-names",
        spec: "Namespaces in XML 1.0 §2",
        rule: "camel-case-prefix-is-valid",
        tags: ["namespace", "namespace-prefix", "naming-convention", "camel-case"],
        line: 1,
        col: 7,
        note: "camelCase namespace prefixes are syntactically valid NCNames"
      }
    },
    {
      input: '<root xmlns:my-ns="http://example.com"><my-ns:el/></root>',
      meta: {
        scenario: "invalid-namespace-names",
        spec: "Namespaces in XML 1.0 §2",
        rule: "kebab-case-prefix-is-valid",
        tags: ["namespace", "namespace-prefix", "naming-convention", "kebab-case"],
        line: 1,
        col: 7,
        note: "Hyphens are legal in NCNames — kebab-case prefixes are valid"
      }
    },
    // ── Default namespace scoping ─────────────────────────────────────────────
    {
      input: '<root xmlns="http://example.com"><child xmlns=""/></root>',
      meta: {
        scenario: "invalid-namespace-names",
        spec: "Namespaces in XML 1.0 §2",
        rule: "default-namespace-can-be-undeclared-with-empty-uri",
        tags: ["namespace", "default-namespace"],
        line: 1,
        col: 34,
        note: "xmlns=\"\" is valid — it un-declares the default namespace for the element and its descendants"
      }
    }
  ]
};
