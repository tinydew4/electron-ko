---
version: v0.31.0
category: API
title: 'File Object Ko'
source_url: 'https://github.com/electron/electron/blob/master/docs/api/file-object-ko.md'
---

﻿# `File` 객체

DOM의 File 인터페이스는 네이티브 파일을 추상화 합니다. 유저가 직접적으로 HTML5 File API를 사용하여 작업할 때 파일의 경로를
알 수 있도록 Electron은 파일시스템의 실제 파일 경로를 담은 `path` 속성을 File 인터페이스에 추가하였습니다.

다음 예제는 drag n drop한 파일의 실제 경로를 가져옵니다:

```html
<div id="holder">
  Drag your file here
</div>

<script>
  var holder = document.getElementById('holder');
  holder.ondragover = function () {
    return false;
  };
  holder.ondragleave = holder.ondragend = function () {
    return false;
  };
  holder.ondrop = function (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    console.log('File you dragged here is', file.path);
    return false;
  };
</script>
```
