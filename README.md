# Noble Home React

이 프로젝트는 프리미엄 짐 보관 및 B2B 물류 솔루션 서비스인 '노블스토리지'의 웹사이트를 React와 Vite를 사용하여 구현한 것입니다.

## 시작하기

### 사전 요구 사항

- Node.js (v18.x 이상 권장)
- npm (Node.js 설치 시 함께 설치됩니다)

### 설치

1. 프로젝트를 클론합니다.
   ```sh
   git clone https://github.com/DAIOSFoundation/noble-home-react.git
   ```
2. 프로젝트 디렉토리로 이동합니다.
   ```sh
   cd noble-home-react
   ```
3. 필요한 패키지를 설치합니다.
   ```sh
   npm install
   ```

## 개발 서버 실행

개발 서버를 실행하려면 다음 명령어를 사용하세요.

```sh
npm run dev
```

이 명령어를 실행하면 로컬 환경에서 개발 서버가 시작됩니다. 일반적으로 `http://localhost:5173/` 주소로 접속할 수 있습니다.

## 프로덕션 빌드

프로젝트를 프로덕션용으로 빌드하려면 다음 명령어를 사용하세요.

```sh
npm run build
```

빌드가 완료되면 `dist` 디렉토리에 최적화된 정적 파일들이 생성됩니다. 이 파일들을 웹 서버에 배포할 수 있습니다.

### 빌드 설정

프로덕션 빌드는 `https://noblestorage.co.kr/` 도메인에 최적화되어 있습니다:

- **Base URL**: `https://noblestorage.co.kr/`
- **출력 디렉토리**: `dist`
- **에셋 디렉토리**: `assets`
- **소스맵**: 비활성화 (보안상 이유)
- **압축**: Terser 사용
- **코드 분할**: 
  - `vendor`: React, React DOM
  - `router`: React Router DOM

### 배포

빌드된 파일들은 `dist` 디렉토리에 생성되며, 이를 웹 서버의 루트 디렉토리에 업로드하면 됩니다. 모든 정적 리소스는 `https://noblestorage.co.kr/` 경로를 기준으로 로드됩니다.
