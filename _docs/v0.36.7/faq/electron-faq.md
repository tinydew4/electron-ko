---
version: v0.36.7
category: Faq
title: 'Electron Faq'
source_url: 'https://github.com/atom/electron/blob/master/docs/faq/electron-faq.md'
---

# Electron FAQ

## When will Electron upgrade to latest Chrome?

The Chrome version of Electron is usually bumped within one or two weeks after
a new stable Chrome version gets released.

Also we only use stable channel of Chrome, if an important fix is in beta or dev
channel, we will back-port it.

## When will Electron upgrade to latest Node.js?

When a new version of Node.js gets released, we usually wait for about a month
before upgrading the one in Electron. So we can avoid getting affected by bugs
introduced in new Node.js versions, which happens very often.

New features of Node.js are usually brought by V8 upgrades, since Electron is
using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a
new Node.js version is usually already in Electron.

## My app's window/tray disappeared after a few minutes.

This happens when the variable which is used to store the window/tray gets
garbage collected.

It is recommended to have a reading of following articles you encountered this
problem:

* [Memory Management][memory-management]
* [Variable Scope][variable-scope]

If you want a quick fix, you can make the variables global by changing your
code from this:

```javascript
app.on('ready', function() {
  var tray = new Tray('/path/to/icon.png');
})
```

to this:

```javascript
var tray = null;
app.on('ready', function() {
  tray = new Tray('/path/to/icon.png');
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols
inserted into DOM, like `module`, `exports`, `require`. This causes troubles for
some libraries since they want to insert the symbols with same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
var mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
});
```

But if you want to keep the abilities of using Node.js and Electron APIs, you
have to rename the symbols in the page before including other libraries:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

```
> require('electron').webFrame.setZoomFactor(1.0);
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module][electron-module] installed
either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the
path of the `electron` module:

```javascript
console.log(require.resolve('electron'));
```

and then check if it is in the following form:

```
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to
either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if your are using the built-in module but still getting this error, it
is very likely you are using the module in wrong process. For example
`electron.app` can only be used in the main process, while `electron.webFrame`
is only available in renderer processes.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[electron-module]: https://www.npmjs.com/package/electron
