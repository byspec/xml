/**
 * Comments — XML 1.0 §2.5
 *
 * Comments have the form <!-- ... -->. Restrictions:
 *   - The string "--" may not appear within a comment
 *   - A comment may not end with "--->"; the close delimiter must be "-->"
 *   - Comments are not parsed for entity or markup declarations
 */

export const comments = {
  name: "comments",
  cases: [
    // ── Double hyphen within comment ──────────────────────────────────────────
    {
      input: "<a><!-- bad -- comment --></a>",
      meta: {
        scenario: "comments",
        spec: "XML 1.0 §2.5",
        rule: "comment-cannot-contain-double-hyphen",
        tags: ["comment", "well-formedness"],
        line: 1,
        col: 13,
        note: "The string '--' is not allowed anywhere inside a comment"
      }
    },
    // ── Triple-hyphen close ───────────────────────────────────────────────────
    {
      input: "<a><!-- comment ---></a>",
      meta: {
        scenario: "comments",
        spec: "XML 1.0 §2.5",
        rule: "comment-cannot-end-with-triple-hyphen",
        tags: ["comment", "well-formedness"],
        line: 1,
        col: 17,
        note: "--->' is not a legal comment close; '-->' is required"
      }
    },
    // ── Unclosed comment ──────────────────────────────────────────────────────
    {
      input: "<a><!-- unclosed",
      meta: {
        scenario: "comments",
        spec: "XML 1.0 §2.5",
        rule: "comment-must-be-closed",
        tags: ["comment", "well-formedness", "unclosed-tag"],
        line: 1,
        col: 4
      }
    },
    // ── Comment in document prolog (valid, for completeness) ─────────────────
    {
      input: "<!-- root comment --><a/>",
      meta: {
        scenario: "comments",
        spec: "XML 1.0 §2.5",
        rule: "comment-before-root-is-valid",
        tags: ["comment"],
        line: 1,
        col: 1,
        note: "Comments in the prolog (before the root element) are allowed"
      }
    }
  ]
};
