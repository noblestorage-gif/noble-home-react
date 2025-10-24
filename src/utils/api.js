// API 클라이언트 유틸리티 함수들

const BASE_URL = 'http://localhost:8000';

// 토큰 관리
export const getToken = () => localStorage.getItem('auth_token');
export const setToken = (token) => localStorage.setItem('auth_token', token);
export const removeToken = () => localStorage.removeItem('auth_token');

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

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
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
