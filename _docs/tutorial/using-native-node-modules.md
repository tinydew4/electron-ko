---
version: v1.1.1
category: Tutorial
redirect_from:
    - /docs/v0.24.0/tutorial/using-native-node-modules/
    - /docs/v0.25.0/tutorial/using-native-node-modules/
    - /docs/v0.26.0/tutorial/using-native-node-modules/
    - /docs/v0.27.0/tutorial/using-native-node-modules/
    - /docs/v0.28.0/tutorial/using-native-node-modules/
    - /docs/v0.29.0/tutorial/using-native-node-modules/
    - /docs/v0.30.0/tutorial/using-native-node-modules/
    - /docs/v0.31.0/tutorial/using-native-node-modules/
    - /docs/v0.32.0/tutorial/using-native-node-modules/
    - /docs/v0.33.0/tutorial/using-native-node-modules/
    - /docs/v0.34.0/tutorial/using-native-node-modules/
    - /docs/v0.35.0/tutorial/using-native-node-modules/
    - /docs/v0.36.0/tutorial/using-native-node-modules/
    - /docs/v0.36.3/tutorial/using-native-node-modules/
    - /docs/v0.36.4/tutorial/using-native-node-modules/
    - /docs/v0.36.5/tutorial/using-native-node-modules/
    - /docs/v0.36.6/tutorial/using-native-node-modules/
    - /docs/v0.36.7/tutorial/using-native-node-modules/
    - /docs/v0.36.8/tutorial/using-native-node-modules/
    - /docs/v0.36.9/tutorial/using-native-node-modules/
    - /docs/v0.36.10/tutorial/using-native-node-modules/
    - /docs/v0.36.11/tutorial/using-native-node-modules/
    - /docs/v0.37.0/tutorial/using-native-node-modules/
    - /docs/v0.37.1/tutorial/using-native-node-modules/
    - /docs/v0.37.2/tutorial/using-native-node-modules/
    - /docs/v0.37.3/tutorial/using-native-node-modules/
    - /docs/v0.37.4/tutorial/using-native-node-modules/
    - /docs/v0.37.5/tutorial/using-native-node-modules/
    - /docs/v0.37.6/tutorial/using-native-node-modules/
    - /docs/v0.37.7/tutorial/using-native-node-modules/
    - /docs/v0.37.8/tutorial/using-native-node-modules/
    - /docs/v1.0.0/tutorial/using-native-node-modules/
    - /docs/v1.0.1/tutorial/using-native-node-modules/
    - /docs/v1.1.0/tutorial/using-native-node-modules/
    - /docs/v1.1.1/tutorial/using-native-node-modules/
    - /docs/latest/tutorial/using-native-node-modules/
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md'
title: "Using Native Node Modules"
---

# Using Native Node Modules

The native Node modules are supported by Electron, but since Electron is
using a different V8 version from official Node, you have to manually specify
the location of Electron's headers when building native modules.

## Native Node Module Compatibility

Native modules might break when Node starts using a new version of V8.
To make sure the module you're interested in will work with Electron, you should
check if it supports the internal Node version used by Electron.
You can check what version of Node is used in Electron by looking it up in
the [releases](https://github.com/electron/electron/releases) page or by using
`process.version` (see [Quick Start](https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md)
for example).

Consider using [NAN](https://github.com/nodejs/nan/) for your own modules, since
it makes it easier to support multiple versions of Node. It's also helpful for
porting old modules to newer versions of Node so they can work with Electron.

## How to Install Native Modules

Three ways to install native modules:

### The Easy Way

The most straightforward way to rebuild native modules is via the
[`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) package,
which handles the manual steps of downloading headers and building native modules:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

### The npm Way

You can also use `npm` to install modules. The steps are exactly the same with
Node modules, except that you need to setup some environment variables:

```bash
export npm_config_disturl=https://atom.io/download/atom-shell
export npm_config_target=0.33.1
export npm_config_arch=x64
export npm_config_runtime=electron
HOME=~/.electron-gyp npm install module-name
```

### The node-gyp Way

To build Node modules with headers of Electron, you need to tell `node-gyp`
where to download headers and which version to use:

```bash
$ cd /path-to-module/
$ HOME=~/.electron-gyp node-gyp rebuild --target=0.29.1 --arch=x64 --dist-url=https://atom.io/download/atom-shell
```

The `HOME=~/.electron-gyp` changes where to find development headers. The
`--target=0.29.1` is version of Electron. The `--dist-url=...` specifies
where to download the headers. The `--arch=x64` says the module is built for
64bit system.
