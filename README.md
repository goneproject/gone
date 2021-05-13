<div align="center">

<img src="assets/gone_readme.svg" height="90">

### Perform massive parallel computations in Node.js with GPGPU

[![Known Vulnerabilities][snyc-image]][snyc-url]
[![Docker][docker-image]][docker-url]
[![IRC][IRC-image]][IRC-url]

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
On Linux:
- Required libraries: g++-6-arm-linux-gnueabihf, gcc-arm-linux-gnueabihf, gcc-arm-linux-gnueabihf, xserver-xorg-dev, libxext-dev, libxi-dev, libpci-dev

## Getting the source
```bash
$ git clone --recurse-submodules -j8 https://github.com/goneproject/gone.git
$ cd gone
$ npm i
```

### NPM Package
To install via npm, run the following command
```
$ npm i gone --save
```

## License

  [BSD](./LICENSE)


[IRC-image]: https://img.shields.io/badge/IRC-%23goneproject-lightgrey.svg?label=IRC&longCache=true&style=flat-square
[IRC-url]: https://webchat.freenode.net/?channels=goneproject

[docker-image]: https://img.shields.io/badge/docker-goneproject/gone-3ca6ee.svg?logo=docker&label=Docker&longCache=true&style=flat-square
[docker-url]: https://hub.docker.com/r/goneproject/gone/

[snyc-image]: https://snyk.io/test/github/goneproject/gone/badge.svg?longCache=true&style=flat-square
[snyc-url]: https://snyk.io/test/github/goneproject/gone
