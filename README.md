# Welcome to Himalaya UI 👋

![HimalayaUI Logo](https://github.com/red-ninjas/himalaya-ui/blob/master/src/public/images/himalaya-banner-dark.png?raw=true)

[![NPM](https://img.shields.io/npm/v/@himalaya-ui/core.svg)](https://www.npmjs.com/package/@himalaya-ui/core)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)
![NextJS](https://img.shields.io/badge/next-%3E%3D13.0.0-green.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://himalaya-ui.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/red-ninjas/himalaya-ui/graphs/commit-activity)
[![License](https://img.shields.io/github/license/red-ninjas/himalaya-ui)](https://github.com/red-ninjas/himalaya-ui/blob/master/LICENSE)

### 🏠 [Homepage](https://himalaya-ui.com)
### ✨ [Demo](https://github.com/red-ninjas/landing-page)
### 📘 [Documentation](https://himalaya-ui.com)


## Prerequisites

- Node.js >= 18.0.0
- React >= 18.0.0
- Next.js >= 13.0.0 (optional)

## Installation

Choose your preferred package manager to install Himalaya UI:

```sh
yarn add @himalaya-ui/core
```
```sh
npm install @himalaya-ui/core
```

## Run Tests

You can run tests using the following command:

```sh
yarn test
```

## Getting Started

Here's a simple example of how to use Himalaya UI within your Next.js 13 and React application:

```jsx
import { ConfigProvider, StyledJsxRegistry } from '@himalaya-ui/core'

export default () => (
  <StyledJsxRegistry>  <!-- base styles, ssr injector -->
    <ConfigProvider> <!-- ui provider -->
      <AppComponent /> <!-- your application -->
    </ConfigProvider>
  </StyledJsxRegistry>
)
```

## Author

👤 **RedNinjas LTD**

* Website: https://redninjas.dev
* Github: [@red-ninjas](https://github.com/red-ninjas)

👤 **Stefan Kalysta**

* Github: [@kalysti](https://github.com/kalysti)

👤 **Syed Abubakar**

* Github: [@dev-ABsid](https://github.com/dev-ABsid)

## 🤝 Contributing

We welcome contributions, issues, and feature requests from the community! Please visit our [issues page](https://github.com/red-ninjas/himalaya-ui/issues) to report problems or make suggestions. You can also find our [contributing guide](https://github.com/red-ninjas/himalaya-ui/blob/master/CONTRIBUTING.md) for more information.

## Show Your Support

If Himalaya UI has helped you in your projects, show your support by giving us a ⭐️!

## 📝 License

Himalaya UI is licensed under the MIT License. The MIT License is a permissive open source license that allows you to use, modify, and distribute the software for both commercial and non-commercial purposes. You are granted extensive freedom to customize and integrate Himalaya UI into your projects while maintaining the freedom to use it as you see fit.

Copyright © 2023 [RedNinjas LTD](https://github.com/red-ninjas).

For more details, please review the full [MIT License](https://github.com/red-ninjas/himalaya-ui/blob/master/LICENSE) provided by the project.