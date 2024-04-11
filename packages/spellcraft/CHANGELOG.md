# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.7.1](https://github.com/zthun/spellcraft/compare/v2.7.0...v2.7.1) (2024-04-11)


### Bug Fixes

* export the new template decorators ([7fe4109](https://github.com/zthun/spellcraft/commit/7fe4109d94a887153da544c49607f747085c0963))



## [2.7.0](https://github.com/zthun/spellcraft/compare/v2.6.2...v2.7.0) (2024-04-10)


### Features

* component dispatch allows for dispatching events when property or attributes change ([f203b33](https://github.com/zthun/spellcraft/commit/f203b33e67b228277a7abc1036c1ec4b7a3047a0))
* component shadow now allows you to create a closed shadow root ([fb6f4f3](https://github.com/zthun/spellcraft/commit/fb6f4f3351fb4f3c57e1614c86b34d5b4a400d0b))
* template no display adds a template that renders a style with display none and important ([a82d611](https://github.com/zthun/spellcraft/commit/a82d61137b49781013cda5af4684dd90f9adefa1))



## [2.6.2](https://github.com/zthun/spellcraft/compare/v2.6.1...v2.6.2) (2024-04-09)


### Bug Fixes

* export the ZNode class ([2e87852](https://github.com/zthun/spellcraft/commit/2e87852a9010e9f399e8c3ede1528f4a439a6790))



## [2.6.1](https://github.com/zthun/spellcraft/compare/v2.6.0...v2.6.1) (2024-04-09)


### Bug Fixes

* source import path should no longer include src ([dc6d16a](https://github.com/zthun/spellcraft/commit/dc6d16af87234182f4ef5d0fe5a8bac2d455cf2e))



## [2.6.0](https://github.com/zthun/spellcraft/compare/v2.5.0...v2.6.0) (2024-04-09)


### Features

* property changed happens when a property changes on the component ([21383ad](https://github.com/zthun/spellcraft/commit/21383ad47aed7a005f53391e0ec0435d74a1f9c9))
* property decorator specified a property on the component ([792528e](https://github.com/zthun/spellcraft/commit/792528e990f71048fceeb17f864c4e31a4fc467a))
* render on property change re-renders the component when a property changes ([a505f9b](https://github.com/zthun/spellcraft/commit/a505f9b2049e18e11f116f56bfc89d111bee29c2))
* update styles on property change causes the style element to refresh when a property changes ([8922d5b](https://github.com/zthun/spellcraft/commit/8922d5b0fab12b378df3550e41b40e8d64093668))



## [2.5.0](https://github.com/zthun/spellcraft/compare/v2.4.0...v2.5.0) (2024-04-08)


### Features

* component css adds support for static styles that only get added to the DOM once ([f99affd](https://github.com/zthun/spellcraft/commit/f99affd1b4cc20e3b038c02f5ba4bc7dfd8af1ad))



## [2.4.0](https://github.com/zthun/spellcraft/compare/v2.3.1...v2.4.0) (2024-04-08)


### Features

* components can now auto generate an id ([c397477](https://github.com/zthun/spellcraft/commit/c3974770f188126f58de225e422b4742b676e5ea))
* you can now set the prefix on the styles id ([0e84fc0](https://github.com/zthun/spellcraft/commit/0e84fc090cea762a40921813a48e8d4b22c4e725))



## [2.3.1](https://github.com/zthun/spellcraft/compare/v2.3.0...v2.3.1) (2024-04-08)

**Note:** Version bump only for package @zthun/spellcraft





## [2.3.0](https://github.com/zthun/spellcraft/compare/v2.2.2...v2.3.0) (2024-04-08)


### Features

* added support for styles to be removed on disconnect ([d8c0601](https://github.com/zthun/spellcraft/commit/d8c060195b3f3ff0ce70e3ff7921b3ae1d8b1f16))



## [2.2.2](https://github.com/zthun/spellcraft/compare/v2.2.1...v2.2.2) (2024-04-08)


### Bug Fixes

* style element on styles is now queried when refreshed ([d96cd2f](https://github.com/zthun/spellcraft/commit/d96cd2f2814e852f0b3186d370d1cdae2ed5b760))



## [2.2.1](https://github.com/zthun/spellcraft/compare/v2.2.0...v2.2.1) (2024-04-08)


### Bug Fixes

* new component decorators are now properly exported ([2f097ff](https://github.com/zthun/spellcraft/commit/2f097ffb91b3570ef4a450d4abe7a1effca796a1))



## [2.2.0](https://github.com/zthun/spellcraft/compare/v2.1.1...v2.2.0) (2024-04-08)


### Features

* component class allows auto class population for components ([10c7c96](https://github.com/zthun/spellcraft/commit/10c7c964e68f30c749064c6125315a41ae380aca))
* you can now invoke render on a bubbled event ([98c9310](https://github.com/zthun/spellcraft/commit/98c93103531869bf64ccfb6e764d4b0dd22e2336))



## [2.1.1](https://github.com/zthun/spellcraft/compare/v2.1.0...v2.1.1) (2024-04-02)

**Note:** Version bump only for package @zthun/spellcraft





## [2.1.0](https://github.com/zthun/spellcraft/compare/v2.0.1...v2.1.0) (2024-04-02)


### Features

* component styles now has correct implementation ([9cb7fff](https://github.com/zthun/spellcraft/commit/9cb7fffd44278df87b06a94259f175d189268fd2))
* styles can now be updated on the head fragment when attributes of the owning element changes ([d7f940c](https://github.com/zthun/spellcraft/commit/d7f940c4f15447f9ab7012c960f9ad3fece74d07))


### Bug Fixes

* component constructor can now have any arguments passed to it ([b5920d6](https://github.com/zthun/spellcraft/commit/b5920d6001cb07a0a6c4e715950bbc458e99ce60))
* template must now properly return the html ([457f751](https://github.com/zthun/spellcraft/commit/457f751987bcb367c5f67a6c8f13aebfe8af56e5))



## [2.0.1](https://github.com/zthun/spellcraft/compare/v2.0.0...v2.0.1) (2024-04-01)


### Bug Fixes

* component render template moved the element type declaration up ([924369f](https://github.com/zthun/spellcraft/commit/924369f3e3407bdaff18589b58f7246dc5cfad64))
* dependencies element type declaration has been moved up ([c6045ab](https://github.com/zthun/spellcraft/commit/c6045ab8b765f30ec683f8f72dfb2a33813c1a9d))
* move the element type declaration up for register ([58e936d](https://github.com/zthun/spellcraft/commit/58e936d42d5421aca4f9194e96aaac9d76a8b70c))
* render on attribute change moved the element type declaration up ([52da313](https://github.com/zthun/spellcraft/commit/52da3135f56c96c89092453dc3ee76d0569908f7))
* render on attribute change now calls correct prototype method ([5ea44ee](https://github.com/zthun/spellcraft/commit/5ea44ee622a944cc1e2097408e61a2d15dfa1574))
* shadow component can now allow the override to the extending class ([06a58df](https://github.com/zthun/spellcraft/commit/06a58df2582cc209211f4de6b035767a7de06997))



## [2.0.0](https://github.com/zthun/spellcraft/compare/v1.0.6...v2.0.0) (2024-03-29)


### ⚠ BREAKING CHANGES

* redefining what spellcraft is and what it is for

### Code Refactoring

* redefining what spellcraft is and what it is for ([06e4eb5](https://github.com/zthun/spellcraft/commit/06e4eb54ae7560bb18d4d1e65ff29be38921b5ad))
