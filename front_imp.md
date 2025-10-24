# 노블스토리지 리뷰 앱 API 명세서

## 📋 기본 정보
- **Base URL**: `http://localhost:8000`
- **인증 방식**: JWT Bearer Token
- **Content-Type**: `application/json` (일반), `multipart/form-data` (파일 업로드)

---

## 🔐 인증 API

### 1. 관리자 로그인
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "tony",
  "password": "test0723"
}
```

**응답:**
```json
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

### 2. 로그아웃
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "message": "로그아웃 성공"
}
```

### 3. 토큰 검증
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "user": {
      "username": "tony",
      "user_id": 1,
      "role": "admin"
    }
  }
}
```

---

## 📝 리뷰 관리 API

### 1. 리뷰 목록 조회 (페이지네이션)
```http
GET /api/reviews?page=1&limit=6&status=published
```

**Query Parameters:**
- `page` (int, optional): 페이지 번호 (기본값: 1)
- `limit` (int, optional): 페이지당 항목 수 (기본값: 6, 최대: 50)
- `status` (string, optional): 리뷰 상태 필터 (기본값: "published")

**응답:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": 1,
        "user_id": 1,
        "team": "27팀",
        "title": "27팀 1차 후기입니다~",
        "content": "27팀이 정말 친절하게 도와주셨어요...",
        "from_location": "경기 군포시",
        "to_location": "서울 노원구",
        "from_date": "10.19",
        "to_date": "11.02",
        "rating": 5,
        "status": "published",
        "created_at": "2025-01-15T10:30:00Z",
        "updated_at": "2025-01-15T10:30:00Z",
        "userName": "**님",
        "date": "2일전",
        "image": "/uploads/review_1_main.jpg",
        "images": [
          "/uploads/review_1_1.jpg",
          "/uploads/review_1_2.jpg",
          "/uploads/review_1_3.jpg"
        ],
        "images_detail": [
          {
            "id": 1,
            "image_url": "/uploads/review_1_1.jpg",
            "sort_order": 0
          }
        ]
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

### 2. 특정 리뷰 상세 조회
```http
GET /api/reviews/{id}
```

**Path Parameters:**
- `id` (int): 리뷰 ID

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "team": "27팀",
    "title": "27팀 1차 후기입니다~",
    "content": "27팀이 정말 친절하게 도와주셨어요...",
    "from_location": "경기 군포시",
    "to_location": "서울 노원구",
    "from_date": "10.19",
    "to_date": "11.02",
    "rating": 5,
    "status": "published",
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z",
    "userName": "**님",
    "date": "2일전",
    "image": "/uploads/review_1_main.jpg",
    "images": [
      "/uploads/review_1_1.jpg",
      "/uploads/review_1_2.jpg",
      "/uploads/review_1_3.jpg"
    ],
    "images_detail": [
      {
        "id": 1,
        "image_url": "/uploads/review_1_1.jpg",
        "sort_order": 0
      }
    ]
  }
}
```

### 3. 새 리뷰 생성 (관리자 전용)
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: multipart/form-data

team: "27팀"
title: "새로운 후기"
userName: "김**님"
fromLocation: "서울 강남구"
toLocation: "서울 서초구"
fromDate: "01.15"
toDate: "01.20"
rating: 5
content: "정말 만족스러운 서비스였습니다."
images: [File, File, File] // 최대 3개 이미지
```

**Form Data:**
- `team` (string, required): 팀명
- `title` (string, required): 제목
- `userName` (string, required): 작성자명
- `fromLocation` (string, required): 출발지
- `toLocation` (string, required): 도착지
- `fromDate` (string, required): 출발일 (MM.DD 형식)
- `toDate` (string, required): 도착일 (MM.DD 형식)
- `rating` (int, required): 평점 (1-5)
- `content` (string, required): 후기 내용
- `images` (File[], optional): 이미지 파일들 (최대 3개)

**응답:**
```json
{
  "success": true,
  "message": "리뷰가 성공적으로 생성되었습니다.",
  "data": {
    "review_id": 51
  }
}
```

### 4. 리뷰 수정 (관리자 전용)
```http
PUT /api/reviews/{id}
Authorization: Bearer <token>
Content-Type: multipart/form-data

team: "27팀" (optional)
title: "수정된 후기" (optional)
userName: "김**님" (optional)
fromLocation: "서울 강남구" (optional)
toLocation: "서울 서초구" (optional)
fromDate: "01.15" (optional)
toDate: "01.20" (optional)
rating: 5 (optional)
content: "수정된 후기 내용" (optional)
images: [File, File, File] (optional)
remove_existing_images: [1, 2] (optional) // 삭제할 기존 이미지 ID 배열
```

**Path Parameters:**
- `id` (int): 리뷰 ID

**Form Data:** (모든 필드 선택사항)
- `team` (string, optional): 팀명
- `title` (string, optional): 제목
- `userName` (string, optional): 작성자명
- `fromLocation` (string, optional): 출발지
- `toLocation` (string, optional): 도착지
- `fromDate` (string, optional): 출발일
- `toDate` (string, optional): 도착일
- `rating` (int, optional): 평점 (1-5)
- `content` (string, optional): 후기 내용
- `images` (File[], optional): 새로 추가할 이미지들
- `remove_existing_images` (int[], optional): 삭제할 기존 이미지 ID들

**응답:**
```json
{
  "success": true,
  "message": "리뷰가 성공적으로 수정되었습니다.",
  "data": {
    "review_id": 1,
    "updated_at": "2025-01-15T15:30:00Z"
  }
}
```

