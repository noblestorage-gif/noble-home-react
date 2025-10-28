// API 클라이언트 유틸리티 함수들

// 환경에 따른 API URL 설정
const BASE_URL = import.meta.env.PROD
  ? '' // 운영 환경에서는 상대 경로를 사용하여 현재 도메인을 기준으로 API를 호출합니다.
  : 'http://localhost:8000';
// 더미 데이터 사용 여부 (운영 빌드에서는 항상 false)
const USE_DUMMY_DATA = !import.meta.env.PROD;

// 토큰 관리
export const getToken = () => localStorage.getItem('auth_token');
export const setToken = (token) => localStorage.setItem('auth_token', token);
export const removeToken = () => localStorage.removeItem('auth_token');

// 개발 환경용 더미 데이터
const generateDummyData = () => {
  const reviews = []
  const teams = ['27팀', '33팀', '24팀', '23팀', '32팀', '13팀', '15팀', '18팀', '21팀', '25팀', '28팀', '29팀', '30팀', '31팀', '34팀', '35팀', '36팀', '37팀', '38팀', '39팀']
  const names = ['박**님', '김**님', '조**님', '이**님', '최**님', '정**님', '강**님', '윤**님', '서**님', '한**님', '송**님', '임**님', '오**님', '배**님', '신**님', '권**님', '홍**님', '안**님', '문**님', '전**님']
  const locations = [
    { from: '경기 군포시', to: '서울 노원구' },
    { from: '경기 수원시', to: '경기 용인시' },
    { from: '서울 강서구', to: '서울 강동구' },
    { from: '서울 서초구', to: '서울 서초구' },
    { from: '서울 관악구', to: '서울 관악구' },
    { from: '경기 성남시', to: '경기 성남시' },
    { from: '서울 송파구', to: '서울 강남구' },
    { from: '경기 고양시', to: '서울 마포구' },
    { from: '서울 영등포구', to: '경기 부천시' },
    { from: '경기 안양시', to: '서울 동작구' },
    { from: '서울 종로구', to: '서울 성북구' },
    { from: '경기 부천시', to: '서울 은평구' },
    { from: '서울 광진구', to: '서울 성동구' },
    { from: '경기 의정부시', to: '서울 구로구' },
    { from: '서울 금천구', to: '서울 관악구' },
    { from: '경기 하남시', to: '서울 중구' },
    { from: '서울 서대문구', to: '서울 강북구' },
    { from: '경기 광명시', to: '서울 송파구' },
    { from: '서울 중랑구', to: '서울 도봉구' },
    { from: '경기 과천시', to: '서울 종로구' }
  ]
  const titles = [
    '1차 후기입니다~',
    '분들께 감사드립니다.',
    '1차 이사 후기입니다.',
    '감사합니다.',
    '최고입니다',
    '13년간 이사 5번하고 느낀점',
    '2차 후기입니다.',
    '정말 만족스러워요',
    '추천합니다!',
    '완벽한 서비스였어요',
    '정말 깔끔하게 이사 완료',
    '친절한 서비스 감사합니다',
    '다음에도 꼭 이용하고 싶어요',
    '짐 정리가 체계적이었습니다',
    '가격도 합리적이고 만족스러워요',
    '직원분들이 정말 전문적이었어요',
    '이사 스트레스 없이 완료',
    '포장이 정말 꼼꼼했습니다',
    '시간 약속을 정확히 지켜주셨어요',
    '가구 보호가 완벽했습니다'
  ]

  for (let i = 1; i <= 100; i++) {
    const team = teams[Math.floor(Math.random() * teams.length)]
    const name = names[Math.floor(Math.random() * names.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const title = titles[Math.floor(Math.random() * titles.length)]
    
    reviews.push({
      id: i,
      team: team,
      title: `${team} ${title}`,
      userName: name,
      date: i < 5 ? '2일전' : `2025-10-${20 - Math.floor(i / 10)}`,
      from_location: location.from,
      to_location: location.to,
      from_date: `10.${19 - Math.floor(i / 10)}`,
      to_date: `11.${2 + Math.floor(i / 10)}`,
      rating: 5,
      image: `https://picsum.photos/400/200?random=${i}`,
      images: [
        `https://picsum.photos/800/600?random=${i}`,
        `https://picsum.photos/800/600?random=${i + 100}`,
        `https://picsum.photos/800/600?random=${i + 200}`
      ],
      content: `${team}이 정말 친절하게 도와주셨어요. 이사가 생각보다 편했어요. 노블스토리지를 쓰고 나서야 '제대로 보관된다는 게 이런 거구나' 싶었어요. 포장부터 운반, 보관까지 모든 과정이 완벽했습니다.`
    })
  }
  
  return reviews
}

// 더미 데이터 반환
const getDummyData = (endpoint, options = {}) => {
  console.warn('개발 환경에서 더미 데이터를 사용합니다.');
  
  const allReviews = generateDummyData()
  
  // 리뷰 목록 조회 - 더미 데이터 반환
  if (endpoint.includes('/api/reviews') && !endpoint.includes('/api/reviews/')) {
    const url = new URL(`${BASE_URL}${endpoint}`)
    const page = parseInt(url.searchParams.get('page')) || 1
    const limit = parseInt(url.searchParams.get('limit')) || 6
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const reviews = allReviews.slice(startIndex, endIndex)
    
    return {
      success: true,
      data: {
        reviews: reviews,
        pagination: {
          current_page: page,
          total_pages: Math.ceil(allReviews.length / limit),
          total_items: allReviews.length,
          items_per_page: limit
        }
      }
    }
  }
  
  // 특정 리뷰 조회 - 더미 데이터 반환
  if (endpoint.includes('/api/reviews/') && !endpoint.includes('/edit')) {
    const url = new URL(`${BASE_URL}${endpoint}`)
    const id = parseInt(url.pathname.split('/').pop())
    const review = allReviews.find(r => r.id === id)
    
    if (review) {
      return {
        success: true,
        data: review
      }
    }
  }
  
  // 로그인 (더미 성공)
  if (endpoint.includes('/api/auth/login')) {
    return {
      success: true,
      message: '로그인 성공',
      data: {
        token: 'dummy-token-for-development',
        user: {
          id: 1,
          username: 'tony',
          role: 'admin'
        }
      }
    }
  }
  
  // 로그아웃 (더미 성공)
  if (endpoint.includes('/api/auth/logout')) {
    return {
      success: true,
      message: '로그아웃 성공'
    }
  }
  
  // 토큰 검증 (더미 성공)
  if (endpoint.includes('/api/auth/verify')) {
    return {
      success: true,
      data: {
        user: {
          id: 1,
          username: 'tony',
          role: 'admin'
        }
      }
    }
  }
  
  // FormData를 사용하는 요청에 대한 더미 응답
  if (options.body instanceof FormData) {
    if (endpoint.includes('/api/reviews') && options.method === 'POST') {
      return { success: true, message: '리뷰가 성공적으로 생성되었습니다.', data: { review_id: 101 } };
    }
    if (endpoint.includes('/api/reviews/') && options.method === 'PUT') {
      const id = parseInt(endpoint.split('/').pop());
      return { success: true, message: '리뷰가 성공적으로 수정되었습니다.', data: { review_id: id } };
    }
  }

  return { success: false, message: `더미 데이터 핸들러가 구현되지 않은 요청: ${endpoint}` };
}

// 기본 fetch 래퍼
const apiRequest = async (endpoint, options = {}) => {
  if (USE_DUMMY_DATA) {
    return getDummyData(endpoint, options);
  }

  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();
  
  const headers = { ...options.headers };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // FormData 사용 시 Content-Type은 브라우저가 설정하도록 비워둡니다.
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      // 서버에서 에러 응답을 보냈을 때 (4xx, 5xx)
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // No-Content 응답 처리 (e.g. DELETE 성공)
    if (response.status === 204) {
      return { success: true };
    }

    return response.json();
  } catch (error) {
    // 네트워크 오류 또는 JSON 파싱 실패 등
    console.error(`API request failed for endpoint: ${endpoint}`, error);
    // 에러를 다시 throw하여 호출한 쪽에서 처리할 수 있도록 합니다.
    // message가 없는 경우를 대비해 기본 에러 메시지를 제공합니다.
    throw new Error(error.message || '네트워크 요청에 실패했습니다.');
  }
};

// 인증 API
export const authAPI = {
  // 로그인
  login: async (username, password) => {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.success) {
      setToken(response.data.token);
    }
    
    return response;
  },

  // 로그아웃
  logout: async () => {
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
    } finally {
      // API 요청 성공 여부와 관계없이 토큰을 제거합니다.
      removeToken();
    }
  },

  // 토큰 검증
  verify: async () => {
    return apiRequest('/api/auth/verify');
  },
};

