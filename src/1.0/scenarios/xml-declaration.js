/**
 * XML declarations — XML 1.0 §2.8
 *
 * The XML declaration (<?xml version="..." ?>) is optional but if present
 * must be the very first construct in the document. It must include a
 * version pseudo-attribute and may include encoding and standalone.
 *
 * Ordering of pseudo-attributes is fixed: version, then encoding (if present),
 * then standalone (if present).
 */

export const xmlDeclaration = {
  name: "xml-declaration",
  cases: [
    // ── Declaration not at start ──────────────────────────────────────────────
    {
      input: " <?xml version=\"1.0\"?><a/>",
      meta: {
        scenario: "xml-declaration",
        spec: "XML 1.0 §2.8",
        rule: "xml-declaration-must-be-at-document-start",
        tags: ["xml-declaration", "well-formedness"],
        line: 1,
        col: 2,
        note: "Any content (even whitespace) before <?xml ...?> is illegal"
      }
    },
    {
      input: "<a/><?xml version=\"1.0\"?>",
      meta: {
        scenario: "xml-declaration",
        spec: "XML 1.0 §2.8",
        rule: "xml-declaration-must-be-at-document-start",
        tags: ["xml-declaration", "well-formedness"],
        line: 1,
        col: 5,
        note: "XML declaration appearing after document content"
      }
    },
    // ── Version pseudo-attribute ──────────────────────────────────────────────
    {
      input: "<?xml encoding=\"UTF-8\"?><a/>",
      meta: {
        scenario: "xml-declaration",
        spec: "XML 1.0 §2.8",
        rule: "xml-declaration-version-is-required",
        tags: ["xml-declaration"],
        line: 1,
        col: 7,
        note: "version must be the first pseudo-attribute and is required"
      }
    },
    {
      input: "<?xml version=\"2.0\"?><a/>",
      meta: {
        scenario: "xml-declaration",
        spec: "XML 1.0 §2.8",
        rule: "xml-declaration-version-must-be-1x",
        tags: ["xml-declaration"],
        line: 1,
        col: 15,
        note: "XML 1.0 processors only accept version 1.x"
      }
    },
    // ── Wrong pseudo-attribute order ──────────────────────────────────────────
    {
      input: "<?xml standalone=\"yes\" version=\"1.0\"?><a/>",
      meta: {
        scenario: "xml-declaration",
        spec: "XML 1.0 §2.8",
        rule: "xml-declaration-pseudo-attributes-out-of-order",
        tags: ["xml-declaration"],
        line: 1,
        col: 7,
        note: "Required order is: version, encoding?, standalone?"
      }
    },
    // ── Processing instruction targeting xml ──────────────────────────────────
    {
      input: "<?XML version=\"1.0\"?><a/>",
      meta: {
        scenario: "xml-declaration",
        spec: "XML 1.0 §2.6",
        rule: "processing-instruction-target-cannot-be-xml",
        tags: ["xml-declaration", "processing-instruction", "xml-reserved"],
        line: 1,
        col: 3,
        note: "The target 'xml' (any case) is reserved; <?XML?> is illegal as a PI"
      }
    }
  ]
};
