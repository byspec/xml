/**
 * @byspec/xml/1.1
 *
 * XML 1.1 scenarios. The following scenarios are identical to XML 1.0
 * and are re-exported unchanged:
 *   - invalid-names
 *   - invalid-attributes
 *   - malformed-structure
 *   - xml-declaration (version values differ but the structural rules are shared)
 *   - comments
 *   - processing-instructions
 *   - cdata
 *   - entity-references
 *
 * The invalid-chars scenario is XML 1.1-specific (C0 controls, NEL, LS).
 */

export { invalidNames }           from "../1.0/scenarios/invalid-names.js";
export { invalidChars }           from "./scenarios/invalid-chars.js";
export { invalidAttributes }      from "../1.0/scenarios/invalid-attributes.js";
export { malformedStructure }     from "../1.0/scenarios/malformed-structure.js";
export { xmlDeclaration }         from "../1.0/scenarios/xml-declaration.js";
export { comments }               from "../1.0/scenarios/comments.js";
export { processingInstructions } from "../1.0/scenarios/processing-instructions.js";
export { cdata }                  from "../1.0/scenarios/cdata.js";
export { entityReferences }       from "../1.0/scenarios/entity-references.js";

import { invalidNames }           from "../1.0/scenarios/invalid-names.js";
import { invalidChars }           from "./scenarios/invalid-chars.js";
import { invalidAttributes }      from "../1.0/scenarios/invalid-attributes.js";
import { malformedStructure }     from "../1.0/scenarios/malformed-structure.js";
import { xmlDeclaration }         from "../1.0/scenarios/xml-declaration.js";
import { comments }               from "../1.0/scenarios/comments.js";
import { processingInstructions } from "../1.0/scenarios/processing-instructions.js";
import { cdata }                  from "../1.0/scenarios/cdata.js";
import { entityReferences }       from "../1.0/scenarios/entity-references.js";

/** All XML 1.1 scenarios */
export const scenarios = [
  invalidNames,
  invalidChars,
  invalidAttributes,
  malformedStructure,
  xmlDeclaration,
  comments,
  processingInstructions,
  cdata,
  entityReferences
];