// 리뷰 API
export const reviewsAPI = {
  // 리뷰 목록 조회
  getReviews: async (page = 1, limit = 6, status = 'published') => {
    const params = new URLSearchParams({ page, limit, status });
    return apiRequest(`/api/reviews?${params}`);
  },

  // 특정 리뷰 조회
  getReview: async (id) => {
    return apiRequest(`/api/reviews/${id}`);
  },

  // 리뷰 생성
  createReview: async (formData) => {
    return apiRequest('/api/reviews', {
      method: 'POST',
      body: formData,
    });
  },

  // 리뷰 수정
  updateReview: async (id, formData) => {
    return apiRequest(`/api/reviews/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },

  // 리뷰 삭제
  deleteReview: async (id) => {
    return apiRequest(`/api/reviews/${id}`, {
      method: 'DELETE',
    });
  },
};

// 이미지 API
export const imagesAPI = {
  // 이미지 업로드
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return apiRequest('/api/images/upload', {
      method: 'POST',
      body: formData,
    });
  },

  // 이미지 삭제
  deleteImage: async (filename) => {
    return apiRequest(`/api/images/${filename}`, {
      method: 'DELETE',
    });
  },

  // 리뷰 이미지 수정
  updateReviewImages: async (reviewId, formData) => {
    return apiRequest(`/api/reviews/${reviewId}/images`, {
      method: 'PUT',
      body: formData,
    });
  },
};

// 에러 처리 유틸리티
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  return {
    message: error.message || '알 수 없는 오류가 발생했습니다.',
    type: 'error'
  };
};

// 인증 상태 확인
export const isAuthenticated = () => {
  return !!getToken();
};

// 인증이 필요한 페이지에서 사용
export const requireAuth = (navigate) => {
  if (!isAuthenticated()) {
    navigate('/login');
    return false;
  }
  return true;
};
