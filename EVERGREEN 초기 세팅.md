# Evergreen 프로젝트 초기 세팅 가이드

이 문서는 "Evergreen" 애플리케이션의 초기 개발 환경을 설정하는 과정을 단계별로 안내합니다.

## 1. 프로젝트 구조 생성

프로젝트는 백엔드와 프론트엔드로 나뉘어 있으며, 기본적인 폴더 구조는 다음과 같습니다.

```
evergreen/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   └── userRoutes.js
│   │   ├── controllers/
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── services/
│   │   └── config/
│   │       └── db.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── constants/
    │   ├── navigation/
    │   │   └── AppNavigator.js
    │   ├── screens/
    │   │   ├── HomeScreen.js
    │   │   └── LoginScreen.js
    │   ├── services/
    │   └── store/
    ├── App.js
    └── package.json
```

## 2. 백엔드(Backend) 설정

### 2.1. 백엔드 의존성 설치

`backend` 디렉토리로 이동하여 필요한 Node.js 패키지를 설치합니다.

```bash
cd backend
npm install
```

### 2.2. 환경변수 설정

백엔드 프로젝트의 루트 디렉토리(`backend/`)에 `.env` 파일을 생성하고 다음과 같이 데이터베이스 연결 정보와 서버 포트를 입력합니다.

**`backend/.env`**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/evergreen
```
> **참고:** `MONGO_URI`는 실제 사용하는 MongoDB 데이터베이스 주소로 변경해야 합니다.

### 2.3. 데이터베이스 연결 설정

`backend/src/config/db.js` 파일을 생성하여 MongoDB 연결 로직을 작성합니다.

**`backend/src/config/db.js`**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 2.4. 서버 설정 업데이트

`backend/server.js` 파일을 수정하여 데이터베이스 연결 함수와 API 라우트를 활성화합니다.

```javascript
// 수정 전
// const connectDB = require('./src/config/db');
// ...
// connectDB();
// ...
// // app.use('/api/users', require('./src/api/userRoutes'));

// 수정 후
const connectDB = require('./src/config/db');
// ...
connectDB();
// ...
app.use('/api/users', require('./src/api/userRoutes'));
```

## 3. 프론트엔드(Frontend) 설정

### 3.1. 프론트엔드 의존성 설치

`frontend` 디렉토리로 이동하여 필요한 React Native (Expo) 패키지를 설치합니다.

```bash
cd frontend
npm install
```

## 4. 실행 방법

모든 설정이 완료되었습니다. 다음 명령어를 사용하여 각 서버를 실행할 수 있습니다.

### 백엔드 서버 실행

`backend` 디렉토리에서 다음 명령어를 실행합니다.

```bash
npm start
```
서버가 5000번 포트에서 실행되고 MongoDB에 연결됩니다.

### 프론트엔드 앱 실행

`frontend` 디렉토리에서 다음 명령어를 실행합니다.

```bash
expo start
```
Expo 개발 서버가 시작되면, QR 코드를 스캔하여 Expo Go 앱(모바일)이나 웹 브라우저, 또는 안드로이드/iOS 에뮬레이터에서 앱을 실행할 수 있습니다.
