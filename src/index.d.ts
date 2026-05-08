/**
 * @byspec/xml — shared types, compare, and filterCases.
 *
 * For scenario data, import from the sub-paths:
 *   import { scenarios } from "@byspec/xml/1.0";
 *   import { scenarios } from "@byspec/xml/1.1";
 *   import { scenarios } from "@byspec/xml/namespaces";
 *   import { scenarios } from "@byspec/xml/dtd";
 */

/**
 * Tag vocabulary for filtering XML cases.
 *
 * Tags express cross-cutting concerns about what kind of violation a case represents.
 *
 * ── Structural ──────────────────────────────────────────────────────────────
 *   "well-formedness"          — violates XML well-formedness rules
 *   "single-root"              — document must have exactly one root element
 *   "nesting"                  — improper tag nesting
 *   "unclosed-tag"             — tag opened but never closed
 *   "mismatched-tag"           — open/close tag names do not match
 *   "content-after-root"       — content appears after the root element closes
 *
 * ── Names ───────────────────────────────────────────────────────────────────
 *   "element-name"             — violation in an element (tag) name
 *   "attribute-name"           — violation in an attribute name
 *   "name-start-char"          — illegal character in the first position of a name
 *   "name-char"                — illegal character in a subsequent position
 *   "xml-reserved"             — name starts with "xml" (case-insensitive), which is reserved
 *   "naming-convention"        — relates to camelCase, PascalCase, kebab-case, etc.
 *   "camel-case"               — camelCase naming used
 *   "pascal-case"              — PascalCase naming used
 *   "kebab-case"               — kebab-case naming used (hyphens)
 *   "snake-case"               — snake_case naming used (underscores)
 *   "screaming-snake-case"     — SCREAMING_SNAKE_CASE naming used
 *   "dot-notation"             — dot-separated name (illegal in XML names)
 *   "mixed-case"               — inconsistent casing within a name
 *
 * ── Characters ──────────────────────────────────────────────────────────────
 *   "null-byte"                — null character (#x0), always illegal
 *   "c0-control"               — C0 control character (#x1–#x1F)
 *   "illegal-char"             — character illegal in this XML version
 *   "bare-lt"                  — literal < outside markup
 *   "bare-ampersand"           — literal & not starting an entity reference
 *   "unicode"                  — relates to Unicode code points above ASCII
 *
 * ── Attributes ──────────────────────────────────────────────────────────────
 *   "attribute"                — violation is in an attribute
 *   "duplicate-attribute"      — same attribute name appears twice
 *   "unquoted-value"           — attribute value not wrapped in quotes
 *   "bare-lt-in-value"         — literal < inside an attribute value
 *
 * ── Namespaces ──────────────────────────────────────────────────────────────
 *   "namespace"                — relates to XML Namespaces
 *   "namespace-prefix"         — violation in a namespace prefix
 *   "namespace-undeclared"     — prefix used without a prior xmlns: declaration
 *   "namespace-uri"            — violation in a namespace URI
 *   "default-namespace"        — relates to the default namespace (xmlns=...)
 *   "xmlns-reserved"           — xmlns and xml prefixes are reserved
 *
 * ── DTD ─────────────────────────────────────────────────────────────────────
 *   "dtd"                      — relates to Document Type Declarations
 *   "doctype"                  — DOCTYPE declaration
 *   "entity"                   — entity declaration or reference
 *   "element-declaration"      — ELEMENT declaration in DTD
 *   "attlist-declaration"      — ATTLIST declaration in DTD
 *   "notation"                 — NOTATION declaration in DTD
 *
 * ── Processing & Comments ────────────────────────────────────────────────────
 *   "processing-instruction"   — relates to <?...?> processing instructions
 *   "comment"                  — relates to <!-- --> comments
 *   "cdata"                    — relates to <![CDATA[...]]> sections
 *   "xml-declaration"          — relates to the <?xml version=...?> declaration
 *
 * ── Version-specific ─────────────────────────────────────────────────────────
 *   "xml-1.0-only"             — violation is specific to XML 1.0 rules
 *   "xml-1.1-only"             — violation is specific to XML 1.1 rules
 *   "xml-1.1-relaxed"          — XML 1.1 relaxes this restriction from 1.0
 */
export type XmlTag =
  // Structural
  | "well-formedness"
  | "single-root"
  | "nesting"
  | "unclosed-tag"
  | "mismatched-tag"
  | "content-after-root"
  // Names
  | "element-name"
  | "attribute-name"
  | "name-start-char"
  | "name-char"
  | "xml-reserved"
  | "naming-convention"
  | "camel-case"
  | "pascal-case"
  | "kebab-case"
  | "snake-case"
  | "screaming-snake-case"
  | "dot-notation"
  | "mixed-case"
  // Characters
  | "null-byte"
  | "c0-control"
  | "illegal-char"
  | "bare-lt"
  | "bare-ampersand"
  | "unicode"
  // Attributes
  | "attribute"
  | "duplicate-attribute"
  | "unquoted-value"
  | "bare-lt-in-value"
  // Namespaces
  | "namespace"
  | "namespace-prefix"
  | "namespace-undeclared"
  | "namespace-uri"
  | "default-namespace"
  | "xmlns-reserved"
  // DTD
  | "dtd"
  | "doctype"
  | "entity"
  | "element-declaration"
  | "attlist-declaration"
  | "notation"
  // Processing & Comments
  | "processing-instruction"
  | "comment"
  | "cdata"
  | "xml-declaration"
  // Version-specific
  | "xml-1.0-only"
  | "xml-1.1-only"
  | "xml-1.1-relaxed";

export interface XmlMeta {
  /** Scenario name this case belongs to, e.g. "invalid-names" */
  scenario: string;
  /** Spec document and section, e.g. "XML 1.0 §2.3" */
  spec: string;
  /** Machine-readable rule identifier, e.g. "name-cannot-start-with-digit" */
  rule: string;
  /** Line number where the problem occurs (1-based) */
  line: number;
  /** Column number where the problem occurs (1-based) */
  col: number;
  /**
   * Classification tags for filtering.
   * A case may carry multiple tags.
   */
  tags?: XmlTag[];
  /** Optional human note for tricky or context-dependent cases */
  note?: string;
}

export interface XmlCase {
  /** The XML string input to be fed to the parser under test */
  input: string;
  meta: XmlMeta;
}

export interface XmlScenario {
  name: string;
  cases: XmlCase[];
}

export interface FilterOptions {
  /** Filter to cases where meta.scenario exactly matches */
  scenario?: string;
  /** Filter to cases where meta.rule exactly matches */
  rule?: string;
  /** Filter to cases that have ALL of the given tags */
  tags?: XmlTag[];
  /** Filter to cases that have AT LEAST ONE of the given tags */
  anyTag?: XmlTag | XmlTag[];
}

/**
 * Filter cases across one or more scenarios.
 *
 * @example
 * import { filterCases }  from "@byspec/xml";
 * import { scenarios }    from "@byspec/xml/1.0";
 *
 * const namesCases  = filterCases(scenarios, { tags: ["element-name"] });
 * const reserved    = filterCases(scenarios, { tags: ["xml-reserved"] });
 * const nameOrAttr  = filterCases(scenarios, { anyTag: ["element-name", "attribute-name"] });
 */
export declare function filterCases(
  scenarios: XmlScenario[],
  opts?: FilterOptions
): XmlCase[];
