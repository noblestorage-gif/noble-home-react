import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  const handleNav = (e, hash) => {
    e.preventDefault()
    
    // 현재 페이지가 Home 페이지가 아닌 경우 Home으로 이동
    if (location.pathname !== '/') {
      navigate('/' + hash)
      setOpenMenu(null)
      return
    }
    
    // Home 페이지인 경우 앵커 스크롤 처리
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', hash)
      setOpenMenu(null)
    }
  }

  //  무료 견적 상담 클릭 핸들러
  const handleKakaoClick = (e) => {
    e.preventDefault()

    // 🔹 [1] 네이버 전환 스크립트 실행
    if (window.wcs) {
      if (!window.wcs_add) window.wcs_add = {}
      window.wcs_add['wa'] = 's_684a551d3c5'
      const _conv = { type: 'lead' }
      window.wcs.trans(_conv)
      console.log('NAVER 전환(lead) 이벤트 전송됨 ')
    }

    // 🔹 [2] 카카오 상담창 오픈
    window.open('https://pf.kakao.com/_JqrNxj/chat', 'kakaoChat', 'width=800,height=600')
  }

  // 메뉴 버튼 클릭 핸들러
  const handleMenuClick = (e, hash) => {
    e.preventDefault()
    
    // 현재 페이지가 Home 페이지가 아닌 경우 Home으로 이동
    if (location.pathname !== '/') {
      navigate('/' + hash)
      setOpenMenu(null)
      return
    }
    
    // Home 페이지인 경우 앵커 스크롤 처리
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', hash)
      setOpenMenu(null)
    }
  }

  return (
    <header className="nh-header" ref={headerRef}>
      <div className="nh-container">
        <a href="/" className="nh-logo" aria-label="홈">
          <img src="/logo.png" alt="노블스토리지 로고" style={{ height: '32px', display: 'block' }} />
        </a>
        <nav className="nh-nav" aria-label="주요 메뉴">
          <ul className="nh-menu">
            <li className="nh-menu-item">
              <a className="nh-link" href="#patents" onClick={(e) => handleNav(e, '#patents')}>Features</a>
            </li>
            <li
              className="nh-menu-item"
              onMouseEnter={() => setOpenMenu('personal')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                className="nh-menu-button"
                aria-haspopup="true"
                aria-expanded={openMenu === 'personal'}
                onClick={(e) => {
                  handleMenuClick(e, '#one-stop-solution')
                }}
              >
                개인고객
              </button>
              {openMenu === 'personal' && (
                <div className="nh-submenu">
                  <a href="#one-stop-solution" onClick={(e) => handleNav(e, '#one-stop-solution')}>이사</a>
                  <a href="#valuable-feature" onClick={(e) => handleNav(e, '#valuable-feature')}>실내 창고 보관</a>
                  <a href="#one-stop-solution" onClick={(e) => handleNav(e, '#one-stop-solution')}>청소 및 기타 서비스</a>
                </div>
              )}
            </li>
            <li
              className="nh-menu-item"
              onMouseEnter={() => setOpenMenu('enterprise')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                className="nh-menu-button"
                aria-haspopup="true"
                aria-expanded={openMenu === 'enterprise'}
                onClick={(e) => {
                  handleMenuClick(e, '#tech-solution')
                }}
              >
                기업고객
              </button>
              {openMenu === 'enterprise' && (
                <div className="nh-submenu">
                  <a href="#tech-solution" onClick={(e) => handleNav(e, '#tech-solution')}>인테리어 & 프랜차이즈</a>
                  <a href="#partners" onClick={(e) => handleNav(e, '#partners')}>협력 업체</a>
                </div>
              )}
            </li>
            <li className="nh-menu-item">
              <Link className="nh-link" to="/reviews">이사&보관후기</Link>
            </li>
          </ul>
        </nav>
        <div className="nh-cta-wrap">
          <Link to="/admin" className="nh-admin-icon" title="관리자 페이지">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <a
            className="nh-cta"
            href="https://pf.kakao.com/_JqrNxj/chat"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleKakaoClick} //  수정된 부분
          >
            무료 견적 상담
          </a>
        </div>
      </div>
    </header>
  )
}
