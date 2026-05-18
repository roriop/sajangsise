# Design System — 사장시세

> 식당 사장님이 매일 아침 30초 만에 오늘 식자재 시세를 확인하는 도구.
> 디자인은 그 흐름을 도와야 한다. 방해하면 fail.

## 정체성 (Aesthetic Intent)

**"새벽 6시 주방에서, 정육점이 출력해 준 시세표를 한 손으로 펼쳐보는 느낌."**

- 데이터가 주인공. 장식은 죄.
- 브랜드보다 정보 우선 — 사장님은 "사장시세"라는 이름을 인지하기보다 "오늘 배추 얼마지?" 만 알면 된다.
- 인쇄물의 차분함을 디지털로 옮긴 느낌. 그라데이션·블롭·이모지 제거.
- 한국 자영업자가 한국어로 자연스럽게 읽을 수 있는 톤.

## 분류

**APP UI** (data-dense, task-focused utility).
랜딩 페이지 룰 아님 — hero, CTA, brand-first hierarchy 적용 X.

## 색 (Palette)

| 토큰 | 값 | 의미 | 사용처 |
|---|---|---|---|
| `green-700` | `#15803d` | 브랜드 | 헤더 워드마크 "사장" 부분 |
| `green-600` | `#16a34a` | **하락 (사장님 입장 = +)** | ▼ 가격 인디케이터, 차트 라인 (소매가) |
| `red-600` | `#dc2626` | **상승 (사장님 입장 = -)** | ▲ 가격 인디케이터 |
| `green-50` / `green-800` / `green-100` | — | 카테고리 칩 (채소·과일 톤) | 품목상세 카테고리 라벨 |
| `amber-50/200/800/900` | — | 경고/주의 | Phase 0 mock 디스클레이머 박스 |
| `neutral-50` | `#fafafa` | 배경 | body |
| `neutral-100/200` | — | 보더 / 호버 | 카드 보더, 호버 배경 |
| `neutral-400/500/600` | — | 보조 텍스트 | 단위, 날짜, 푸터 |
| `neutral-700/900` | `#171717` | 본문 | 품목명, 본문 |

**의미적 색 규칙 (절대 어기지 마):**
- **빨강 = 가격 상승 = 자영업자에게 부정.** 한국 주식 컨벤션의 반대. 의도된 것.
- **초록 = 가격 하락 = 자영업자에게 긍정.**
- 보라/인디고 그라데이션 금지. 색깔 동그라미 안에 아이콘 금지.

## 폰트 (Typography)

```
font-family:
  "Pretendard Variable", Pretendard,
  -apple-system, BlinkMacSystemFont, system-ui,
  Roboto, "Helvetica Neue", "Segoe UI",
  "Apple SD Gothic Neo", "Noto Sans KR",
  sans-serif;
```

웹폰트 다운로드 없음. Pretendard가 설치된 디바이스면 그것 사용, 아니면 시스템 한국어 폰트 폴백.

### 타입 스케일

| 토큰 | 크기 | weight | 사용처 |
|---|---|---|---|
| **page H1** | `text-2xl` 24px → `sm:text-3xl` 30px | 700 | 페이지 앵커 (홈, 품목명) |
| **value primary** | `text-3xl` 30px → `sm:text-4xl` 36px | 700 tabular-nums | 품목 상세의 큰 가격 |
| H2 | `text-lg` 18px | 700 | 페이지 내 섹션 (about, roadmap) |
| body | `text-base` 16px | 400 | 본문 |
| value secondary | `text-lg` 18px → `sm:text-xl` 20px | 700 tabular-nums | 카드 그리드의 가격 |
| label | `text-sm` 14px | 400 | 보조 텍스트, 카드 단위 |
| meta | `text-xs` 12px | 400 | 푸터, 디스클레이머, 차트 라벨 |
| micro | `text-[11px]` 11px | 400 | KAMIS 보조 라벨 |

### 규칙
- **숫자는 항상 `tabular-nums`.** 가격 비교가 일감.
- 본문 ≥ 16px (모바일 줌 회피).
- H1은 페이지마다 1개. H3+ 잘 안 씀.
- 한국어에서 letterspacing 금지.
- 인용부호는 "곡선" (`""` 'curly') — placeholder/lorem ipsum 금지.

## 간격 (Spacing)

Tailwind 기본 4px 스케일. 임의값 (`px-[13px]` 같은 거) 금지.
주로 쓰는 값: `1` (4), `2` (8), `3` (12), `4` (16), `6` (24), `8` (32), `12` (48).

## 둥글기 (Radius)

**계층 있음. 다 같은 거품 같은 거 금지.**

| 토큰 | 사용 |
|---|---|
| `rounded-md` (6px) | 알림 박스, aside |
| `rounded-lg` (8px) | 카드, 차트 컨테이너 |
| `rounded-full` | 칩, 카테고리 버튼 |
| `rounded` (4px) | 작은 토글 버튼 (소매가/도매가) |

## 레이아웃 (Layout)

### 컨테이너 폭
- **홈 (`/`)**: `max-w-screen-xl` (1280px) — 그리드가 데스크탑에서 6열까지 확장
- **나머지 (`/about`, `/roadmap`, `/item/[code]`)**: `max-w-screen-md` (768px) — 본문 measure 65자 안쪽
- **헤더/푸터**: `max-w-screen-xl` (모든 페이지 동일, 정렬 일관성)

