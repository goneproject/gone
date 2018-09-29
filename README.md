<div align="center">
<img height="160" src="https://raw.githubusercontent.com/robin-rpr/node-gpu/master/misc/img/logo.png"><br/>
<span style="color: #adafb3; font-size: 14px; font-weight: bolder">GPU OPTIMIZED NODE ENVIRONMENT</span>
<div style="background: #2A3034; margin: 10px 0; width: fit-content; padding: 10px 20px; border-radius: 5px">
<span style="opacity: 0.3; margin-right: 14px">$</span>git clone --recurse-submodules -j8 https://github.com/GONEproject/engine.git</div>

  [![NPM version][npm-image]][npm-url]
  [![NPM DWL Status][download-image]][download-url]
  [![Known Vulnerabilities][snyc-image]][snyc-url]
  
</div>

## Supported distros
| OS            | Version       | Status |
|:-------------:|:-------------:|:-------:|
| Ubuntu        | 14.04 LTS `(trusty)` <br/> 16.04 LTS `(xenial)` <br/> 17.10 `(artful)` <br/> 18.04 LTS `(bionic)`| complete |
| Debian        | 8 `(jessie)` or later | complete |
| CentOS        | N/A | not-started |
| Windows       | N/A | not-started |

## Installation

### Required Tools
On all platforms:
- Yarn for dependency management. Download can be found [here.](https://yarnpkg.com/en/docs/install)
- We use Git for version control (version 2.11.0 or later.)

On Linux:
- Required libraries: g++-6-arm-linux-gnueabihf, gcc-arm-linux-gnueabihf, gcc-arm-linux-gnueabihf, xserver-xorg-dev, libxext-dev, libxi-dev, libpci-dev

## Development Setup

### Getting the source
```bash
$ git clone --recurse-submodules -j8 https://github.com/GONEproject/engine.git
$ cd engine
$ yarn install
$ yarn run prebuild
```

### NPM
```
$ npm i gone --save
```

## License

  [BSD](./LICENSE)


[npm-image]: https://img.shields.io/npm/v/node-gpu.svg?style=flat
[npm-url]: https://www.npmjs.com/package/gone

[download-image]: https://img.shields.io/npm/dm/gone.svg?style=flat
[download-url]: https://www.npmjs.com/package/gone

[snyc-image]: https://snyk.io/test/github/robin-rpr/node-gpu/badge.svg?style=flat
[snyc-url]: https://snyk.io/test/github/GONEproject/engine
