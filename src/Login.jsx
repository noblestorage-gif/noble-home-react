import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI, handleAPIError } from './utils/api'

export default function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
    // 입력 시 에러 메시지 초기화
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await authAPI.login(credentials.username, credentials.password)
      
      if (response.success) {
        // 로그인 성공 시 세션에도 저장 (기존 로직과 호환)
        sessionStorage.setItem('adminLoggedIn', 'true')
        navigate('/admin')
      } else {
        setError(response.message || '로그인에 실패했습니다.')
      }
    } catch (error) {
      const errorInfo = handleAPIError(error)
      setError(errorInfo.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="nh-login-page">
      <div className="nh-login-container">
        <div className="nh-login-header">
          <h1 className="nh-login-title">관리자 로그인</h1>
          <p className="nh-login-subtitle">관리자 계정으로 로그인하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="nh-login-form">
          <div className="nh-login-form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>

          <div className="nh-login-form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && (
            <div className="nh-login-error">
              {error}
            </div>
          )}

          <button type="submit" className="nh-login-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="nh-login-test-info">
          <p>테스트 계정:</p>
          <p>아이디: tony</p>
          <p>비밀번호: test0723</p>
        </div>
      </div>
    </div>
  )
}
