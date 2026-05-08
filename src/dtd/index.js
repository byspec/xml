/**
 * @byspec/xml/dtd
 *
 * XML 1.0 Document Type Declaration scenarios.
 *
 * Covers the DOCTYPE declaration (§2.8), ELEMENT declarations (§3.2),
 * ATTLIST declarations (§3.3), ENTITY declarations (§4.2), and
 * NOTATION declarations (§4.7).
 *
 * DTD validation is distinct from well-formedness — a document can be
 * well-formed XML without a DTD. These cases target the DTD layer only.
 */

export { dtdDeclarations } from "./scenarios/dtd-declarations.js";

import { dtdDeclarations } from "./scenarios/dtd-declarations.js";

/** All DTD scenarios */
export const scenarios = [dtdDeclarations];
