import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { reviewsAPI, authAPI, handleAPIError, requireAuth } from './utils/api'

export default function ReviewEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
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
    if (!requireAuth(navigate)) {
      return
    }
    setIsAdmin(true)
  }, [navigate])

  // 기존 리뷰 데이터 로드
  useEffect(() => {
    const loadReview = async () => {
      setLoading(true)
      setError('')
      
      try {
        const response = await reviewsAPI.getReview(id)
        
        if (response.success) {
          const review = response.data
          setFormData({
            team: review.team,
            title: review.title,
            userName: review.userName,
            fromLocation: review.from_location,
            toLocation: review.to_location,
            fromDate: review.from_date,
            toDate: review.to_date,
            rating: review.rating,
            content: review.content,
            images: [null, null, null]
          })
          setExistingImages(review.images || [])
        } else {
          setError('리뷰를 불러오는데 실패했습니다.')
        }
      } catch (error) {
        const errorInfo = handleAPIError(error)
        setError(errorInfo.message)
      } finally {
        setLoading(false)
      }
    }

    loadReview()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      // FormData 생성
      const submitData = new FormData()
      submitData.append('team', formData.team)
      submitData.append('title', formData.title)
      submitData.append('userName', formData.userName)
      submitData.append('fromLocation', formData.fromLocation)
      submitData.append('toLocation', formData.toLocation)
      submitData.append('fromDate', formData.fromDate)
      submitData.append('toDate', formData.toDate)
      submitData.append('rating', formData.rating.toString())
      submitData.append('content', formData.content)
      
      // 새 이미지 파일 추가
      formData.images.forEach((image, index) => {
        if (image) {
          submitData.append('images', image)
        }
      })
      
      const response = await reviewsAPI.updateReview(id, submitData)
      
      if (response.success) {
        alert('후기가 성공적으로 수정되었습니다!')
        navigate(`/reviews/${id}`)
      } else {
        alert('후기 수정에 실패했습니다.')
      }
    } catch (error) {
      const errorInfo = handleAPIError(error)
      alert(errorInfo.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate(`/reviews/${id}`)
  }

  const handleLogout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('로그아웃 에러:', error)
    } finally {
      sessionStorage.removeItem('adminLoggedIn')
      navigate('/login')
    }
  }

  if (!isAdmin) {
    return null
  }

  if (loading) {
    return (
      <div className="nh-admin-page">
        <div className="nh-admin-container">
          <div className="nh-loading">
            <p>리뷰를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="nh-admin-page">
        <div className="nh-admin-container">
          <div className="nh-error">
            <p>{error}</p>
            <button onClick={() => navigate('/reviews')} className="nh-back-btn">
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    )
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
            <button type="submit" className="nh-admin-btn nh-admin-btn-submit" disabled={submitting}>
              {submitting ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
