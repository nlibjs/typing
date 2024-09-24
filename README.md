# @nlib/typing

A tool for generating and managing TypeScript type definitions efficiently.

[![test](https://github.com/nlibjs/typing/actions/workflows/test.yml/badge.svg)](https://github.com/nlibjs/typing/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/nlibjs/typing/graph/badge.svg?token=msEnyrNAzF)](https://codecov.io/gh/nlibjs/typing)
[![JSR](https://jsr.io/badges/@nlib/typing)](https://jsr.io/@nlib/typing)

```typescript
import {
  typeChecker,
  isString,
  isNonNegativeSafeInteger,
  ensure,
} from '@nlib/typing';

/** typeChecker defines a schema */
const isMyObject = typeChecker({
  id: isString,
  name: isString,
  age: isNonNegativeSafeInteger,
});

/**
 * TypeChecker is a [type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
 * `(input: unknown) => input is {id: string, name: string, age: number}`
 */
console.info(isMyObject({ id: '001', name: 'a', age: 1 })); // → true
console.info(isMyObject({ id: '001', name: 'a' })); // → false

/** You can handle a response with confidence */
const response = await fetch('/myobjects/001');
const result = ensure(await response.json(), isMyObject);
console.info(result.id, result.name, result.age);

/** TypeCheckers has some derivations: `.array`, `.dictionary`, `.optional` */
const response2 = await fetch('/myobjects');
const result = ensure(await response2.json(), isMyObject.array);
console.info(result); // → [{id: '001', name: 'a', age: 1}, ...]

const dictionary = {
  a: { id: '001', name: 'a', age: 1 },
  b: { id: '002', name: 'b', age: 2 },
  c: { id: '003', name: 'c', age: 3 },
};
isMyObject.dictionary(dictionary); // → true

const isMyObject2 = typeChecker({
  title: isString,
  /** object is {id: string, name: string, age: number} | undefined */
  object: isMyObject.optional,
});

/** You can extend an existing schema */
const isExtendedMyObject = typeChecker({
  ...isMyObject.definition,
  description: isString,
});
```
