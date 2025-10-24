import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { reviewsAPI, handleAPIError, isAuthenticated } from './utils/api'

export default function ReviewDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // 관리자 로그인 상태 체크
  useEffect(() => {
    setIsAdmin(isAuthenticated())
  }, [])
  
  // 리뷰 데이터 로드
  useEffect(() => {
    const loadReview = async () => {
      setLoading(true)
      setError('')
      
      try {
        const response = await reviewsAPI.getReview(id)
        
        if (response.success) {
          setReview(response.data)
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

  if (loading) {
    return (
      <div className="nh-review-detail-page">
        <div className="nh-review-detail-container">
          <div className="nh-loading">
            <p>리뷰를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="nh-review-detail-page">
        <div className="nh-review-detail-container">
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

  if (!review) {
    return (
      <div className="nh-review-detail-page">
        <div className="nh-review-detail-container">
          <h1>후기를 찾을 수 없습니다.</h1>
          <button onClick={() => navigate('/reviews')} className="nh-back-btn">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    navigate(`/reviews/${id}/edit`)
  }

  const handleDelete = async () => {
    if (window.confirm('정말로 이 후기를 삭제하시겠습니까?')) {
      try {
        const response = await reviewsAPI.deleteReview(id)
        
        if (response.success) {
          alert('후기가 삭제되었습니다.')
          navigate('/reviews')
        } else {
          alert('후기 삭제에 실패했습니다.')
        }
      } catch (error) {
        const errorInfo = handleAPIError(error)
        alert(errorInfo.message)
      }
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="nh-star">★</span>
    ))
  }

  return (
    <div className="nh-review-detail-page">
      <div className="nh-review-detail-container">
        <div className="nh-review-detail-header">
          <div className="nh-review-detail-header-content">
            <div>
              <h1 className="nh-review-detail-title">{review.title}</h1>
              <div className="nh-review-detail-meta">
                <span className="nh-review-detail-user">{review.userName}</span>
                <span className="nh-review-detail-date">{review.date}</span>
              </div>
            </div>
            {isAdmin && (
              <div className="nh-admin-actions">
                <button onClick={handleEdit} className="nh-edit-btn">
                  수정
                </button>
                <button onClick={handleDelete} className="nh-delete-btn">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="nh-review-detail-content">
          <div className="nh-review-detail-images">
            {review.images.map((image, index) => (
              <div key={index} className="nh-review-detail-image" onClick={() => setSelectedImage(image)}>
                <img src={image} alt={`${review.team} 후기 이미지 ${index + 1}`} />
              </div>
            ))}
          </div>
          
          <div className="nh-review-detail-info">
            <div className="nh-review-detail-meta-info">
              <div className="nh-review-detail-location">
                <h3>이사 경로</h3>
                <p>{review.fromLocation} {review.fromDate} → {review.toLocation} {review.toDate}</p>
              </div>
              
              <div className="nh-review-detail-rating">
                <h3>평점</h3>
                <div className="nh-review-detail-stars">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
            
            <div className="nh-review-detail-text">
              <h3>이사 후기</h3>
              <p>{review.content}</p>
            </div>
          </div>
        </div>

        <div className="nh-review-detail-footer">
          <button onClick={() => navigate('/reviews')} className="nh-back-btn">
            목록으로 돌아가기
          </button>
        </div>
      </div>
      
      {/* 이미지 모달 */}
      {selectedImage && (
        <div className="nh-image-modal" onClick={() => setSelectedImage(null)}>
          <div className="nh-image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="nh-image-modal-close" onClick={() => setSelectedImage(null)}>
              ×
            </button>
            <img src={selectedImage} alt="확대된 후기 이미지" />
          </div>
        </div>
      )}

      <footer className="nh-footer" aria-label="푸터">
        <div className="nh-section-container">
          <div className="nh-footer-top">
            <div className="nh-footer-logo-area">
              <img src="/logo.png" alt="노블스토리지 로고" className="nh-footer-logo" />
              <span className="nh-footer-phone">1600-5877</span>
            </div>
            <div className="nh-footer-details">
              <p>상호 : 노블로지스 주식회사 │ 대표 : 정우재 │ 사업자 등록번호 : 794-87-03063</p>
              <p>대표전화 : 1600-5877 │ FAX : 02-6008-2257</p>
              <p>이메일 : noblestorage@naver.com │ 개인정보관리책임자 : 정우재</p>
            </div>
          </div>
          <div className="nh-footer-bottom">
            <span>Terms & Conditions</span>
            <span>Copyright © 2025 노블로지스 [Noble Logis] All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
