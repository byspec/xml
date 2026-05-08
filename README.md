# @byspec/xml

Spec-anchored XML test cases for parsers and validators.

Each case provides a **string input**, machine-readable metadata pointing back to the exact specification clause, and classification **tags** for filtering. Consuming libraries use these cases to verify they handle every XML edge case — and to know which ones they are deliberately skipping.

---

## Installation

```sh
npm install --save-dev @byspec/xml
```

---

## Design contract

- **All inputs are strings.** The library is designed for testing parsers, not for evaluating XML at runtime. Feed `c.input` to your parser and inspect what it does.

- **Cases describe violations — and valid contrasts.** Most cases document inputs that a conformant XML parser must reject. Some cases (tagged with rules like `*-is-valid`) document inputs that are syntactically legal, to contrast against nearby illegal ones. Your parser should accept those.

- **Each module is independent.** Import only what your domain requires.

- **`filterCases` is the primary API for selecting subsets.** Use tags to express cross-cutting concerns like "all namespace violations" or "all naming-convention cases".

---

## Modules

### `@byspec/xml/1.0`

Covers the [XML 1.0 (Fifth Edition)](https://www.w3.org/TR/xml/) specification.

| Scenario | Description |
|---|---|
| `invalid-names` | Element names that violate §2.3 NameStartChar/NameChar production rules; naming conventions documented |
| `invalid-chars` | Characters illegal in XML 1.0 content per §2.2; C0 controls, surrogates, `#xFFFE`/`#xFFFF`, bare `<` and `&` |
| `invalid-attributes` | Attribute name violations, duplicate attributes, unquoted values, bare `<`/`&` in values (§3.1) |
| `malformed-structure` | Well-formedness violations: improper nesting, unclosed tags, multiple roots, content after root (§2.1) |
| `xml-declaration` | `<?xml ...?>` declaration errors: wrong position, missing version, bad ordering of pseudo-attributes (§2.8) |
| `comments` | Comment violations: `--` inside comment, `-->` close rules (§2.5) |
| `processing-instructions` | PI violations: reserved `xml` target, `?>` in data, missing target (§2.6) |
| `cdata` | CDATA section violations: `]]>` inside section, CDATA outside element content (§2.7) |
| `entity-references` | Malformed or undeclared entity references; predefined entities and character references (§4.1, §4.6) |

### `@byspec/xml/1.1`

Covers [XML 1.1 (Second Edition)](https://www.w3.org/TR/xml11/) differences from 1.0.

Re-exports all scenarios from `@byspec/xml/1.0` unchanged, with a version-specific `invalid-chars` replacing the 1.0 one.

| Scenario | Source | Notes |
|---|---|---|
| `invalid-names` | shared from 1.0 | Identical rules |
| `invalid-chars` | 1.1-specific | C0 controls allowed via reference; `#x0B`/`#x0C` legal as literals; NEL/LS valid EOL |
| `invalid-attributes` | shared from 1.0 | |
| `malformed-structure` | shared from 1.0 | |
| `xml-declaration` | shared from 1.0 | |
| `comments` | shared from 1.0 | |
| `processing-instructions` | shared from 1.0 | |
| `cdata` | shared from 1.0 | |
| `entity-references` | shared from 1.0 | |

### `@byspec/xml/namespaces`

Covers [Namespaces in XML 1.0 (Third Edition)](https://www.w3.org/TR/xml-names/).

| Scenario | Description |
|---|---|
| `invalid-prefixes` | Undeclared prefixes, reserved `xmlns`/`xml` prefix misuse, empty URI for prefixed namespace |
| `invalid-namespace-names` | QName structural violations, duplicate attributes under namespace expansion, naming convention cases |

### `@byspec/xml/dtd`

Covers the DTD layer: DOCTYPE (§2.8), ELEMENT (§3.2), ATTLIST (§3.3), ENTITY (§4.2), NOTATION (§4.7).

| Scenario | Description |
|---|---|
| `dtd-declarations` | DOCTYPE placement, ELEMENT/ATTLIST/ENTITY/NOTATION declaration errors |

---

## Usage

### Running all cases in a scenario

```js
import { invalidNames } from "@byspec/xml/1.0";

for (const c of invalidNames.cases) {
  const result = myParser(c.input);
  if (result.valid) {
    console.error(`FAIL [${c.meta.rule}] expected rejection of: ${c.input}`);
  }
}
```

### Iterating all scenarios at once

```js
import { scenarios } from "@byspec/xml/1.0";
import { scenarios as nsScenarios } from "@byspec/xml/namespaces";

for (const scenario of [...scenarios, ...nsScenarios]) {
  for (const c of scenario.cases) {
    // cases with a rule ending in "-is-valid" are expected to parse successfully
    const expectValid = c.meta.rule.endsWith("-is-valid");
    const result = myParser(c.input);
    if (expectValid !== result.valid) {
      console.error(`FAIL [${c.meta.rule}] input="${c.input}"`);
    }
  }
}
```

### Filtering cases by tag

The `filterCases` utility selects cases across scenarios by tag, rule, or scenario name.

```js
import { filterCases }  from "@byspec/xml";
import { scenarios }    from "@byspec/xml/1.0";
import { scenarios as nsScenarios } from "@byspec/xml/namespaces";

const all = [...scenarios, ...nsScenarios];

// All well-formedness violations
const wfCases = filterCases(all, { tags: ["well-formedness"] });

// All element name violations
const nameCases = filterCases(all, { tags: ["element-name"] });

// All naming-convention documented cases (camelCase, PascalCase, etc.)
const conventions = filterCases(all, { tags: ["naming-convention"] });

// Only cases that are 1.1-relaxed (legal in 1.1, illegal in 1.0)
const relaxed = filterCases(scenarios, { tags: ["xml-1.1-relaxed"] });

// Namespace violations only
const nsCases = filterCases(nsScenarios, { tags: ["namespace"] });

// Attribute violations using OR logic
const attrCases = filterCases(all, { anyTag: ["attribute-name", "duplicate-attribute", "unquoted-value"] });

// Cases for a specific scenario
const malformedCases = filterCases(scenarios, { scenario: "malformed-structure" });

// Cases for a specific rule
const xmlReserved = filterCases(all, { rule: "name-starting-with-xml-is-reserved" });
```

### Filtering cases directly with `.filter()`

The `cases` array is a plain array, so `.filter()` and `.find()` work directly:

```js
import { invalidNames } from "@byspec/xml/1.0";

// All cases at column 2 (error at the element name start)
const atNameStart = invalidNames.cases.filter(c => c.meta.col === 2);

// Find a specific rule
const digitStart = invalidNames.cases.find(c => c.meta.rule === "name-cannot-start-with-digit");
```

### Handling cases your parser intentionally treats differently

```js
import { scenarios } from "@byspec/xml/1.0";
import { filterCases } from "@byspec/xml";

// A lenient parser that accepts camelCase names but rejects digit-start
const validByConvention = new Set(["camel-case-name-is-valid", "pascal-case-name-is-valid"]);

for (const c of scenarios[0].cases) { // invalidNames
  if (validByConvention.has(c.meta.rule)) {
    // My parser accepts this — it is syntactically valid XML
    expect(myParser(c.input).valid).toBe(true);
  } else {
    expect(myParser(c.input).valid).toBe(false);
  }
}
```

---

## Naming Conventions

XML element and attribute names are case-sensitive and allow several common naming conventions. The `invalid-names` and `invalid-attributes` scenarios include cases documenting which conventions are syntactically legal:

| Convention | Example | Legal in XML? | Tag |
|---|---|---|---|
| `camelCase` | `<myElement>` | ✅ Yes | `camel-case` |
| `PascalCase` | `<MyElement>` | ✅ Yes | `pascal-case` |
| `kebab-case` | `<my-element>` | ✅ Yes | `kebab-case` |
| `snake_case` | `<my_element>` | ✅ Yes | `snake-case` |
| `SCREAMING_SNAKE` | `<MY_ELEMENT>` | ✅ Yes | `screaming-snake-case` |
| `_private` | `<_internal>` | ✅ Yes | _(underscore start)_ |
| `dot.notation` | `<com.example>` | ✅ Yes | `dot-notation` |
| `1digit-start` | `<1tag>` | ❌ No | `name-start-char` |
| `-hyphen-start` | `<-tag>` | ❌ No | `name-start-char` |
| `xml` prefix | `<xmlFoo>` | ❌ No | `xml-reserved` |

---

## `filterCases(scenarios, opts?)`

```js
import { filterCases } from "@byspec/xml";
```

**Parameters**

| Option | Type | Logic | Description |
|---|---|---|---|
| `scenario` | `string` | exact match | Filter by `meta.scenario` name |
| `rule` | `string` | exact match | Filter by `meta.rule` identifier |
| `tags` | `string[]` | ALL must match | Case must carry every tag listed |
| `anyTag` | `string \| string[]` | ANY must match | Case must carry at least one of the tags |

Omit `opts` (or pass `{}`) to get all cases across all provided scenarios.

---

## Tags

Every case carries `meta.tags?: XmlTag[]`. The full tag vocabulary:

### Structural
| Tag | Meaning |
|---|---|
| `well-formedness` | Violates XML well-formedness rules |
| `single-root` | Document must have exactly one root element |
| `nesting` | Improper tag nesting or interleaving |
| `unclosed-tag` | Tag opened but never closed |
| `mismatched-tag` | Open and close tag names do not match |
| `content-after-root` | Content appears after the root element closes |

### Names
| Tag | Meaning |
|---|---|
| `element-name` | Violation is in an element (tag) name |
| `attribute-name` | Violation is in an attribute name |
| `name-start-char` | Illegal character in the first position of a name |
| `name-char` | Illegal character in a subsequent name position |
| `xml-reserved` | Name starts with "xml" (case-insensitive) — reserved by W3C |
| `naming-convention` | Relates to camelCase, PascalCase, kebab-case, etc. |
| `camel-case` | camelCase naming |
| `pascal-case` | PascalCase naming |
| `kebab-case` | kebab-case naming (hyphens) |
| `snake-case` | snake_case naming (underscores) |
| `screaming-snake-case` | SCREAMING_SNAKE_CASE naming |
| `dot-notation` | Dot-separated name |
| `mixed-case` | Inconsistent casing within a name |

### Characters
| Tag | Meaning |
|---|---|
| `null-byte` | Null character (#x0), always illegal |
| `c0-control` | C0 control character (#x1–#x1F) |
| `illegal-char` | Character illegal in this XML version |
| `bare-lt` | Literal `<` outside markup |
| `bare-ampersand` | Literal `&` not starting an entity reference |
| `unicode` | Relates to Unicode code points (surrogates, non-characters) |

### Attributes
| Tag | Meaning |
|---|---|
| `attribute` | Violation is in an attribute |
| `duplicate-attribute` | Same attribute name appears twice in one element |
| `unquoted-value` | Attribute value not wrapped in quotes |
| `bare-lt-in-value` | Literal `<` inside an attribute value |

### Namespaces
| Tag | Meaning |
|---|---|
| `namespace` | Relates to XML Namespaces |
| `namespace-prefix` | Violation in a namespace prefix |
| `namespace-undeclared` | Prefix used without a prior `xmlns:` declaration |
| `namespace-uri` | Violation in a namespace URI |
| `default-namespace` | Relates to the default namespace (`xmlns=...`) |
| `xmlns-reserved` | `xmlns` and `xml` prefixes are reserved |

### DTD
| Tag | Meaning |
|---|---|
| `dtd` | Relates to Document Type Declarations |
| `doctype` | DOCTYPE declaration |
| `entity` | Entity declaration or reference |
| `element-declaration` | ELEMENT declaration in DTD |
| `attlist-declaration` | ATTLIST declaration in DTD |
| `notation` | NOTATION declaration in DTD |

### Processing & Comments
| Tag | Meaning |
|---|---|
| `processing-instruction` | Relates to `<?...?>` processing instructions |
| `comment` | Relates to `<!-- -->` comments |
| `cdata` | Relates to `<![CDATA[...]]>` sections |
| `xml-declaration` | Relates to the `<?xml version=...?>` declaration |

### Version-specific
| Tag | Meaning |
|---|---|
| `xml-1.0-only` | Violation is specific to XML 1.0 rules |
| `xml-1.1-only` | Violation is specific to XML 1.1 rules |
| `xml-1.1-relaxed` | XML 1.1 relaxes this restriction from 1.0 |

---

## TypeScript

Types are exported from each entry point:

```ts
import type { XmlCase, XmlScenario, XmlMeta, XmlTag, FilterOptions }
  from "@byspec/xml";
```

Key types:

```ts
interface XmlMeta {
  scenario: string;   // e.g. "invalid-names"
  spec: string;       // e.g. "XML 1.0 §2.3"
  rule: string;       // e.g. "name-cannot-start-with-digit"
  line: number;       // 1-based line where the violation occurs
  col: number;        // 1-based column where the violation occurs
  tags?: XmlTag[];    // cross-cutting classification
  note?: string;      // human explanation for tricky cases
}

interface XmlCase {
  input: string;      // always a string — feed to your parser
  meta: XmlMeta;
}
```

---

## Specification references

- [XML 1.0 (Fifth Edition)](https://www.w3.org/TR/xml/) — §2.1 (well-formedness), §2.2 (characters), §2.3 (names), §2.4 (content), §2.5 (comments), §2.6 (PIs), §2.7 (CDATA), §2.8 (prolog/DOCTYPE), §3.1 (attributes), §3.2 (ELEMENT), §3.3 (ATTLIST), §4.1 (entity references), §4.2 (entity declarations), §4.6 (predefined entities), §4.7 (NOTATION)
- [XML 1.1 (Second Edition)](https://www.w3.org/TR/xml11/) — §2.2 (characters), §2.11 (end-of-line handling)
- [Namespaces in XML 1.0 (Third Edition)](https://www.w3.org/TR/xml-names/) — §2 (QNames, NCNames), §3 (declaring namespaces)
