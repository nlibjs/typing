# Changelog

## v4.0.2 (2026-10-11)

### Bug Fixes

- keep the isArrayOf hole check within the bundle budget ([bba1742](https://github.com/nlibjs/typing/commit/bba174251c74b8b66a07e26ba7683756ce669b24))
- check sparse-array holes in the isArrayOf type guard ([43904af](https://github.com/nlibjs/typing/commit/43904af416b277c018477dd4e4af80d33f85cd2c))
- accept shared objects in boolean object guards ([c06fd0e](https://github.com/nlibjs/typing/commit/c06fd0e050765e68a1ef1595f8f27d9cf36f9c26))
- make global and sticky RegExp checkers deterministic ([badae9f](https://github.com/nlibjs/typing/commit/badae9f517801ddf5d73bd1c41fda266764dece9))

### Documentation

- add a license badge and align badge labels ([77009fb](https://github.com/nlibjs/typing/commit/77009fbe20a233ad66f6bab5b015629f46c9cede))

### Continuous Integration

- stage npm releases for maintainer approval ([c1443c4](https://github.com/nlibjs/typing/commit/c1443c4b2886458cbd67229a4f42afa73a764be9))
- disable dependency caching for npm trusted publishing ([c686f64](https://github.com/nlibjs/typing/commit/c686f64ca5a2b9beecdf199e660e028864a0b0ae))
- publish to npm with Trusted Publishing ([d50d74b](https://github.com/nlibjs/typing/commit/d50d74b49fb45f5ecde3320a6cf0cb3d9820f8a1))


## v4.0.1 (2026-07-20)

### Breaking Changes

- make object definitions exact by default and add isObjectWith (#435) ([a12a915](https://github.com/nlibjs/typing/commit/a12a915f59dcbb7caa13717095159a0faa94813e))

### Features

- add fromDiagnosis for narrowing guards (#439) ([e342353](https://github.com/nlibjs/typing/commit/e342353105ff8d60e5d6f37c8a7ce6f4ab51e773))
- support relative and multiple narrowing diagnoses (#438) ([ae11029](https://github.com/nlibjs/typing/commit/ae110291d3ab0baa9886d43b944e8df18f9a31c6))
- add a union type-guard combinator (#437) ([90ddd5e](https://github.com/nlibjs/typing/commit/90ddd5eea5dcfd45b8ed72b78e12e564c0023e7e))
- add composable narrowing guards (#436) ([08f78a4](https://github.com/nlibjs/typing/commit/08f78a4c02fb1bd8199459e1695cdb6fe04729b0))
- add structured validation results (#434) ([791565b](https://github.com/nlibjs/typing/commit/791565bff6236f4c487e03fb8773cda83c9bea25))
- add const type parameters for literal type inference from Set definitions ([813eebe](https://github.com/nlibjs/typing/commit/813eebe74490ee05c57657accaf0bd36ad94ca0d))

### Bug Fixes

- report unexpected exact-object properties ([fd12a6d](https://github.com/nlibjs/typing/commit/fd12a6da98a9afda29bfc97b4c1693368e237cec))
- preserve checker identity across cache clears (#435) ([aa07bda](https://github.com/nlibjs/typing/commit/aa07bdad07fd9d35713d5a53bf092a12246ea04f))
- build error ([127b840](https://github.com/nlibjs/typing/commit/127b840d5fccdb574155f1cefff12abe8b0e2150))
- exclude 'jsr.json' from biome configuration includes ([c16273b](https://github.com/nlibjs/typing/commit/c16273b9449f5f8334e8df09f086e33fc89170dd))
- update file includes in biome configuration ([f6336b9](https://github.com/nlibjs/typing/commit/f6336b9ce462edb1df736d20f270f22d2887a45a))

### Performance Improvements

- add side-effect-free package exports (#440) ([78824aa](https://github.com/nlibjs/typing/commit/78824aa606f29a896bc0e793f2a1368cc8290ec7))

### Tests

- cover remaining public typeChecker paths (#434) ([53008e3](https://github.com/nlibjs/typing/commit/53008e33c66696668ba085dba5ef87d75d744d6c))
- add missing tests (#434) ([1fe5631](https://github.com/nlibjs/typing/commit/1fe5631dad33fd2f583199c53eeec363c7d3a9f6))
- cover structured circular reference issues (#434) ([aaa2f3a](https://github.com/nlibjs/typing/commit/aaa2f3a0fa76fe6c7b5ab71ac9ec66f7a926571e))
- remove order-dependent type numbering (#434) ([18f8af5](https://github.com/nlibjs/typing/commit/18f8af523580268fa93e5ee770a039c992aadda9))

### Code Refactoring

- compose string and typed-array checkers ([e0454a4](https://github.com/nlibjs/typing/commit/e0454a4f5d0a9a2a601573e3f057afd6ce4efa6a))
- compose string and typed-array checkers ([701a005](https://github.com/nlibjs/typing/commit/701a00569be8a794b31885a2f50237fb4ac6ec84))
- **types:** reduce unsafe casts and adopt variadic tuple args ([eb6f8ed](https://github.com/nlibjs/typing/commit/eb6f8ed86847b5b4aa0bfba6b4bee201e8270619))

### Documentation

- fix comments ([1d46c5e](https://github.com/nlibjs/typing/commit/1d46c5ec19ccb21bbf4cc3acd60083448cdc0bc2))

### Continuous Integration

- use node v26 ([aea8630](https://github.com/nlibjs/typing/commit/aea86308824b6f632ffa6a35363b1131aa43c534))

### Dependency Upgrades

- npm audit fix ([39934e4](https://github.com/nlibjs/typing/commit/39934e436810649001d6650aeac95ab36d15708f))
- @biomejs/biome:2.2.5→2.5.4 ([f1d8723](https://github.com/nlibjs/typing/commit/f1d8723f733a3edb1227b6f69eee8548b020ae3d))
- @types/node:24.7.2→26.1.1 ([638899c](https://github.com/nlibjs/typing/commit/638899c001c62c89f197cd82c04e9475bab2ca47))
- typescript:5.9.3→7.0.2 ([27493b5](https://github.com/nlibjs/typing/commit/27493b5f3b770cafa9fc4539d93a69a30746d0e9))
- **renovate:** update actions/setup-node action to v7 (#430) ([f115ae2](https://github.com/nlibjs/typing/commit/f115ae2d78d6b881e78d723a6dc4f1009bce899d))
- **renovate:** update codecov/codecov-action action to v7 (#428) ([0ef634e](https://github.com/nlibjs/typing/commit/0ef634e58b98d77968ec20687747fab6f0632f26))
- **renovate:** update actions/checkout action to v7 (#429) ([2ffd559](https://github.com/nlibjs/typing/commit/2ffd559ee9b541f74bc3a8902d32f150b0cf1ff1))
- **renovate:** update actions/checkout action to v6 ([d5c32c2](https://github.com/nlibjs/typing/commit/d5c32c241f8d7ba295010971007ae6ce0905f73d))
- **renovate:** update actions/setup-node action to v6 ([d90f8c9](https://github.com/nlibjs/typing/commit/d90f8c9372a393f8c1ea9d0fe88923ba93d9eef7))


## v3.0.4 (2025-10-12)

### Bug Fixes

- include 'types' directory in package files ([8ac8125](https://github.com/nlibjs/typing/commit/8ac81259ebefdfb4c2f9f8e7463950cb81daab5c))
- update module file extensions in exports ([684a808](https://github.com/nlibjs/typing/commit/684a8086ae8870f06ead29311fd689ed4bed6307))

### Code Refactoring

- update test configuration and remove unused bun script ([5f4ec4c](https://github.com/nlibjs/typing/commit/5f4ec4c7300a7134c18a7e9a4d92bf38bfc49c79))
- reorganize project structure and update TypeScript configurations ([be9138a](https://github.com/nlibjs/typing/commit/be9138a450b8f5e79768a5d221fc9fad7d5e25f9))

### Styles

- fix biome errors ([0e3d65a](https://github.com/nlibjs/typing/commit/0e3d65a2507d4dc08a9ed10939d484e151c17352))

### Documentation

- fix npm badge ([74a0d02](https://github.com/nlibjs/typing/commit/74a0d0277fa467e6b7d1c8c30192344f74410483))

### Continuous Integration

- update actions for Deno ([89d5fdc](https://github.com/nlibjs/typing/commit/89d5fdce2e5be2bd120377a241692a41c7c34727))
- update actions ([dc2f634](https://github.com/nlibjs/typing/commit/dc2f634ce6a2d56c136e08e9004e45df8e93acc8))

### Dependency Upgrades

- @biomejs/biome:2.2.4→2.2.5 @types/node:24.5.2→24.7.2 typescript:5.9.2→5.9.3 ([0b273f9](https://github.com/nlibjs/typing/commit/0b273f9bb2bf9163fcb34ed7ed80fe6738c2d4af))
- update deno.lock ([80cd620](https://github.com/nlibjs/typing/commit/80cd6207c98c47c2bdd4095c0057d512764c362d))
- @biomejs/biome:1.9.2→2.2.4 @types/node:22.7.4→24.5.2 typescript:5.6.2→5.9.2 ([0df5d63](https://github.com/nlibjs/typing/commit/0df5d632fbeec44eae72ce0f7cb9af9599edf9d4))
- remove tsm ([108f1be](https://github.com/nlibjs/typing/commit/108f1be71408f885054053b93545e126b92324c9))
- audit fix ([edd46b5](https://github.com/nlibjs/typing/commit/edd46b5cb40ca550eccc431764a61e4c686a713b))
- **renovate:** update codecov/codecov-action action to v5 ([188771e](https://github.com/nlibjs/typing/commit/188771eb2fbc640d5271bc437ad867d892300aec))


## v3.0.1 (2024-10-04)

### Bug Fixes

- Passing native function objects causes an error in defineProperty ([db6af35](https://github.com/nlibjs/typing/commit/db6af358a805b56779ac8a5bc6ea630dd3946761))

### Code Refactoring

- delete an unused getter ([d766857](https://github.com/nlibjs/typing/commit/d76685727e45fd332556b45c422a14f75e6b73a8))

### Documentation

- update README.md ([5f24ecc](https://github.com/nlibjs/typing/commit/5f24ecc6e3319865c2b524ba373ebde8070cae63))


## v3.0.0 (2024-10-01)

### Breaking Changes

- delete TypeChecker.optional, TypeChecker.array, TypeChecker.dictionary ([943c6f1](https://github.com/nlibjs/typing/commit/943c6f1a552de2c52101474155c3ff6d410e08da))

### Tests

- use isArrayOf to test Array<T> ([f8ac939](https://github.com/nlibjs/typing/commit/f8ac9399565a0a16bf5e1c270bf38e57f32c743e))
- run build:index before test ([a4043bd](https://github.com/nlibjs/typing/commit/a4043bd330952ab17cff4eaeb6f3d65f73868abd))

### Dependency Upgrades

- @nlib/tsm:1.0.0→1.0.1 ([1780d81](https://github.com/nlibjs/typing/commit/1780d811d09866ed2af3d1b09e91d326e1087577))
- @types/node:22.5.5→22.7.4 ([5c4d73d](https://github.com/nlibjs/typing/commit/5c4d73dab9a035967286e32ec885a0b4efead9f0))


## v2.1.0 (2024-10-01)

### Features

- add isNever ([f951869](https://github.com/nlibjs/typing/commit/f9518699d509e8c20fe7ecb68a17e64dfb759719))
- support recursive object definition ([504966e](https://github.com/nlibjs/typing/commit/504966ed86c7c778f650fb59efa43192b6cad197))

### Bug Fixes

- update mod.ts ([961ffe0](https://github.com/nlibjs/typing/commit/961ffe01e41481ecafacd1f2860fe28f04ce30a9))

### Documentation

- add docs to isOptionalOf, isArrayOf, isDictionaryOf ([8c901af](https://github.com/nlibjs/typing/commit/8c901afc79e4d75a11a262b752a0a7fe8071b6ba))
- deprecate .optional, .array, .dictionary ([5525afd](https://github.com/nlibjs/typing/commit/5525afde5dc47f33506b1b73b25e94d47602c944))
- update the usage section ([96ab0cd](https://github.com/nlibjs/typing/commit/96ab0cdb6c2a433773dad92ec0e32510a123bc06))


## v2.0.8 (2024-09-29)

### Features

- add typeCheckerConfig ([d45e256](https://github.com/nlibjs/typing/commit/d45e256dc5592bdd01803226cc66a69ee7621c18))

### Documentation

- add docs for type checkers ([4c9bf93](https://github.com/nlibjs/typing/commit/4c9bf938040359ade9239675ecf3d13a76fe8008))
- add docs tocodePointUtil.ts ([9b970f2](https://github.com/nlibjs/typing/commit/9b970f298ceeb97b6f658403c6c19a6356707536))


## v2.0.7 (2024-09-29)

### Bug Fixes

- KeyValuePair<T> ([6ab3d1a](https://github.com/nlibjs/typing/commit/6ab3d1ada2fd58304792d5bdc399343cb8ea931c))

### Documentation

- add some docs ([0b9dbe3](https://github.com/nlibjs/typing/commit/0b9dbe3ada10148848e515aa0533bb3f6dd4ec7d))


## v2.0.6 (2024-09-29)

### Bug Fixes

- throw an error if input has a circular reference ([119f83e](https://github.com/nlibjs/typing/commit/119f83e65108a07ddd58283bed5e4c6e71309693))
- set a name to type guard function ([34668f9](https://github.com/nlibjs/typing/commit/34668f9806cf751b3515fe2340128ed2c43b05a7))

### Tests

- beforeEach is not implemented in Deno ([bb8ec8c](https://github.com/nlibjs/typing/commit/bb8ec8ccd4892cea7c2183a854baa77b8eabd285))
- add --allow-read ([2b29852](https://github.com/nlibjs/typing/commit/2b298526b3f0c99625ff7264223d45b59b33ec6f))
- add checkerTestCase to test values from another context ([72edb62](https://github.com/nlibjs/typing/commit/72edb624d0642d480d3b9f176fa80870484f8b88))

### Documentation

- add docs to codepoints and resetNoNameTypeCount ([37430b9](https://github.com/nlibjs/typing/commit/37430b9a16e3eb75e875d92b7c63e2f91f889e34))
- style ([1dde25b](https://github.com/nlibjs/typing/commit/1dde25bc1706961332c10ac7d30a4f611e6d0745))

### Continuous Integration

- skip reporting coverage on DenoTest ([7ea92fe](https://github.com/nlibjs/typing/commit/7ea92febfa69cc463869ea1874d501b698d65495))
- run tests with deno ([ef3f225](https://github.com/nlibjs/typing/commit/ef3f2259acff26f5633fb1b51377c5cf405fe2ef))
- run tests with bun ([4111120](https://github.com/nlibjs/typing/commit/4111120d713a301eaf1c1c7c76b1b8dfaf9c2c3e))


## v2.0.5 (2024-09-24)

### Documentation

- update README ([6145d8b](https://github.com/nlibjs/typing/commit/6145d8b16660ff50c47bcf174149b1a20aaf575b))

### Continuous Integration

- test mod.ts ([728a3cb](https://github.com/nlibjs/typing/commit/728a3cbedb35b17105e9aea929a8b019938bd719))


## v2.0.4 (2024-09-24)

### Breaking Changes

- rewrite createTypeChecker() to typeChecker() ([3de7179](https://github.com/nlibjs/typing/commit/3de71795c0cc2230fbd5ef7988089255a70b7cf4))
- delete Resolved<T> ([c2de404](https://github.com/nlibjs/typing/commit/c2de40499e65248ed4a9f91fb1f03aefb8e5b596))

### Features

- add typeChecker, stringChecker, numberChecker, objectChecker ([db7830b](https://github.com/nlibjs/typing/commit/db7830b53154a0d45f8db6d6d5e7daaaf3162112))

### Bug Fixes

- return value for MyClass ([0a3e81b](https://github.com/nlibjs/typing/commit/0a3e81b40737031d953e0ecdbcdc32dbb4bf4591))
- serializer ([b24f62b](https://github.com/nlibjs/typing/commit/b24f62b0020843e160efa2a551e2c9ce44a5010a))

### Code Refactoring

- remove Dictionary<T> ([0f4a1ca](https://github.com/nlibjs/typing/commit/0f4a1caf22d7ee1825ee07349a6c9bf4df83fc32))
- split codePoints.ts ([23eaa30](https://github.com/nlibjs/typing/commit/23eaa308eb43e4d65a3b466ebbf32d6cb37c1a3c))
- move TypeCheckError ([c1f3b87](https://github.com/nlibjs/typing/commit/c1f3b8727c008c322df9cb5a3d3d98de0cfaedc0))
- move TypeChecker<T> ([991352f](https://github.com/nlibjs/typing/commit/991352fb0d1e983a37a09c28f661a4fd76c8ca63))

### Documentation

- add some docs ([4fdf54d](https://github.com/nlibjs/typing/commit/4fdf54de1f0cbfa0b8b65bb29afba92c17b56aee))


## v2.0.3 (2024-09-21)

### Bug Fixes

- update mod.ts ([6c64214](https://github.com/nlibjs/typing/commit/6c642145fd4b6ccbefb0b8fbc24dd1338cb85268))


## v2.0.2 (2024-09-21)

### Features

- add isUUIDUppercase ([ee2efb6](https://github.com/nlibjs/typing/commit/ee2efb6639f001cc684731e8421b99e32b0a1692))
- add isUUIDLowercase ([96cde9a](https://github.com/nlibjs/typing/commit/96cde9ac2c0226bb15c977447393b297095f2417))

### Bug Fixes

- isUUID allows mixed cases ([64abb92](https://github.com/nlibjs/typing/commit/64abb92ae24d9f1426c7c7db2ba04f4456014ccc))

### Continuous Integration

- add write access to the id-token permission ([1462b89](https://github.com/nlibjs/typing/commit/1462b8917db2a0e82bdd9d6b33d5c46117ab2c9e))


## v2.0.1 (2024-09-21)

### Continuous Integration

- split ci jobs ([af859fe](https://github.com/nlibjs/typing/commit/af859fe2b7c0e8d2a134dbe96bfebb3e021c1199))


## v2.0.0 (2024-09-21)

### Breaking Changes

- delete some string checkers ([aad6ee1](https://github.com/nlibjs/typing/commit/aad6ee1ff44c9bc640114e6962e33492349c7776))
- delete the first argument of createTypeChecker ([3155873](https://github.com/nlibjs/typing/commit/3155873a8fba43f69a0c7d90679f1cc39b69b667))

### Tests

- add test:type ([1b68a98](https://github.com/nlibjs/typing/commit/1b68a981b0e7387ec9da20ea5e3e81b9f69392ec))

### Styles

- type explicitly ([282f9f2](https://github.com/nlibjs/typing/commit/282f9f2cd524f303f900890113d1ae14e881fd97))

### Documentation

- add a doc for module ([a3f1f5d](https://github.com/nlibjs/typing/commit/a3f1f5d6aed04a77ada15e300e6f94051dff213f))
- add a badge ([60e0338](https://github.com/nlibjs/typing/commit/60e0338420e516d8b3091aacbb2b30d926a1162b))
- update the sample code ([b725a59](https://github.com/nlibjs/typing/commit/b725a59406ed84304da78f026fe61ad4677934e2))

### Continuous Integration

- add --provenance ([1df7952](https://github.com/nlibjs/typing/commit/1df7952a1539878e039784fe8d5ab61ecb874e83))
- add TestPublish job ([4549422](https://github.com/nlibjs/typing/commit/45494227aee121c2a47dde80901a2b1b262925bb))


## v1.1.1 (2024-09-21)

### Features

- rename index → mod ([c20122e](https://github.com/nlibjs/typing/commit/c20122eb51fc93650efff6653efbf18521adeec2))

### Bug Fixes

- entry points for nodejs ([1f1d84e](https://github.com/nlibjs/typing/commit/1f1d84e9d4f08a3d0f678bcd8b0e7f17a822601c))

### Tests

- fix the quotes ([63b9047](https://github.com/nlibjs/typing/commit/63b90472e2d5fbdf5e2b439a0e65d09a28a82f58))
- use node:test ([f697635](https://github.com/nlibjs/typing/commit/f69763584c3ac888af6ee69877e52cacbc9d5688))

### Styles

- fix lint errors ([1768e1a](https://github.com/nlibjs/typing/commit/1768e1a6e5c12c5bdf4d3fb3e3c750ef7eb01051))

### Documentation

- update the codecov badge ([abf6bce](https://github.com/nlibjs/typing/commit/abf6bce2e6cbc5459764768ff734c4f1170ac4ab))

### Build System

- add cli-sync-version.ts ([56af426](https://github.com/nlibjs/typing/commit/56af42636d975f4ef4baee9231a5ee6f539ab9d5))
- fix the TS2589 error ([18ee20b](https://github.com/nlibjs/typing/commit/18ee20b38c56571c2ef78e42009c2abae236408e))
- fix the build pipeline ([6a00a9f](https://github.com/nlibjs/typing/commit/6a00a9fcdf5f87ccb307d646c858f52dee707331))
- delete cjs/*.mjs ([698eb53](https://github.com/nlibjs/typing/commit/698eb53487c9e4691736402df888a29f960175dd))

### Continuous Integration

- add a command to publish ([fab1971](https://github.com/nlibjs/typing/commit/fab1971a0333974b6ed466e3640c5754084177e8))
- run tests on pull_request ([aa585cd](https://github.com/nlibjs/typing/commit/aa585cd2b16c6b8736a03a99e7d4b654ded365eb))
- test build ([00b7233](https://github.com/nlibjs/typing/commit/00b7233438c3d2266457d61fea5c8daa22376cc5))
- upgrade setup-node ([118a6f9](https://github.com/nlibjs/typing/commit/118a6f90ce287c4c61c57d0a126325ed730699b1))
- run c8 report ([1633da3](https://github.com/nlibjs/typing/commit/1633da33024023fe0ddd871acb83be2a4c29827b))

### Dependency Upgrades

- **renovate:** update actions/setup-node action to v4 ([25c9fb8](https://github.com/nlibjs/typing/commit/25c9fb8c62dca2fa753bd6a9449d7426c7d9a61a))
- typescript:5.4.5→5.6.2 ([27f2113](https://github.com/nlibjs/typing/commit/27f2113aa23df91b27f1c0af81cfa7f9fe639b90))
- install biome and run format --write ([9834820](https://github.com/nlibjs/typing/commit/9834820d61ad3b4e04b0b0cc65e74c89790540c2))
- uninstall eslint, lint-staged, etc. ([9785051](https://github.com/nlibjs/typing/commit/9785051521fd36f12c5bef3c4e8fac5f323c88aa))
- **renovate:** update dependency eslint to v8.57.1 ([2cc0659](https://github.com/nlibjs/typing/commit/2cc0659f6eb7c820f9f73728bf51ec3910e4d95f))
- **renovate:** update dependency prettier to v3.3.3 ([dd7f45e](https://github.com/nlibjs/typing/commit/dd7f45e06f4ab09f17132c25196fd97056d349ec))
- **renovate:** update dependency prettier to v3.3.2 ([55a29bd](https://github.com/nlibjs/typing/commit/55a29bdcb55500fe94a0680d04e84a090564c649))
- **renovate:** update dependency prettier to v3.3.1 ([0c06c12](https://github.com/nlibjs/typing/commit/0c06c124a6a13bcb64a3cdd06d8f982d99c1ee98))
- **renovate:** update dependency prettier to v3.3.0 ([f3cb650](https://github.com/nlibjs/typing/commit/f3cb650957c7496d7c8eb19b25ea21d8bfa120b4))
- **renovate:** update dependency typescript to v5.4.5 ([d9a26aa](https://github.com/nlibjs/typing/commit/d9a26aaafd00b97f95f86449a496d7ba073c9c21))
- **renovate:** update dependency typescript to v5.4.4 ([521bc7d](https://github.com/nlibjs/typing/commit/521bc7d9a82e0d13acf39d8021e0b7ccb3f3c143))
- **renovate:** update codecov/codecov-action action to v4 ([2112a27](https://github.com/nlibjs/typing/commit/2112a274fb9e44dba78883a5c5b8c5040de34dc7))
- **renovate:** update actions/checkout action to v4 ([1cdc4d8](https://github.com/nlibjs/typing/commit/1cdc4d8adf764bda77ce10f991e48d12b9798702))
- **renovate:** update dependency typescript to v5.4.3 ([8041879](https://github.com/nlibjs/typing/commit/8041879a1d082a6461bed3b8712519367db6b1e6))
- **renovate:** update dependency typescript to v5.4.2 ([8d712f6](https://github.com/nlibjs/typing/commit/8d712f69e1165212e38b04a17081c47877ffa2b0))
- **renovate:** update dependency eslint to v8.57.0 ([0c702f0](https://github.com/nlibjs/typing/commit/0c702f027fb931a795195a852dd492d7eca4e192))
- **renovate:** update dependency eslint-plugin-jest to v27.9.0 ([f340bcd](https://github.com/nlibjs/typing/commit/f340bcd7e33636dc06b380285dfb2323b4cf7e16))
- **renovate:** update dependency eslint-plugin-jest to v27.8.0 ([76f6274](https://github.com/nlibjs/typing/commit/76f62742de0021170b4cdaf73647fa030bd7a9cd))
- **renovate:** update dependency prettier to v3.2.5 ([6743cdc](https://github.com/nlibjs/typing/commit/6743cdcc49a765e13336acd43854e0e820695f24))
- **renovate:** update dependency prettier to v3.2.4 ([6358542](https://github.com/nlibjs/typing/commit/6358542cbe4e9ec856d7cd28df70fbbfd67c0179))
- **renovate:** update dependency prettier to v3.2.3 ([05d764a](https://github.com/nlibjs/typing/commit/05d764a7debbc47c229a144f687363345ade579d))
- **renovate:** update dependency prettier to v3.2.2 ([14a9ba0](https://github.com/nlibjs/typing/commit/14a9ba087a75eac8a75d401240d33bafcb899205))
- **renovate:** update dependency prettier to v3.2.1 ([dbae03f](https://github.com/nlibjs/typing/commit/dbae03f6676246f0c4ec68d876f99b788f90d1b4))
- **renovate:** update dependency eslint-plugin-jest to v27.6.3 ([59779ac](https://github.com/nlibjs/typing/commit/59779aca7df5d4541edf5462e3e9942bc37d711c))
- **renovate:** update dependency eslint-plugin-jest to v27.6.2 ([0e5fbeb](https://github.com/nlibjs/typing/commit/0e5fbeb52722cb0c767e9d785260d392046407e6))
- **renovate:** update dependency eslint-plugin-jest to v27.6.1 ([a50e470](https://github.com/nlibjs/typing/commit/a50e470dfef54b41b193ed492640c5be780df1b4))
- **renovate:** update dependency eslint to v8.56.0 ([268bc1a](https://github.com/nlibjs/typing/commit/268bc1a2765198decaac2dd455d5d7c167ee8f08))
- **renovate:** update dependency prettier to v3.1.1 ([4763b49](https://github.com/nlibjs/typing/commit/4763b490408d0cf8fd9ad947fa5a81edcae277c3))
- **renovate:** update dependency typescript to v5.3.3 ([a75043c](https://github.com/nlibjs/typing/commit/a75043cd62c5559c0a879e0920c0149ba6d20661))
- **renovate:** update dependency eslint to v8.55.0 ([4319f1c](https://github.com/nlibjs/typing/commit/4319f1c07d039690db58f6679e9635d2e47a20ec))
- **renovate:** update dependency typescript to v5.3.2 ([5ce1faf](https://github.com/nlibjs/typing/commit/5ce1fafdff6c29e6760a2aac5a18f1e4d03e9042))
- **renovate:** update dependency eslint to v8.54.0 ([c47dce8](https://github.com/nlibjs/typing/commit/c47dce855d74874b1c8fd6505c3d727c1732aaa6))
- **renovate:** update dependency prettier to v3.1.0 ([94e8ced](https://github.com/nlibjs/typing/commit/94e8ced6089a16ff188085e4e75c67eb8e99b366))
- **renovate:** update dependency eslint to v8.53.0 ([5dfb3cf](https://github.com/nlibjs/typing/commit/5dfb3cfd7b9a02dc8c57cf814ae12a68c38cd15a))
- **renovate:** update dependency eslint-plugin-jest to v27.6.0 ([1c08a41](https://github.com/nlibjs/typing/commit/1c08a413aa1d1a427bc262e3cd8a5b63a1537957))
- **renovate:** update dependency eslint-plugin-jest to v27.4.3 ([3777c02](https://github.com/nlibjs/typing/commit/3777c0209288d251ea66a82e3a07846361b9ec97))
- **renovate:** update dependency eslint to v8.52.0 ([65f4d05](https://github.com/nlibjs/typing/commit/65f4d05de4b5dde985218946ee4132b20d7f7ff2))
- **renovate:** update dependency eslint to v8.51.0 ([a98aedf](https://github.com/nlibjs/typing/commit/a98aedf8559ba8dd4ecdd9849d89d78f3e54b009))
- **renovate:** update dependency eslint-plugin-jest to v27.4.2 ([0d2b55b](https://github.com/nlibjs/typing/commit/0d2b55bccf9c409b2ac0b36ff94d29beb2a7ddda))
- **renovate:** update dependency eslint to v8.50.0 ([c8879f0](https://github.com/nlibjs/typing/commit/c8879f0643496fb0d3b9213bbd97191d4a65132f))
- **renovate:** update dependency eslint-plugin-jest to v27.4.0 ([123075b](https://github.com/nlibjs/typing/commit/123075ba8b8ffe3751384dae2c6476818db64aa5))
- **renovate:** update dependency eslint to v8.49.0 ([008fc8d](https://github.com/nlibjs/typing/commit/008fc8d017eafde7af0b56c229fdd2336abb7b88))


## v1.1.0 (2023-08-31)

### Features

- build cjs modules ([1b3dac4](https://github.com/nlibjs/typing/commit/1b3dac4b39c68cd33434967de527e6c4f6e3a0fe))

### Code Refactoring

- rename files from .ts to .mts ([946436e](https://github.com/nlibjs/typing/commit/946436e9b5bbe2c4d874a0e23dc726dfa72f9d8d))

### Documentation

- update a badge ([3bcbce2](https://github.com/nlibjs/typing/commit/3bcbce22929efd256bd401859613f22db0c77c35))

### Build System

- remove cjs exports ([336eeda](https://github.com/nlibjs/typing/commit/336eeda68976a16a621e431d2c695f98bdfc8b82))

### Continuous Integration

- use node v20 ([0819505](https://github.com/nlibjs/typing/commit/0819505fd6d95b040c7a8129ee96eb1c00056338))

### Dependency Upgrades

- @nlib/eslint-config:3.19.6→3.20.1 ([105016f](https://github.com/nlibjs/typing/commit/105016f3a874174f3cb87d9e890d9a4adfe14579))
- typescript:5.1.6→5.2.2 ([d3c2c52](https://github.com/nlibjs/typing/commit/d3c2c520dbeb5698d3c8426f3d293b7aa892e6e0))
- @nlib/indexen:0.2.7→0.2.9 ([a7a3f28](https://github.com/nlibjs/typing/commit/a7a3f2880eca5985cdababa150c53eed55e67969))
- @nlib/changelog:0.3.0→0.3.1 ([f2c3d09](https://github.com/nlibjs/typing/commit/f2c3d09e25282cf828914b01404914416787c02b))
- **renovate:** update dependency eslint to v8.48.0 ([1301696](https://github.com/nlibjs/typing/commit/1301696c9d98a91d954c5ae74f0da4d1047be02d))
- **renovate:** update dependency jest to v29.6.4 ([1bc8ec9](https://github.com/nlibjs/typing/commit/1bc8ec9871b31cdf7c76433f489a5fe24d929d3f))
- **renovate:** update dependency @types/jest to v29.5.4 ([23628c0](https://github.com/nlibjs/typing/commit/23628c0febe476f50ddc2a39af56550f35025e64))
- **renovate:** update dependency @nlib/githooks to v0.2.0 ([7c2ada3](https://github.com/nlibjs/typing/commit/7c2ada3a74f1cf89d3cdd4b7945cb4cc736c884f))
- **renovate:** update dependency jest to v29.6.3 ([f09dc1d](https://github.com/nlibjs/typing/commit/f09dc1d7519119c62689763bf0d80c420bac4c9a))
- **renovate:** update dependency lint-staged to v14.0.1 ([08ff1a5](https://github.com/nlibjs/typing/commit/08ff1a58e13c8165308037c8e925bb58bacb818b))
- **renovate:** update codecov/codecov-action action to v3 ([dcc25c4](https://github.com/nlibjs/typing/commit/dcc25c430bc7dfb8b9dd69d52c1c250d3d447edb))
- **renovate:** update actions/setup-node action to v3 ([0f06164](https://github.com/nlibjs/typing/commit/0f0616476e13da7181131245a4e81c695c3944c9))
- **renovate:** update dependency @nlib/lint-commit to v1 ([d3db95b](https://github.com/nlibjs/typing/commit/d3db95bb12b63b2e2ac9b97bbb070cbb7e021d30))
- **renovate:** update actions/checkout action to v3 ([848f642](https://github.com/nlibjs/typing/commit/848f6427bcd638217f136ac763b2202dc4370f79))
- **renovate:** update dependency lint-staged to v14 ([cc053f9](https://github.com/nlibjs/typing/commit/cc053f9abb154147100cdf58ef0e7e271f43d8e4))
- **renovate:** update dependency @nlib/changelog to v0.3.0 ([92ad4f9](https://github.com/nlibjs/typing/commit/92ad4f99913b0ecdfbae63759fd79be1d46fafb7))
- **renovate:** update dependency @nlib/indexen to v0.2.7 ([38f2fc5](https://github.com/nlibjs/typing/commit/38f2fc588a6138c2cb9a016e6c87214a81ea6c99))
- **renovate:** update dependency lint-staged to v13.3.0 ([bfb4b3c](https://github.com/nlibjs/typing/commit/bfb4b3cb3e7cfe4a53431b776ba080faf8f36fe5))
- **renovate:** update dependency eslint to v8.47.0 ([fde25c1](https://github.com/nlibjs/typing/commit/fde25c13a7a914550b5fa15729e6ced93855a6bb))
- **renovate:** update dependency @types/eslint to v8.44.2 ([48b8d9d](https://github.com/nlibjs/typing/commit/48b8d9d08d4f1870a4c6ae9eac057f4cb160ceed))
- **renovate:** update dependency eslint to v8.46.0 ([9a7f12a](https://github.com/nlibjs/typing/commit/9a7f12a2498de120e70d1d3b053e0da0833a58eb))
- **renovate:** update dependency jest to v29.6.2 ([42d1139](https://github.com/nlibjs/typing/commit/42d1139619e4c8152b43987fcf72574d0de9479f))
- **renovate:** update dependency @types/eslint to v8.44.1 ([3a320db](https://github.com/nlibjs/typing/commit/3a320db83d5c581cb20fbf3bbee9265dd1b41b0f))
- **renovate:** update dependency eslint to v8.45.0 ([b72f5b3](https://github.com/nlibjs/typing/commit/b72f5b3105bc87033323c9b56abd21ad54a321ae))
- **renovate:** update dependency eslint-plugin-jest to v27.2.3 ([8ff3b0b](https://github.com/nlibjs/typing/commit/8ff3b0bf7c82c7b8045dfa2fa0f6c8be0a2dc1f6))
- **renovate:** update dependency @types/jest to v29.5.3 ([6f85646](https://github.com/nlibjs/typing/commit/6f85646faa882f1239bd4c86359c851ec520c0ef))
- **renovate:** update dependency @types/eslint to v8.44.0 ([32da487](https://github.com/nlibjs/typing/commit/32da4878b44b1f930bc15399e3612b0e9ab7232f))
- **renovate:** update dependency jest to v29.6.1 ([a7c2100](https://github.com/nlibjs/typing/commit/a7c21000571f7b1b68f1241d5384030d660b2e0f))
- **renovate:** update dependency jest to v29.6.0 ([0dab67a](https://github.com/nlibjs/typing/commit/0dab67a303f2c0035a98538bf7ca780d3c4c328e))
- **renovate:** update dependency eslint to v8.44.0 ([d83a1d7](https://github.com/nlibjs/typing/commit/d83a1d70321d2873cd33cf82f5629cb9c4fbb771))
- **renovate:** update dependency ts-jest to v29.1.1 ([1ce3c58](https://github.com/nlibjs/typing/commit/1ce3c58584690873a731ce1a299834297cde839a))
- **renovate:** update dependency typescript to v5.1.6 ([cc33a82](https://github.com/nlibjs/typing/commit/cc33a82cc31fa4c6c54deccb239e925e6c321ef1))
- **renovate:** update dependency typescript to v5.1.5 ([265206c](https://github.com/nlibjs/typing/commit/265206c1259e2f14613221ccb4eae1251b14fb83))
- **renovate:** update dependency lint-staged to v13.2.3 ([a12f6a2](https://github.com/nlibjs/typing/commit/a12f6a297d0a57168edbc8fae557d94d8971e9ea))
- **renovate:** update dependency eslint-plugin-jest to v27.2.2 ([40356a6](https://github.com/nlibjs/typing/commit/40356a60331928597eadbda142dc9975a3ea986f))
- **renovate:** update dependency eslint to v8.43.0 ([ad2e04d](https://github.com/nlibjs/typing/commit/ad2e04d223cf191d193eb18fda2c9d3a69cbf80b))
- **renovate:** update dependency @types/eslint to v8.40.2 ([6f2f8b9](https://github.com/nlibjs/typing/commit/6f2f8b9c80d0f8f0aa90c78ccc69deb9eec58481))
- **renovate:** update dependency @types/eslint to v8.40.1 ([fd0fc00](https://github.com/nlibjs/typing/commit/fd0fc00b4f8a1393da9eca75201fbee923e0b7d3))
- **renovate:** update dependency eslint to v8.42.0 ([baa6a09](https://github.com/nlibjs/typing/commit/baa6a095005ce1e0146a96667e235b430b5dda29))
- **renovate:** update dependency typescript to v5.1.3 ([fcc5a65](https://github.com/nlibjs/typing/commit/fcc5a65923b9e5125edbdefa716d35b0943883a4))
- **renovate:** update dependency @types/jest to v29.5.2 ([8321f5e](https://github.com/nlibjs/typing/commit/8321f5ef33c4f7d57bf0914db83b0fdad671f55b))
- **renovate:** update dependency @types/eslint to v8.40.0 ([94ce520](https://github.com/nlibjs/typing/commit/94ce5201f5c11ba127c31b0b91551a20205e0acc))
- **renovate:** update dependency eslint to v8.41.0 ([8b83615](https://github.com/nlibjs/typing/commit/8b83615129fbf8ba222afe2724ba3334305b5ef6))
- **renovate:** update dependency eslint to v8.40.0 ([913ce8d](https://github.com/nlibjs/typing/commit/913ce8d2853520cd8572ae818c02b6e156b24870))
- **renovate:** update dependency lint-staged to v13.2.2 ([bd9b520](https://github.com/nlibjs/typing/commit/bd9b520ee55d7a3370af4cb3089e27f17d81da1b))
- **renovate:** update dependency eslint to v8.39.0 ([15c7855](https://github.com/nlibjs/typing/commit/15c7855914a3b7a1e35dc2d9f98d36e01dd61994))
- **renovate:** update dependency @types/jest to v29.5.1 ([1a9eb3c](https://github.com/nlibjs/typing/commit/1a9eb3c9cae3515bb1bf532be4cfca4d498f6aa1))
- **renovate:** update dependency eslint to v8.38.0 ([59dd611](https://github.com/nlibjs/typing/commit/59dd6117e70495828b42fc6a4a8b51cf522ae466))
- **renovate:** update dependency typescript to v5.0.4 ([6b78eaa](https://github.com/nlibjs/typing/commit/6b78eaa70c4b7c5760a1cf2ea75cd679bb3bb468))
- **renovate:** update dependency lint-staged to v13.2.1 ([282a6af](https://github.com/nlibjs/typing/commit/282a6af0734d10e312e6124f82655721f074bfe5))


## v1.0.0 (2023-04-05)

### Breaking Changes

- change ensure()'s 3rd parameter from path:string to fallbackValue:S ([bd3023a](https://github.com/nlibjs/typing/commit/bd3023a30774ab0cd00088b85ee3ff3159211e31))

### Features

- add AlphaNumericString ([4aa3efe](https://github.com/nlibjs/typing/commit/4aa3efebf839b2a73493c4074c795999f1494231))
- add LatinString ([971d1b4](https://github.com/nlibjs/typing/commit/971d1b477342163fe1cd027448ba4123648ce8fe))
- add CapitalLatinString ([0458396](https://github.com/nlibjs/typing/commit/0458396cd671a0a9dde919954423ac5358c1fa04))
- add SmallLatinString ([d5557c5](https://github.com/nlibjs/typing/commit/d5557c5882c1affff78e135387ec3105dc70af5e))
- add NumberString ([ab8d0e7](https://github.com/nlibjs/typing/commit/ab8d0e7608a6463ba03774717da711b54fa61f2d))
- add CapitalHexString ([c09fe39](https://github.com/nlibjs/typing/commit/c09fe396344e4f3af9723343304a0cb73357b29c))
- add SmallHexString ([44529b4](https://github.com/nlibjs/typing/commit/44529b4d863e66cf98e009f0cd3110f996ea44c9))

### Bug Fixes

- type errors ([58f427a](https://github.com/nlibjs/typing/commit/58f427a95d7887651946c39d63ad8096fa71b788))
- author.url ([2cb6042](https://github.com/nlibjs/typing/commit/2cb6042bcd8bc096550e13c5de6b182c82b9ecda))
- FUNDING.yml ([6049aea](https://github.com/nlibjs/typing/commit/6049aea4a3c59cec3d057b06412c3c3cea43c907))

### Tests

- update tests ([1637cdc](https://github.com/nlibjs/typing/commit/1637cdc530798ddfcb49bc536dd35d7a8c42a8cb))

### Styles

- fix an eslint error ([045d2b5](https://github.com/nlibjs/typing/commit/045d2b505057d610999a6b528163a1afd52378f4))

### Dependency Upgrades

- ts-jest:29.0.5→29.1.0 typescript:4.9.5→5.0.3 ([c00194c](https://github.com/nlibjs/typing/commit/c00194cc39f0cd58514c17eb685abf5e961e52ff))
- **renovate:** update dependency @types/eslint to v8.37.0 ([55b37ff](https://github.com/nlibjs/typing/commit/55b37ffb773e6336b1011dbbb666afdf64cc8a76))
- **renovate:** update dependency eslint to v8.37.0 ([36fd831](https://github.com/nlibjs/typing/commit/36fd8313f7b0082c546d3d171e79adca577c9fbd))
- **renovate:** update dependency @types/eslint to v8.21.3 ([aaafc6e](https://github.com/nlibjs/typing/commit/aaafc6eb3276065abb1230db3ca312005f55288d))
- **renovate:** update dependency @types/jest to v29.5.0 ([970e7c5](https://github.com/nlibjs/typing/commit/970e7c598575bb7e7b8dafc8e20519ace74c2a14))
- **renovate:** update dependency @types/jest to v29.4.4 ([1d1cc1b](https://github.com/nlibjs/typing/commit/1d1cc1b37742b48374669d89cdb84c4251f48979))
- **renovate:** update dependency @types/jest to v29.4.3 ([e7653a6](https://github.com/nlibjs/typing/commit/e7653a6ba3a82edee421b42c10bdc7b7e1ae016f))
- **renovate:** update dependency @types/jest to v29.4.2 ([c136da8](https://github.com/nlibjs/typing/commit/c136da8ceaed94258e8f0a8c12620162fefa3ba6))
- **renovate:** update dependency @types/jest to v29.4.1 ([507a104](https://github.com/nlibjs/typing/commit/507a1044ca437a4c9d0e328247c56b2d483347b6))
- **renovate:** update dependency @types/eslint to v8.21.2 ([bf08dd4](https://github.com/nlibjs/typing/commit/bf08dd43c940107f86a01cbf3a0e149860a86087))
- **renovate:** update dependency eslint to v8.36.0 ([303c878](https://github.com/nlibjs/typing/commit/303c87865cc0c38a6912d4a3ce44cf490910f483))
- **renovate:** update dependency lint-staged to v13.2.0 ([3ef2434](https://github.com/nlibjs/typing/commit/3ef2434665873d5c9abe92cae99d0f99786093f3))
- **renovate:** update dependency lint-staged to v13.1.4 ([31d674b](https://github.com/nlibjs/typing/commit/31d674b5609332c0c7548c1cd6998344365c01e2))
- **renovate:** update dependency jest to v29.5.0 ([d796a28](https://github.com/nlibjs/typing/commit/d796a288e5414f61adca8e129c8e2e4ba13a2c0e))
- **renovate:** update dependency eslint to v8.35.0 ([1c43afd](https://github.com/nlibjs/typing/commit/1c43afd16242d61c51cfb196f29831b487012ec6))
- **renovate:** update dependency jest to v29.4.3 ([237b570](https://github.com/nlibjs/typing/commit/237b570ffbbd814cc7eb528ae15d10289ab161f5))
- **renovate:** update dependency @types/eslint to v8.21.1 ([4ced3bb](https://github.com/nlibjs/typing/commit/4ced3bbc792db375e4e8f469a070b11cf0b0e68b))
- **renovate:** update dependency lint-staged to v13.1.2 ([e8eeaae](https://github.com/nlibjs/typing/commit/e8eeaaeb2b277fe95e4239908c08e39f5173e3cc))
- **renovate:** update dependency eslint to v8.34.0 ([27432f0](https://github.com/nlibjs/typing/commit/27432f0406902296e28bf2952e3dd3ebf41d0eaf))
- **renovate:** update dependency jest to v29.4.2 ([30aa120](https://github.com/nlibjs/typing/commit/30aa1201e29afe3bb8498a8b817bd143ba6a6e10))
- **renovate:** update dependency lint-staged to v13.1.1 ([98fe10a](https://github.com/nlibjs/typing/commit/98fe10a41a04ba4c920afb9f6b9d8e934a4d8b14))
- **renovate:** update dependency @types/eslint to v8.21.0 ([2a0fc02](https://github.com/nlibjs/typing/commit/2a0fc025677b42cc00be9aba65dcc26d89dc2b17))
- **renovate:** update dependency typescript to v4.9.5 ([2fd6335](https://github.com/nlibjs/typing/commit/2fd6335e545ec4a70261bf453a63e2808a9849ee))
- **renovate:** update dependency eslint to v8.33.0 ([fe3b64a](https://github.com/nlibjs/typing/commit/fe3b64adc60b65754599b4afc94313cb1057f2f2))
- **renovate:** update dependency jest to v29.4.1 ([2c57a96](https://github.com/nlibjs/typing/commit/2c57a96dabc78494480926c204436a5dab01a1b6))
- **renovate:** update dependency @types/jest to v29.4.0 ([ca9848a](https://github.com/nlibjs/typing/commit/ca9848af6fb1452e1fe84baa31c686ee5baf144a))
- **renovate:** update dependency jest to v29.4.0 ([6a95bcb](https://github.com/nlibjs/typing/commit/6a95bcb652cb08b12e5586b9d195683cddbdde5c))
- **renovate:** update dependency @types/jest to v29.2.6 ([cb0e385](https://github.com/nlibjs/typing/commit/cb0e3850b1cd49b6188a786ab209e24b05a3b4bb))
- **renovate:** update dependency eslint to v8.32.0 ([aae4e73](https://github.com/nlibjs/typing/commit/aae4e734b6fc69307a96a386d7090661e07a1a51))
- **renovate:** update dependency ts-jest to v29.0.5 ([6559066](https://github.com/nlibjs/typing/commit/655906680fa87408b92cce8e3c2166341f40f564))
- **renovate:** update dependency ts-jest to v29.0.4 ([58cb660](https://github.com/nlibjs/typing/commit/58cb66059149fa471490feee7a81ea5feb3ae6d6))
- **renovate:** update dependency @nlib/indexen to v0.2.6 ([0afa5e2](https://github.com/nlibjs/typing/commit/0afa5e2d044f5496c0943af68e187cfda876f50f))
- **renovate:** update dependency @nlib/esmify to v0.3.3 ([4acf83c](https://github.com/nlibjs/typing/commit/4acf83cc6f16496ab57eb70a60d5c3462792b9dd))
- **renovate:** update dependency @nlib/changelog to v0.2.4 ([c9913d4](https://github.com/nlibjs/typing/commit/c9913d485901dc3f8ad327e7938c780f12e9249f))
- upgrade dependencies ([a609e4e](https://github.com/nlibjs/typing/commit/a609e4eed8f9bc135a78631e8c431f6c718971ab))
- @nlib/eslint-config:3.19.5→3.19.6 ([5b718a3](https://github.com/nlibjs/typing/commit/5b718a3d51c08c98cd849564ef4ffc2741a5901a))
- @types/jest:28.1.8→29.2.5 eslint-plugin-jest:26.9.0→27.2.1 jest:28.1.3→29.3.1 ts-jest:28.0.8→29.0.3 typescript:4.7.4→4.9.4 ([7bf1d6f](https://github.com/nlibjs/typing/commit/7bf1d6fca065b8056798b070bbc3afb1b5394ffd))
- **renovate:** update dependency eslint to v8.31.0 ([d21976b](https://github.com/nlibjs/typing/commit/d21976b26f1be4a9e3788bb4ee3540a5f46408e3))
- **renovate:** update dependency eslint to v8.30.0 ([112f8b1](https://github.com/nlibjs/typing/commit/112f8b17722e66bbf4fd374d8d6c1c68511e1842))
- **renovate:** update dependency lint-staged to v13.1.0 ([3d836da](https://github.com/nlibjs/typing/commit/3d836da47071d66ed186c871ea79a778408cb6da))
- **renovate:** update dependency eslint to v8.29.0 ([c6a49f3](https://github.com/nlibjs/typing/commit/c6a49f39c9977c72d44c70cd162105efe169661f))
- **renovate:** update dependency lint-staged to v13.0.4 ([db72e36](https://github.com/nlibjs/typing/commit/db72e36d670b68576ed7316f57abd76f3d375591))
- **renovate:** update dependency eslint to v8.28.0 ([8059e23](https://github.com/nlibjs/typing/commit/8059e237f608085f72acccc1080a2c27bd9d95a4))
- **renovate:** update dependency eslint to v8.27.0 ([913892f](https://github.com/nlibjs/typing/commit/913892f4b8886e1fa294b0ecb0d61be539ac5276))
- **renovate:** update dependency @types/eslint to v8.4.10 ([d5d5f0a](https://github.com/nlibjs/typing/commit/d5d5f0a25b9e8e4d0d3eff6a34bbc8bd6246b184))
- **renovate:** update dependency @types/eslint to v8.4.9 ([a956687](https://github.com/nlibjs/typing/commit/a95668711ffd7ebf9240512db10a7b93794ca7e6))
- **renovate:** update dependency @types/eslint to v8.4.8 ([f26feb8](https://github.com/nlibjs/typing/commit/f26feb8404e5fbefcd024480edfc78ae32abfac1))
- **renovate:** update dependency eslint to v8.26.0 ([ad1586b](https://github.com/nlibjs/typing/commit/ad1586be45c7b3986e6584cfc4fab3d53b979908))
- **renovate:** update dependency eslint to v8.25.0 ([54922df](https://github.com/nlibjs/typing/commit/54922df429813b56e0dbddeda5e29f31b5f0a6ea))
- **renovate:** update dependency eslint to v8.24.0 ([5fff36a](https://github.com/nlibjs/typing/commit/5fff36aebc89aa3f3451b85c84525edb1fd1c1cc))
- **renovate:** update dependency eslint to v8.23.1 ([681a600](https://github.com/nlibjs/typing/commit/681a6008ca2ff4397cc670bcf8c473f6c122558f))
- **renovate:** update dependency @nlib/eslint-config to v3.19.5 ([bac2286](https://github.com/nlibjs/typing/commit/bac22863cb3fe7d85a6c0807d9bd0bce34156152))
- **renovate:** update dependency eslint-plugin-jest to v26.9.0 ([2d35a3a](https://github.com/nlibjs/typing/commit/2d35a3aa2d48adeebfb85fe73c08067cdbb1ca6c))
- **renovate:** update dependency @nlib/esmify to v0.3.2 ([965a8ea](https://github.com/nlibjs/typing/commit/965a8eab0e0d5c3a23678f9968ec9c80c5e542d8))
- **renovate:** update dependency eslint to v8.23.0 ([b0a9e94](https://github.com/nlibjs/typing/commit/b0a9e94da39d4cd8d7dfdfc7eb08c2dd22438b5d))
- **renovate:** update dependency @types/jest to v28.1.8 ([c36109e](https://github.com/nlibjs/typing/commit/c36109eacc376944a929d8c72033fb90f63d1e00))
- **renovate:** update dependency eslint-plugin-jest to v26.8.7 ([5f3d753](https://github.com/nlibjs/typing/commit/5f3d7533b627df1e2b0d7e1acb42d142f9f3a535))
- **renovate:** update dependency @types/eslint to v8.4.6 ([836997b](https://github.com/nlibjs/typing/commit/836997be5d4d4684434a5fe705e7015c55822c51))


## v0.5.7 (2022-08-19)

### Bug Fixes

- ProcessUndefined for definition.enum/some/every ([f139147](https://github.com/nlibjs/typing/commit/f139147157cb16c1458330c2588d1b639237e590))

### Documentation

- update README ([8397347](https://github.com/nlibjs/typing/commit/8397347f8dac8783b856de80a3eacf79e53d5082))

### Dependency Upgrades

- **renovate:** update dependency @types/jest to v28.1.7 ([0f0eb5c](https://github.com/nlibjs/typing/commit/0f0eb5cad0ed3e1b7f6d5ba637dca5dae22e6da4))
- **renovate:** update dependency ts-jest to v28.0.8 ([cd1f4f5](https://github.com/nlibjs/typing/commit/cd1f4f50ead31b9f42a56d1308513d73bd7692a4))
- **renovate:** update dependency eslint-plugin-jest to v26.8.3 ([c38575c](https://github.com/nlibjs/typing/commit/c38575cb275d723d7124eb6933033a5126c96115))


## v0.5.6 (2022-08-18)

### Bug Fixes

- missing ProcessUndefined ([d242522](https://github.com/nlibjs/typing/commit/d242522049d79bbfca42b7fd601702c172119d6c))


## v0.5.5 (2022-08-18)

### Bug Fixes

- skip Array<T> ([fc70088](https://github.com/nlibjs/typing/commit/fc700880c9052f6512db75b6b3b6ef68944c9179))


## v0.5.4 (2022-08-18)

### Bug Fixes

- apply UndefinedAsOptional recursively ([27de2ce](https://github.com/nlibjs/typing/commit/27de2ce31467ccf50e3b2c9e517295e6f4046543))


## v0.5.3 (2022-08-17)

### Features

- add keys, values, entries ([1dc7c27](https://github.com/nlibjs/typing/commit/1dc7c2709efed5311dc70cf69be0c9e670904660))


## v0.5.2 (2022-08-15)

### Features

- add HttpResponseStatusCode ([43fd68f](https://github.com/nlibjs/typing/commit/43fd68fca60c099989d3be48168e66170a400964))
- add HttpMethod ([c972737](https://github.com/nlibjs/typing/commit/c9727373e06bc39e0584f4adf104961e37ea190d))

### Code Refactoring

- simplify tests ([5512a3a](https://github.com/nlibjs/typing/commit/5512a3abea5dd51aa2b94ecd5746addeaf91d9e8))


## v0.5.1 (2022-08-15)

### Tests

- extension of definitions ([13dff11](https://github.com/nlibjs/typing/commit/13dff11502331c01c1e598a73443e843ca43d70e))

### Code Refactoring

- omit empty object from UndefinedAsOptional ([192a521](https://github.com/nlibjs/typing/commit/192a521085d8539724244161a3b01cfa16ddbb90))

### Dependency Upgrades

- eslint:8.21.0→8.22.0 eslint-plugin-jest:26.7.0→26.8.2 ([fd891ae](https://github.com/nlibjs/typing/commit/fd891ae182a37a76ca3c84e0425a144934f693a4))


## v0.5.0 (2022-08-14)

### Features

- TypeChecker exposes definition ([853b67a](https://github.com/nlibjs/typing/commit/853b67a422ab215dd0f44fb36c865915d72b5d66))
- add KeyValuePair ([3cc8e16](https://github.com/nlibjs/typing/commit/3cc8e16871f3adf8d9f701f423bb02a6193d4337))

### Tests

- fix arguments ([99e3c57](https://github.com/nlibjs/typing/commit/99e3c570e219a1d8b4b02aacda94ba0f87542950))
- test exposed definitions ([01229bf](https://github.com/nlibjs/typing/commit/01229bfe4cd4203c35c4df3b12280104849ed1b8))
- test exposed definitions ([cbced9e](https://github.com/nlibjs/typing/commit/cbced9e6170a90aa1c9c21c3ac28a1f4abdddd2b))

### Code Refactoring

- omit TypeChecker<T> from Definition<T> ([aa0c25f](https://github.com/nlibjs/typing/commit/aa0c25f6ae8c2143e4fb6c0c411e95b4c4d8a33b))
- Iterable → Set ([fd08d7e](https://github.com/nlibjs/typing/commit/fd08d7edba2e438bf6bd0446b9a478a55f74f6ee))
- omit <T> ([e843502](https://github.com/nlibjs/typing/commit/e843502335788bf203eb84538ef3bf50990d2f6f))
- Object methods ([bc61ca8](https://github.com/nlibjs/typing/commit/bc61ca81894272124f3f40158378cd59ff2d3174))
- Iterable → Set ([68916de](https://github.com/nlibjs/typing/commit/68916de699d8c893258c72c6f4155b8dfe36cf2f))
- normalize set ([517dbe2](https://github.com/nlibjs/typing/commit/517dbe248df200b72d5d72b90c2a1dd3cc213ad8))


## v0.4.12 (2022-08-12)

### Features

- add Merge<A, B> ([a7a1b25](https://github.com/nlibjs/typing/commit/a7a1b25a4f51a96e6e2ca7beb8677b327d44155f))

### Dependency Upgrades

- **renovate:** update dependency eslint-plugin-jest to v26.8.2 ([c273671](https://github.com/nlibjs/typing/commit/c2736711da5296dffbb1046c99493b7291a87ae3))


## v0.4.11 (2022-08-07)

### Features

- add splitString ([1fb7a2a](https://github.com/nlibjs/typing/commit/1fb7a2aec97e62858b3210f1812a8ce2959c4a39))
- add TypedArray ([572fef4](https://github.com/nlibjs/typing/commit/572fef4828e9f811a7a0e380d877bc9390b3839e))
- add UrlHostString ([2761747](https://github.com/nlibjs/typing/commit/276174700345d974414e4fea24e8b339f3ac6b78))

### Bug Fixes

- postversion not works ([637b293](https://github.com/nlibjs/typing/commit/637b293a42d8e396512ea351cec67c16a186ad4c))
- eslint errors ([6ea9234](https://github.com/nlibjs/typing/commit/6ea9234eee8ea05aed334a6ed4deb8cf74a43bf5))
- skip Exclude ([6f8fb81](https://github.com/nlibjs/typing/commit/6f8fb81dca3c127fa99b24c9e07e0296e7d596bb))
- GuardedType breaks Nominal ([f69998d](https://github.com/nlibjs/typing/commit/f69998dc7d33e15e957c461c4bb488eaa6022a61))
- ArrayItem ([af51aea](https://github.com/nlibjs/typing/commit/af51aeafeb1210642fe4c3198ffd4be885d22101))
- HttpsUrlString rejects urls with port ([5ba7c74](https://github.com/nlibjs/typing/commit/5ba7c740db011848a2115dc5c9de32dfe16619bc))
- default to cjs ([360a8b8](https://github.com/nlibjs/typing/commit/360a8b837a6379dfb0f110605f45853b29133a38))
- main ([0426c2c](https://github.com/nlibjs/typing/commit/0426c2c0fad0c76a4914ad02f620a55479e09abf))
- index ([49b04ca](https://github.com/nlibjs/typing/commit/49b04ca927c4e8fe0630dbf114753b3c860905f1))

### Tests

- add tests for generics ([8282d5e](https://github.com/nlibjs/typing/commit/8282d5ee9ec18070b594b32b5356c34299f2f3c0))

### Dependency Upgrades

- @nlib/changelog:0.2.2→0.2.3 ([4819ed5](https://github.com/nlibjs/typing/commit/4819ed55f22e540a51a257857cc975f5ad067f28))
- @nlib/changelog:0.2.1→0.2.2 ([3280766](https://github.com/nlibjs/typing/commit/328076626e7a24c3bec6d3c9d8dffaac05e88d81))
- @nlib/eslint-config:3.18.0→3.19.4 ([8e251da](https://github.com/nlibjs/typing/commit/8e251da491179a415442f7c57148a368078afea8))
- **renovate:** update dependency @typescript-eslint/parser to v5.32.0 ([0420463](https://github.com/nlibjs/typing/commit/0420463189ddb99ee0aeff7b08a06e0fc81cb32d))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.32.0 ([3e3b69d](https://github.com/nlibjs/typing/commit/3e3b69d084c5cd5b039b88e4b8757e7d397d1e41))
- **renovate:** update dependency eslint to v8.21.0 ([10e49aa](https://github.com/nlibjs/typing/commit/10e49aa5be9ccc81befb01aa8dab51792566a0a7))
- **renovate:** update dependency eslint-plugin-jest to v26.7.0 ([b5ae879](https://github.com/nlibjs/typing/commit/b5ae879219da017f5eee83849bdcaca4034b1da4))
- @nlib/esmify:0.2.0→0.3.0 ([2dc52da](https://github.com/nlibjs/typing/commit/2dc52da316e1e2371c1181260b342c0218595bc5))
- @nlib/esmify:0.1.5→0.2.0 ([01cc232](https://github.com/nlibjs/typing/commit/01cc2329300ab6be62b8e0e9e4ffd49fd033b6b9))
- @nlib/esmify:0.1.4→0.1.5 ([056f3d0](https://github.com/nlibjs/typing/commit/056f3d0c06b0cf34cf306371d50f83db765cec94))


## v0.4.2 (2022-07-28)

### Bug Fixes

- build command ([42a5c40](https://github.com/nlibjs/typing/commit/42a5c40d0aff52d4d8da92060f82bfc2bd0c1245))


## v0.4.1 (2022-07-28)

### Dependency Upgrades

- @nlib/esmify:0.1.2→0.1.4 ([f8fff72](https://github.com/nlibjs/typing/commit/f8fff7297717b79d12a0610f7be3122812501d85))


## v0.4.0 (2022-07-28)

### Features

- esm ([2e65f53](https://github.com/nlibjs/typing/commit/2e65f538837b227307d96aa5f5cf3d1cf633eee6))
- rename ([a89b125](https://github.com/nlibjs/typing/commit/a89b12522d9b4de0c6a8f4ca8fe32f42a7879cfe))
- add DefinitionType<T> ([beaf55d](https://github.com/nlibjs/typing/commit/beaf55d49dbc3bcf8ef6f8734149a6b445f0dc9f))
- add MapKey<T> and MapValue<T> ([12f5aab](https://github.com/nlibjs/typing/commit/12f5aab51c41acb0ea48d77991a3a2cdda2dcf80))
- add SetItem<T> ([d39dc2c](https://github.com/nlibjs/typing/commit/d39dc2c3b25af74557402c61d5d40f3656b893f6))

### Dependency Upgrades

- typescript:4.6.4→4.7.4 ([78e0dfa](https://github.com/nlibjs/typing/commit/78e0dfae90cfcfcf3cf70e9c70ae6ae89cc99162))
- eslint:8.14.0→8.20.0 eslint-plugin-jest:26.1.5→26.6.0 ([2fdf2ab](https://github.com/nlibjs/typing/commit/2fdf2ab2f2ae1c4ca2cf2f639b4638bf3699e19d))
- @typescript-eslint/eslint-plugin:5.22.0→5.31.0 @typescript-eslint/parser:5.22.0→5.31.0 ([1a660df](https://github.com/nlibjs/typing/commit/1a660dfdaaa7b772196be603fc156c14ada5ab7c))
- lint-staged:12.4.1→13.0.3 ([9b0ca0d](https://github.com/nlibjs/typing/commit/9b0ca0df35a61bdbbaaa9915326c321a10a614a7))
- jest:27.5.1→28.1.3 ts-jest:27.1.4→28.0.7 ([b5e664d](https://github.com/nlibjs/typing/commit/b5e664d1b4341abc438b102ae1843017f20e57ca))
- @types/eslint:8.4.2→8.4.5 @types/jest:27.5.0→28.1.6 ([6571782](https://github.com/nlibjs/typing/commit/65717822a81d7524582ef6bea4a5609bede4dd4c))
- @nlib/changelog:0.1.11→0.2.1 @nlib/eslint-config:3.17.30→3.18.0 @nlib/indexen:0.1.2→0.2.2 @nlib/lint-commit:0.1.8→0.2.0 ([802189d](https://github.com/nlibjs/typing/commit/802189dfc5dec102b58bb0513cea3de4d112ce24))
- **renovate:** update dependency @types/eslint to v8.4.2 ([7bdb833](https://github.com/nlibjs/typing/commit/7bdb833c75e9c46832d82b6b13e9fb61a3270ce8))
- **renovate:** update dependency @typescript-eslint/parser to v5.22.0 ([aa6f994](https://github.com/nlibjs/typing/commit/aa6f9948124d7ac7a2c18995909a31fb60885cbd))
- **renovate:** update dependency @types/jest to v27.5.0 ([e2f2213](https://github.com/nlibjs/typing/commit/e2f22130e6f30270297c2977a218e9c210855fb8))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.22.0 ([7a71b4c](https://github.com/nlibjs/typing/commit/7a71b4c5939d4c51e658edf0b887c91bda525f60))
- **renovate:** update dependency typescript to v4.6.4 ([87fbc81](https://github.com/nlibjs/typing/commit/87fbc8121095d3b0ba14c8c52b6a2d0c23ee776b))
- **renovate:** update dependency lint-staged to v12.4.1 ([5192e11](https://github.com/nlibjs/typing/commit/5192e11850106e9ed7ced72605b5e89880dc42d6))
- **renovate:** update dependency @typescript-eslint/parser to v5.21.0 ([e2a4323](https://github.com/nlibjs/typing/commit/e2a4323590aef9ad8da06201e684b4569f6697d5))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.21.0 ([76de40e](https://github.com/nlibjs/typing/commit/76de40e8987afa3a2dd629418efc32a97aaf1a87))
- **renovate:** update dependency eslint-plugin-jest to v26.1.5 ([186c022](https://github.com/nlibjs/typing/commit/186c0220d88f31ff89afbab688f298ea7ec33c7f))
- **renovate:** update dependency eslint to v8.14.0 ([43b55c1](https://github.com/nlibjs/typing/commit/43b55c153caa7ce7751eb902b3ca7b2de20374cc))
- **renovate:** update dependency lint-staged to v12.4.0 ([f4b36a5](https://github.com/nlibjs/typing/commit/f4b36a529be321fe6dbef871b9cd312f3fb4aa9e))
- **renovate:** update dependency @typescript-eslint/parser to v5.20.0 ([4783e2c](https://github.com/nlibjs/typing/commit/4783e2cbdef9bc656f84e7340f4cad8b2b8af3e1))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.20.0 ([fcad30a](https://github.com/nlibjs/typing/commit/fcad30a1433a1ed3df442b8647aca1630edee1f3))
- **renovate:** update dependency lint-staged to v12.3.8 ([f409e2b](https://github.com/nlibjs/typing/commit/f409e2b9448c0e3a5f3eee4ddf14f71bb564858d))
- **renovate:** update dependency @typescript-eslint/parser to v5.19.0 ([5219054](https://github.com/nlibjs/typing/commit/521905497b6301198763b907eafbc49187804c44))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.19.0 ([2df354a](https://github.com/nlibjs/typing/commit/2df354a9304d02d2fed046ad4f12e30f920b74ab))
- **renovate:** update dependency eslint to v8.13.0 ([75c97e0](https://github.com/nlibjs/typing/commit/75c97e01b5f6ac6b9eb78d2d6c8612cee238e796))
- **renovate:** update dependency eslint-plugin-jest to v26.1.4 ([177ef6e](https://github.com/nlibjs/typing/commit/177ef6e925b68d9546570371b991f55fd25ce5d9))
- **renovate:** update dependency @typescript-eslint/parser to v5.18.0 ([bd02257](https://github.com/nlibjs/typing/commit/bd022577174cebbee92cf3245894c250edc175b6))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.18.0 ([7aff490](https://github.com/nlibjs/typing/commit/7aff490bf6b0c56892f431214dfdf864975e9544))
- **renovate:** update dependency @typescript-eslint/parser to v5.17.0 ([1bc99bf](https://github.com/nlibjs/typing/commit/1bc99bfee1506b95589ce98b7c2db30ae37fc753))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.17.0 ([ca59d3e](https://github.com/nlibjs/typing/commit/ca59d3e52a242199d0887c56c89011847323612d))
- **renovate:** update dependency eslint to v8.12.0 ([2daaee7](https://github.com/nlibjs/typing/commit/2daaee75770a2c44f6d59edd5c4c784ba1e30d07))
- **renovate:** update dependency typescript to v4.6.3 ([179b24d](https://github.com/nlibjs/typing/commit/179b24d9fccd758e8e6842b96c5c436e32c2f362))
- **renovate:** update dependency ts-jest to v27.1.4 ([2d42c47](https://github.com/nlibjs/typing/commit/2d42c47e6e68204e6ed4073e54fbb44d504e8ba1))
- **renovate:** update dependency eslint-plugin-jest to v26.1.3 ([0d85250](https://github.com/nlibjs/typing/commit/0d852506c2ced1e063a24e1ec0b77d8b14edc84a))
- **renovate:** update dependency @typescript-eslint/parser to v5.16.0 ([cd5f249](https://github.com/nlibjs/typing/commit/cd5f24918847ced9d67f92e1bbde00a56cc82755))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.16.0 ([8b3c47a](https://github.com/nlibjs/typing/commit/8b3c47ab77146ab8daf8976e874b098878f96275))
- **renovate:** update dependency eslint-plugin-jest to v26.1.2 ([2bed97a](https://github.com/nlibjs/typing/commit/2bed97a6287ca3aea82a47d353e06f74b2029531))
- **renovate:** update dependency lint-staged to v12.3.7 ([d442f47](https://github.com/nlibjs/typing/commit/d442f473fe92d662d70ecbdef08696564e487d9c))
- **renovate:** update dependency @typescript-eslint/parser to v5.15.0 ([de8df16](https://github.com/nlibjs/typing/commit/de8df16fda538dd0b046f4cbbc47b2a380737674))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.15.0 ([1160f92](https://github.com/nlibjs/typing/commit/1160f927df84b601c71a3e0b360c9e76eeaf976a))
- **renovate:** update dependency eslint to v8.11.0 ([1d2f771](https://github.com/nlibjs/typing/commit/1d2f7719d03ca54bba787ec3ea2eb67210658d5d))
- **renovate:** update dependency @typescript-eslint/parser to v5.14.0 ([582ab93](https://github.com/nlibjs/typing/commit/582ab93909441574966d095e1f83bb086a3e38d7))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.14.0 ([eb62425](https://github.com/nlibjs/typing/commit/eb624258c332de406d14a985e21b49f5b4531a64))
- **renovate:** update dependency lint-staged to v12.3.5 ([e57c2ce](https://github.com/nlibjs/typing/commit/e57c2ce9d3b85ca6432b31094df09e63608df7d5))
- **renovate:** update dependency typescript to v4.6.2 ([ef3e5d3](https://github.com/nlibjs/typing/commit/ef3e5d32ec6a7fc2625347ba7642fb3e38356024))
- **renovate:** update dependency @typescript-eslint/parser to v5.13.0 ([5664cad](https://github.com/nlibjs/typing/commit/5664cad02592c6105123839d43d0430877136439))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.13.0 ([5fd7e9e](https://github.com/nlibjs/typing/commit/5fd7e9ea187be838628abf9d0a9b45fb61c73576))
- **renovate:** update dependency eslint to v8.10.0 ([2aa8369](https://github.com/nlibjs/typing/commit/2aa83690b1893044905cf5653d5d996c2a1b1960))


## v0.3.4 (2022-02-27)

### Bug Fixes

- skip indexen in the build steps ([3a77e34](https://github.com/nlibjs/typing/commit/3a77e34af5a5cd80421a9146d981529b1e39a17e))


## v0.3.3 (2022-02-27)

### Bug Fixes

- update index ([53eb5c8](https://github.com/nlibjs/typing/commit/53eb5c824d2c347955bf04ba18cae030eef8121d))


## v0.3.2 (2022-02-27)

### Features

- add the second parameter N: TypeChecker<T, N> ([7e0d32b](https://github.com/nlibjs/typing/commit/7e0d32b57e67fb5bfffde6337b3cb8c39246be4a))


## v0.3.1 (2022-02-26)

### Features

- add isHttpsUrlString ([371f945](https://github.com/nlibjs/typing/commit/371f9454e96ab3af52aa5fd2a85c871a93d8129a))
- add isBase64UrlString ([ccd2559](https://github.com/nlibjs/typing/commit/ccd255954612ba8bd00d769515b30cc5cd7c574e))
- add isBase64String ([cee64e4](https://github.com/nlibjs/typing/commit/cee64e4d58916d608489b5d85a4c2ab7138d1a5b))

### Tests

- fix tests for string ([e5c4aeb](https://github.com/nlibjs/typing/commit/e5c4aebc1ac8dd46421adac89b4ae4d3ec7033d1))


## v0.3.0 (2022-02-26)

### Features

- add isIpv4Address, isIpv6Address ([2a42fc3](https://github.com/nlibjs/typing/commit/2a42fc3e0eacfc794a8f821be3659e6495b5fd4f))
- add parseIpv6Address ([4b39a58](https://github.com/nlibjs/typing/commit/4b39a58f23616d80dcfa38325e954367d976bc8b))
- add parseIpv4Address ([7084a30](https://github.com/nlibjs/typing/commit/7084a30adda101c861c2b99ffac7c8ecffd4f4df))
- add isEmailAddress ([3c2a364](https://github.com/nlibjs/typing/commit/3c2a364a7ce3970a15d4351fd5a6f4248b2644f3))
- add isEmailAddressLocalPart ([c2cf58e](https://github.com/nlibjs/typing/commit/c2cf58e28b7bccb686f3a4212dc660a572c0c585))
- add getType ([99f8ecf](https://github.com/nlibjs/typing/commit/99f8ecf39747d42575f5de8fda1fbd9094042df9))
- expose codePoints ([06dbae5](https://github.com/nlibjs/typing/commit/06dbae55dd1d28893297099d9e01bc1d6298c7d0))
- add isDomainName ([afe15f9](https://github.com/nlibjs/typing/commit/afe15f9e35bd022d6348b06fc691ce4afeffabfb))

### Bug Fixes

- import ([5313ddc](https://github.com/nlibjs/typing/commit/5313ddcd30ec301fa4a1145c54783e99f27d7815))

### Tests

- check end ([54b3e86](https://github.com/nlibjs/typing/commit/54b3e86d42baa4cad8b3562a99a5c0acc8407aa0))
- add some testes for domain name ([656fb46](https://github.com/nlibjs/typing/commit/656fb469b50b5fe8ef80437b7147511e62f71883))

### Dependency Upgrades

- **renovate:** pin dependencies ([0a91d9e](https://github.com/nlibjs/typing/commit/0a91d9e4a35b1ee17d29272680f0a8b8798596a0))
- **renovate:** update dependency @typescript-eslint/parser to v5.12.0 ([7656ad9](https://github.com/nlibjs/typing/commit/7656ad9f42fc2c943131af4e61665cf22543a1a3))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.12.0 ([788c962](https://github.com/nlibjs/typing/commit/788c962542cd78b5e3fae4aa43d107fefb7d0f16))
- **renovate:** update dependency lint-staged to v12.3.4 ([2d46be5](https://github.com/nlibjs/typing/commit/2d46be57c0a78ff05948d9c7bccd34b542ca10ee))
- **renovate:** update dependency eslint to v8.9.0 ([78eb554](https://github.com/nlibjs/typing/commit/78eb55456a70e06f5bff8a59a498f15b904e1422))
- **renovate:** update dependency @typescript-eslint/parser to v5.11.0 ([9190620](https://github.com/nlibjs/typing/commit/91906204bdeca4f66a341f0a925b7852209faa85))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.11.0 ([f0de065](https://github.com/nlibjs/typing/commit/f0de0655485e7db81702b81693711e644b7b2cfb))
- **renovate:** update dependency ts-node to v10.5.0 ([a049fa7](https://github.com/nlibjs/typing/commit/a049fa7e0136ec868d9c0fb4378d8fd120479eb8))
- **renovate:** update dependency lint-staged to v12.3.3 ([15355ce](https://github.com/nlibjs/typing/commit/15355cefd65c7ba1f3c6fa374988e457b2a7e268))
- **renovate:** update dependency @typescript-eslint/parser to v5.10.2 ([08ee3b6](https://github.com/nlibjs/typing/commit/08ee3b65a8ac900ab24b6b84217c429b7d0fd50d))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.10.2 ([8e64ca6](https://github.com/nlibjs/typing/commit/8e64ca6815475cb9512be6b9f1eeb5ed169ad111))
- **renovate:** update dependency eslint to v8.8.0 ([a97fb03](https://github.com/nlibjs/typing/commit/a97fb035aeafaff59a6d93b526799e39d32da92a))
- **renovate:** update dependency lint-staged to v12.3.2 ([85fe99f](https://github.com/nlibjs/typing/commit/85fe99f48c0a0ed1c06e3a7c2fec39075093515e))
- **renovate:** update dependency @typescript-eslint/parser to v5.10.1 ([75e134d](https://github.com/nlibjs/typing/commit/75e134d5140b769355c59587507ab24eca4a7e8f))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.10.1 ([ef1803e](https://github.com/nlibjs/typing/commit/ef1803e8c392659418bc6a4eca62567baee9e6e3))
- **renovate:** update dependency lint-staged to v12.3.1 ([0e4f114](https://github.com/nlibjs/typing/commit/0e4f114bbfc82dc5942f7ed32a574ff375be59be))
- **renovate:** update dependency eslint to v8.7.0 ([f5a67e5](https://github.com/nlibjs/typing/commit/f5a67e524cd8848ef14a557c34a4aaf84e9a0d8a))
- **renovate:** update dependency typescript to v4.5.5 ([2169369](https://github.com/nlibjs/typing/commit/2169369da6512768e77e415cd705ad08559b3ab5))
- **renovate:** update dependency @typescript-eslint/parser to v5.10.0 ([f9bc990](https://github.com/nlibjs/typing/commit/f9bc99084563786d109b6479d8e4ac6b8b27791c))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v5.10.0 ([9fd26da](https://github.com/nlibjs/typing/commit/9fd26da8e195c410d28ff1cacbc4a099e4ab33a0))
- **renovate:** pin dependencies ([8f4be2e](https://github.com/nlibjs/typing/commit/8f4be2ed4a83e1105da4467a9a9fa784dd86c0fb))


## v0.2.3 (2022-01-12)

### Bug Fixes

- package configurations ([846cd59](https://github.com/nlibjs/typing/commit/846cd59f4d090df285486d6b321967b31efe2ae1))

### Dependency Upgrades

- install nlib tools ([b5b255b](https://github.com/nlibjs/typing/commit/b5b255bb0fc6ec0d26c04963ad8d2d0b0c793e72))
- @nlib/eslint-config:3.17.25→3.17.30 @types/eslint:7.28.0→8.2.2 @typescript-eslint/eslint-plugin:4.30.0→5.9.1 @typescript-eslint/parser:4.32.0→5.9.1 ava:3.15.0→4.0.1 eslint:7.32.0→8.6.0 lint-staged:11.1.2→12.1.7 ts-node:10.2.1→10.4.0 typescript:4.4.2→4.5.4 ([4c2fff5](https://github.com/nlibjs/typing/commit/4c2fff5c25316ff757fda3facc338d7000e47cb9))
- **renovate:** update dependency @typescript-eslint/parser to v4.32.0 ([15d9236](https://github.com/nlibjs/typing/commit/15d9236b97e5e8eca9dd78ca4e22d2997ad20c1c))
- **renovate:** update dependency @typescript-eslint/parser to v4.31.2 ([8ed8964](https://github.com/nlibjs/typing/commit/8ed8964dbcf2b95a5d45c80afb58b5660857c1f3))
- **renovate:** update dependency @typescript-eslint/parser to v4.31.0 ([253d6cd](https://github.com/nlibjs/typing/commit/253d6cd5c48b790933c96108c0c11b893b187e4d))


## v0.2.2 (2021-09-06)

### Features

- stringifyDefinition is private ([545880a](https://github.com/nlibjs/typing/commit/545880ab553e11507cd8bb47274b8c8cb3411493))

### Tests

- use @nlib/test@4.0.0 ([01d5a6f](https://github.com/nlibjs/typing/commit/01d5a6f89ccdb98a228b3fbd534de1e2a53b0af1))
- use @nlib/test@4.0.0 ([275b22b](https://github.com/nlibjs/typing/commit/275b22bd69b9ec9e86a45dac3f7cda6ec008e774))

### Dependency Upgrades

- @nlib/test:3.18.8→4.0.0 ([0391ce1](https://github.com/nlibjs/typing/commit/0391ce1250fc7438096b3bd86857afd11ee51409))
- @nlib/test:3.18.7→3.18.8 ([7e45327](https://github.com/nlibjs/typing/commit/7e45327d12f1b0fb35d3696bad8ac079a10892ce))


## v0.2.1 (2021-09-05)

### Features

- add typechecker.array/optional/dictionary ([06b3daa](https://github.com/nlibjs/typing/commit/06b3daa694a0893056430c5c1eaa8b895ea90bb7))

### Bug Fixes

- change build target ([b40ef02](https://github.com/nlibjs/typing/commit/b40ef020b22cc367733c023016f3cf61e8e7860c))
- fix isTypeChecker ([fddde84](https://github.com/nlibjs/typing/commit/fddde84df3f87c674981b3b192e2c075d653f8bc))
- resolve circular dependency ([e952bdb](https://github.com/nlibjs/typing/commit/e952bdb97c19387735487dbf7a9bd72757f77555))

### Tests

- increase coverage ([ca75ca5](https://github.com/nlibjs/typing/commit/ca75ca5bff1af60f220424a273f87f2f8ad49309))
- transpile to cjs ([af70021](https://github.com/nlibjs/typing/commit/af700211ccf37102e566e9e3397bb49e0acda782))

### Code Refactoring

- refactor types ([3e2891b](https://github.com/nlibjs/typing/commit/3e2891b26e27a155b6c6d146066826d3c50f899b))

### Continuous Integration

- runs-on ubuntu-latest x 16.x ([3ca162c](https://github.com/nlibjs/typing/commit/3ca162cb9bb175b071f9a8a617c5c9ef1c684063))
- update workflows ([d661994](https://github.com/nlibjs/typing/commit/d661994af19b31b23a2d41ef901b15c8e5d81fd9))

### Dependency Upgrades

- @nlib/eslint-config:3.17.16→3.17.25 @typescript-eslint/eslint-plugin:4.25.0→4.30.0 typescript:4.2.4→4.4.2 ([d6ff6fa](https://github.com/nlibjs/typing/commit/d6ff6fae170adb0a80040f1e80747d251c92e8ac))
- update build flow ([dc10290](https://github.com/nlibjs/typing/commit/dc10290ca5910b357f4a4e53c073339b1776acf4))
- uninstall @nlib/changelog @nlib/lint-commit ([e6a7d79](https://github.com/nlibjs/typing/commit/e6a7d798389dbcc0a64152c27cef78a665a60092))
- **renovate:** update dependency @typescript-eslint/parser to v4.30.0 ([3e19d9a](https://github.com/nlibjs/typing/commit/3e19d9a3539d6aba27936e0f89a56cb801d59ff0))
- **renovate:** update dependency @typescript-eslint/parser to v4.29.3 ([ee628e9](https://github.com/nlibjs/typing/commit/ee628e977f7141628819af0916f7888c3b34494e))
- **renovate:** update dependency @typescript-eslint/parser to v4.29.2 ([b8221cd](https://github.com/nlibjs/typing/commit/b8221cd478f780a7d078d9f5964c17cf5148ebb6))
- **renovate:** update dependency @typescript-eslint/parser to v4.29.1 ([5a04c64](https://github.com/nlibjs/typing/commit/5a04c64519f83be7a927b079d174a8bfb7f90730))
- **renovate:** update dependency sucrase to v3.20.1 ([4c20312](https://github.com/nlibjs/typing/commit/4c20312af232c8da295eac71e49a059f7144b265))
- **renovate:** update dependency lint-staged to v11.1.2 ([af70693](https://github.com/nlibjs/typing/commit/af706931d6bafdd3ea749a23abf17c87fd46c6f9))
- **renovate:** update dependency @typescript-eslint/parser to v4.29.0 ([e65489b](https://github.com/nlibjs/typing/commit/e65489bc3a45a40919f9ed9cbc1057e1d61146a2))
- **renovate:** update dependency eslint to v7.32.0 ([4d04241](https://github.com/nlibjs/typing/commit/4d04241687595fcea9cceee53677ea91a82723ae))
- **renovate:** update dependency @typescript-eslint/parser to v4.28.5 ([16224a1](https://github.com/nlibjs/typing/commit/16224a1fb30372a9b0a1a6c4af5d5a4b5de82c09))
- **renovate:** update dependency lint-staged to v11.1.1 ([85fce1f](https://github.com/nlibjs/typing/commit/85fce1fb32bc043ec016730aadbb413235b5aafe))
- **renovate:** update dependency @typescript-eslint/parser to v4.28.4 ([2bf13f0](https://github.com/nlibjs/typing/commit/2bf13f0b7495faeeb51031a79d7c31e69694a867))
- **renovate:** update dependency eslint to v7.31.0 ([65d2b23](https://github.com/nlibjs/typing/commit/65d2b239b9d59a2aecf1c140b9a4c9985dcfa58a))
- **renovate:** update dependency lint-staged to v11.0.1 ([b2fb499](https://github.com/nlibjs/typing/commit/b2fb4991d8d7272e0cfb47536929b35ff6bd0a52))
- **renovate:** update dependency @types/eslint to v7.28.0 ([e813265](https://github.com/nlibjs/typing/commit/e81326572a5db7d2f3357a4420645fca33b4ace1))
- **renovate:** update dependency @typescript-eslint/parser to v4.28.3 ([8148298](https://github.com/nlibjs/typing/commit/8148298fdfaea647e21de08c3824de60492b15a9))
- **renovate:** update dependency sucrase to v3.20.0 ([15fcf7d](https://github.com/nlibjs/typing/commit/15fcf7daf8a3c1b728f9e034776959988b3d5784))
- **renovate:** update dependency @types/eslint to v7.2.14 ([451d5d1](https://github.com/nlibjs/typing/commit/451d5d1568c59e64dabafb633ebdef223b91f83d))
- **renovate:** update dependency @typescript-eslint/parser to v4.28.2 ([374af25](https://github.com/nlibjs/typing/commit/374af25525ce0fb4644742f50b55111dab0de357))
- **renovate:** update dependency eslint to v7.30.0 ([6ca97cc](https://github.com/nlibjs/typing/commit/6ca97ccd529f708dfbc16fb47406cd55807af6eb))
- **renovate:** update dependency @typescript-eslint/parser to v4.28.1 ([016e448](https://github.com/nlibjs/typing/commit/016e448788f5d4e482f8e122adbde138bc6ff8ad))
- **renovate:** update dependency sucrase to v3.19.0 ([3c3e2cb](https://github.com/nlibjs/typing/commit/3c3e2cb8c8b620403026ccb85f8f4dfb96b355fb))
- **renovate:** update dependency @typescript-eslint/parser to v4.28.0 ([fbf30f8](https://github.com/nlibjs/typing/commit/fbf30f84a9d0069397ff27b2a5fdfcde3ca0cfc6))
- **renovate:** update dependency eslint to v7.29.0 ([19b75ad](https://github.com/nlibjs/typing/commit/19b75adfa991104334b00618474a09a32b88676e))
- **renovate:** update dependency @typescript-eslint/parser to v4.27.0 ([9c45099](https://github.com/nlibjs/typing/commit/9c4509902b5d398ee29a86d406f261c758d9cedf))
- **renovate:** update dependency @typescript-eslint/parser to v4.26.1 ([38658b6](https://github.com/nlibjs/typing/commit/38658b691cc8403d501165159433334939592ef4))
- **renovate:** update dependency sucrase to v3.18.2 ([023c128](https://github.com/nlibjs/typing/commit/023c12833782140fb870c1692d576f068023f4af))
- **renovate:** update dependency eslint to v7.28.0 ([6a26424](https://github.com/nlibjs/typing/commit/6a26424b9d51c834d38c45c6d328d10b8e220a06))
- **renovate:** update dependency @typescript-eslint/parser to v4.26.0 ([65a6746](https://github.com/nlibjs/typing/commit/65a674627a04a7cdc3b63dfc6ddb5d629da97716))
- **renovate:** update dependency @types/eslint to v7.2.12 ([ed60bb8](https://github.com/nlibjs/typing/commit/ed60bb89af990734c5346989af63f81dc2e7f903))
- **renovate:** update dependency @typescript-eslint/parser to v4.25.0 ([9ebea3d](https://github.com/nlibjs/typing/commit/9ebea3db24cf54e624e467c53ad39b1a53b227cf))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.25.0 ([9c66141](https://github.com/nlibjs/typing/commit/9c661415057e9c5e4e30ee8dc1caa4d41bac8e30))
- **renovate:** update dependency eslint to v7.27.0 ([599f35b](https://github.com/nlibjs/typing/commit/599f35ba8b36fd22954a3bdd5b56f9afed80bfe0))
- **renovate:** update dependency @typescript-eslint/parser to v4.24.0 ([e82fcf3](https://github.com/nlibjs/typing/commit/e82fcf344c5cc2d422bbf50682a72f43ecbb627d))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.24.0 ([0139bf9](https://github.com/nlibjs/typing/commit/0139bf9fe80e4c4f4b5c5d272a8cd0bc202d7531))
- **renovate:** update dependency @typescript-eslint/parser to v4.23.0 ([763bc3a](https://github.com/nlibjs/typing/commit/763bc3a46a59ad30d294b73c35f90e5e130933ac))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.23.0 ([6a7dbc3](https://github.com/nlibjs/typing/commit/6a7dbc36ef1fd89a6ec9bb69997b0ded0d72c5b2))
- **renovate:** update dependency lint-staged to v11 (#107) ([c1ae2f1](https://github.com/nlibjs/typing/commit/c1ae2f10c1f8531a009d1c991d537e804583a4d2))
- **renovate:** update dependency eslint to v7.26.0 ([db32e3f](https://github.com/nlibjs/typing/commit/db32e3f55b3cb67f2d9ef83124630f9dfd0915a5))
- **renovate:** update dependency @typescript-eslint/parser to v4.22.1 ([112a8c4](https://github.com/nlibjs/typing/commit/112a8c44d00d273ac28bda064a2e9601c3d8697d))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.22.1 ([cfded9b](https://github.com/nlibjs/typing/commit/cfded9b51b78c89678274c2ffb58f1a844175b46))
- **renovate:** update dependency eslint to v7.25.0 ([7afb584](https://github.com/nlibjs/typing/commit/7afb584530ae8fb97e03b8521bbe8c9d8c63cc53))
- **renovate:** update dependency @types/eslint to v7.2.10 ([0ba1c4c](https://github.com/nlibjs/typing/commit/0ba1c4c442599e50549c02fe14a2416214c1b31d))
- **renovate:** update dependency @typescript-eslint/parser to v4.22.0 ([cfb9b0c](https://github.com/nlibjs/typing/commit/cfb9b0c3537e0b6129794c63f335e43af4b2cd19))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.22.0 ([f1ef673](https://github.com/nlibjs/typing/commit/f1ef6735140c80b36bc518f4484f8bacbd2cdd72))
- **renovate:** update dependency sucrase to v3.18.1 ([da45534](https://github.com/nlibjs/typing/commit/da455343d1f0e12f49a73558a96bc29de8e348cf))
- **renovate:** update dependency eslint to v7.24.0 ([675cb24](https://github.com/nlibjs/typing/commit/675cb24bf0d6258130c93262167f8a66ebe87390))
- **renovate:** update dependency typescript to v4.2.4 ([e98c49f](https://github.com/nlibjs/typing/commit/e98c49f5e3bdb4ec3c3962361de288016c95b3d9))
- **renovate:** update dependency @typescript-eslint/parser to v4.21.0 ([8655102](https://github.com/nlibjs/typing/commit/865510273c4958731424fae3c6b01f55cba74365))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.21.0 ([457ea51](https://github.com/nlibjs/typing/commit/457ea510f7870cbad8801ff43f1f840641f6626a))
- **renovate:** update dependency @types/eslint to v7.2.8 ([9809a47](https://github.com/nlibjs/typing/commit/9809a474f9bdddae1a1d345a35faba9e5af0b95e))
- **renovate:** update dependency @typescript-eslint/parser to v4.20.0 ([e2cb1e7](https://github.com/nlibjs/typing/commit/e2cb1e760e89799d00603cb2471ee49ad7f9539b))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.20.0 ([ec5be46](https://github.com/nlibjs/typing/commit/ec5be46c35aa53159715e1198f6c3868cd493680))
- **renovate:** update dependency @nlib/test to v3.18.7 ([7733c97](https://github.com/nlibjs/typing/commit/7733c97dd5600b88b6c7361de02200b7351440a0))
- **renovate:** update dependency @nlib/nodetool to v0.1.17 ([ab3b24e](https://github.com/nlibjs/typing/commit/ab3b24e63733ddd5fb6a1eae26f350012718ccf5))
- **renovate:** update dependency @nlib/lint-commit to v0.1.4 ([8f3a3cf](https://github.com/nlibjs/typing/commit/8f3a3cf86686a9e636ea272fa08b06fa1a936401))
- **renovate:** update dependency eslint to v7.23.0 ([9923ffb](https://github.com/nlibjs/typing/commit/9923ffb56a0c856edb0d72fa3d958e55cb8c6489))
- **renovate:** update dependency @typescript-eslint/parser to v4.19.0 ([9ebf575](https://github.com/nlibjs/typing/commit/9ebf575dc668ed9afb4419a54d461531a75d410c))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.19.0 ([0906796](https://github.com/nlibjs/typing/commit/0906796de6d34ac36e5212bf3bbbc970e1e4b795))
- **renovate:** update dependency @typescript-eslint/parser to v4.18.0 ([55c0f54](https://github.com/nlibjs/typing/commit/55c0f549f68dad7c01d78190a71d912f05170e95))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.18.0 ([0b340e8](https://github.com/nlibjs/typing/commit/0b340e8aa44adb19d89d60050ae4046a8e46c076))
- **renovate:** update dependency eslint to v7.22.0 ([11f86e0](https://github.com/nlibjs/typing/commit/11f86e0489fa1daab694e396e698b350c9b3efae))
- **renovate:** update dependency @typescript-eslint/parser to v4.17.0 ([4c8cf08](https://github.com/nlibjs/typing/commit/4c8cf0846d0182bb4f8cffe17089f5a08814931b))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.17.0 ([cc66681](https://github.com/nlibjs/typing/commit/cc6668186125d85aea73af20be66be72dfb59f88))
- **renovate:** update dependency @types/eslint to v7.2.7 ([773ee47](https://github.com/nlibjs/typing/commit/773ee473618d3eaa2b9398a9c5a97c7a3fc7ba31))
- **renovate:** update dependency typescript to v4.2.3 ([dcff60d](https://github.com/nlibjs/typing/commit/dcff60de67ae7441bec10d6642471d224ebc26f6))
- **renovate:** update dependency @typescript-eslint/parser to v4.16.1 ([24f0fe1](https://github.com/nlibjs/typing/commit/24f0fe120b65645db8f738285da60e9fa6c97823))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.16.1 ([780156f](https://github.com/nlibjs/typing/commit/780156f6d0381edf6808409c74fa29d64d627435))
- **renovate:** update dependency eslint to v7.21.0 ([074b5dd](https://github.com/nlibjs/typing/commit/074b5dde3b38f7ddcd07aea6fb7d2876460fb0b2))
- **renovate:** update dependency typescript to v4.2.2 ([4f3cae3](https://github.com/nlibjs/typing/commit/4f3cae3a5126f09620c00aa85ae0b5b00a835739))
- **renovate:** update dependency @typescript-eslint/parser to v4.15.2 ([fa0599a](https://github.com/nlibjs/typing/commit/fa0599a54fbaeb49c1c69475c8a089b7b10b51cf))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.15.2 ([4fef26f](https://github.com/nlibjs/typing/commit/4fef26f322dcb3ffca04471ccdf55d70056cbf34))
- **renovate:** update dependency @typescript-eslint/parser to v4.15.1 ([dc890e3](https://github.com/nlibjs/typing/commit/dc890e3ad7d0b7bc080023fca731d1e17a12271c))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.15.1 ([e9e1e6b](https://github.com/nlibjs/typing/commit/e9e1e6b78ac9bfe69915365d0604891783cc5fe3))
- **renovate:** update dependency eslint to v7.20.0 ([6ac1e62](https://github.com/nlibjs/typing/commit/6ac1e6269ab81b70e18a903c6ef3cfbbf55690b7))
- **renovate:** update dependency typescript to v4.1.5 ([717e6a7](https://github.com/nlibjs/typing/commit/717e6a71893f86dde3044d2ad072493fc83650b1))
- **renovate:** update dependency @typescript-eslint/parser to v4.15.0 ([88d7e58](https://github.com/nlibjs/typing/commit/88d7e58769a105650138eb2a47a89c3f2ae8de08))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.15.0 ([0a3f36c](https://github.com/nlibjs/typing/commit/0a3f36c7d730ea13f7db24d4a6a7f296802135d7))
- **renovate:** update dependency lint-staged to v10.5.4 ([e045a9f](https://github.com/nlibjs/typing/commit/e045a9f6264dd4f91a48a987d02acd53e6664be8))
- **renovate:** update dependency @typescript-eslint/parser to v4.14.2 ([a92a0c7](https://github.com/nlibjs/typing/commit/a92a0c737abd029d6a88981a7576559962a4e767))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.14.2 ([08d9231](https://github.com/nlibjs/typing/commit/08d9231dfe701817e6e13333829b5244720d7a66))
- **renovate:** update dependency sucrase to v3.17.1 ([31b2845](https://github.com/nlibjs/typing/commit/31b2845db25f52874618b623942fc73f44093b56))
- **renovate:** update dependency eslint to v7.19.0 ([d9ef7a6](https://github.com/nlibjs/typing/commit/d9ef7a6bb8e6f30d8e39fac04ba4bbed056bcc4b))
- **renovate:** update dependency @typescript-eslint/parser to v4.14.1 ([24a1bee](https://github.com/nlibjs/typing/commit/24a1bee5eff416a0ef4e03f23a71f795642220dd))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.14.1 ([7e8bcad](https://github.com/nlibjs/typing/commit/7e8bcad5ddee07b616cb59f1c5ce6ceff16a5feb))
- **renovate:** update dependency @typescript-eslint/parser to v4.14.0 ([4b9bdc6](https://github.com/nlibjs/typing/commit/4b9bdc686da6d7fafc15f6a41d0cea18af197b5c))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.14.0 ([8406efa](https://github.com/nlibjs/typing/commit/8406efa04e474ed48aba713c03be60f1b67e9fd9))
- **renovate:** update dependency husky to v4.3.8 ([a6ee26b](https://github.com/nlibjs/typing/commit/a6ee26b1e417dd14fbdfccc91ccbecfd29d45a22))
- **renovate:** update dependency eslint to v7.18.0 ([9e2c032](https://github.com/nlibjs/typing/commit/9e2c03293edaacad59c699fd8deddc6a06b36eae))
- **renovate:** update dependency @typescript-eslint/parser to v4.13.0 ([f4f6b40](https://github.com/nlibjs/typing/commit/f4f6b4027b83f391d6111b9179b8d6eee0029089))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.13.0 ([2e3e152](https://github.com/nlibjs/typing/commit/2e3e152bc8bde1dd9bc7d001efd9c6e05c165c24))
- **renovate:** update dependency husky to v4.3.7 ([469b762](https://github.com/nlibjs/typing/commit/469b762e04227d613a2b972f1dd4a9914b012932))
- **renovate:** update dependency @typescript-eslint/parser to v4.12.0 ([bff1b12](https://github.com/nlibjs/typing/commit/bff1b126ab46628e74a8d52a2c625f9943e4e5f2))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.12.0 ([4d1a0ea](https://github.com/nlibjs/typing/commit/4d1a0ea7ae92e140c844d7110f3c8a13518b3aa3))
- **renovate:** update dependency eslint to v7.17.0 ([6bcba07](https://github.com/nlibjs/typing/commit/6bcba07377bab7292362eba0997f1853b508fd68))
- **renovate:** update dependency ava to v3.15.0 ([a9730da](https://github.com/nlibjs/typing/commit/a9730da13f7104b3582c77a2bb5de1500a136a0c))
- **renovate:** update dependency sucrase to v3.17.0 ([3795f72](https://github.com/nlibjs/typing/commit/3795f72bbe81c8d46cb46d8226dfa69ea7a393aa))
- **renovate:** update dependency @typescript-eslint/parser to v4.11.1 ([94c24ff](https://github.com/nlibjs/typing/commit/94c24ff6be2195a8f89b54526327f89b2b7c7039))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.11.1 ([22d28f7](https://github.com/nlibjs/typing/commit/22d28f7f29f1d1f9c089e10fb8ea46e528af00be))
- **renovate:** update dependency @typescript-eslint/parser to v4.11.0 ([8091e3f](https://github.com/nlibjs/typing/commit/8091e3fbe10b4cf0ec5c1356e1e6231b3218d936))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.11.0 ([850bd0d](https://github.com/nlibjs/typing/commit/850bd0db522073b270d4353a3a17e497e86dc658))
- **renovate:** update dependency @nlib/eslint-config to v3.17.16 ([379b4b1](https://github.com/nlibjs/typing/commit/379b4b1265f530a3734114a888cf8e4e484a1604))
- **renovate:** update dependency eslint to v7.16.0 ([9e69ca0](https://github.com/nlibjs/typing/commit/9e69ca09bf3063101f3f5c60b77236bc1a08e5a2))
- **renovate:** update dependency @typescript-eslint/parser to v4.10.0 ([cbd319a](https://github.com/nlibjs/typing/commit/cbd319af8f777d12d86fca1f134a154afb213eb9))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.10.0 ([29ac717](https://github.com/nlibjs/typing/commit/29ac717334174246d43372ba23d5adb25d62afcd))
- **renovate:** update dependency husky to v4.3.6 ([219f14d](https://github.com/nlibjs/typing/commit/219f14dc33b7b69815935e163e343f7a5e86b05d))
- **renovate:** update dependency typescript to v4.1.3 ([d25e017](https://github.com/nlibjs/typing/commit/d25e01741e950e0e69a426ac538892920eb64182))
- **renovate:** update dependency @typescript-eslint/parser to v4.9.1 ([8c1944a](https://github.com/nlibjs/typing/commit/8c1944a362658101f9964c4dab783c0476e068c4))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.9.1 ([674bc19](https://github.com/nlibjs/typing/commit/674bc1995abd80d75e673ceb7c4614f7b45033b8))
- **renovate:** update dependency ava to v3.14.0 ([7f43589](https://github.com/nlibjs/typing/commit/7f435898deb75082e27e6e3c45c50cd705ef8136))
- **renovate:** update dependency husky to v4.3.5 ([8931745](https://github.com/nlibjs/typing/commit/89317456b9b2d85e072b041601cebeb8a80c7c5d))
- **renovate:** update dependency husky to v4.3.4 ([f7ef068](https://github.com/nlibjs/typing/commit/f7ef068b6d4c98524c332252f4cde31e959d53aa))
- **renovate:** update dependency eslint to v7.15.0 ([32d8b6a](https://github.com/nlibjs/typing/commit/32d8b6ada72875d55bc5c80a12a9c3a0943c71ca))
- **renovate:** update dependency lint-staged to v10.5.3 ([6bf72d3](https://github.com/nlibjs/typing/commit/6bf72d3ae8c270ba906c2571dfc0d348aeb5b307))
- **renovate:** update dependency @types/eslint to v7.2.6 ([6b48704](https://github.com/nlibjs/typing/commit/6b48704dafa02f75b447e8539e45251b6b556879))
- **renovate:** update dependency @typescript-eslint/parser to v4.9.0 ([0c9a5cd](https://github.com/nlibjs/typing/commit/0c9a5cd6d4b48fd0476307d9459f8764e9d887c4))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.9.0 ([d21ad3c](https://github.com/nlibjs/typing/commit/d21ad3cb698dd4b340e5255b6ea267a6469dd0ed))
- **renovate:** update dependency lint-staged to v10.5.2 ([e8d3469](https://github.com/nlibjs/typing/commit/e8d34698f3b07111ea2f5becc577774c21e0eefe))
- **renovate:** update dependency @typescript-eslint/parser to v4.8.2 ([6d0d67c](https://github.com/nlibjs/typing/commit/6d0d67c435458fd28f6552aed756b0ff9334efa4))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.8.2 ([c8a146e](https://github.com/nlibjs/typing/commit/c8a146e52df0b67851ae9acd52d80bd10a5109de))
- **renovate:** update dependency eslint to v7.14.0 ([3967ca0](https://github.com/nlibjs/typing/commit/3967ca0721b08a8cb23c89a08a802562e5080e28))
- **renovate:** update dependency typescript to v4.1.2 ([fe50151](https://github.com/nlibjs/typing/commit/fe501515a8b301167ebdd6cfae958324eaf7219d))
- **renovate:** update dependency @typescript-eslint/parser to v4.8.1 ([475cecd](https://github.com/nlibjs/typing/commit/475cecdbe2d5c22e231af352983cdd8dc4499b6e))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.8.1 ([1bc80e1](https://github.com/nlibjs/typing/commit/1bc80e1bb5dff6f740ce40571cb8b22c85feac6c))
- **renovate:** update dependency @types/eslint to v7.2.5 ([2a488ab](https://github.com/nlibjs/typing/commit/2a488abe396df61b77f2a96dfbcc55c0631d3d62))
- **renovate:** update dependency @typescript-eslint/parser to v4.7.0 ([2458c61](https://github.com/nlibjs/typing/commit/2458c61cc94bdc4aa429f6ed3ebd6c0093756b14))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.7.0 ([75edc31](https://github.com/nlibjs/typing/commit/75edc31baae8174b4e13862166f0668c23c56ba5))
- **renovate:** update dependency @nlib/eslint-config to v3.17.15 (#16) ([206ce0c](https://github.com/nlibjs/typing/commit/206ce0c8695066955f654e5177f3cb680266ee8d))
- **renovate:** update dependency eslint to v7.13.0 ([4007d0e](https://github.com/nlibjs/typing/commit/4007d0e927c9434de98d93085c0b3e7c3dec049a))
- **renovate:** update dependency typescript to v4.0.5 ([8e7cfbf](https://github.com/nlibjs/typing/commit/8e7cfbf0be3345262bfa7cd9df5e796d3fe280a7))
- **renovate:** update dependency sucrase to v3.16.0 ([d791fce](https://github.com/nlibjs/typing/commit/d791fce36271e3e7d9170c9deca016c4fc4b255b))
- **renovate:** update dependency eslint to v7.12.1 ([2f3f3be](https://github.com/nlibjs/typing/commit/2f3f3be95c75c247e9b1756c5d90312f2f5775ff))
- **renovate:** update dependency @typescript-eslint/parser to v4.6.1 ([d6e85ca](https://github.com/nlibjs/typing/commit/d6e85ca5ad5e9f1e4e477298baf4e00bf6d5476a))
- **renovate:** update dependency lint-staged to v10.5.1 ([2f93850](https://github.com/nlibjs/typing/commit/2f93850de7ed4a6db0a88295fb4ef075def1dfe3))
- **renovate:** update dependency @typescript-eslint/eslint-plugin to v4.6.1 ([e70048b](https://github.com/nlibjs/typing/commit/e70048b7f9187bf644a539077dff0b1674f76294))
- **renovate:** pin dependencies ([e6907a5](https://github.com/nlibjs/typing/commit/e6907a5194b1db6b32bf52539d7df3b48b41d7fa))


## v0.2.0 (2020-10-04)

### Breaking Changes

- definition.dictionary now accepts a single definition ([616f0dd](https://github.com/nlibjs/typing/commit/616f0dd7d2a50532398d974a3ace802d0b407be1))

### Tests

- createTypeChecker ([b8e13a9](https://github.com/nlibjs/typing/commit/b8e13a92720aee8131744fffe077b8bf0931e38b))
- NoTypeName ([fe7d993](https://github.com/nlibjs/typing/commit/fe7d99363bf9a8fcf53574cb884f519bbaa29c4a))

### Documentation

- add a prefix ([ca3c256](https://github.com/nlibjs/typing/commit/ca3c256b9dae5d5f64c3df435915605246560557))

### Dependency Upgrades

- **renovate:** update dependency @commitlint/config-conventional to v11 ([7fb4e0c](https://github.com/nlibjs/typing/commit/7fb4e0c890724d702f4f7d07085c534af8c793d6))
- **renovate:** update dependency @commitlint/cli to v11 ([3aaca63](https://github.com/nlibjs/typing/commit/3aaca63b468fc26f1fed69225c8d8b427942f303))


## v0.1.4 (2020-09-07)

### Tests

- replace testTypeChecker ([f4a8961](https://github.com/nlibjs/typing/commit/f4a8961c2dbf2dc1a42e348be7f3c58403c7d348))


## v0.1.3 (2020-09-07)

### Breaking Changes

- delete testTypeChecker ([21d6c9d](https://github.com/nlibjs/typing/commit/21d6c9d4232b3a4fd8bed643465b9c49c46cccbe))


## v0.1.2 (2020-09-07)

### Bug Fixes

- exclude testTypeChecker from index ([4ae1782](https://github.com/nlibjs/typing/commit/4ae1782b1c9a5db26c6870bf93a01286d4a89538))


## v0.1.1 (2020-09-07)

### Continuous Integration

- add test-skipbuild ([eb12b63](https://github.com/nlibjs/typing/commit/eb12b63e6586f65fc3b18d721fc219f3adfa8d11))


## v0.1.0 (2020-09-07)

### Breaking Changes

- setup esm ([74daf64](https://github.com/nlibjs/typing/commit/74daf643cb4a225fcbff927095f0bea96496e4d2))

### Build System

- setup esm ([a576b6f](https://github.com/nlibjs/typing/commit/a576b6fcc165827d8f121247b7fd2cd9d6f7617c))
- remove the prepack command ([db2a6b7](https://github.com/nlibjs/typing/commit/db2a6b7fb3dd1b69b043e551547b40c02fc42be4))

### Dependency Upgrades

- upgrade dependencies ([b9db243](https://github.com/nlibjs/typing/commit/b9db243521a3b4ac9a57a9158841f2cd89780467))


## v0.0.4 (2020-09-01)

### Bug Fixes

- remove testTypeChecker from index ([16e6905](https://github.com/nlibjs/typing/commit/16e690526c0e5a46c653c05a6873c75e75b5f6c7))

### Tests

- skip .js tests ([a3a6a5d](https://github.com/nlibjs/typing/commit/a3a6a5de8e3fa1c9fa98732b0f815f3da10cb633))


## v0.0.3 (2020-08-30)

### Bug Fixes

- index ([1e34fdb](https://github.com/nlibjs/typing/commit/1e34fdb84004b184132044c8921f1919f19e1213))


## v0.0.2 (2020-08-30)

### Bug Fixes

- index ([904a943](https://github.com/nlibjs/typing/commit/904a943f5f13cd9afab19c57b6fa43d10022cd2e))


## v0.0.1 (2020-08-30)

### Features

- initial src ([15ac311](https://github.com/nlibjs/typing/commit/15ac311fae48f2597c57efe3ba5fdb004feb2616))

### Code Refactoring

- fix eslint errors ([b8eaaee](https://github.com/nlibjs/typing/commit/b8eaaee4cbff6318d223b794e3ce80ae5a828ec6))

### Styles

- move dependencies ([130aa4d](https://github.com/nlibjs/typing/commit/130aa4d28116f3c3cf8d976c237b5c03742c5a76))


