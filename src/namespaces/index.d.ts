/**
 * @byspec/xml/namespaces
 *
 * Namespaces in XML 1.0 specification scenarios.
 */
export type { XmlTag, XmlMeta, XmlCase, XmlScenario, FilterOptions } from "../index.js";
export { filterCases } from "../index.js";

import type { XmlScenario } from "../index.js";

export declare const invalidPrefixes: XmlScenario;
export declare const invalidNamespaceNames: XmlScenario;

/** All Namespace scenarios in order: invalid-prefixes, invalid-namespace-names */
export declare const scenarios: XmlScenario[];
