---
version: v0.25.0
category: Tutorial
title: 'Using Native Node Modules'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md'
---

# Using native Node modules

The native Node modules are supported by Electron, but since Electron is
using a different V8 version from official Node, you have to manually specify
the location of Electron's headers when building native modules.

## Native Node module compatibility

Since Node v0.11.x there were vital changes in the V8 API. So generally all
native modules written for Node v0.10.x wouldn't work for Node v0.11.x. And
because Electron internally uses Node v0.11.13, it carries with the same
problem.

To solve this, you should use modules that support Node v0.11.x,
[many modules](https://www.npmjs.org/browse/depended/nan) do support both now.
For old modules that only support Node v0.10.x, you should use the
[nan](https://github.com/rvagg/nan) module to port it to v0.11.x.

## How to install native modules

### The node-gyp way

To build Node modules with headers of Electron, you need to tell `node-gyp`
where to download headers and which version to use:

```bash
$ cd /path-to-module/
$ HOME=~/.electron-gyp node-gyp rebuild --target=0.16.0 --arch=ia32 --dist-url=https://atom.io/download/atom-shell
```

The `HOME=~/.electron-gyp` changes where to find development headers. The
`--target=0.16.0` is version of Electron. The `--dist-url=...` specifies
where to download the headers. The `--arch=ia32` says the module is built for
32bit system.

### The npm way

You can also use `npm` to install modules, the steps are exactly the same with
Node modules, except that you need to setup some environment variables:

```bash
export npm_config_disturl=https://atom.io/download/atom-shell
export npm_config_target=0.23.0
export npm_config_arch=x64
HOME=~/.electron-gyp npm install module-name
```
