# 노블스토리지 이사&보관후기 데이터베이스 설계

## 개요
이사&보관후기 시스템을 위한 SQLite 데이터베이스 설계 문서입니다.

## 데이터베이스 생성 및 연결

### 1. SQLite 데이터베이스 생성
```bash
# SQLite 데이터베이스 파일 생성
sqlite3 noble_reviews.db
```

### 2. Node.js에서 SQLite 사용을 위한 패키지 설치
```bash
npm install sqlite3
# 또는 더 가벼운 대안
npm install better-sqlite3
```

### 3. 데이터베이스 연결 코드 (Node.js)
```javascript
const Database = require('better-sqlite3');
const db = new Database('noble_reviews.db');

// 데이터베이스 연결 확인
console.log('SQLite 데이터베이스 연결됨');
```

## 테이블 설계

### 1. reviews 테이블 (후기 정보)
```sql
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_name VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    review_date DATE NOT NULL,
    from_location VARCHAR(100) NOT NULL,
    to_location VARCHAR(100) NOT NULL,
    from_date VARCHAR(20) NOT NULL,
    to_date VARCHAR(20) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    image_url VARCHAR(500),
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. users 테이블 (사용자 정보 - 확장 가능)
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3. locations 테이블 (지역 정보)
```sql
CREATE TABLE locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 인덱스 생성

### 성능 최적화를 위한 인덱스
```sql
-- 후기 날짜별 조회 최적화
CREATE INDEX idx_reviews_date ON reviews(review_date);

-- 팀별 조회 최적화
CREATE INDEX idx_reviews_team ON reviews(team_name);

-- 평점별 조회 최적화
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- 지역별 조회 최적화
CREATE INDEX idx_reviews_from_location ON reviews(from_location);
CREATE INDEX idx_reviews_to_location ON reviews(to_location);
```

## 샘플 데이터 삽입

### 1. 지역 데이터 삽입
```sql
INSERT INTO locations (city, district, full_name) VALUES
('서울', '강서구', '서울 강서구'),
('서울', '강동구', '서울 강동구'),
('서울', '노원구', '서울 노원구'),
('서울', '서초구', '서울 서초구'),
('서울', '관악구', '서울 관악구'),
('서울', '송파구', '서울 송파구'),
('서울', '강남구', '서울 강남구'),
('서울', '마포구', '서울 마포구'),
('서울', '영등포구', '서울 영등포구'),
('서울', '동작구', '서울 동작구'),
('경기', '군포시', '경기 군포시'),
('경기', '수원시', '경기 수원시'),
('경기', '용인시', '경기 용인시'),
('경기', '성남시', '경기 성남시'),
('경기', '고양시', '경기 고양시'),
('경기', '부천시', '경기 부천시'),
('경기', '안양시', '경기 안양시');
```

### 2. 후기 샘플 데이터 삽입
```sql
INSERT INTO reviews (team_name, title, user_name, review_date, from_location, to_location, from_date, to_date, rating, image_url, content) VALUES
('27팀', '27팀 1차 후기입니다~', '박**님', '2025-01-18', '경기 군포시', '서울 노원구', '10.19', '11.02', 5, '/review_1.jpg', '27팀이 정말 친절하게 도와주셨어요. 이사가 생각보다 편했어요.'),
('33팀', '33팀 분들께 감사드립니다.', '김**님', '2025-01-18', '경기 수원시', '경기 용인시', '10.19', '10.24', 5, '/review_2.jpg', '33팀 덕분에 이사가 수월했습니다. 감사합니다.'),
('24팀', '24팀 1차 이사 후기입니다.', '김**님', '2025-01-18', '서울 강서구', '서울 강동구', '10.18', '11.21', 5, '/review_3.jpg', '24팀이 정말 신경써주셔서 감사했습니다.'),
('23팀', '23팀 감사합니다.', '조**님', '2025-01-18', '서울 서초구', '서울 서초구', '10.20', '11.24', 5, '/review_4.jpg', '23팀 덕분에 이사가 완벽했습니다.'),
('32팀', '32팀 최고입니다', '조**님', '2025-01-17', '서울 관악구', '서울 관악구', '10.18', '11.27', 5, '/review_5.jpg', '32팀이 정말 최고예요!'),
('13팀', '13년간 이사 5번하고 느낀점', '이**님', '2025-01-16', '경기 성남시', '경기 성남시', '09.15', '10.18', 5, '/review_6.jpg', '13년간 5번 이사했는데 이번이 제일 만족스러웠어요.');
```

## 주요 쿼리 예시

### 1. 페이지네이션을 위한 후기 조회
```sql
-- 페이지별 후기 조회 (6개씩)
SELECT * FROM reviews 
ORDER BY review_date DESC 
LIMIT 6 OFFSET 0;

-- 특정 페이지 조회 (예: 2페이지)
SELECT * FROM reviews 
ORDER BY review_date DESC 
LIMIT 6 OFFSET 6;
```

