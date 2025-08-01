# Evergreen 프로젝트 개발 현황 요약

이 문서는 2025년 8월 1일 현재 "Evergreen" 프로젝트의 백엔드 및 프론트엔드 개발 현황을 요약합니다.

## 1. 백엔드 개발 현황

`PROJECT_PLAN.md`에 명시된 MVP의 핵심 API들이 상당 부분 구현되어 있습니다.

### 1.1. API 라우트 및 컨트롤러 구현 상태

*   **사용자 인증 (`userRoutes.js`, `userController.js`):**
    *   `POST /api/users/register`: 사용자 회원가입 기능 (비밀번호 해싱, JWT 토큰 생성 포함)
    *   `POST /api/users/login`: 사용자 로그인 기능 (비밀번호 검증, JWT 토큰 발급 포함)
    *   **상태:** 핵심 인증 로직이 완벽하게 구현되어 있습니다.
*   **AI 챗봇 (`chatbotRoutes.js`, `chatbotController.js`):**
    *   `POST /api/chatbot/`: OpenAI API를 연동하여 AI 챗봇과 대화하는 기능
    *   **상태:** OpenAI 연동 로직이 구현되어 있으며, `OPENAI_API_KEY` 환경 변수 설정이 필요합니다.
*   **커뮤니티 (`communityRoutes.js`, `communityController.js`):**
    *   `GET /api/community/clubs`: 소모임 목록 조회
    *   `POST /api/community/clubs`: 새로운 소모임 생성
    *   `GET /api/community/posts/:clubId`: 특정 소모임의 게시글 조회
    *   `POST /api/community/posts/:clubId`: 특정 소모임에 새 게시글 작성
    *   **상태:** 소모임 및 게시글의 기본적인 CRUD (생성, 조회) 기능이 구현되어 있습니다.
*   **마켓플레이스 (`marketplaceRoutes.js`, `marketplaceController.js`):**
    *   `GET /api/marketplace/categories`: 마켓플레이스 카테고리 목록 조회
    *   `GET /api/marketplace/services/:categoryId`: 특정 카테고리에 속한 서비스 목록 조회
    *   `POST /api/marketplace/bookings`: 서비스 예약 생성
    *   **상태:** 카테고리, 서비스 조회 및 예약 기능이 구현되어 있습니다.

### 1.2. 미들웨어 및 모델

*   `authMiddleware.js` 파일이 존재하며, `protect` 미들웨어를 통해 JWT 기반의 인증 시스템이 적용되고 있습니다.
*   `User`, `Club`, `Post`, `Category`, `Service`, `Booking` 등 주요 데이터 모델들이 정의되어 백엔드 로직에서 활용되고 있습니다.

**백엔드 종합:** MVP에 필요한 대부분의 핵심 API 로직이 구현 완료된 상태입니다.

## 2. 프론트엔드 개발 현황

React Native (Expo) 기반으로 앱의 기본적인 구조와 인증 흐름이 잘 구축되어 있습니다.

### 2.1. 내비게이션 구조

*   **`AppNavigator.js`:** 앱의 최상위 내비게이터로, 사용자 로그인 상태에 따라 인증 관련 화면 (`AuthNavigator`) 또는 메인 탭 화면 (`MainTabs`)을 조건부로 렌더링합니다.
*   **`AuthNavigator.js`:** 로그인 (`LoginScreen`) 및 회원가입 (`RegisterScreen`) 화면을 관리하는 스택 내비게이터입니다.
*   **`MainTabs.js`:** 로그인 후 접근하는 메인 화면으로, 하단 탭 내비게이션을 통해 `HomeScreen`, `CommunityScreen`, `ProfileScreen`으로 이동할 수 있습니다.

### 2.2. 인증 컨텍스트 및 서비스

*   **`AuthContext.js`:** React Context API를 사용하여 앱 전반에 걸쳐 사용자 인증 상태 (`user`, `isLoading`)를 관리합니다. `AsyncStorage`를 활용하여 로그인 상태를 기기에 저장하고 유지하는 로직이 구현되어 있습니다.
*   **`authService.js`:** `axios`를 사용하여 백엔드의 사용자 인증 API (`/api/users/register`, `/api/users/login`)와 통신하는 로직이 구현되어 있습니다. `http://localhost:5000`을 기본 API URL로 사용하도록 설정되어 있습니다.

### 2.3. 화면 컴포넌트

*   `screens` 디렉토리 내에 `LoginScreen.js`, `RegisterScreen.js`, `HomeScreen.js`, `CommunityScreen.js`, `ProfileScreen.js` 등 주요 화면 컴포넌트 파일들이 존재합니다.

**프론트엔드 종합:** 앱의 내비게이션 흐름, 사용자 인증 상태 관리, 백엔드 API 연동을 위한 서비스 계층이 잘 구축되어 있습니다. 각 화면 컴포넌트의 UI/UX 구현 및 백엔드 API와의 실제 데이터 연동 작업이 다음 주요 과제로 보입니다.

## 3. 결론 및 다음 단계

현재 Evergreen 프로젝트는 MVP 개발을 위한 백엔드와 프론트엔드의 핵심 기반이 매우 견고하게 구축되어 있습니다. 백엔드는 기능적으로 거의 완성 단계이며, 프론트엔드는 구조적으로 잘 잡혀 있습니다.

**다음 주요 작업은 프론트엔드의 각 화면 컴포넌트 (`screens` 디렉토리 내 파일들)에 대한 실제 UI/UX 디자인 및 구현, 그리고 백엔드 API와의 데이터 연동을 완료하는 것입니다.**
