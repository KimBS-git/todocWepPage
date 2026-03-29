# 🐾 토닥 (Todok)

> 반려동물 병원 예약, 이젠 쉽고 빠르게!

토닥은 반려동물 보호자를 위한 동물병원 예약 웹 서비스입니다.  
지도 기반 병원 검색부터 예약, D-DAY 알림, 마이페이지까지 하나의 앱에서 관리할 수 있습니다.

---

## 📁 프로젝트 구조

```
todok/
├── index.html       # 메인 홈페이지 (랜딩 페이지)
├── login.html       # 카카오 로그인 페이지
├── my_page.html     # 마이페이지 (예약 내역, 반려동물 정보)
├── style.css        # 전역 스타일시트
└── images
```

---

## 📄 페이지별 기능

### index.html — 홈페이지
- 서비스 소개 히어로 섹션
- 앱 UI 목업 4종 전시 (홈, 병원 찾기, 예약내역, 마이페이지)
- 주요 기능 소개 (지도 기반 병원 찾기, D-DAY 알림, 예약 내역, 미용·호텔·카페 예약)
- 서비스 칩 목록 및 가상 폰 UI
- 3단계 이용 방법 안내
- 푸터의 쿤 이미지 클릭 시 동영상 모달 재생
- 로그인 상태에 따라 마이페이지 또는 로그인 페이지로 이동

### login.html — 로그인 페이지
- 카카오 로그인 연동
- 로그인 성공 시 닉네임, 프로필 이미지를 `localStorage`에 저장
- 로그인 완료 후 마이페이지로 자동 이동

### my_page.html — 마이페이지
- 로그인하지 않은 경우 `login.html`로 자동 리다이렉트
- 카카오 프로필 이미지 및 닉네임 표시
- 예정된 예약 목록 (D-DAY 카운트다운 표시)
- 내 반려동물 정보 (호, 쿤)
- 반려동물 이미지 클릭 시 동영상 모달 재생
- 카카오 로그아웃 기능

---

## ✨ 주요 기능

### 🎬 동영상 모달
숨겨진 이미지를 클릭하면 해당 반려동물의 동영상이 팝업으로 재생됩니다.

동영상 모달은 다음 방식으로 동작합니다:
- 기본 상태: `display: none` — 화면에 보이지 않음
- 이미지 클릭 시: `.active` 클래스 추가 → `display: flex` 로 전환되며 표시
- 모달 닫기 버튼(✕) 또는 배경 클릭 시: `.active` 클래스 제거 → 다시 숨김
- 닫을 때 동영상이 자동으로 일시정지되고 처음으로 되감깁니다

```javascript
// 동영상 열기
function openVideo(petName) {
  const modal  = document.getElementById('videoModal');
  const player = document.getElementById('videoPlayer');
  player.src = petVideos[petName]; 
  modal.classList.add('active');
  player.play().catch(e => console.log('수동으로 재생해주세요', e));
}

// 동영상 닫기
function closeVideo() {
  const modal  = document.getElementById('videoModal');
  const player = document.getElementById('videoPlayer');
  player.pause();
  player.currentTime = 0;
  modal.classList.remove('active');
}
```

### 🔐 카카오 로그인
카카오 JavaScript SDK를 사용해 소셜 로그인을 구현합니다.  
로그인 후 사용자 정보는 `localStorage`에 저장되어 마이페이지에서 활용됩니다.

```javascript
// 저장되는 항목
localStorage.setItem('isLoggedIn', true);
localStorage.setItem('nickname', '사용자 닉네임');
localStorage.setItem('profileImg', '프로필 이미지 URL');
```

로그아웃 시 위 항목을 모두 제거하고 카카오 세션도 함께 종료합니다.

---

## 🛠️ 사용 기술

| 분류 | 기술 |
|---|---|
| 마크업 | HTML5 |
| 스타일 | CSS3 (CSS 변수, Flexbox, 애니메이션) |
| 스크립트 | Vanilla JavaScript |
| 폰트 | Google Fonts — Noto Sans KR |
| 인증 | Kakao JavaScript SDK v2.7.2 |

---

## 🚀 실행 방법

별도의 빌드 과정 없이 정적 파일로 동작합니다.

1. 저장소를 클론하거나 파일을 다운로드합니다.
2. `images/` 폴더에 필요한 이미지 및 동영상 파일을 준비합니다.
3. `index.html`을 로컬 서버 또는 브라우저에서 직접 엽니다.

> **참고:** 카카오 로그인은 카카오 개발자 콘솔에서 등록된 도메인에서만 동작합니다.  
> 로컬 테스트 시 `localhost`를 허용 도메인으로 추가해야 합니다.

---



