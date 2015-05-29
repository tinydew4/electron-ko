---
version: v0.23.0
category: API
title: Process
source_url: 'https://github.com/atom/electron/blob/master/docs/api/process.md'
---

# Process object

The `process` object in atom-shell has following differences between the one in
upstream node:

* `process.type` String - Process's type, can be `browser` (i.e. main process) or `renderer`.
* `process.versions['atom-shell']` String - Version of atom-shell.
* `process.versions['chrome']` String - Version of Chromium.
* `process.resourcesPath` String - Path to JavaScript source code.
