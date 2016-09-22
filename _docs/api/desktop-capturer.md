---
version: v1.4.1
category: API
redirect_from:
    - /docs/v0.24.0/api/desktop-capturer/
    - /docs/v0.25.0/api/desktop-capturer/
    - /docs/v0.26.0/api/desktop-capturer/
    - /docs/v0.27.0/api/desktop-capturer/
    - /docs/v0.28.0/api/desktop-capturer/
    - /docs/v0.29.0/api/desktop-capturer/
    - /docs/v0.30.0/api/desktop-capturer/
    - /docs/v0.31.0/api/desktop-capturer/
    - /docs/v0.32.0/api/desktop-capturer/
    - /docs/v0.33.0/api/desktop-capturer/
    - /docs/v0.34.0/api/desktop-capturer/
    - /docs/v0.35.0/api/desktop-capturer/
    - /docs/v0.36.0/api/desktop-capturer/
    - /docs/v0.36.3/api/desktop-capturer/
    - /docs/v0.36.4/api/desktop-capturer/
    - /docs/v0.36.5/api/desktop-capturer/
    - /docs/v0.36.6/api/desktop-capturer/
    - /docs/v0.36.7/api/desktop-capturer/
    - /docs/v0.36.8/api/desktop-capturer/
    - /docs/v0.36.9/api/desktop-capturer/
    - /docs/v0.36.10/api/desktop-capturer/
    - /docs/v0.36.11/api/desktop-capturer/
    - /docs/v0.37.0/api/desktop-capturer/
    - /docs/v0.37.1/api/desktop-capturer/
    - /docs/v0.37.2/api/desktop-capturer/
    - /docs/v0.37.3/api/desktop-capturer/
    - /docs/v0.37.4/api/desktop-capturer/
    - /docs/v0.37.5/api/desktop-capturer/
    - /docs/v0.37.6/api/desktop-capturer/
    - /docs/v0.37.7/api/desktop-capturer/
    - /docs/v0.37.8/api/desktop-capturer/
    - /docs/latest/api/desktop-capturer/
source_url: 'https://github.com/electron/electron/blob/master/docs/api/desktop-capturer.md'
excerpt: "Access information about media sources that can be used to capture audio and
    video from the desktop using the <a href=\"https://developer.mozilla.org/en/docs/Web/API/Navigator/getUserMedia\"><code>navigator.webkitGetUserMedia</code></a> API."
title: "desktopCapturer"
sort_title: "desktopcapturer"
---

# desktopCapturer

> Access information about media sources that can be used to capture audio and
> video from the desktop using the [`navigator.webkitGetUserMedia`] API.

The following example shows how to capture video from a desktop window whose
title is `Electron`:

```javascript
// In the renderer process.
const {desktopCapturer} = require('electron')

desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  if (error) throw error
  for (let i = 0; i < sources.length; ++i) {
    if (sources[i].name === 'Electron') {
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }, handleStream, handleError)
      return
    }
  }
})

function handleStream (stream) {
  document.querySelector('video').src = URL.createObjectURL(stream)
}

function handleError (e) {
  console.log(e)
}
```

To capture video from a source provided by `desktopCapturer` the constraints
passed to [`navigator.webkitGetUserMedia`] must include
`chromeMediaSource: 'desktop'`, and `audio: false`.

To capture both audio and video from the entire desktop the constraints passed
to [`navigator.webkitGetUserMedia`] must include `chromeMediaSource: 'screen'`,
and `audio: true`, but should not include a `chromeMediaSourceId` constraint.

## Methods

The `desktopCapturer` module has the following methods:

### `desktopCapturer.getSources(options, callback)`

* `options` Object
  * `types` Array - An array of String that lists the types of desktop sources
    to be captured, available types are `screen` and `window`.
  * `thumbnailSize` Object (optional) - The suggested size that the media source
    thumbnail should be scaled to, defaults to `{width: 150, height: 150}`.
* `callback` Function

Starts gathering information about all available desktop media sources,
and calls `callback(error, sources)` when finished.

`sources` is an array of `Source` objects, each `Source` represents a
screen or an individual window that can be captured, and has the following
properties:

* `id` String - The identifier of a window or screen that can be used as a
  `chromeMediaSourceId` constraint when calling
  [`navigator.webkitGetUserMedia`]. The format of the identifier will be
  `window:XX` or `screen:XX`, where `XX` is a random generated number.
* `name` String - A screen source will be named either `Entire Screen` or
  `Screen <index>`, while the name of a window source will match the window
  title.
* `thumbnail` [NativeImage](http://electron.atom.io/docs/api/native-image) - A thumbnail image. **Note:**
  There is no guarantee that the size of the thumbnail is the same as the
  `thumnbailSize` specified in the `options` passed to
  `desktopCapturer.getSources`. The actual size depends on the scale of the
  screen or window.

[`navigator.webkitGetUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/Navigator/getUserMedia
