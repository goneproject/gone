# Node-gpu

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

Perform massive parallel computations in Node.js with GPGPU.

> **Note:** If you get lost, the [API Documentation](https://robinrpr.github.io/node-gpu/docs) will save you.

## Installation

```
// npm install node-gpu --save
```

#### Node.js:
```js
// const gpu = require('node-gpu');
```

## Open vulnerabilities
```
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Moderate      │ Prototype pollution                                          │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ hoek                                                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/566                       │
└───────────────┴──────────────────────────────────────────────────────────────┘
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ Regular Expression Denial of Service                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ minimatch                                                    │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/118                       │
└───────────────┴──────────────────────────────────────────────────────────────┘
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Low           │ Prototype Pollution                                          │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ lodash                                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/577                       │
└───────────────┴──────────────────────────────────────────────────────────────┘
```

## License

  [MIT](./LICENSE)


[npm-image]: https://img.shields.io/npm/v/node-gpu.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@robin-rpr/node-gpu

[travis-image]: https://img.shields.io/travis/robin-rpr/node-gpu/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/robin-rpr/node-gpu

[download-image]: https://img.shields.io/npm/dm/node-gpu.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/@robin-rpr/node-gpu
