---
title: Electron 의 달라진 점
author: jlord
---

최근에 Electron 에 몇몇 흥미로운 업데이트와 얘기가 있습니다, 주목해주세요.

---

## 소스

Electron 은 `v0.32.0` 기준으로 Chrome 45 로 업데이트 되었습니다. 다른 업데이트도 포함하여...

### 더 나아진 문서

![새 문서](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

보기쉽고 읽기 쉽게 문서 구조를 개편하고 표준화 했습니다. 또한, 대해 커뮤니티에서 기여한 일본어와 한국어 문서가 있습니다.

관련 pull requests:
[atom/electron#2028](https://github.com/atom/electron/pull/2028),
[atom/electron#2533](https://github.com/atom/electron/pull/2533),
[atom/electron#2557](https://github.com/atom/electron/pull/2557),
[atom/electron#2709](https://github.com/atom/electron/pull/2709),
[atom/electron#2725](https://github.com/atom/electron/pull/2725),
[atom/electron#2698](https://github.com/atom/electron/pull/2698),
[atom/electron#2649](https://github.com/atom/electron/pull/2649).

### Node.js 4.1.0

Electron `v0.33.0` 이후 Node.js 4.1.0 을 제공합니다.

관련 pull request:
[atom/electron#2817](https://github.com/atom/electron/pull/2817).

### node-pre-gyp
이제 소스에서 빌드할 때 `node-pre-gyp` 에 의존성있는 모듈은 Electron 에 대해 컴파일 할 수 있습니다.

관련 pull request:
[mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### ARM 지원

잊이제 Electron 은 ARMv7 기반의 리눅스에서 빌드할 수 있습니다. Chromebook 과 Raspberry Pi 2 같은 인기있는 플랫폼에서 돌아갑니다.

관련 이슈:
[atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138),
[atom/electron#2094](https://github.com/atom/electron/pull/2094),
[atom/electron#366](https://github.com/atom/electron/issues/366).

### 요세미티 스타일 프레임없는 창

![frameless window](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

OS X 요세미티 이상에서 다른 빌트인 OS X 앱처럼 시스템 신호등이 통합된 테두리 없는 창을 만들 수 있게 해 주는 [@jaanus](https://github.com/jaanus) 의 패치가 적용되었습니다.

관련 pull request:
[atom/electron#2776](https://github.com/atom/electron/pull/2776).

### Google Summer of Code 인쇄 지원

Google Summer of Code 이후 [@hokein](https://github.com/hokein) 의 패치를 적용하여 인쇄 지원을 개선하였습니다. 그리고 PDF 파일로 출력하는 기능을 추가하였습니다.

관련 이슈:
[atom/electron#2677](https://github.com/atom/electron/pull/2677),
[atom/electron#1935](https://github.com/atom/electron/pull/1935),
[atom/electron#1532](https://github.com/atom/electron/pull/1532),
[atom/electron#805](https://github.com/atom/electron/issues/805),
[atom/electron#1669](https://github.com/atom/electron/pull/1669),
[atom/electron#1835](https://github.com/atom/electron/pull/1835).

## Atom

Atom 은 Chrome 44 기반의 Electron `v0.30.6` 으로 업그레이드 되었습니다. `v0.33.0` 업그레이드는 [atom/atom#8779](https://github.com/atom/atom/pull/8779) 에서 진행중입니다.

## Talks

GitHubber [Amy Palamountain](https://github.com/ammeep) 는 [Nordic.js](https://nordicjs2015.confetti.events) 에서 훌륭한 Electron 소개를 했습니다. 또한, [electron-accelerator](https://github.com/ammeep/electron-accelerator) 라이브러리를 만들었습니다.

#### Amy Palomountain 의 Electron 을으로 네이티브 애플리케이션 만들기
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), also on the Atom team, gave an Electron talk at [YAPC Asia](http://yapcasia.org/2015/):

#### Ben Ogle 의 웹 기술로 데스크탑 앱 만들기
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Atom team member [Kevin Sawicki](https://github.com/kevinsawicki) and others gave talks on Electron at the [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) meetup recently. The [videos](http://www.wagonhq.com/blog/electron-meetup) have been posted, here are a couple:

#### Kevin Sawicki 의 Electron 역사
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Ben Gotow 의 네이티브 앱 같은 웹 앱 만들기
<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>
