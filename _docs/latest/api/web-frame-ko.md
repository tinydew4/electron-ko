---
version: v0.30.0
category: API
title: 'Web Frame Ko'
source_url: 'https://github.com/atom/electron/blob/master/docs/api/web-frame-ko.md'
---

# web-frame

`web-frame` 모듈은 현재 웹 페이지의 랜더링 상태를 커스터마이즈 할 수 있도록 해줍니다.

다음 예제는 현재 페이지를 200% 줌 합니다.

```javascript
var webFrame = require('web-frame');
webFrame.setZoomFactor(2);
```

## webFrame.setZoomFactor(factor)

* `factor` Number - Zoom 값

지정한 값으로 페이지를 줌 합니다. 줌 값은 퍼센트 / 100입니다. (예시: 300% = 3.0)

## webFrame.getZoomFactor()

현재 줌 값을 반환합니다.

## webFrame.setZoomLevel(level)

* `level` Number - Zoom level

지정한 레벨로 줌 레벨을 변경합니다. 0은 "기본 크기" 입니다.
그리고 각각 레벨 값을 올리거나 내릴 때마다 20%씩 커지거나 작아지고 기본 크기의 50%부터 300%까지 조절 제한이 있습니다.

## webFrame.getZoomLevel()

현재 줌 레벨을 반환합니다.

## webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)

* `language` String
* `autoCorrectWord` Boolean
* `provider` Object

Input field나 text area에 철자 검사(spell checking) 제공자를 설정합니다.

`provider`는 반드시 전달된 단어의 철자가 맞았는지 검사하는 `spellCheck` 메소드를 가지고 있어야 합니다.

[node-spellchecker][spellchecker]를 철자 검사 제공자로 사용하는 예제입니다:

```javascript
require('web-frame').setSpellCheckProvider("en-US", true, {
  spellCheck: function(text) {
    return !(require('spellchecker').isMisspelled(text));
  }
});
```

## webFrame.registerUrlSchemeAsSecure(scheme)

* `scheme` String

지정한 `scheme`을 보안 스킴으로 설정합니다.

보안 스킴은 혼합된 컨텐츠 경고를 발생시키지 않습니다. 예를 들어 `https` 와 `data`는 네트워크 공격자로부터 손상될 가능성이 없기 때문에 보안 스킴입니다.

[spellchecker]: https://github.com/atom/node-spellchecker
