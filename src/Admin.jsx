import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const navigate = useNavigate()
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
    images: ['', '', '']
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 실제로는 여기서 API 호출을 통해 데이터를 저장
    console.log('새 후기 데이터:', formData)
    
    // 성공 메시지 표시 후 목록으로 이동
    alert('후기가 성공적으로 등록되었습니다!')
    navigate('/reviews')
  }

  const handleCancel = () => {
    navigate('/reviews')
  }

  return (
    <div className="nh-admin-page">
      <div className="nh-admin-container">
        <div className="nh-admin-header">
          <h1 className="nh-admin-title">새 후기 작성</h1>
          <p className="nh-admin-subtitle">이사&보관후기를 작성해주세요</p>
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
                placeholder="예: 27팀"
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
                placeholder="예: 박**님"
                required
              />
            </div>

            <div className="nh-admin-form-group nh-admin-form-group-full">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="예: 27팀 1차 후기입니다~"
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
                placeholder="예: 경기 군포시"
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
                placeholder="예: 서울 노원구"
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
                placeholder="예: 10.19"
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
                placeholder="예: 11.02"
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

            <div className="nh-admin-form-group nh-admin-form-group-full">
              <label>이미지 URL (3개)</label>
              {formData.images.map((image, index) => (
                <input
                  key={index}
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`이미지 ${index + 1} URL`}
                  className="nh-admin-image-input"
                />
              ))}
            </div>

            <div className="nh-admin-form-group nh-admin-form-group-full">
              <label htmlFor="content">이사 후기 내용</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="이사 후기를 자세히 작성해주세요..."
                rows={6}
                required
              />
            </div>
          </div>

          <div className="nh-admin-form-actions">
            <button type="button" onClick={handleCancel} className="nh-admin-btn nh-admin-btn-cancel">
              취소
            </button>
            <button type="submit" className="nh-admin-btn nh-admin-btn-submit">
              후기 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
