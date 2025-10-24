// API 클라이언트 유틸리티 함수들

const BASE_URL = 'http://localhost:8000';
const USE_DUMMY_DATA = false; // 백엔드 CORS 설정 완료 시 false로 설정

// 토큰 관리
export const getToken = () => localStorage.getItem('auth_token');
export const setToken = (token) => localStorage.setItem('auth_token', token);
export const removeToken = () => localStorage.removeItem('auth_token');

// 개발 환경용 더미 데이터
const generateDummyData = () => {
  const reviews = []
  const teams = ['27팀', '33팀', '24팀', '23팀', '32팀', '13팀', '15팀', '18팀', '21팀', '25팀']
  const names = ['박**님', '김**님', '조**님', '이**님', '최**님', '정**님', '강**님', '윤**님', '서**님', '한**님']
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
    { from: '경기 안양시', to: '서울 동작구' }
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
    '완벽한 서비스였어요'
  ]

  for (let i = 0; i < 50; i++) {
    const team = teams[i % teams.length]
    const name = names[i % names.length]
    const location = locations[i % locations.length]
    const title = titles[i % titles.length]
    
    reviews.push({
      id: i + 1,
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

// CORS 오류 감지 및 더미 데이터 반환
const handleCORSError = (endpoint) => {
  console.warn('CORS 오류로 인해 더미 데이터를 사용합니다. 백엔드 서버에 CORS 설정을 추가해주세요.');
  
  const allReviews = generateDummyData()
  
  // 리뷰 목록 조회
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
  
  // 특정 리뷰 조회
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
  
  return { success: false, message: 'CORS 오류' }
}

// 기본 fetch 래퍼
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // CORS 오류인 경우에만 더미 데이터 반환 (백엔드 CORS 설정 완료 시 제거 가능)
    if (USE_DUMMY_DATA && (error.message.includes('CORS') || error.message.includes('Failed to fetch'))) {
      console.warn('CORS 오류로 인해 더미 데이터를 사용합니다.');
      return handleCORSError(endpoint);
    }
    throw error;
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
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // 리뷰 수정
  updateReview: async (id, formData) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
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
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${BASE_URL}/api/images/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // 이미지 삭제
  deleteImage: async (filename) => {
    return apiRequest(`/api/images/${filename}`, {
      method: 'DELETE',
    });
  },

  // 리뷰 이미지 수정
  updateReviewImages: async (reviewId, formData) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/reviews/${reviewId}/images`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
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
