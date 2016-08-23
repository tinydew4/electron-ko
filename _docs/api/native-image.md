---
version: v1.3.4
category: API
redirect_from:
    - /docs/v0.24.0/api/native-image/
    - /docs/v0.25.0/api/native-image/
    - /docs/v0.26.0/api/native-image/
    - /docs/v0.27.0/api/native-image/
    - /docs/v0.28.0/api/native-image/
    - /docs/v0.29.0/api/native-image/
    - /docs/v0.30.0/api/native-image/
    - /docs/v0.31.0/api/native-image/
    - /docs/v0.32.0/api/native-image/
    - /docs/v0.33.0/api/native-image/
    - /docs/v0.34.0/api/native-image/
    - /docs/v0.35.0/api/native-image/
    - /docs/v0.36.0/api/native-image/
    - /docs/v0.36.3/api/native-image/
    - /docs/v0.36.4/api/native-image/
    - /docs/v0.36.5/api/native-image/
    - /docs/v0.36.6/api/native-image/
    - /docs/v0.36.7/api/native-image/
    - /docs/v0.36.8/api/native-image/
    - /docs/v0.36.9/api/native-image/
    - /docs/v0.36.10/api/native-image/
    - /docs/v0.36.11/api/native-image/
    - /docs/v0.37.0/api/native-image/
    - /docs/v0.37.1/api/native-image/
    - /docs/v0.37.2/api/native-image/
    - /docs/v0.37.3/api/native-image/
    - /docs/v0.37.4/api/native-image/
    - /docs/v0.37.5/api/native-image/
    - /docs/v0.37.6/api/native-image/
    - /docs/v0.37.7/api/native-image/
    - /docs/v0.37.8/api/native-image/
    - /docs/latest/api/native-image/
source_url: 'https://github.com/electron/electron/blob/master/docs/api/native-image.md'
excerpt: "Create tray, dock, and application icons using PNG or JPG files."
title: "nativeImage"
sort_title: "nativeimage"
---

# nativeImage

> Create tray, dock, and application icons using PNG or JPG files.

In Electron, for the APIs that take images, you can pass either file paths or
`NativeImage` instances. An empty image will be used when `null` is passed.

For example, when creating a tray or setting a window's icon, you can pass an
image file path as a `String`:

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

Or read the image from the clipboard which returns a `nativeImage`:

```javascript
const {clipboard, Tray} = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Supported Formats

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended
because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual
quality it is recommended to include at least the following sizes in the:

* Small icon
 * 16x16 (100% DPI scale)
 * 20x20 (125% DPI scale)
 * 24x24 (150% DPI scale)
 * 32x32 (200% DPI scale)
* Large icon
 * 32x32 (100% DPI scale)
 * 40x40 (125% DPI scale)
 * 48x48 (150% DPI scale)
 * 64x64 (200% DPI scale)
* 256x256

Check the *Size requirements* section in [this article][icons].

[icons]:https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

## High Resolution Image

On platforms that have high-DPI support such as Apple Retina displays, you can
append `@2x` after image's base filename to mark it as a high resolution image.

For example if `icon.png` is a normal image that has standard resolution, then
`icon@2x.png` will be treated as a high resolution image that has double DPI
density.

If you want to support displays with different DPI densities at the same time,
you can put images with different sizes in the same folder and use the filename
without DPI suffixes. For example:

```text
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```


```javascript
const {Tray} = require('electron')
let appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

Following suffixes for DPI are also supported:

* `@1x`
* `@1.25x`
* `@1.33x`
* `@1.4x`
* `@1.5x`
* `@1.8x`
* `@2x`
* `@2.5x`
* `@3x`
* `@4x`
* `@5x`

## Template Image

Template images consist of black and clear colors (and an alpha channel).
Template images are not intended to be used as standalone images and are usually
mixed with other content to create the desired final appearance.

The most common case is to use template images for a menu bar icon so it can
adapt to both light and dark menu bars.

**Note:** Template image is only supported on macOS.

To mark an image as a template image, its filename should end with the word
`Template`. For example:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Methods

The `nativeImage` module has the following methods, all of which return
an instance of the `NativeImage` class:

### `nativeImage.createEmpty()`

Creates an empty `NativeImage` instance.

### `nativeImage.createFromPath(path)`

* `path` String

Creates a new `NativeImage` instance from a file located at `path`.

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBuffer(buffer[, scaleFactor])`

* `buffer` [Buffer][buffer]
* `scaleFactor` Double (optional)

Creates a new `NativeImage` instance from `buffer`. The default `scaleFactor` is
1.0.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Creates a new `NativeImage` instance from `dataURL`.

## Class: NativeImage

A native wrapper for images such as tray, dock, and application icons.

### Instance Methods

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG()`

Returns a [Buffer][buffer] that contains the image's `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer (**required**) - Between 0 - 100.

Returns a [Buffer][buffer] that contains the image's `JPEG` encoded data.

#### `image.toBitmap()`

Returns a [Buffer][buffer] that contains a copy of the image's raw bitmap pixel
data.

#### `image.toDataURL()`

Returns the data URL of the image.

#### `image.getBitmap()`

Returns a [Buffer][buffer] that contains the image's raw bitmap pixel data.

The difference between `getBitmap()` and `toBitmap()` is, `getBitmap()` does not
copy the bitmap data, so you have to use the returned Buffer immediately in
current event loop tick, otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` _macOS_

Returns a [Buffer][buffer] that stores C pointer to underlying native handle of
the image. On macOS, a pointer to `NSImage` instance would be returned.

Notice that the returned pointer is a weak pointer to the underlying native
image instead of a copy, so you _must_ ensure that the associated
`nativeImage` instance is kept around.

#### `image.isEmpty()`

Returns a boolean whether the image is empty.

#### `image.getSize()`

Returns the size of the image.

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

#### `image.setTemplateImage(option)`

* `option` Boolean

Marks the image as a template image.

#### `image.isTemplateImage()`

Returns a boolean whether the image is a template image.
