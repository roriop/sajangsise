# Sajangsise — 자영업자 식자재 시세 사이트

## 정체성 (모든 결정의 기준)
식당 사장님이 매일 아침 30초 만에 오늘 식자재 시세를 확인하는 도구.
이 흐름에서 벗어나는 기능은 후순위.

## 비기능 원칙
- 모바일 우선. 데스크탑 후순위.
- 첫 화면 로드 < 1.5초.
- 모든 페이지 SSG 또는 ISR, og 태그 필수.
- 회원가입 강제 X. 즐겨찾기는 localStorage 우선.
- 로딩 스피너 2초 이상 X.

## 기술 스택
- Astro 7 + React (island 패턴)
- TypeScript strict
- Tailwind CSS
- Recharts
- 데이터 영속화: **외부 서비스 없음**. Phase 1에서 JSONL 파일 또는 SQLite 중 결정 (둘 다 git/객체 스토리지 기반, 매니지드 DB 미사용)
- Vercel 배포 (Hobby) + GitHub Actions (cron)

## 데이터 소스
- 1차: KAMIS Open-API (가격) — API 키 신청 중, 도착 전 mock 사용
- 2차: 한국소비자원 참가격 (가공식품) — Phase 3
- 출처 표시 의무: 푸터 + About 페이지 명시

## Mock / Real 스위치
- `process.env.USE_KAMIS_MOCK === 'true'` → mock
- 컴포넌트는 데이터 출처 모름. `src/lib/data/client.ts`만 분기.

## Blast Radius
- API 키, 비밀값은 `.env*`만. 절대 커밋 X.
- KAMIS API rate: 초당 5회 미만.
- prod 배포 전 staging 검증.
- 데이터 파일(JSONL/SQLite)은 GH Actions bot이 자동 커밋 — 사람이 직접 손대지 않음.

## 폴더 구조 (확정)

```
sajangsise/
├── CLAUDE.md
├── README.md
├── .env.example
├── astro.config.mjs               # Tailwind 4 = @tailwindcss/vite 플러그인 (tailwind.config 없음)
├── tsconfig.json
├── package.json
├── data/                          # Phase 1 추가 — JSONL 또는 SQLite 가격 시계열
├── src/
│   ├── env.d.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── roadmap.astro
│   │   └── item/
│   │       └── [code].astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── PriceCard.tsx
│   │   ├── PriceChart.tsx
│   │   ├── ChangeIndicator.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── AdSlot.astro
│   ├── lib/
│   │   ├── data/
│   │   │   ├── client.ts          # USE_KAMIS_MOCK 분기 진입점
│   │   │   ├── items.ts           # 50개 메타데이터
│   │   │   ├── mock.ts            # 시드 기반 결정적 시계열
│   │   │   └── kamis.ts           # Phase 1 — KAMIS Open API
│   │   └── format.ts
│   └── styles/
│       └── global.css            # @import "tailwindcss" + @theme (커스텀 색/폰트)
└── public/
    ├── favicon.svg
    └── og-image.png               # TODO
```

## 50개 품목 (Phase 0 mock 대상)
- 채소(15): 배추, 무, 양파, 대파, 마늘, 생강, 당근, 감자, 청양고추, 풋고추, 호박, 오이, 상추, 깻잎, 시금치
- 축산(9): 삼겹살, 목살, 소국거리, 소구이용, 닭(통닭), 닭다리, 계란, 우유, 오리
- 수산(8): 고등어, 갈치, 오징어, 명태, 조기, 새우, 멸치, 김
- 곡물/가공(7): 쌀, 콩, 두부, 면, 떡, 콩나물, 숙주
- 조미료(5): 고춧가루, 된장, 고추장, 간장, 식용유
- 과일(6): 사과, 배, 바나나, 토마토, 딸기, 감귤

## Phase 0 목표 (KAMIS 신청용 라이브 사이트)
1. 메인 페이지: 50개 품목 카드 그리드 (mock 데이터)
2. 품목 상세: 1년 추이 차트 (mock)
3. About 페이지: 서비스 소개 + KAMIS 출처 표시
4. Roadmap 페이지: 출시 예정 기능
5. Vercel 배포 + 도메인 연결

## Phase 1 (API 키 도착 후)
- 데이터 저장 방식 결정 (JSONL `data/prices.jsonl` vs SQLite `data/prices.db`)
- GH Actions 매일 18:00 KST cron → KAMIS fetch → 새 일자 append → git commit + push
- Vercel 자동 재빌드 → 새 데이터로 SSG
- `src/lib/data/kamis.ts` 또는 `jsonl.ts` 구현, `client.ts`에서 분기
- 광고 코드 도입: `ENABLE_ADS=true` 빌드 환경변수로 슬롯 활성화 (AdSense 또는 카카오)

## Phase 2 (베타 오픈)
- 즐겨찾기 (localStorage)
- 가격 변동 알림 (이메일 또는 PWA push)
- 메뉴 원가 계산기
- 주간 요약 페이지

## 절대 금지
- 회원가입 강제
- 모달 팝업 (인터스티셜 광고 포함)
- 무한 스크롤
- KAMIS 출처 누락
- 자영업자 30초 흐름 외 기능을 메인에 노출
- 매니지드 DB 도입 (Supabase, Turso 등) — Phase 2 이후 명확한 필요 생길 때만 재고
- 광고 도입 시 sticky bottom banner 금지 (intrusive)

## 광고 슬롯 정책
3곳에 인피드 슬롯 예약됨 (`AdSlot.astro` 컴포넌트). 30초 흐름을 깨지 않는 자리.
- `home-grid-mid` — 홈 그리드 12번째 카드 직후 (모바일 320×100, xl 300×250)
- `home-grid-bottom` — 홈 그리드 끝, 디스클레이머 직전 (320×100 또는 728×90)
- `item-after-chart` — 품목상세 차트 직후 (320×100 또는 728×90)

Phase 0: `process.env.ENABLE_ADS !== 'true'` → 슬롯 DOM에 있지만 `display:none`.
Phase 1: `ENABLE_ADS=true` 빌드 + 광고 코드 주입 → 활성화.
About/Roadmap 페이지는 광고 금지 (prose + 저트래픽).

## 디자인 시스템 (베이스라인)
- 폰트: Pretendard Variable → 시스템 폰트 폴백
- 색: green-700(브랜드), green-600(하락 = 자영업자 입장에서 +), red-600(상승 = -), neutral 계열
- 카드: rounded-lg, 모든 primary tap target ≥ 44px
- 차트: Recharts, 모바일 격월(60일 interval) / 데스크탑 매월(29일 interval) 자동 분기

## 비용 목표
- 월 운영비 ≈ ₩0 (KAMIS 무료 + Vercel Hobby + GH Actions 무료 분 + 도메인만 유료)
- 외부 매니지드 DB 없음 (Supabase, Turso 등 도입 시 재검토)