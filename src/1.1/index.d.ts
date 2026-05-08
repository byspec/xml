/**
 * @byspec/xml/1.1
 *
 * XML 1.1 specification scenarios.
 * Most scenarios are re-exported from @byspec/xml/1.0 unchanged.
 * Only invalid-chars is XML 1.1-specific.
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

/** All XML 1.1 scenarios in order */
export declare const scenarios: XmlScenario[];
