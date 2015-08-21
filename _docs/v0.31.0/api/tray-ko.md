---
version: v0.31.0
category: API
title: 'Tray Ko'
source_url: 'https://github.com/atom/electron/blob/master/docs/api/tray-ko.md'
---

﻿# Tray

`Tray`는 OS의 알림영역에 아이콘을 표시합니다. 보통 컨텍스트 메뉴(context menu)를 같이 사용합니다.

```javascript
var app = require('app');
var Menu = require('menu');
var Tray = require('tray');

var appIcon = null;
app.on('ready', function(){
  appIcon = new Tray('/path/to/my/icon'); // 현재 어플리케이션 디렉터리를 기준으로 하려면 `__dirname + '/images/tray.png'` 형식으로 입력해야합니다.
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  appIcon.setToolTip('이것은 나의 어플리케이션 입니다!');
  appIcon.setContextMenu(contextMenu);
});

```

__플랫폼별 한계:__

* Linux에서는 앱 알림 표시기(app indicator)가 지원되면 해당 기능을 사용합니다. 만약 지원하지 않으면 `GtkStatusIcon`을 대신 사용합니다.
* Linux 배포판이 앱 알림 표시기만 지원하고 있다면 `libappindicator1`를 설치하여 트레이 아이콘이 작동하도록 만들 수 있습니다.
* 앱 알림 표시기는 컨텍스트 메뉴를 가지고 있을 때만 보입니다.
* Linux에서 앱 알림 표시기가 사용될 경우, `clicked` 이벤트는 무시됩니다.

이러한 이유로 만약 Tray API가 모든 플랫폼에서 똑같이 작동하게 하고 싶다면, 설계시 `clicked` 이벤트에 의존하지 말아야합니다.
그리고 언제나 컨텍스트 메뉴를 포함해서 사용해야 합니다.

## Class: Tray

`Tray`는 [EventEmitter][event-emitter]를 상속 받았습니다.

### new Tray(image)

* `image` [NativeImage](http://electron.atom.io/docs/v0.31.0/api/native-image-ko)

전달된 `image`를 이용하여 트레이 아이콘을 만듭니다.

### Event: 'clicked'

* `event` Event
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` Object - 트레이 아이콘의 범위
  * `x` Integer
  * `y` Integer
  * `width` Integer
  * `height` Integer

트레이 아이콘이 클릭될 때 발생하는 이벤트입니다.

__주의:__ `bounds`는 OS X 와 Windows 7 이후 버전에서만 작동합니다.

### Event: 'right-clicked'

* `event` Event
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` Object - 트레이 아이콘의 범위
  * `x` Integer
  * `y` Integer
  * `width` Integer
  * `height` Integer

트레이 아이콘을 오른쪽 클릭될 때 호출 됩니다.

__주의:__ 이 기능은 OS X 와 Windows 운영체제에서만 작동합니다.

### Event: 'double-clicked'

* `event` Event
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` Object - 트레이 아이콘의 범위
  * `x` Integer
  * `y` Integer
  * `width` Integer
  * `height` Integer

트레이 아이콘이 더블 클릭될 때 발생하는 이벤트입니다.

__주의:__ 이 기능은 OS X 와 Windows 운영체제에서만 작동합니다.

### Event: 'balloon-show'

알림풍선이 보여질 때 발생하는 이벤트입니다.

__주의:__ 이 기능은 Windows에서만 작동합니다.

### Event: 'balloon-clicked'

알림풍선이 클릭될 때 발생하는 이벤트입니다.

__주의:__ 이 기능은 Windows에서만 작동합니다.

### Event: 'balloon-closed'

알림풍선이 시간이 지나 사라지거나 유저가 클릭하여 닫을 때 발생하는 이벤트입니다.

__주의:__ 이 기능은 Windows에서만 작동합니다.

### Event: 'drop-files'

* `event`
* `files` Array - 드롭된 파일의 경로

트레이 아이콘에 파일이 드롭되면 발생하는 이벤트입니다.

__주의:__ 이 기능은 OS X에서만 작동합니다.

### Tray.destroy()

트레이 아이콘을 즉시 삭제시킵니다.

### Tray.setImage(image)

* `image` [NativeImage](http://electron.atom.io/docs/v0.31.0/api/native-image-ko)

`image`를 사용하여 트레이 아이콘의 이미지를 설정합니다.

### Tray.setPressedImage(image)

* `image` [NativeImage](http://electron.atom.io/docs/v0.31.0/api/native-image-ko)

`image`를 사용하여 트레이 아이콘이 눌렸을 때의 이미지를 설정합니다.

__주의:__ 이 기능은 OS X에서만 작동합니다.

### Tray.setToolTip(toolTip)

* `toolTip` String

트레이 아이콘의 툴팁 텍스트를 설정합니다.

### Tray.setTitle(title)

* `title` String

상태바에서 트레이 아이콘 옆에 표시되는 제목 텍스트를 설정합니다.

__주의:__ 이 기능은 OS X에서만 작동합니다.

### Tray.setHighlightMode(highlight)

* `highlight` Boolean

트레이 아이콘을 클릭했을 때 하이라이트 될지 설정합니다.

__주의:__ 이 기능은 OS X에서만 작동합니다.

### Tray.displayBalloon(options)

* `options` Object
  * `icon` [NativeImage](http://electron.atom.io/docs/v0.31.0/api/native-image-ko)
  * `title` String
  * `content` String

트레이에 알림풍선을 생성합니다.

__알림:__ 이 기능은 Windows에서만 작동합니다.

### Tray.popContextMenu([position])

* `position` Object - 팝 메뉴 위치
  * `x` Integer
  * `y` Integer

`position`은 Windows에서만 사용할 수 있으며 기본값은 (0, 0)입니다.

__주의:__ 이 기능은 Windows 와 OS X에서만 작동합니다.

### Tray.setContextMenu(menu)

* `menu` Menu

트레이에 컨텍스트 메뉴를 설정합니다.

[event-emitter]: http://nodejs.org/api/events.html#events_class_events_eventemitter
