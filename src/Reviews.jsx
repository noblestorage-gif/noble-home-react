import { useState } from 'react'

// 더미 데이터 생성
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
      image: `https://picsum.photos/400/200?random=${i}` // 랜덤 이미지 사용
    })
  }
  
  return reviews
}

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const allReviews = generateDummyData()
  const totalPages = Math.ceil(allReviews.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReviews = allReviews.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="nh-star">★</span>
    ))
  }

  return (
    <div className="nh-reviews-page">
      <div className="nh-reviews-container">
        <h1 className="nh-reviews-title">이사&보관후기</h1>
        
        <div className="nh-reviews-grid">
          {currentReviews.map((review) => (
            <div key={review.id} className="nh-review-card">
              <div className="nh-review-image">
                <img src={review.image} alt={`${review.team} 후기 이미지`} />
              </div>
              <div className="nh-review-content">
                <h3 className="nh-review-title">{review.title}</h3>
                <div className="nh-review-meta">
                  <span className="nh-review-user">{review.userName}</span>
                  <span className="nh-review-date">{review.date}</span>
                </div>
                <div className="nh-review-location">
                  {review.fromLocation} {review.fromDate} → {review.toLocation} {review.toDate}
                </div>
                <div className="nh-review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="nh-pagination-info">
          Showing {startIndex + 1} to {Math.min(endIndex, allReviews.length)} of {allReviews.length} entries
        </div>
        
        <div className="nh-pagination">
          <div className="nh-pagination-controls">
            <button 
              className="nh-pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            
            {Array.from({ length: Math.min(10, totalPages) }, (_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  className={`nh-pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            })}
            
            <button 
              className="nh-pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
