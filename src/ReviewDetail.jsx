import { useParams, useNavigate } from 'react-router-dom'

// 더미 데이터 생성 (Reviews.jsx와 동일)
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

export default function ReviewDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const allReviews = generateDummyData()
  const review = allReviews.find(r => r.id === parseInt(id))

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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="nh-star">★</span>
    ))
  }

  return (
    <div className="nh-review-detail-page">
      <div className="nh-review-detail-container">
        <div className="nh-review-detail-header">
          <h1 className="nh-review-detail-title">{review.title}</h1>
          <div className="nh-review-detail-meta">
            <span className="nh-review-detail-user">{review.userName}</span>
            <span className="nh-review-detail-date">{review.date}</span>
          </div>
        </div>

        <div className="nh-review-detail-content">
          <div className="nh-review-detail-images">
            {review.images.map((image, index) => (
              <div key={index} className="nh-review-detail-image">
                <img src={image} alt={`${review.team} 후기 이미지 ${index + 1}`} />
              </div>
            ))}
          </div>
          
          <div className="nh-review-detail-info">
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
    </div>
  )
}
