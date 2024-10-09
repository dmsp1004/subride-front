## Directory 구조

```
Frontend
|_deployment
|_public
|_src
    |_assets
    |_common
    |_utils
        |_apiInstance.js
    |_pages
        |_main.jsx
    |_components
        |_main.jsx

```

## FRONT CODE CONVENTION

🎨
:art:
코드의 구조/형태 개선
Improve structure / format of the code.

⚡️
:zap:
성능 개선
Improve performance.

🔥
:fire:
코드/파일 삭제
Remove code or files.

🐛
:bug:
버그 수정
Fix a bug.

✨
:sparkles:
새 기능/컴포넌트 생성
Introduce new features.

📝
:memo:
문서 추가/수정
Add or update documentation.

💄
:lipstick:
UI/스타일 파일 추가/수정
Add or update the UI and style files.

✅
:white_check_mark:
테스트 추가/수정
Add or update tests.

🔖
:bookmark:
릴리즈/버전 태그
Release / Version tags.

💚
:green_heart:
CI 빌드 수정/배포 파일 수정
Fix CI Build.

♻️
:recycle:
코드 리팩토링
Refactor code.

➕
:heavy_plus_sign:
의존성 추가/
Add a dependency.

➖
:heavy_minus_sign:
의존성 제거
Remove a dependency.

🔧
:wrench:
구성 파일 추가/ 디렉토리 추가
Add or update configuration files.

🔨
:hammer:
개발 스크립트 추가/수정
Add or update development scripts.

🌐
:globe_with_meridians:
국제화/현지화
Internationalization and localization.

💩
:poop:
똥싼 코드
Write bad code that needs to be improved.

⏪
:rewind:
변경 내용 되돌리기
Revert changes.

🔀
:twisted_rightwards_arrows:
브랜치 합병
Merge branches.

📦
:package:
컴파일된 파일 추가/수정
Add or update compiled files or packages.

🚚
:truck:
리소스 이동, 이름 변경
Move or rename resources (e.g.: files paths routes).

💡
:bulb:
주석 추가/수정
Add or update comments in source code.

🙈
:see_no_evil:
.gitignore 추가/수정
Add or update a .gitignore file.

출처: https://inpa.tistory.com/entry/GIT-⚡️-Gitmoji-사용법-Gitmoji-cli# [Inpa Dev 👨‍💻:티스토리]

## API 규정

### Base URL

```javascript
import axios from "axios";

export const API_BASE_URL = "http://gudokjoa5.165.192.105.60.nip.io";

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiInstance;
```

### 활용 예시

```javascript
import api from "../utils/apiInstance";

const getUser = async (userId) => {
  try {
    const { data } = await api.get("/users", { params: { id: userId } });
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};

const addBook = async (bookId, userId) => {
  try {
    const { data } = await api.post("kkubooks/bookshelf/", {
      book: bookId,
      user: userId,
    });
    return data;
  } catch (err) {
    return err;
  }
};
```