### 2. 총 후기 개수 조회
```sql
SELECT COUNT(*) as total_count FROM reviews;
```

### 3. 평점별 후기 조회
```sql
-- 5점 후기만 조회
SELECT * FROM reviews WHERE rating = 5;

-- 평점별 통계
SELECT rating, COUNT(*) as count 
FROM reviews 
GROUP BY rating 
ORDER BY rating DESC;
```

### 4. 지역별 후기 조회
```sql
-- 특정 지역에서 출발한 후기
SELECT * FROM reviews WHERE from_location LIKE '%서울%';

-- 특정 지역으로 도착한 후기
SELECT * FROM reviews WHERE to_location LIKE '%경기%';
```

### 5. 최근 후기 조회
```sql
-- 최근 7일간의 후기
SELECT * FROM reviews 
WHERE review_date >= date('now', '-7 days') 
ORDER BY review_date DESC;
```

## API 엔드포인트 설계 (Express.js 예시)

### 1. 후기 목록 조회 API
```javascript
// GET /api/reviews?page=1&limit=6
app.get('/api/reviews', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;
    
    const reviews = db.prepare(`
        SELECT * FROM reviews 
        ORDER BY review_date DESC 
        LIMIT ? OFFSET ?
    `).all(limit, offset);
    
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get().count;
    
    res.json({
        reviews,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            hasNext: page < Math.ceil(totalCount / limit),
            hasPrev: page > 1
        }
    });
});
```

### 2. 후기 상세 조회 API
```javascript
// GET /api/reviews/:id
app.get('/api/reviews/:id', (req, res) => {
    const review = db.prepare('SELECT * FROM reviews WHERE id = ?').get(req.params.id);
    
    if (!review) {
        return res.status(404).json({ error: '후기를 찾을 수 없습니다.' });
    }
    
    res.json(review);
});
```

### 3. 후기 등록 API
```javascript
// POST /api/reviews
app.post('/api/reviews', (req, res) => {
    const { team_name, title, user_name, from_location, to_location, from_date, to_date, rating, content } = req.body;
    
    const stmt = db.prepare(`
        INSERT INTO reviews (team_name, title, user_name, review_date, from_location, to_location, from_date, to_date, rating, content)
        VALUES (?, ?, ?, date('now'), ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(team_name, title, user_name, from_location, to_location, from_date, to_date, rating, content);
    
    res.json({ id: result.lastInsertRowid, message: '후기가 등록되었습니다.' });
});
```

## 데이터베이스 백업 및 복원

### 1. 백업
```bash
# SQLite 데이터베이스 백업
sqlite3 noble_reviews.db ".backup backup_$(date +%Y%m%d_%H%M%S).db"
```

### 2. 복원
```bash
# 백업에서 복원
sqlite3 noble_reviews.db ".restore backup_20250120_143000.db"
```

## 성능 최적화 팁

### 1. 연결 풀링
```javascript
const Database = require('better-sqlite3');

// 연결 풀 설정
const db = new Database('noble_reviews.db', {
    verbose: console.log, // 개발 시에만 사용
    fileMustExist: false
});

// WAL 모드 활성화 (동시 읽기 성능 향상)
db.pragma('journal_mode = WAL');
```

### 2. 쿼리 최적화
```sql
-- 복합 인덱스 생성
CREATE INDEX idx_reviews_date_rating ON reviews(review_date, rating);

-- 부분 인덱스 (5점 후기만)
CREATE INDEX idx_reviews_5star ON reviews(review_date) WHERE rating = 5;
```

## 보안 고려사항

### 1. SQL 인젝션 방지
```javascript
// prepared statement 사용 (better-sqlite3는 자동으로 처리)
const stmt = db.prepare('SELECT * FROM reviews WHERE id = ?');
const review = stmt.get(reviewId);
```

### 2. 데이터 검증
```javascript
// 입력 데이터 검증
function validateReview(data) {
    if (!data.team_name || data.team_name.length > 50) {
        throw new Error('팀명은 50자 이하여야 합니다.');
    }
    if (data.rating < 1 || data.rating > 5) {
        throw new Error('평점은 1-5 사이여야 합니다.');
    }
    return true;
}
```

## 모니터링 및 로깅

### 1. 쿼리 성능 모니터링
```sql
-- 느린 쿼리 확인
EXPLAIN QUERY PLAN SELECT * FROM reviews WHERE rating = 5 ORDER BY review_date DESC;
```

### 2. 데이터베이스 통계
```sql
-- 테이블 정보 확인
SELECT name, sql FROM sqlite_master WHERE type='table';

-- 인덱스 정보 확인
SELECT name, sql FROM sqlite_master WHERE type='index';
```

이 설계 문서를 참고하여 SQLite 데이터베이스를 구축하고 이사&보관후기 시스템을 구현할 수 있습니다.
