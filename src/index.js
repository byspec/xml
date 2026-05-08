/**
 * @byspec/xml — root entry point
 *
 * Re-exports the shared filterCases utility. For scenario data, import
 * from the sub-paths directly:
 *
 *   import { scenarios } from "@byspec/xml/1.0";
 *   import { scenarios } from "@byspec/xml/1.1";
 *   import { scenarios } from "@byspec/xml/namespaces";
 *   import { scenarios } from "@byspec/xml/dtd";
 */
export { filterCases } from "./filter.js";
