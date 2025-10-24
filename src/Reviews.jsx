import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { reviewsAPI, handleAPIError } from './utils/api'

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(1)
  const [reviews, setReviews] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const itemsPerPage = 6

  // API에서 리뷰 데이터 로드
  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true)
      setError('')
      
      try {
        const response = await reviewsAPI.getReviews(currentPage, itemsPerPage)
        
        if (response.success) {
          setReviews(response.data.reviews)
          setPagination(response.data.pagination)
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

    loadReviews()
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="nh-star">★</span>
    ))
  }

  if (loading) {
    return (
      <div className="nh-reviews-page">
        <div className="nh-reviews-container">
          <div className="nh-loading">
            <p>리뷰를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="nh-reviews-page">
        <div className="nh-reviews-container">
          <div className="nh-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>다시 시도</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="nh-reviews-page">
      <div className="nh-reviews-container">
        <div className="nh-reviews-header">
          <h1 className="nh-reviews-title">이사&보관후기</h1>
          <p className="nh-reviews-subtitle">고객님들의 생생한 후기를 확인해보세요</p>
        </div>

        <div className="nh-pagination-info">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.total_items || 0)} of {pagination.total_items || 0} entries
        </div>

        <div className="nh-reviews-grid">
          {reviews.map((review) => (
            <Link key={review.id} to={`/reviews/${review.id}`} className="nh-review-card">
              <div className="nh-review-image">
                <img src={review.image || `https://picsum.photos/400/200?random=${review.id}`} alt={review.title} />
              </div>
              <div className="nh-review-content">
                <h3 className="nh-review-title">{review.title}</h3>
                <div className="nh-review-meta">
                  <span className="nh-review-user">{review.userName}</span>
                  <span className="nh-review-date">{review.date}</span>
                </div>
                <div className="nh-review-location">
                  <span>{review.from_location} → {review.to_location}</span>
                </div>
                <div className="nh-review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="nh-pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="nh-pagination-btn"
          >
            이전
          </button>
          
          {Array.from({ length: pagination.total_pages || 1 }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`nh-pagination-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === (pagination.total_pages || 1)}
            className="nh-pagination-btn"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}