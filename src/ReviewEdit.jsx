import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// 더미 데이터 생성 (ReviewDetail.jsx와 동일)
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
      fromLocation: location.from,
      toLocation: location.to,
      fromDate: `10.${19 - Math.floor(i / 10)}`,
      toDate: `11.${2 + Math.floor(i / 10)}`,
      rating: 5,
      image: `https://picsum.photos/800/600?random=${i}`,
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

export default function ReviewEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    team: '',
    title: '',
    userName: '',
    fromLocation: '',
    toLocation: '',
    fromDate: '',
    toDate: '',
    rating: 5,
    content: '',
    images: [null, null, null] // Stores File objects
  })
  const [existingImages, setExistingImages] = useState([])

  // 관리자 로그인 상태 체크
  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn')
    if (!adminLoggedIn) {
      navigate('/login')
      return
    }
    setIsAdmin(true)
  }, [navigate])

  // 기존 리뷰 데이터 로드
  useEffect(() => {
    const allReviews = generateDummyData()
    const review = allReviews.find(r => r.id === parseInt(id))
    
    if (review) {
      setFormData({
        team: review.team,
        title: review.title,
        userName: review.userName,
        fromLocation: review.fromLocation,
        toLocation: review.toLocation,
        fromDate: review.fromDate,
        toDate: review.toDate,
        rating: review.rating,
        content: review.content,
        images: [null, null, null]
      })
      setExistingImages(review.images)
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.map((img, i) => i === index ? file : img)
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 실제로는 API 호출로 수정 처리
    console.log('수정된 데이터:', formData)
    alert('후기가 성공적으로 수정되었습니다!')
    navigate(`/reviews/${id}`)
  }

  const handleCancel = () => {
    navigate(`/reviews/${id}`)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn')
    navigate('/login')
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="nh-admin-page">
      <div className="nh-admin-container">
        <div className="nh-admin-header">
          <div className="nh-admin-header-content">
            <div>
              <h1 className="nh-admin-title">후기 수정</h1>
              <p className="nh-admin-subtitle">이사&보관후기를 수정해주세요</p>
            </div>
            <button onClick={handleLogout} className="nh-logout-btn">
              로그아웃
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="nh-admin-form">
          <div className="nh-admin-form-grid">
            <div className="nh-admin-form-group">
              <label htmlFor="team">팀명</label>
              <input
                type="text"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="nh-admin-form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="nh-admin-form-group">
              <label htmlFor="userName">작성자명</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="nh-admin-form-group">
              <label htmlFor="fromLocation">출발지</label>
              <input
                type="text"
                id="fromLocation"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="nh-admin-form-group">
              <label htmlFor="toLocation">도착지</label>
              <input
                type="text"
                id="toLocation"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="nh-admin-form-group">
              <label htmlFor="fromDate">출발일</label>
              <input
                type="text"
                id="fromDate"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="nh-admin-form-group">
              <label htmlFor="toDate">도착일</label>
              <input
                type="text"
                id="toDate"
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="nh-admin-form-group">
              <label htmlFor="rating">평점</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
              >
                <option value={1}>1점</option>
                <option value={2}>2점</option>
                <option value={3}>3점</option>
                <option value={4}>4점</option>
                <option value={5}>5점</option>
              </select>
            </div>
          </div>

          <div className="nh-admin-form-group nh-admin-form-group-full">
            <label>기존 이미지</label>
            <div className="nh-existing-images">
              {existingImages.map((image, index) => (
                <div key={index} className="nh-existing-image">
                  <img src={image} alt={`기존 이미지 ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="nh-admin-form-group nh-admin-form-group-full">
            <label>새 이미지 업로드 (3개)</label>
            {formData.images.map((image, index) => (
              <div key={index} className="nh-admin-file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(index, e)}
                  className="nh-admin-file-input"
                  id={`image-${index}`}
                />
                <label htmlFor={`image-${index}`} className="nh-admin-file-label">
                  {image ? image.name : `새 이미지 ${index + 1} 선택`}
                </label>
                {image && (
                  <div className="nh-admin-image-preview">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`미리보기 ${index + 1}`}
                      className="nh-admin-preview-img"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="nh-admin-form-group nh-admin-form-group-full">
            <label htmlFor="content">후기 내용</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              required
            />
          </div>

          <div className="nh-admin-form-actions">
            <button type="button" onClick={handleCancel} className="nh-admin-btn nh-admin-btn-cancel">
              취소
            </button>
            <button type="submit" className="nh-admin-btn nh-admin-btn-submit">
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