### 그리드 (홈)
```
grid-cols-2          # 모바일 (<640px)
sm:grid-cols-3       # ≥640
md:grid-cols-4       # ≥768
lg:grid-cols-5       # ≥1024
xl:grid-cols-6       # ≥1280
gap-2                # 8px
```

50개 카드 / 6열 = 8.33행 — 데스크탑 한 화면에 거의 다 보임. 모바일은 2열 × 25행, 첫 화면에서 5-6행.

### Safe areas
- 모바일 viewport-fit=cover, env(safe-area-inset-*) 필요시 적용.
- 헤더 sticky top-0, h-14 (56px).

## 인터랙션 (Touch targets)

**모든 primary tap target ≥ 44×44px.**

CSS 패턴: `inline-flex items-center min-h-11 px-N` — Tailwind h-11 = 44px.

| 컴포넌트 | 최소 크기 |
|---|---|
| 헤더 nav 링크 | 44×44 |
| 카테고리 필터 칩 | 44×44 |
| 가격 카드 (PriceCard) | 178×86 (모바일) — 충분 |
| 차트 토글 (소매/도매) | 44×44 |
| 품목상세 뒤로가기 | 44×44 |
| 푸터 보조 링크 | 14×14 OK (의도적으로 작음) |

## 모션 (Motion)

**기본은 모션 없음.** 색 변화 (`transition-colors`) 만 허용.

- 페이지 진입 애니메이션 X.
- 카드 hover transition: 색만, 150ms.
- 차트 진입 애니메이션 X (`isAnimationActive={false}`) — 빠른 렌더 우선.
- `prefers-reduced-motion` 자동 존중 (transitions만 쓰니까).

## 컴포넌트 인벤토리

| 컴포넌트 | 책임 | island | 위치 |
|---|---|---|---|
| `Layout.astro` | 헤더, 푸터, og 태그, 폰트 import | — | `src/layouts/` |
| `PriceCard.tsx` | 그리드 셀 1개 (품목명 + 가격 + 변동률) | SSR-only | `src/components/` |
| `PriceChart.tsx` | Recharts 365일 라인 차트 + 소매/도매 토글 | `client:only="react"` | `src/components/` |
| `ChangeIndicator.tsx` | ▲▼ + % 배지 | SSR-only | `src/components/` |
| `CategoryFilter.tsx` | 카테고리 칩 (data-category 토글) | `client:load` | `src/components/` |
| `AdSlot.astro` | 광고 슬롯 placeholder | — | `src/components/` |

## 차트 (PriceChart)

- 라인 차트 only. 막대/영역 추후 검토.
- 365일, 일별 포인트.
- 색: 소매가 = `green-600`, 도매가 = `sky-500` (`#0ea5e9`).
- X축: **모바일 격월 (60일 interval, "MM월")**, **데스크탑 매월 (29일 interval, "MM/DD")**.
- Y축: `tabular-nums`로 가격, 천 단위 콤마 (`toLocaleString('ko-KR')`).
- 그리드: 가로선만, dashed `#e5e7eb`.
- 진입 애니메이션 X.

## 광고 슬롯

3곳, `<AdSlot />` 컴포넌트로 예약됨. Phase 0 = `display:none`.

| 슬롯 ID | 위치 | 표준 사이즈 |
|---|---|---|
| `home-grid-mid` | 홈 그리드 12번째 카드 직후 | 모바일 320×100 / 데스크탑 300×250 |
| `home-grid-bottom` | 홈 그리드 끝, 디스클레이머 직전 | 320×100 또는 728×90 |
| `item-after-chart` | 품목상세 차트 직후 | 320×100 또는 728×90 |

About/Roadmap = 광고 금지 (prose + 저트래픽).

**금지된 광고 패턴:**
- Sticky bottom banner
- 인터스티셜 (모달)
- 카드 그리드 셀 자체를 광고로 (사용자가 가격 카드와 헷갈림)
- 자동 재생 비디오 광고

## 보이스 / 카피

- **공식체.** "확인하세요", "기다립니다", "사용하세요" — 평어 아님.
- 한국어 자영업자 톤. 외래어 최소화.
- 가격 단위는 "원", 무게는 "kg", 개수는 "개·포기·모·마리·속" — KAMIS 단위 따름.
- 에러 메시지: 발생한 일 + 다음 행동 명시.
- placeholder/Lorem ipsum 금지.

## AI 슬롭 차단 리스트

이 사이트는 다음 패턴이 **하나도 없어야** 한다:
1. 보라/인디고 그라데이션 배경
2. 3-column 피쳐 그리드 (아이콘+제목+2줄 설명)
3. 색깔 동그라미 안의 아이콘
4. 텍스트 중앙정렬 강박
5. 모든 요소에 같은 큰 거품 라디우스
6. 장식적 블롭/SVG divider
7. 이모지를 디자인 요소로
8. 카드에 컬러 좌측 보더
9. "Welcome to ... / Unlock the power of ..." 클리셰
10. 쿠키커터 섹션 리듬 (hero → 3 features → testimonials → pricing → CTA)

## 변경 절차

DESIGN.md 변경 시:
1. PR에 변경 의도 명시 (어떤 정체성 결정이 바뀌었는지)
2. 영향 받는 컴포넌트/페이지 명시
3. /design-review 재실행해서 회귀 없는지 확인

## 베이스라인 (2026-05-18)

- Design Score: **A−**
- AI Slop Score: **A**
- Touch target compliance: primary 100%
- 차트 모바일 가독성: 검증됨
- 사용자가 "정육점 시세표 같다" 인식: 의도된 결과 ✓
