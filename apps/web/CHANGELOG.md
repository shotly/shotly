# Changelog


## @shotly/web-v0.3.0

[compare changes](https://github.com/shotly/shotly/compare/@shotly/web-v0.2.0...@shotly/web-v0.3.0)

### 🚀 Enhancements

- **web:** Add user and session types for authentication module ([f470ffc](https://github.com/shotly/shotly/commit/f470ffc))
- **web:** Implement authentication middleware and enhance OAuth handling ([1c13902](https://github.com/shotly/shotly/commit/1c13902))
- **web:** Add Authentik OAuth provider ([84836c7](https://github.com/shotly/shotly/commit/84836c7))
- **web:** Enhance login page with Authentik provider and error handling ([ef9a668](https://github.com/shotly/shotly/commit/ef9a668))
- **web:** Add webhooks settings page and update navigation menu ([eb37ab7](https://github.com/shotly/shotly/commit/eb37ab7))
- **web:** Add admin panel and update navigation for admin users ([4f84599](https://github.com/shotly/shotly/commit/4f84599))
- **web:** Add admin console and users pages with navigation updates ([88575a3](https://github.com/shotly/shotly/commit/88575a3))
- ⚠️  Separate base package ([#8](https://github.com/shotly/shotly/pull/8))
- **web:** Update confirmation modal and error handling with i18n support ([#10](https://github.com/shotly/shotly/pull/10))
- User profile settings ([#52](https://github.com/shotly/shotly/pull/52))
- Implement api keys ([#53](https://github.com/shotly/shotly/pull/53))
- Implement crud webhooks ([#62](https://github.com/shotly/shotly/pull/62))
- ⚠️  Update landing and web apps with new base package integration ([#69](https://github.com/shotly/shotly/pull/69))
- Add appearance page ([#71](https://github.com/shotly/shotly/pull/71))
- Normalize database table ([#74](https://github.com/shotly/shotly/pull/74))
- Collections aside ([#76](https://github.com/shotly/shotly/pull/76))
- Share collections modal ([#82](https://github.com/shotly/shotly/pull/82))
- Add simple icon select component ([#87](https://github.com/shotly/shotly/pull/87))

### 💅 Refactors

- **web:** Streamline OAuth handling  authentication ([7e9cc72](https://github.com/shotly/shotly/commit/7e9cc72))
- **web:** Simplify error logging in OAuth handlers ([20d077c](https://github.com/shotly/shotly/commit/20d077c))
- **web:** Improve authentication middleware logic and update redirect cookie name ([fd39f36](https://github.com/shotly/shotly/commit/fd39f36))
- **web:** Update UserDropdown component to use user session and improve avatar handling ([c1e9a89](https://github.com/shotly/shotly/commit/c1e9a89))
- **web:** Remove disabled state and badges from bookmarks in the aside menu ([2b24f3b](https://github.com/shotly/shotly/commit/2b24f3b))
- Remove unused environment variable links ([#73](https://github.com/shotly/shotly/pull/73))
- Simplify ApiKeysList data handling and update API response structure ([#81](https://github.com/shotly/shotly/pull/81))

### 📖 Documentation

- **web:** Update OAuth user parameters in documentation ([cae03ff](https://github.com/shotly/shotly/commit/cae03ff))

#### ⚠️ Breaking Changes

- ⚠️  Separate base package ([#8](https://github.com/shotly/shotly/pull/8))
- ⚠️  Update landing and web apps with new base package integration ([#69](https://github.com/shotly/shotly/pull/69))

### ❤️ Contributors

- Alex <a.hywax@gmail.com>
- Hywax <a.hywax@gmail.com>

## @shotly/web-v0.2.0

[compare changes](https://github.com/shotly/shotly/compare/@shotly/web-v0.1.0...@shotly/web-v0.2.0)

### 🚀 Enhancements

- **auth:** Draft login layout ([8106665](https://github.com/shotly/shotly/commit/8106665))
- **web:** Add LocaleButton component for language selection ([3f3be2c](https://github.com/shotly/shotly/commit/3f3be2c))
- **web:** Add CORS middleware and site URL configuration ([31bd822](https://github.com/shotly/shotly/commit/31bd822))
- **web:** Add configuration options for repository, documentation, and home links ([a7cbd3b](https://github.com/shotly/shotly/commit/a7cbd3b))
- **auth:** Draft add support for Google and GitHub OAuth ([7aa7ef5](https://github.com/shotly/shotly/commit/7aa7ef5))
- **web:** Custom handling http request ([7523a07](https://github.com/shotly/shotly/commit/7523a07))
- **web:** Add session configuration and update API documentation ([149a1ea](https://github.com/shotly/shotly/commit/149a1ea))
- **web:** Implement pagination utility and related types ([177ea24](https://github.com/shotly/shotly/commit/177ea24))
- **web:** Add validation utilities for sorting and pagination queries ([d5c7be2](https://github.com/shotly/shotly/commit/d5c7be2))

### 🩹 Fixes

- **app:** Update locale import ([3534b40](https://github.com/shotly/shotly/commit/3534b40))
- **web:** Normalize site URL and allowed origins in CORS middleware ([903961f](https://github.com/shotly/shotly/commit/903961f))
- **app:** Update locale import path for correct localization ([5e32223](https://github.com/shotly/shotly/commit/5e32223))

### 💅 Refactors

- **web:** Remove unused login and register API handlers ([cbe796f](https://github.com/shotly/shotly/commit/cbe796f))

### 🏡 Chore

- **deps:** Add nuxt-site-config dependency and update related packages ([2cee357](https://github.com/shotly/shotly/commit/2cee357))
- Add APP_PUBLIC_SITE_URL to example environment files ([cf0be39](https://github.com/shotly/shotly/commit/cf0be39))

### ❤️ Contributors

- Hywax <a.hywax@gmail.com>

## @shotly/web-v0.1.0

[compare changes](https://github.com/shotly/shotly/compare/@shotly/web-v0.0.1...@shotly/web-v0.1.0)

### 🚀 Enhancements

- Add internationalization support and UI components to web app ([7a0f1ec](https://github.com/shotly/shotly/commit/7a0f1ec))
- **web:** Add color mode configuration and loading template ([90906ff](https://github.com/shotly/shotly/commit/90906ff))
- Update landing and web configurations with icons and manifest files ([368ee16](https://github.com/shotly/shotly/commit/368ee16))
- Migrate to nuxt layers ([9fefc2a](https://github.com/shotly/shotly/commit/9fefc2a))
- **web:** Base app styles ([a9d8aa1](https://github.com/shotly/shotly/commit/a9d8aa1))
- **web:** Add DiceBear avatar generation utility ([c0ff442](https://github.com/shotly/shotly/commit/c0ff442))
- **web:** Update i18n configuration to use no_prefix strategy ([fdab3bd](https://github.com/shotly/shotly/commit/fdab3bd))
- **web:** Add initial pages for settings and main index with basic structure ([01349d6](https://github.com/shotly/shotly/commit/01349d6))
- **ui:** Implement shortcuts side over and user dropdown components, enhance app layout ([a03096f](https://github.com/shotly/shotly/commit/a03096f))
- **web:** Enhance app locale support by binding uiLocale to UApp component ([d7e2918](https://github.com/shotly/shotly/commit/d7e2918))
- **web:** Add 'coming soon' feature placeholders in bookmarks and settings menus ([2567087](https://github.com/shotly/shotly/commit/2567087))
- **database:** Migrate from SQLite to PostgreSQL ([cf02f7b](https://github.com/shotly/shotly/commit/cf02f7b))

### 🩹 Fixes

- **web:** Update localStorage key for color mode in loading template ([932a7b3](https://github.com/shotly/shotly/commit/932a7b3))
- **web:** Update UserDropdown component links and icons for consistency ([69530aa](https://github.com/shotly/shotly/commit/69530aa))

### 🏡 Chore

- Nuxt dependency to use catalog version ([3d56e6d](https://github.com/shotly/shotly/commit/3d56e6d))
- **web:** Simplify nuxt.config and remove unused assets ([3ce9f97](https://github.com/shotly/shotly/commit/3ce9f97))
- **web:** Update dev and preview scripts to use port 3500 ([b5f1ff9](https://github.com/shotly/shotly/commit/b5f1ff9))
- **web,landing:** Update development and preview ports ([a59165b](https://github.com/shotly/shotly/commit/a59165b))

### 🎨 Styles

- Run eslint ([9bf591e](https://github.com/shotly/shotly/commit/9bf591e))

### ❤️ Contributors

- Hywax <a.hywax@gmail.com>

## @shotly/web-v0.0.1

[compare changes](https://github.com/shotly/shotly/compare/main...@shotly/web-v0.0.1)

### 🚀 Enhancements

- Initialize web application with Nuxt ([3c4ab7f](https://github.com/shotly/shotly/commit/3c4ab7f))
- Add stub for web api endpoints ([a9c1124](https://github.com/shotly/shotly/commit/a9c1124))
- Implement database integration with migration and seeding tasks ([c0e11cb](https://github.com/shotly/shotly/commit/c0e11cb))

### 📦 Build

- Docker connect ([c1167db](https://github.com/shotly/shotly/commit/c1167db))

### ❤️ Contributors

- Hywax <a.hywax@gmail.com>