### 5. 리뷰 삭제 (관리자 전용)
```http
DELETE /api/reviews/{id}
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` (int): 리뷰 ID

**응답:**
```json
{
  "success": true,
  "message": "리뷰가 성공적으로 삭제되었습니다."
}
```

---

## 🖼️ 이미지 관리 API

### 1. 이미지 업로드 (관리자 전용)
```http
POST /api/images/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

image: File
```

**Form Data:**
- `image` (File, required): 업로드할 이미지 파일

**응답:**
```json
{
  "success": true,
  "data": {
    "image_url": "/uploads/df62aa20-a55f-4930-b3c2-7eee17330151.jpg",
    "filename": "df62aa20-a55f-4930-b3c2-7eee17330151.jpg",
    "size": 110935,
    "mime_type": "image/jpeg"
  }
}
```

### 2. 이미지 삭제 (관리자 전용)
```http
DELETE /api/images/{filename}
Authorization: Bearer <token>
```

**Path Parameters:**
- `filename` (string): 삭제할 이미지 파일명

**응답:**
```json
{
  "success": true,
  "message": "이미지가 성공적으로 삭제되었습니다."
}
```

### 3. 리뷰 이미지 수정 (관리자 전용)
```http
PUT /api/reviews/{id}/images
Authorization: Bearer <token>
Content-Type: multipart/form-data

images: [File, File, File] (optional)
remove_images: [1, 2, 3] (optional) // 삭제할 기존 이미지 ID들
```

**Path Parameters:**
- `id` (int): 리뷰 ID

**Form Data:**
- `images` (File[], optional): 새로 추가할 이미지들
- `remove_images` (int[], optional): 삭제할 기존 이미지 ID들

**응답:**
```json
{
  "success": true,
  "message": "리뷰 이미지가 성공적으로 수정되었습니다.",
  "data": {
    "added_images": [
      {
        "id": 4,
        "image_url": "/uploads/review_1_4.jpg",
        "sort_order": 0
      }
    ],
    "removed_images": [1, 2, 3]
  }
}
```

---

## ⚠️ 에러 응답 형식

### 일반적인 에러 응답
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

### HTTP 상태 코드
- **200**: 성공
- **201**: 생성 성공
- **400**: 잘못된 요청
- **401**: 인증 실패
- **403**: 권한 없음
- **404**: 리소스 없음
- **422**: 유효성 검사 실패
- **500**: 서버 오류

---

## 🔧 API 사용 예시

### JavaScript/Fetch 예시

#### 1. 로그인
```javascript
const login = async (username, password) => {
  const response = await fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('auth_token', data.data.token);
    return data.data.user;
  }
  throw new Error(data.message);
};
```

#### 2. 리뷰 목록 조회
```javascript
const getReviews = async (page = 1, limit = 6) => {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`http://localhost:8000/api/reviews?page=${page}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
};
```

#### 3. 리뷰 생성 (이미지 포함)
```javascript
const createReview = async (formData) => {
  const token = localStorage.getItem('auth_token');
  const response = await fetch('http://localhost:8000/api/reviews', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData // FormData 객체
  });
  
  return response.json();
};

// 사용 예시
const formData = new FormData();
formData.append('team', '27팀');
formData.append('title', '새로운 후기');
formData.append('userName', '김**님');
formData.append('fromLocation', '서울 강남구');
formData.append('toLocation', '서울 서초구');
formData.append('fromDate', '01.15');
formData.append('toDate', '01.20');
formData.append('rating', '5');
formData.append('content', '정말 만족스러운 서비스였습니다.');

// 이미지 파일 추가
const imageFiles = document.getElementById('imageInput').files;
for (let file of imageFiles) {
  formData.append('images', file);
}

const result = await createReview(formData);
```

#### 4. 이미지 업로드
```javascript
const uploadImage = async (file) => {
  const token = localStorage.getItem('auth_token');
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('http://localhost:8000/api/images/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return response.json();
};
```

### cURL 예시

#### 1. 로그인
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "tony", "password": "test0723"}'
```

#### 2. 리뷰 목록 조회
```bash
curl -X GET "http://localhost:8000/api/reviews?page=1&limit=6"
```

#### 3. 리뷰 생성
```bash
curl -X POST http://localhost:8000/api/reviews \
  -H "Authorization: Bearer <token>" \
  -F "team=27팀" \
  -F "title=새로운 후기" \
  -F "userName=김**님" \
  -F "fromLocation=서울 강남구" \
  -F "toLocation=서울 서초구" \
  -F "fromDate=01.15" \
  -F "toDate=01.20" \
  -F "rating=5" \
  -F "content=정말 만족스러운 서비스였습니다." \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg"
```

#### 4. 이미지 업로드
```bash
curl -X POST http://localhost:8000/api/images/upload \
  -H "Authorization: Bearer <token>" \
  -F "image=@image.jpg"
```

---

## 🚀 서버 실행

### 백엔드 실행
```bash
# 가상환경 활성화
source venv/bin/activate

# 서버 실행
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### API 문서 확인
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📝 주요 기능

1. **인증 시스템**: JWT 토큰 기반 로그인/로그아웃
2. **리뷰 관리**: CRUD 기능 (생성, 조회, 수정, 삭제)
3. **이미지 관리**: 다중 이미지 업로드 및 관리
4. **페이지네이션**: 효율적인 데이터 조회
5. **보안**: 비밀번호 해싱, 토큰 인증

이 API 명세서를 참고하여 프론트엔드 애플리케이션을 구현할 수 있습니다!
