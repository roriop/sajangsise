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
- Astro 4 + React (island 패턴)
- TypeScript strict
- Tailwind CSS
- Recharts
- Prisma + Supabase Postgres
- Vercel 배포

## 데이터 소스
- 1차: KAMIS Open-API (가격) — API 키 신청 중, 도착 전 mock 사용
- 2차: 한국소비자원 참가격 (가공식품) — Phase 3
- 출처 표시 의무: 푸터 + About 페이지 명시

## Mock / Real 스위치
- `process.env.USE_KAMIS_MOCK === 'true'` → mock
- 컴포넌트는 데이터 출처 모름. `src/lib/data/client.ts`만 분기.

## Blast Radius
- prod DB 직접 접근 X. Supabase RLS 필수.
- API 키, 비밀값은 `.env*`만. 절대 커밋 X.
- KAMIS API rate: 초당 5회 미만.
- prod 배포 전 staging 검증.

## 폴더 구조 (확정)

```
sajangsise/
├── CLAUDE.md
├── README.md
├── .env.example
├── astro.config.mjs
├── package.json
├── prisma/
│   └── schema.prisma
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── roadmap.astro
│   │   ├── item/
│   │   │   └── [code].astro
│   │   └── api/
│   │       └── prices.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── PriceCard.tsx
│   │   ├── PriceChart.tsx
│   │   ├── FavoriteList.tsx
│   │   └── ChangeIndicator.tsx
│   ├── lib/
│   │   ├── data/
│   │   │   ├── client.ts
│   │   │   ├── kamis.ts
│   │   │   ├── mock.ts
│   │   │   └── items.ts
│   │   └── db/
│   │       └── prisma.ts
│   └── styles/
│       └── global.css
└── public/
    └── og-image.png
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
- KAMIS 실제 데이터 fetch + Supabase 저장
- 매일 18:00 KST cron (Vercel Cron 또는 GitHub Actions)
- Mock → Real 전환

## Phase 2 (베타 오픈)
- 즐겨찾기 (localStorage)
- 가격 변동 알림 (이메일 또는 PWA push)
- 메뉴 원가 계산기
- 주간 요약 페이지

## 절대 금지
- 회원가입 강제
- 모달 팝업
- 무한 스크롤
- KAMIS 출처 누락
- 자영업자 30초 흐름 외 기능을 메인에 노출

## 비용 목표
- 월 운영비 < ₩10,000
- KAMIS, Supabase 무료 티어, Vercel Hobby 안에서 운영