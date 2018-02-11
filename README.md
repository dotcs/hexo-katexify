# hexo-katexify · ![build status](https://travis-ci.org/dotcs/hexo-katexify.svg?branch=master)

Hexo plugin for rendering TeX math by katex.
This plugin is based on the work of [haripo](https://github.com/haripo/hexo-simple-katex).

## Installation

```
$ npm install hexo-katexify --save
$ npm test
```

or with [yarn](https://yarnpkg.com/en/)

```
$ yarn add hexo-katexify
$ yarn test
```

Import katex.min.css (in template)

```
<head>
  <!-- other code goes here -->

  <link href="/katexify/katex.min.css" rel="stylesheet" />
</head>
```

## Usage

Inline syntax

```
$ y = x^2 + 3 $
```

or display mode syntax

```
$$
y = x^2 + 3
$$
```
