# Changelog

## v0.2.3 (2022-01-12)

### Bug Fixes

- package configurations ([846cd59](https://github.com/nlibjs/typing/commit/846cd59f4d090df285486d6b321967b31efe2ae1))

### Dependency Upgrades

- install nlib tools ([b5b255b](https://github.com/nlibjs/typing/commit/b5b255bb0fc6ec0d26c04963ad8d2d0b0c793e72))
- @nlib/eslint-config:3.17.25→3.17.30 @types/eslint:7.28.0→8.2.2 @typescript-eslint/eslint-plugin:4.30.0→5.9.1 @typescript-eslint/parser:4.32.0→5.9.1 ava:3.15.0→4.0.1 eslint:7.32.0→8.6.0 lint-staged:11.1.2→12.1.7 ts-node:10.2.1→10.4.0 typescript:4.4.2→4.5.4 ([4c2fff5](https://github.com/nlibjs/typing/commit/4c2fff5c25316ff757fda3facc338d7000e47cb9))


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


## v0.2.0 (2020-10-04)

### Breaking Changes

- definition.dictionary now accepts a single definition ([616f0dd](https://github.com/nlibjs/typing/commit/616f0dd7d2a50532398d974a3ace802d0b407be1))
- setup esm ([74daf64](https://github.com/nlibjs/typing/commit/74daf643cb4a225fcbff927095f0bea96496e4d2))

### Tests

- createTypeChecker ([b8e13a9](https://github.com/nlibjs/typing/commit/b8e13a92720aee8131744fffe077b8bf0931e38b))
- NoTypeName ([fe7d993](https://github.com/nlibjs/typing/commit/fe7d99363bf9a8fcf53574cb884f519bbaa29c4a))

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


