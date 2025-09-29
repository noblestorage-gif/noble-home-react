import clsx from 'clsx'
import { useState } from 'react'

export default function Home() {
  return (
    <>
      <section className="nh-hero" aria-label="Hero">
        <video id="desktop-video" autoPlay loop muted playsInline preload="auto">
          <source src="/desk_hero_mov.mp4" type="video/mp4" />
        </video>
        <video id="mobile-video" autoPlay loop muted playsInline preload="auto">
          <source src="/mobile_hero_mov.mp4" type="video/mp4" />
        </video>
        <div className="nh-hero-content">
        </div>
      </section>

      <section id="valuable-feature" className="nh-section" aria-labelledby="valuable-feature-title">
        <div className="nh-section-container">
          <h2 id="valuable-feature-title">왜 수많은 사람들이<br />노블스토리지를 선택할까요?</h2>
          <div className="nh-grid">
            <article className="nh-card">
              <div className="nh-icon-wrapper">
                <img src="/pic_01.png" alt="전용공간 아이콘" />
              </div>
              <h3>전용공간 개별 분리 수납</h3>
              <p>고객님의 짐은 입고 즉시 물품별로 철저히 분류해 전용 공간에 보관합니다.<br />처음 맡기신 그대로 안전하게 돌려받으실 수 있습니다.</p>
            </article>
            <article className="nh-card">
              <div className="nh-icon-wrapper">
                <img src="/pic_02.png" alt="항온항습 아이콘" />
              </div>
              <h3>완벽한 항온·항습·방충 관리</h3>
              <p>24시간 IoT 시스템을 통한 항온·항습 케어로 보관 물품의 컨디션을 그대로<br />유지할 수 있습니다.</p>
            </article>
            <article className="nh-card">
              <div className="nh-icon-wrapper">
                <img src="/pic_03.png" alt="보안 아이콘" />
              </div>
              <h3>내 집보다 안전한 짐 보관</h3>
              <p>실외·실내 24시간 완벽 보안 시스템 운영으로 안심하고 맡길 수 있습니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="patents" className="nh-section" aria-label="사업 지표">
        <div className="nh-section-container">
          <div className="nh-stats">
            <div className="nh-stat">
              <img src="/pic_10.png" alt="특허 아이콘" />
              <strong>특허 19개, 상표 6개 보유</strong>
              <span>기술 기반의 물류 혁신, 단단한 사업 구조</span>
            </div>
            <div className="nh-stat">
              <img src="/pic_20.png" alt="성장률 아이콘" />
              <strong>연간 매출 성장률 100%</strong>
              <span>빠르게 성장 중인 보관 서비스 업계의 강자</span>
            </div>
            <div className="nh-stat">
              <img src="/pic_30.png" alt="수도권 아이콘" />
              <strong>수도권 30분, 직영창고 10개소</strong>
              <span>강남역 기준 20km내 실내 보관 인프라</span>
            </div>
            <div className="nh-stat">
              <img src="/pic_40.png" alt="비대면 아이콘" />
              <strong>국내 최초 100% 비대면 시스템</strong>
              <span>계약부터 입출고까지 전 과정 언택트 완료</span>
            </div>
            <div className="nh-stat">
              <img src="/pic_50.png" alt="항온항습 아이콘" />
              <strong>항온·항습 + 외부 오염 차단</strong>
              <span>최적의 실내 보관 환경으로 짐 상태 그대로 유지</span>
            </div>
          </div>
        </div>
      </section>

      <section className="nh-section" id="partners" aria-labelledby="partners-title">
        <div className="nh-section-container">
          <h2 id="partners-title">노블스토리지와 함께 하고 있는 파트너사</h2>
          <div className="nh-logos-container">
            <div className="nh-logos">
              {/* First Set */}
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_01.png" alt="Partner Logo 1" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_02.png" alt="Partner Logo 2" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_03.png" alt="Partner Logo 3" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_04.png" alt="Partner Logo 4" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_05.png" alt="Partner Logo 5" /></div>
              {/* Duplicate for seamless animation */}
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_01.png" alt="Partner Logo 1" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_02.png" alt="Partner Logo 2" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_03.png" alt="Partner Logo 3" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_04.png" alt="Partner Logo 4" /></div>
              <div className="nh-logo-box"><img className="nh-logo-img" src="/partner_05.png" alt="Partner Logo 5" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="nh-section" id="testimonials" aria-labelledby="testimonials-title">
        <div className="nh-section-container">
          <h2 id="testimonials-title">노블스토리지 이용 고객님들의 생생한 후기</h2>
          <div className="nh-testimonials-layout">
            <div className="nh-review-image">
              <img src="/pic_review.jpg" alt="고객 후기 이미지" />
            </div>
            <div className="nh-reviews">
              <article className="nh-testimonial-card nh-testimonial-featured">
                <p>"컨테이너에 맡겼을 땐 늘 후회했어요. 곰팡이 냄새, 먼지, 눅눅함…그게 당연한 줄 알았죠.
노블로지스를 쓰고 나서야 '제대로 보관된다는 게 이런 거구나' 싶었어요."</p>
                <footer>김○현 고객님, 해외 주재원</footer>
                <a
                  href="https://www.youtube.com/channel/UCI_K6vBkygL4cpOYQMdi6YQ"
                  className="nh-review-link"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://www.youtube.com/channel/UCI_K6vBkygL4cpOYQMdi6YQ', 'reviewPopup', 'width=800,height=600');
                  }}
                >
                  후기 보러가기
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            </div>
          </div>
          <div className="nh-grid-small">
        <a href="https://www.youtube.com/channel/UCI_K6vBkygL4cpOYQMdi6YQ" target="_blank" rel="noopener noreferrer" className="nh-testimonial-card-link">
          <article className="nh-testimonial-card">
            <img src="/star_review.svg" alt="별점 5점" className="nh-star-rating" />
            <p>“이사를 하면서 인테리어를 하느라 한 달 정도 보관하게 되었어요. 짐이 문제없이 깔끔하게 들어가는 것을 원했고 컨테이너가 아닌 곳에 보관하고 싶었어요. 이용하면서 소통이 잘 되는 부분도 마음에 들었습니다."</p>
            <footer>[마포구 ㅇ 고객님]</footer>
            <span className="nh-review-category">가정보관이사</span>
          </article>
        </a>
        <a href="https://www.youtube.com/channel/UCI_K6vBkygL4cpOYQMdi6YQ" target="_blank" rel="noopener noreferrer" className="nh-testimonial-card-link">
          <article className="nh-testimonial-card">
            <img src="/star_review.svg" alt="별점 5점" className="nh-star-rating" />
            <p>“1년 동안 해외에 가야 하는 상황이라 해충이나 방역이 중요했어요. 세스코도 되고 세콤까지 다 지원이 된다고 해서 선택하게 되었습니다. 고가 가구가 많은데 가구 컨디션에 있어서 안심되는 부분이 제일 만족스럽네요.”</p>
            <footer>[강남구 ㅂ 고객님]</footer>
            <span className="nh-review-category">해외거주 보관이사</span>
          </article>
        </a>
        <a href="https://www.youtube.com/channel/UCI_K6vBkygL4cpOYQMdi6YQ" target="_blank" rel="noopener noreferrer" className="nh-testimonial-card-link">
          <article className="nh-testimonial-card">
            <img src="/star_review.svg" alt="별점 5점" className="nh-star-rating" />
            <p>“5년 주기 리뉴얼 때마다 창고 찾는 게 제일 스트레스였어요. 이번엔 달랐죠. 가구, 장비, 소품까지 다 제자리에. 먼지도 하나 없이.”</p>
            <footer>윤가람 팀장, 점포운영지원팀</footer>
            <span className="nh-review-category">F&B 프랜차이즈</span>
          </article>
        </a>
          </div>
        </div>
      </section>

      <section className="nh-section" id="why-us" aria-labelledby="why-us-title">
        <div className="nh-section-container">
          <div className="nh-why-us-layout">
            <div className="nh-why-us-left">
              <h2 id="why-us-title">“수천 건의 경험, 하나의 기준.<br />우리가 선택받는 이유입니다.”</h2>
              <p>물류/보관 서비스의 기준을 만드는 브랜드, 노블스토리지</p>
              <div className="nh-why-us-tags">
                <span className="nh-why-us-tag">Robust Security</span>
                <span className="nh-why-us-tag">Customizable</span>
                <span className="nh-why-us-tag">Accessibility</span>
                <span className="nh-why-us-tag">Automated Efficiency</span>
                <span className="nh-why-us-tag">Centralized Data</span>
              </div>
            </div>
            <div className="nh-why-us-right">
              <div className="nh-why-us-item">
                <h3>📦 짐 보관? 사진만 찍으세요.</h3>
                <p>- 계약부터 입고까지 비대면 처리 - 사진/동영상 전송 기반 물품 관리</p>
              </div>
              <div className="nh-why-us-item">
                <h3>🚚 포장·보관·출고까지 원스톱</h3>
                <p>- 수도권 전역 30분 이내 운송 - 실시간 입출고 현황 확인 가능</p>
              </div>
              <div className="nh-why-us-item">
                <h3>💡 원하는 기간만</h3>
                <p>- 단기부터 장기보관까지 유연한 요금제</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nh-section" id="why-noble" aria-labelledby="why-noble-title">
        <div className="nh-section-container">
          <h2 id="why-noble-title">왜 노블스토리지 여야 할까요?</h2>
          <p className="nh-section-subtitle">“올인원 서비스로 고객 부담 ZERO, 프리미엄 보관 서비스”</p>
          <div className="nh-features-grid">
            <div className="nh-feature-card">
              <img src="/pic_60.svg" alt="국내 최대 규모" />
              <h3>국내 최대 규모 - 수도권 실내 스토리지 10개</h3>
              <p>수도권 어디서든 30분 거리</p>
            </div>
            <div className="nh-feature-card">
              <img src="/pic_70.svg" alt="항온 항습" />
              <h3>항온· 항습 및 외부 오염인자 차단</h3>
              <p>예민한 물품도 OK 프리미엄급 컨디션 유지</p>
            </div>
            <div className="nh-feature-card">
              <img src="/pic_80.svg" alt="비대면 시스템" />
              <h3>국내최초 100% 비대면 시스템</h3>
              <p>상담-견적-계약-입출고까지 전 과정 자동화</p>
            </div>
            <div className="nh-feature-card">
              <img src="/pic_90.svg" alt="IoT 스마트 관리" />
              <h3>IoT 스마트 관리 시스템</h3>
              <p>24시간 물품 상태 모니터링 & 원격 관리 기능</p>
            </div>
            <div className="nh-feature-card">
              <img src="/pic_100.svg" alt="토탈 서비스" />
              <h3>포장+운반+입주청소+정리수납</h3>
              <p>출고부터 입고까지 전 과정 토탈 서비스 (필요 시 옵션 선택 가능)</p>
            </div>
            <div className="nh-feature-card">
              <img src="/pic_110.svg" alt="B2B 관리" />
              <h3>물류 컨설팅 및 B2B 관리 시스템</h3>
              <p>정기계약, SaaS, 맞춤형 자동화</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nh-section nh-solution-section" id="tech-solution" aria-labelledby="tech-solution-title">
        <div className="nh-section-container nh-solution-layout">
          <div className="nh-solution-description">
            <h2 id="tech-solution-title">프리미엄 보관을 넘어, 고도화된<br />물류 솔루션으로</h2>
            <p>공간·적재 · 효율에 대한<br />노블스토리지만의 기술적 집요함으로<br />단순 서비스에서 고부가가치 B2B 모델로<br />확장 중입니다.</p>
          </div>
          <div className="nh-solution-cards">
            <div className="nh-solution-card">
              <div className="nh-solution-icon">🧩</div>
              <div>
                <h3>퍼즐 알고리즘 기반 자동적재공간 효율 시스템</h3>
                <p>건물형 창고와 최적화된 퍼즐 알고리즘으로 공간 활용 및 적재 효율 극대화</p>
              </div>
            </div>
            <div className="nh-solution-card">
              <div className="nh-solution-icon">🤖</div>
              <div>
                <h3>케이지 기반 비지게차 방식 - 무인 운영관리 시스템</h3>
                <p>지게차 동선 제거로 공간 효율성 증대 및 안정성 향상 (일부창고 적용)</p>
              </div>
            </div>
            <div className="nh-solution-card">
              <div className="nh-solution-icon">🌡️</div>
              <div>
                <h3>IOT 및 센서 기반 스마트 관리 시스템</h3>
                <p>온도와 제습 등 물류 창고 내 환경 컨디션을 모니터링하고 자동 컨트롤하는 클라우드 기반 시스템</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nh-section" id="one-stop-solution" aria-labelledby="oss-title">
        <div className="nh-section-container">
          <h2 id="oss-title">One Stop Solution</h2>
          <p className="nh-section-subtitle">
            노블스토리지는 비대면 계약, 사진전송, 동영상 저장 시스템으로<br />
            프리미엄 물품 생애주기 관리가 가능한<br />
            국내 최고의 고객 맞춤 서비스를 제공합니다.
          </p>
          <div className="nh-steps">
            <div className="nh-step">
              <img src="/step1.svg" alt="포장/운반 아이콘" />
              <h4>Step 1 · 포장/운반</h4>
              <p>최적화된 안전 포장 및 운반</p>
            </div>
            <div className="nh-step">
              <img src="/step2.svg" alt="항온·항습 보관 아이콘" />
              <h4>Step 2 · 항온·항습 보관</h4>
              <p>최적 온습도 프리미엄 보관</p>
            </div>
            <div className="nh-step">
              <img src="/step3.svg" alt="물류 운반 아이콘" />
              <h4>Step 3 · 물류 운반</h4>
              <p>전문 배송팀의 안전 운반</p>
            </div>
            <div className="nh-step">
              <img src="/step4.svg" alt="정리/수납 아이콘" />
              <h4>Done 🎉 · 정리/수납</h4>
              <p>맞춤형 정리 서비스</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nh-section" id="faq" aria-labelledby="faq-title">
        <div className="nh-section-container">
          <h2 id="faq-title">이용 전, 가장 궁금해하시는 것들</h2>
          <details className="nh-faq"><summary>Q. 짐 보관 중에도 꺼낼 수 있나요?</summary><p>→ 네, 입고 시 미리 출고 품목을 지정 하여 예약 후 유료 출고 가능합니다</p></details>
          <details className="nh-faq"><summary>Q. 냉장고 음식물도 그대로 보관 가능한가요?</summary><p>네, 전원 연결 상태로 내부 음식물까지 안전하게 보관됩니다.</p></details>
          <details className="nh-faq"><summary>Q. 보관 기간은 최소 며칠부터 가능한가요?</summary><p>→ 하루부터 가능합니다. 6개월 이상은 장기 보관 할인도 적용됩니다.</p></details>
          <details className="nh-faq"><summary>Q. 보관 중 짐 상태는 어떻게 확인할 수 있나요?</summary><p>→ 보관 전·후 사진은  전송해드립니다. 언제든 안심하세요.</p></details>
        </div>
      </section>

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
    </>
  )
}


