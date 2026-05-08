/**
 * Processing instructions — XML 1.0 §2.6
 *
 * Processing instructions have the form <?target data?>.
 * The target name is an XML Name and identifies the application.
 * The target "xml" (any case) is reserved.
 * The string "?>" may not appear in the PI data.
 */

export const processingInstructions = {
  name: "processing-instructions",
  cases: [
    // ── Reserved target names ─────────────────────────────────────────────────
    {
      input: "<?xml-stylesheet type=\"text/css\" href=\"style.css\"?><a/>",
      meta: {
        scenario: "processing-instructions",
        spec: "XML 1.0 §2.6",
        rule: "processing-instruction-target-xml-stylesheet-is-valid",
        tags: ["processing-instruction"],
        line: 1,
        col: 3,
        note: "xml-stylesheet is a legal PI target — it starts with 'xml-' not exactly 'xml'"
      }
    },
    {
      input: "<?XML data?><a/>",
      meta: {
        scenario: "processing-instructions",
        spec: "XML 1.0 §2.6",
        rule: "processing-instruction-target-cannot-be-xml",
        tags: ["processing-instruction", "xml-reserved", "well-formedness"],
        line: 1,
        col: 3,
        note: "Target 'XML' matches 'xml' case-insensitively — reserved"
      }
    },
    // ── Illegal PI data ───────────────────────────────────────────────────────
    {
      input: "<?app data?> end ?><a/>",
      meta: {
        scenario: "processing-instructions",
        spec: "XML 1.0 §2.6",
        rule: "processing-instruction-data-cannot-contain-close",
        tags: ["processing-instruction", "well-formedness"],
        line: 1,
        col: 14,
        note: "The sequence '?>' terminates the PI — it cannot appear in the data"
      }
    },
    // ── Missing target ────────────────────────────────────────────────────────
    {
      input: "<? data?><a/>",
      meta: {
        scenario: "processing-instructions",
        spec: "XML 1.0 §2.6",
        rule: "processing-instruction-must-have-target",
        tags: ["processing-instruction", "well-formedness"],
        line: 1,
        col: 3,
        note: "PI target is required — '<? data?>' has no valid Name after '<?'"
      }
    }
  ]
};
