/**
 * @byspec/xml/namespaces
 *
 * Namespaces in XML 1.0 (Second Edition) specification scenarios.
 *
 * Namespace processing is layered on top of XML 1.0 well-formedness.
 * A document may be well-formed XML 1.0 but still violate namespace constraints.
 * These cases specifically target the namespace layer:
 *   - undeclared prefixes
 *   - reserved prefix re-binding
 *   - QName structural rules (NCName:NCName)
 *   - attribute uniqueness under namespace expansion
 */

export { invalidPrefixes }       from "./scenarios/invalid-prefixes.js";
export { invalidNamespaceNames } from "./scenarios/invalid-namespace-names.js";

import { invalidPrefixes }       from "./scenarios/invalid-prefixes.js";
import { invalidNamespaceNames } from "./scenarios/invalid-namespace-names.js";

/** All Namespace scenarios */
export const scenarios = [
  invalidPrefixes,
  invalidNamespaceNames
];
