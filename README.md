<div align="center">

<svg src="misc/img/banner.svg" height="200">

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
On all platforms:
- Yarn for dependency management. Download can be found [here.](https://yarnpkg.com/en/docs/install)
- We use Git for version control (version 2.11.0 or later.)

On Linux:
- Required libraries: g++-6-arm-linux-gnueabihf, gcc-arm-linux-gnueabihf, gcc-arm-linux-gnueabihf, xserver-xorg-dev, libxext-dev, libxi-dev, libpci-dev

## Getting the source
```bash
$ git clone --recurse-submodules -j8 https://github.com/GONEproject/engine.git
$ cd engine
$ yarn install
$ yarn run prebuild
```

### Production Library
```
$ yarn add gone
```

## License

  [BSD](./LICENSE)


[IRC-image]: https://img.shields.io/badge/IRC-%23GONEproject-lightgrey.svg?label=IRC&longCache=true&style=flat-square
[IRC-url]: https://webchat.freenode.net/?channels=GONEproject

[docker-image]: https://img.shields.io/badge/docker-goneproject/gone-3ca6ee.svg?logo=docker&label=Docker&longCache=true&style=flat-square
[docker-url]: https://hub.docker.com/r/goneproject/engine/

[snyc-image]: https://snyk.io/test/github/GONEproject/engine/badge.svg?longCache=true&style=flat-square
[snyc-url]: https://snyk.io/test/github/GONEproject/engine
