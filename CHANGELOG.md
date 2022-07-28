# Changelog

## v0.4.3 (2022-07-28)

### Bug Fixes

- index ([49b04ca](https://github.com/nlibjs/typing/commit/49b04ca927c4e8fe0630dbf114753b3c860905f1))


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


