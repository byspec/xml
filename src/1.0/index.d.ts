/**
 * @byspec/xml/1.0
 *
 * XML 1.0 specification scenarios.
 */
export type { XmlTag, XmlMeta, XmlCase, XmlScenario, FilterOptions } from "../index.js";
export { filterCases } from "../index.js";

import type { XmlScenario } from "../index.js";

export declare const invalidNames: XmlScenario;
export declare const invalidChars: XmlScenario;
export declare const invalidAttributes: XmlScenario;
export declare const malformedStructure: XmlScenario;
export declare const xmlDeclaration: XmlScenario;
export declare const comments: XmlScenario;
export declare const processingInstructions: XmlScenario;
export declare const cdata: XmlScenario;
export declare const entityReferences: XmlScenario;

/**
 * All XML 1.0 scenarios in order:
 * invalid-names, invalid-chars, invalid-attributes, malformed-structure,
 * xml-declaration, comments, processing-instructions, cdata, entity-references
 */
export declare const scenarios: XmlScenario[];
