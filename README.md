# &lt;vaadin-rich-text-editor&gt;

> ⚠️ Starting from Vaadin 20, the source code and issues for this component are migrated to the [`vaadin/web-components`](https://github.com/vaadin/web-components/tree/master/packages/vaadin-rich-text-editor) monorepository.
> This repository contains the source code and releases of `<vaadin-rich-text-editor>` for the Vaadin versions 10 to 19.

[&lt;vaadin-rich-text-editor&gt;](https://vaadin.com/components/vaadin-rich-text-editor) is a Web Component providing rich text editor functionality, part of the [Vaadin components](https://vaadin.com/components).

[Live Demo ↗](https://vaadin.com/components/vaadin-rich-text-editor/html-examples)
|
[API documentation ↗](https://cdn.vaadin.com/vaadin-rich-text-editor/1.0.0-alpha6)

[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-rich-text-editor)](https://www.npmjs.com/package/@vaadin/vaadin-rich-text-editor)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-rich-text-editor)
[![Discord](https://img.shields.io/discord/732335336448852018?label=discord)](https://discord.gg/PHmkCKC)

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="vaadin-rich-text-editor.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<vaadin-rich-text-editor></vaadin-rich-text-editor>
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-rich-text-editor/master/screenshot.png" width="200" alt="Screenshot of vaadin-rich-text-editor">](https://vaadin.com/components/vaadin-rich-text-editor)


## Installation

The Vaadin components are distributed as Bower and npm packages.
Please note that the version range is the same, as the API has not changed.
You should not mix Bower and npm versions in the same application, though.

Unlike the official Polymer Elements, the converted Polymer 3 compatible Vaadin components
are only published on npm, not pushed to GitHub repositories.

### Polymer 2 and HTML Imports compatible version

Install `vaadin-rich-text-editor`:

```sh
bower i vaadin/vaadin-rich-text-editor --save
```

Once installed, import it in your application:

```html
<link rel="import" href="bower_components/vaadin-rich-text-editor/vaadin-rich-text-editor.html">
```

### Polymer 3 and ES Modules compatible version


Install `vaadin-rich-text-editor`:

```sh
npm i @vaadin/vaadin-rich-text-editor --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor.js';
```

## Getting started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The component with the Lumo theme:

  `theme/lumo/vaadin-rich-text-editor.html`

- The component with the Material theme:

  `theme/material/vaadin-rich-text-editor.html`

- Alias for `theme/lumo/vaadin-rich-text-editor.html`:

  `vaadin-rich-text-editor.html`


## Running demos and tests in a browser

1. Fork the `vaadin-rich-text-editor` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) and [Bower](https://bower.io) installed.

1. When in the `vaadin-rich-text-editor` directory, run `npm install` and then `bower install` to install dependencies.

1. Make sure you have [polymer-cli](https://www.npmjs.com/package/polymer-cli) installed globally: `npm i -g polymer-cli`.

1. Run `npm start`, browser will automatically open the component API documentation.

1. You can also open demo or in-browser tests by adding **demo** or **test** to the URL, for example:

  - http://127.0.0.1:3000/components/vaadin-rich-text-editor/demo
  - http://127.0.0.1:3000/components/vaadin-rich-text-editor/test


## Running tests from the command line

1. When in the `vaadin-rich-text-editor` directory, run `polymer test`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

  To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Commercial Vaadin Add-on License version 3 (CVALv3). For license terms, see LICENSE.

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
