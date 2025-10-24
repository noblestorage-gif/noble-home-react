# 노블스토리지 리뷰 앱 백엔드 API 설계 문서

## 개요
노블스토리지 이사&보관후기 앱을 위한 백엔드 API 설계 문서입니다. SQLite 데이터베이스를 사용하여 사용자 인증, 리뷰 관리, 이미지 관리 기능을 제공합니다.

## 기술 스택
- **데이터베이스**: SQLite
- **API 프레임워크**: Express.js (Node.js)
- **인증**: JWT (JSON Web Token)
- **파일 업로드**: Multer
- **이미지 처리**: Sharp

## 데이터베이스 설계

### 1. 사용자 테이블 (users)
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. 리뷰 테이블 (reviews)
```sql
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    team TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    from_location TEXT NOT NULL,
    to_location TEXT NOT NULL,
    from_date TEXT NOT NULL,
    to_date TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'deleted')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. 리뷰 이미지 테이블 (review_images)
```sql
CREATE TABLE review_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    review_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    image_filename TEXT NOT NULL,
    image_size INTEGER,
    image_mime_type TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);
```

### 4. 관리자 세션 테이블 (admin_sessions)
```sql
CREATE TABLE admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_token TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 인덱스 생성
```sql
-- 성능 최적화를 위한 인덱스
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_review_images_review_id ON review_images(review_id);
CREATE INDEX idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_expires ON admin_sessions(expires_at);
```

## API 엔드포인트 설계

### 1. 인증 관련 API

#### POST /api/auth/login
관리자 로그인
```json
// Request
{
  "username": "tony",
  "password": "test0723"
}

// Response
{
  "success": true,
  "message": "로그인 성공",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "tony",
      "role": "admin"
    }
  }
}
```

#### POST /api/auth/logout
로그아웃
```json
// Request Headers
{
  "Authorization": "Bearer <token>"
}

// Response
{
  "success": true,
  "message": "로그아웃 성공"
}
```

#### GET /api/auth/verify
토큰 검증
```json
// Request Headers
{
  "Authorization": "Bearer <token>"
}

// Response
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "tony",
      "role": "admin"
    }
  }
}
```

### 2. 리뷰 관리 API

#### GET /api/reviews
리뷰 목록 조회 (페이지네이션)
```json
// Query Parameters
?page=1&limit=6&status=published

// Response
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": 1,
        "team": "27팀",
        "title": "27팀 1차 후기입니다~",
        "userName": "박**님",
        "date": "2일전",
        "fromLocation": "경기 군포시",
        "toLocation": "서울 노원구",
        "fromDate": "10.19",
        "toDate": "11.02",
        "rating": 5,
        "image": "https://api.example.com/images/review_1_main.jpg",
        "images": [
          "https://api.example.com/images/review_1_1.jpg",
          "https://api.example.com/images/review_1_2.jpg",
          "https://api.example.com/images/review_1_3.jpg"
        ],
        "content": "27팀이 정말 친절하게 도와주셨어요...",
        "created_at": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 9,
      "total_items": 50,
      "items_per_page": 6
    }
  }
}
```

#### GET /api/reviews/:id
특정 리뷰 상세 조회
```json
// Response
{
  "success": true,
  "data": {
    "id": 1,
    "team": "27팀",
    "title": "27팀 1차 후기입니다~",
    "userName": "박**님",
    "date": "2일전",
    "fromLocation": "경기 군포시",
    "toLocation": "서울 노원구",
    "fromDate": "10.19",
    "toDate": "11.02",
    "rating": 5,
    "images": [
      {
        "id": 1,
        "image_url": "https://api.example.com/images/review_1_1.jpg",
        "sort_order": 0
      },
      {
        "id": 2,
        "image_url": "https://api.example.com/images/review_1_2.jpg",
        "sort_order": 1
      }
    ],
    "content": "27팀이 정말 친절하게 도와주셨어요...",
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

#### POST /api/reviews
새 리뷰 생성 (관리자 전용)
```json
// Request (multipart/form-data)
{
  "team": "27팀",
  "title": "새로운 후기",
  "userName": "김**님",
  "fromLocation": "서울 강남구",
  "toLocation": "서울 서초구",
  "fromDate": "01.15",
  "toDate": "01.20",
  "rating": 5,
  "content": "정말 만족스러운 서비스였습니다.",
  "images": [File, File, File] // 최대 3개 이미지
}

