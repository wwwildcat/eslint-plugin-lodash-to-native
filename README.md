# eslint-plugin-lodash-to-native

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lodash-to-native`:

```
$ npm install -S github.com/wwwildcat/eslint-plugin-lodash-to-native.git
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lodash-to-native` globally.

## Usage

Add `lodash-to-native` to `.eslintrc` configuration file:

```js
    "plugins": [
        "lodash-to-native"
    ],
    "rules": {
        "lodash-to-native/map": "warn"
    },
```

## Rules

Replace Lodash _.map with native Array#map





