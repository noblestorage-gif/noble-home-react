import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)

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
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', hash)
      setOpenMenu(null)
    }
  }

  return (
    <header className="nh-header">
      <div className="nh-container">
        <a href="/" className="nh-logo" aria-label="홈">
          <img src="/logo.png" alt="노블스토리지 로고" style={{height: '32px', display: 'block'}} />
        </a>
        <nav className="nh-nav" aria-label="주요 메뉴">
          <ul className="nh-menu">
            <li className="nh-menu-item">
              <a className="nh-link" href="#patents" onClick={(e) => handleNav(e, '#patents')}>Features</a>
            </li>
            <li className="nh-menu-item" onMouseEnter={() => setOpenMenu('personal')} onMouseLeave={() => setOpenMenu(null)}>
              <button className="nh-menu-button" aria-haspopup="true" aria-expanded={openMenu === 'personal'} onClick={() => setOpenMenu(openMenu === 'personal' ? null : 'personal')}>개인고객</button>
              {openMenu === 'personal' && (
                <div className="nh-submenu">
                  <a href="#one-stop-solution" onClick={(e) => handleNav(e, '#one-stop-solution')}>이사</a>
                  <a href="#valuable-feature" onClick={(e) => handleNav(e, '#valuable-feature')}>실내 창고 보관</a>
                  <a href="#one-stop-solution" onClick={(e) => handleNav(e, '#one-stop-solution')}>청소 및 기타 서비스</a>
                </div>
              )}
            </li>
            <li className="nh-menu-item" onMouseEnter={() => setOpenMenu('enterprise')} onMouseLeave={() => setOpenMenu(null)}>
              <button className="nh-menu-button" aria-haspopup="true" aria-expanded={openMenu === 'enterprise'} onClick={() => setOpenMenu(openMenu === 'enterprise' ? null : 'enterprise')}>기업고객</button>
              {openMenu === 'enterprise' && (
                <div className="nh-submenu">
                  <a href="#tech-solution" onClick={(e) => handleNav(e, '#tech-solution')}>인테리어 & 프랜차이즈</a>
                  <a href="#partners" onClick={(e) => handleNav(e, '#partners')}>협력 업체</a>
                </div>
              )}
            </li>
            <li className="nh-menu-item">
              <a className="nh-link" href="http://www.youtube.com/@%EB%85%B8%EB%B8%94%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80">이사&보관후기</a>
            </li>
          </ul>
        </nav>
        <div className="nh-cta-wrap">
          <a
            className="nh-cta"
            href="https://pf.kakao.com/_JqrNxj/chat"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://pf.kakao.com/_JqrNxj/chat', 'kakaoChat', 'width=800,height=600');
            }}
          >
            무료 견적 상담
          </a>
        </div>
      </div>
    </header>
  )
}