// Response
{
  "success": true,
  "message": "리뷰가 성공적으로 생성되었습니다.",
  "data": {
    "review_id": 51
  }
}
```

#### DELETE /api/reviews/:id
리뷰 삭제 (관리자 전용)
```json
// Request Headers
{
  "Authorization": "Bearer <token>"
}

// Response
{
  "success": true,
  "message": "리뷰가 성공적으로 삭제되었습니다."
}
```

### 3. 이미지 관리 API

#### POST /api/images/upload
이미지 업로드
```json
// Request (multipart/form-data)
{
  "image": File
}

// Response
{
  "success": true,
  "data": {
    "image_url": "https://api.example.com/images/uploaded_123456.jpg",
    "filename": "review_image_123456.jpg",
    "size": 1024000,
    "mime_type": "image/jpeg"
  }
}
```

#### DELETE /api/images/:filename
이미지 삭제
```json
// Response
{
  "success": true,
  "message": "이미지가 성공적으로 삭제되었습니다."
}
```

## 에러 응답 형식
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력 데이터가 올바르지 않습니다.",
    "details": {
      "title": "제목은 필수입니다.",
      "rating": "평점은 1-5 사이여야 합니다."
    }
  }
}
```

## HTTP 상태 코드
- **200**: 성공
- **201**: 생성 성공
- **400**: 잘못된 요청
- **401**: 인증 실패
- **403**: 권한 없음
- **404**: 리소스 없음
- **422**: 유효성 검사 실패
- **500**: 서버 오류

## 보안 고려사항

### 1. 인증 및 권한
- JWT 토큰 기반 인증
- 관리자 권한 검증
- 토큰 만료 시간 설정 (24시간)

### 2. 파일 업로드 보안
- 파일 타입 검증 (이미지만 허용)
- 파일 크기 제한 (5MB)
- 파일명 중복 방지
- 악성 파일 스캔

### 3. 데이터 검증
- 입력 데이터 유효성 검사
- SQL 인젝션 방지
- XSS 공격 방지

## 환경 설정

### 환경 변수 (.env)
```env
# 데이터베이스
DATABASE_PATH=./database/reviews.db

# JWT 설정
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h

# 파일 업로드
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

# 서버 설정
PORT=3001
NODE_ENV=development
```

## 데이터베이스 초기화 스크립트

### init_database.sql
```sql
-- 데이터베이스 초기화 스크립트

-- 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    team TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    from_location TEXT NOT NULL,
    to_location TEXT NOT NULL,
    from_date TEXT NOT NULL,
    to_date TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'deleted')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    review_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    image_filename TEXT NOT NULL,
    image_size INTEGER,
    image_mime_type TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_token TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_review_images_review_id ON review_images(review_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- 기본 관리자 계정 생성
INSERT OR IGNORE INTO users (username, password_hash, role) 
VALUES ('tony', '$2b$10$example_hash_here', 'admin');

-- 더미 데이터 삽입 (개발용)
INSERT OR IGNORE INTO reviews (user_id, team, title, content, from_location, to_location, from_date, to_date, rating, status)
SELECT 
    1,
    '27팀',
    '27팀 1차 후기입니다~',
    '27팀이 정말 친절하게 도와주셨어요. 이사가 생각보다 편했어요.',
    '경기 군포시',
    '서울 노원구',
    '10.19',
    '11.02',
    5,
    'published'
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE id = 1);
```

## API 테스트 예시

### cURL 명령어 예시
```bash
# 관리자 로그인
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "tony", "password": "test0723"}'

# 리뷰 목록 조회
curl -X GET "http://localhost:3001/api/reviews?page=1&limit=6"

# 특정 리뷰 조회
curl -X GET http://localhost:3001/api/reviews/1

# 리뷰 삭제 (관리자 전용)
curl -X DELETE http://localhost:3001/api/reviews/1 \
  -H "Authorization: Bearer <token>"
```

## 배포 고려사항

### 1. 프로덕션 설정
- HTTPS 사용
- 환경 변수 보안 관리
- 데이터베이스 백업 정책
- 로그 관리

### 2. 성능 최적화
- 데이터베이스 인덱스 최적화
- 이미지 리사이징 및 압축
- CDN 사용 고려
- 캐싱 전략

### 3. 모니터링
- API 응답 시간 모니터링
- 에러 로그 수집
- 사용자 활동 추적
- 데이터베이스 성능 모니터링

---

이 설계 문서는 노블스토리지 리뷰 앱의 백엔드 API 구현을 위한 완전한 가이드입니다. 실제 구현 시에는 보안, 성능, 확장성을 고려하여 세부 사항을 조정해야 합니다.
