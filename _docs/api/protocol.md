---
version: v1.0.1
category: API
title: Protocol
redirect_from:
    - /docs/v0.24.0/api/protocol/
    - /docs/v0.25.0/api/protocol/
    - /docs/v0.26.0/api/protocol/
    - /docs/v0.27.0/api/protocol/
    - /docs/v0.28.0/api/protocol/
    - /docs/v0.29.0/api/protocol/
    - /docs/v0.30.0/api/protocol/
    - /docs/v0.31.0/api/protocol/
    - /docs/v0.32.0/api/protocol/
    - /docs/v0.33.0/api/protocol/
    - /docs/v0.34.0/api/protocol/
    - /docs/v0.35.0/api/protocol/
    - /docs/v0.36.0/api/protocol/
    - /docs/v0.36.3/api/protocol/
    - /docs/v0.36.4/api/protocol/
    - /docs/v0.36.5/api/protocol/
    - /docs/v0.36.6/api/protocol/
    - /docs/v0.36.7/api/protocol/
    - /docs/v0.36.8/api/protocol/
    - /docs/v0.36.9/api/protocol/
    - /docs/v0.36.10/api/protocol/
    - /docs/v0.36.11/api/protocol/
    - /docs/v0.37.0/api/protocol/
    - /docs/v0.37.1/api/protocol/
    - /docs/v0.37.2/api/protocol/
    - /docs/v0.37.3/api/protocol/
    - /docs/v0.37.4/api/protocol/
    - /docs/v0.37.5/api/protocol/
    - /docs/v0.37.6/api/protocol/
    - /docs/v0.37.7/api/protocol/
    - /docs/v0.37.8/api/protocol/
    - /docs/v1.0.0/api/protocol/
    - /docs/v1.0.1/api/protocol/
    - /docs/latest/api/protocol/
source_url: 'https://github.com/electron/electron/blob/master/docs/api/protocol.md'
excerpt: "Register a custom protocol and intercept existing protocol requests."
---

# protocol

> Register a custom protocol and intercept existing protocol requests.

An example of implementing a protocol that has the same effect as the
`file://` protocol:

```javascript
const electron = require('electron');
const app = electron.app;
const path = require('path');

app.on('ready', function() {
    var protocol = electron.protocol;
    protocol.registerFileProtocol('atom', function(request, callback) {
      var url = request.url.substr(7);
      callback({path: path.normalize(__dirname + '/' + url)});
    }, function (error) {
      if (error)
        console.error('Failed to register protocol')
    });
});
```

**Note:** This module can only be used after the `ready` event in the `app`
module is emitted.

## Methods

The `protocol` module has the following methods:

### `protocol.registerStandardSchemes(schemes)`

* `schemes` Array - Custom schemes to be registered as standard schemes.

A standard `scheme` adheres to what RFC 3986 calls
[generic URI syntax](https://tools.ietf.org/html/rfc3986#section-3). This
includes `file:` and `filesystem:`.

### `protocol.registerServiceWorkerSchemes(schemes)`

* `schemes` Array - Custom schemes to be registered to handle service workers.

### `protocol.registerFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Registers a protocol of `scheme` that will send the file as a response. The
`handler` will be called with `handler(request, callback)` when a `request` is
going to be created with `scheme`. `completion` will be called with
`completion(null)` when `scheme` is successfully registered or
`completion(error)` when failed.

* `request` Object
  * `url` String
  * `referrer` String
  * `method` String
  * `uploadData` Array (optional)
* `callback` Function

The `uploadData` is an array of `data` objects:

* `data` Object
  * `bytes` Buffer - Content being sent.
  * `file` String - Path of file being uploaded.

To handle the `request`, the `callback` should be called with either the file's
path or an object that has a `path` property, e.g. `callback(filePath)` or
`callback({path: filePath})`.

When `callback` is called with nothing, a number, or an object that has an
`error` property, the `request` will fail with the `error` number you
specified. For the available error numbers you can use, please see the
[net error list][net-error].

By default the `scheme` is treated like `http:`, which is parsed differently
than protocols that follow the "generic URI syntax" like `file:`, so you
probably want to call `protocol.registerStandardSchemes` to have your scheme
treated as a standard scheme.

### `protocol.registerBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Registers a protocol of `scheme` that will send a `Buffer` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback`
should be called with either a `Buffer` object or an object that has the `data`,
`mimeType`, and `charset` properties.

Example:

```javascript
protocol.registerBufferProtocol('atom', function(request, callback) {
  callback({mimeType: 'text/html', data: new Buffer('<h5>Response</h5>')});
}, function (error) {
  if (error)
    console.error('Failed to register protocol')
});
```

### `protocol.registerStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Registers a protocol of `scheme` that will send a `String` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback`
should be called with either a `String` or an object that has the `data`,
`mimeType`, and `charset` properties.

### `protocol.registerHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Registers a protocol of `scheme` that will send an HTTP request as a response.

The usage is the same with `registerFileProtocol`, except that the `callback`
should be called with a `redirectRequest` object that has the `url`, `method`,
`referrer`, `uploadData` and `session` properties.

* `redirectRequest` Object
  * `url` String
  * `method` String
  * `session` Object (optional)
  * `uploadData` Object (optional)

By default the HTTP request will reuse the current session. If you want the
request to have a different session you should set `session` to `null`.

For POST requests the `uploadData` object must be provided.

* `uploadData` object
  * `contentType` String - MIME type of the content.
  * `data` String - Content to be sent.

### `protocol.unregisterProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function (optional)

Unregisters the custom protocol of `scheme`.

### `protocol.isProtocolHandled(scheme, callback)`

* `scheme` String
* `callback` Function

The `callback` will be called with a boolean that indicates whether there is
already a handler for `scheme`.

### `protocol.interceptFileProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler
which sends a file as a response.

### `protocol.interceptStringProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler
which sends a `String` as a response.

### `protocol.interceptBufferProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler
which sends a `Buffer` as a response.

### `protocol.interceptHttpProtocol(scheme, handler[, completion])`

* `scheme` String
* `handler` Function
* `completion` Function (optional)

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler
which sends a new HTTP request as a response.

### `protocol.uninterceptProtocol(scheme[, completion])`

* `scheme` String
* `completion` Function

Remove the interceptor installed for `scheme` and restore its original handler.

[net-error]: https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h
