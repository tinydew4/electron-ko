---
version: v0.37.3
category: Tutorial
title: 'Using Pepper Flash Plugin'
source_url: 'https://github.com/atom/electron/blob/master/docs/tutorial/using-pepper-flash-plugin.md'
---

# Using Pepper Flash Plugin

Electron now supports the Pepper Flash plugin. To use the Pepper Flash plugin in
Electron, you should manually specify the location of the Pepper Flash plugin
and then enable it in your application.

## Prepare a Copy of Flash Plugin

On OS X and Linux, the details of the Pepper Flash plugin can be found by
navigating to `chrome://plugins` in the Chrome browser. Its location and version
are useful for Electron's Pepper Flash support. You can also copy it to another
location.

## Add Electron Switch

You can directly add `--ppapi-flash-path` and `ppapi-flash-version` to the
Electron command line or by using the `app.commandLine.appendSwitch` method
before the app ready event. Also, add the `plugins` switch of `browser-window`.
For example:

```javascript
// Specify flash path.
// On Windows, it might be /path/to/pepflashplayer.dll
// On OS X, /path/to/PepperFlashPlayer.plugin
// On Linux, /path/to/libpepflashplayer.so
app.commandLine.appendSwitch('ppapi-flash-path', '/path/to/libpepflashplayer.so');

// Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169');

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    'width': 800,
    'height': 600,
    'web-preferences': {
      'plugins': true
    }
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // Something else
});
```

## Enable Flash Plugin in a `<webview>` Tag

Add `plugins` attribute to `<webview>` tag.

```html
<webview src="http://www.adobe.com/software/flash/about/" plugins></webview>
```
