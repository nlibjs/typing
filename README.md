# @nlib/typing

**TypeScript types that actually work at runtime.**

Stop writing your types twice. `@nlib/typing` lets you define the shape of your data **once** — and use it for both compile-time type safety and runtime validation. No more keeping Zod schemas in sync with your interfaces. No more manual type guards that go stale.

```typescript
// Define once...
const isUser = typeChecker({ id: isPositiveSafeInteger, name: isString });

// ...use as a type guard
if (isUser(data)) { /* data is User here */ }

// ...use for safe API responses
const user = ensure(await response.json(), isUser); // throws with a clear message if invalid
```

**Why @nlib/typing?**

- **Single source of truth** — One definition drives both TypeScript types and runtime checks
- **Rich built-in validators** — Email addresses, UUIDs, IPv4/IPv6, HTTP methods, Base64, URLs, and more — all with branded types for extra compile-time safety
- **Recursive types** — Model trees and self-referencing structures with a simple getter pattern
- **Works everywhere** — Node.js, Deno, and browsers (via esm.sh CDN)
- **Zero runtime overhead** — Results are cached via `WeakMap`; the same definition always returns the same checker instance
- **Descriptive errors** — `ensure()` throws with the exact property path that failed validation

[![NPM Version](https://img.shields.io/npm/v/%40nlib%2Ftyping)](https://www.npmjs.com/package/@nlib/typing)
[![JSR](https://jsr.io/badges/@nlib/typing)](https://jsr.io/@nlib/typing)
[![test](https://github.com/nlibjs/typing/actions/workflows/test.yml/badge.svg)](https://github.com/nlibjs/typing/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/nlibjs/typing/graph/badge.svg?token=msEnyrNAzF)](https://codecov.io/gh/nlibjs/typing)

```
npm install @nlib/typing
```

```
deno add jsr:@nlib/typing
```

```typescript
import { typeChecker } from "@nlib/typing"
// Deno
import { typeChecker } from "jsr:@nlib/typing";
// Web
import { typeChecker } from 'https://esm.sh/@nlib/typing@3.0.0';
```

Bundle-sensitive applications can import the small core surface and individual
checkers without loading the root barrel:

```typescript
import { typeChecker, validate } from "@nlib/typing/core";
import { isUUIDLowercase } from "@nlib/typing/is/UUIDLowercase";

const isRequest = typeChecker({ id: isUUIDLowercase }, "Request");
const result = validate(
  { id: "123e4567-e89b-12d3-a456-426614174000" },
  isRequest,
);
```

## Usage

```typescript
import * as assert from "node:assert";
import {
  type Nominal,
  type NarrowingIssue,
  type TypeGuard,
  typeChecker,
  ensure,
  fromDiagnosis,
  narrow,
  union,
  validate,
  validateAll,
  ValidationIssueCode,
  isString,
  isPositiveSafeInteger,
  isArrayOf,
  isDictionaryOf,
  isObjectWith,
  isOptionalOf,
} from "@nlib/typing";

// For example, there is a interface named User.
interface User {
  id: number;
  name: string;
}

// You can create a TypeChecker for User with typeChecker().
const isUser = typeChecker({
  id: isPositiveSafeInteger,
  name: isString,
});
// typeChecker<T>() returns TypeChecker<T> which is a type guard for T.
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
// i.e. TypeChecker<User> is (value: unknown) => value is User
assert.equal(isUser({ id: 1, name: "a" }), true);
assert.equal(isUser({ id: "1", name: "a" }), false);

// narrow composes a base TypeGuard with a reusable subtype predicate.
type EmailAddress = Nominal<string, "EmailAddress">;
const hasEmailAddressSyntax = (value: string): value is EmailAddress =>
  /^[^@]+@[^@]+$/.test(value);
const isContactEmail = narrow(isString, hasEmailAddressSyntax, () => [
  {
    code: "invalid_email_address",
    expected: "an email address containing @",
  },
]);
assert.equal(isContactEmail("ada@example.com"), true);
assert.deepEqual(validate("invalid", isContactEmail), {
  ok: false,
  issue: {
    path: [],
    code: "invalid_email_address",
    expected: "an email address containing @",
  },
});

// fromDiagnosis makes one generator the source of truth for both the boolean
// constraint and detailed structured-validation issues.
type Title = Nominal<string, "Title">;
function* diagnoseTitle(
  value: string,
  returnIssue?: NarrowingIssue,
): Iterable<NarrowingIssue> {
  const length = Array.from(value).length;
  if (length === 0) {
    yield returnIssue ?? {
      code: "too_short",
      expected: "at least 1 code point",
    };
  }
  if (100 < length) {
    yield returnIssue ?? {
      code: "too_long",
      expected: "at most 100 code points",
    };
  }
}
const isTitle: TypeGuard<Title> = typeChecker(
  narrow(isString, fromDiagnosis(diagnoseTitle)),
  "Title",
);
assert.equal(isTitle("A title"), true);
assert.equal(isTitle(""), false);

// Diagnosis paths are relative to the narrowed value. Structural checkers
// prefix them, and validateAll preserves every issue in iteration order.
type OrderedRange = { min: number; max: number } & {
  readonly orderedRange: unique symbol;
};
const isNumber = (input: unknown): input is number =>
  typeof input === "number";
const isRange = typeChecker({ min: isNumber, max: isNumber });
const hasOrderedBounds = (
  range: { min: number; max: number },
): range is OrderedRange => range.min <= range.max;
const isOrderedRange = narrow(isRange, hasOrderedBounds, () => [
  { path: ["min"], code: "range_min_after_max" },
  { path: ["max"], code: "range_max_before_min" },
]);
const isConfig = typeChecker({ range: isOrderedRange });
assert.deepEqual(validateAll({ range: { min: 2, max: 1 } }, isConfig), {
  ok: false,
  issues: [
    { path: ["range", "min"], code: "range_min_after_max" },
    { path: ["range", "max"], code: "range_max_before_min" },
  ],
});

// union OR-combines any TypeGuards and infers their guarded union.
const isCircle = typeChecker({
  kind: new Set(["circle"] as const),
  radius: isPositiveSafeInteger,
});
const isSquare = typeChecker({
  kind: new Set(["square"] as const),
  side: isPositiveSafeInteger,
});
const isShape = union(isCircle, isSquare);
assert.equal(isShape({ kind: "circle", radius: 2 }), true);
assert.equal(isShape({ kind: "triangle", side: 2 }), false);

// API responses commonly contain additional fields, so validate this one as
// an open shape with isObjectWith().
const isUserResponse = isObjectWith({
  id: isPositiveSafeInteger,
  name: isString,
});
const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
const member = ensure(await response.json(), isUserResponse);
console.info(`member.id: ${member.id}`);
console.info(`member.name: ${member.name}`);

// validate returns the first machine-readable issue without throwing.
const validation = validate({ id: "1", name: "a" }, isUser);
assert.deepEqual(validation, {
  ok: false,
  issue: {
    path: ["id"],
    code: ValidationIssueCode.GuardFailed,
    expected: "TypeChecker<isPositiveSafeInteger>",
    actualType: "String",
  },
});

// validateAll collects every issue discoverable in structural checkers.
const allValidation = validateAll({ id: "1", name: 1 }, isUser);
assert.equal(allValidation.ok, false);
if (!allValidation.ok) {
  assert.deepEqual(
    allValidation.issues.map((issue) => issue.path),
    [["id"], ["name"]],
  );
}

// Exact objects report additional fields at their concrete paths.
assert.deepEqual(validate({ id: 1, name: "a", admin: true }, isUser), {
  ok: false,
  issue: {
    path: ["admin"],
    code: ValidationIssueCode.UnexpectedProperty,
    expected: "no additional properties",
    actualType: "Boolean",
  },
});

// isArrayOf returns TypeChecker<Array<T>>.
const isUserArray = isArrayOf(isUser);
assert.equal(
  isUserArray([
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c" },
  ]),
  true,
);

// isDictionaryOf returns TypeChecker<Record<string, T>>.
const isUserDictionary = isDictionaryOf(isUser);
assert.equal(
  isUserDictionary({
    a: { id: 1, name: "a" },
    b: { id: 2, name: "b" },
    c: { id: 3, name: "c" },
  }),
  true,
);

// isOptionalOf returns TypeChecker<T | undefined>.
const isItem = typeChecker({
  id: isPositiveSafeInteger,
  name: isOptionalOf(isString),
});
assert.equal(isItem({ id: 1 }), true);
assert.equal(isItem({ id: 1, name: "a" }), true);
assert.equal(isItem({ id: 1, name: 1 }), false);

// Object definitions are exact by default. Unknown fields are rejected.
assert.equal(isUser({ id: 1, name: "a", admin: true }), false);

// isObjectWith keeps open-shape matching when additional fields are expected.
assert.equal(isUserResponse({ id: 1, name: "a", admin: true }), true);

// Example: Tree structure
interface Node {
  id: string;
  children?: Array<Node>;
}
const isNode = typeChecker({
  // You can use regular expression for defining a string pattern.
  id: /^[0-9a-z]+$/,
  // You can't use isNode here because isNode is not defined yet.
  // Use getter for recursive type definition.
  get children() {
    return isOptionalOf(isArrayOf(isNode));
  },
});
assert.equal(isNode({ id: "a" }), true);
assert.equal(isNode({ id: "a", children: [] }), true);
assert.equal(isNode({ id: "a", children: [{ id: "b" }] }), true);
assert.equal(
  isNode({ id: "a", children: [{ id: "b", children: [{ id: "c" }] }] }),
  true,
);
assert.equal(
  isNode({ id: "a", children: [{ id: "b", children: [{ id: "C" }] }] }),
  // id: "C" is invalid because it is not lowercase.
  false,
);
```
