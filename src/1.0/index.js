export { invalidNames }           from "./scenarios/invalid-names.js";
export { invalidChars }           from "./scenarios/invalid-chars.js";
export { invalidAttributes }      from "./scenarios/invalid-attributes.js";
export { malformedStructure }     from "./scenarios/malformed-structure.js";
export { xmlDeclaration }         from "./scenarios/xml-declaration.js";
export { comments }               from "./scenarios/comments.js";
export { processingInstructions } from "./scenarios/processing-instructions.js";
export { cdata }                  from "./scenarios/cdata.js";
export { entityReferences }       from "./scenarios/entity-references.js";

import { invalidNames }           from "./scenarios/invalid-names.js";
import { invalidChars }           from "./scenarios/invalid-chars.js";
import { invalidAttributes }      from "./scenarios/invalid-attributes.js";
import { malformedStructure }     from "./scenarios/malformed-structure.js";
import { xmlDeclaration }         from "./scenarios/xml-declaration.js";
import { comments }               from "./scenarios/comments.js";
import { processingInstructions } from "./scenarios/processing-instructions.js";
import { cdata }                  from "./scenarios/cdata.js";
import { entityReferences }       from "./scenarios/entity-references.js";

/**
 * All XML 1.0 scenarios, in order:
 * invalid-names, invalid-chars, invalid-attributes, malformed-structure,
 * xml-declaration, comments, processing-instructions, cdata, entity-references
 */
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
