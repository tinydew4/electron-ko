# electron.atom.io

[Electron](https://github.com/electron/electron) 을 위한 [웹사이트]
(http://electron.atom.io): [electron.atom.io](http://electron.atom.io).

- **[electron.atom.io/apps 에 프로젝트 등록하기](CONTRIBUTING.md#adding-an-app-or-project-to-the-site)**
- **[electron.atom.io/community 에 밋업 등록하기](CONTRIBUTING.md#adding-a-meetup-to-the-site)**

### 빌드

이것은 [GitHub 페이지](https://pages.github.com)에서 호스팅되는
[Jekyll](https://jekyllrb.com) 사이트입니다. 당신의 시스템에 Jekyll 사이트를
구축하려면 몇가지가 필요합니다. 그러니 [Jekyll 요구사항]
(https://jekyllrb.com/docs/installation/#requirements)을 다시 확인하세요.

다음은 당신의 컴퓨터에 이 저장소를 복사하고 사이트를 빌드하는 과정입니다:

```bash
git clone https://github.com/electron/electron.atom.io.git
cd electron.atom.io
npm run bootstrap
npm start
```

### 문서, 배포와 버전 정보를 위한 CLI

이 사이트는 Electron 문서의 최신 버전, 최근 배포 변경 로그, Electron 에서
사용중인 Node.js, Chromium, V8 의 현재 버전을 담고있습니다.

새 Electron 이 출시되면 갱신됩니다. 아래 설명된 명령 줄 인터페이스로 그렇게 하고
있습니다.

CLI 를 사용하려면 [Node.js](https://www.nodejs.org) 가 설치되있어야 합니다.
그런다음 종속 모듈을 설치할 수 있습니다:

```bash
$ cd electron.atom.io
$ npm install
```

#### 문서

Electron 문서 버전은 `electron/electron` 저장소의 `docs` 디렉토리에서 가져옵니다.
사이트는 최신 버전의 문서를 포함하고 저장소의 이전 버전의 문서를 연결합니다.

특정 버전의 문서를 위한 방법:

```bash
$ script/docs <version> [options]
# Example:
$ script/docs v0.26.0 --latest
```
options:

`--latest` 이 버전을 `_config.yml` 에 Electron 의 마지막 버전으로 설정하고 기존
문서를 변경합니다.

#### 배포 노트

`electron/electron` 저장소의 가장 최신 배포 노트를 사이트에서 사용할 수 있으며
다음 실행으로 갱신할 수 있습니다:;

```bash
$ script/releases
```

#### Electron 에서 사용하는 Node.js, Chromium, V8 버전 갱신

다음을 실행하여 이 사이트의 `_config.yml` 의 Node.js, Chromium, V8 버전을
Electron 의 최신 배포로 갱신할 수 있습니다:

```bash
$ script/versions
```

#### 한번에 업데이트 하기

위의 스크립트는 각 작업을 개별적으로 하지만, 모두 한번에 실행할 수 있습니다:

```bash
$ npm run latest -- <version>
# Example:
$ npm run latest -- v0.36.0
```

_참고_ 이것은 버전이 최신이라 가정하고 기본으로 설정합니다.

**테스트**

문서 스크립트 테스트:

```bash
$ npm test
```

### 기여

사이트에 기여해주셔서 감사합니다! [기여 문서](CONTRIBUTING.md) 에서 풀 리퀘스트
지침을 확인하세요.

### 라이센스

[MIT](LICENSE.md)
