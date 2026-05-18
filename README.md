# 사장시세 (Sajangsise)

식당 사장님이 매일 아침 30초 만에 오늘 식자재 시세를 확인하는 도구.

## 빠른 시작

```bash
npm install
cp .env.example .env   # USE_KAMIS_MOCK=true (기본)
npm run dev            # http://localhost:4321
```

## 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 정적 빌드 → `dist/` |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run typecheck` | `astro check` (TypeScript + Astro 타입 검사) |

## OG 이미지 재생성

`public/og-image.png`는 `public/og-template.html`을 1200×630로 스크린샷한 것.
디자인이 바뀌면 template HTML 수정 후 재캡처. dev 서버 띄운 상태에서:

```bash
# gstack browse 또는 임의의 headless Chromium 1200×630 캡처
~/.claude/skills/gstack/browse/dist/browse viewport 1200x630
~/.claude/skills/gstack/browse/dist/browse goto http://localhost:4321/og-template.html
~/.claude/skills/gstack/browse/dist/browse screenshot --viewport ./public/og-image.png
```

## Phase 0 (현재)

- 50개 핵심 품목 메타데이터 (`src/lib/data/items.ts`)
- 결정적 시드 기반 365일 mock 시계열 (`src/lib/data/mock.ts`)
- `USE_KAMIS_MOCK` 환경변수로 mock/real 분기 (`src/lib/data/client.ts`)
- Vercel 배포 후 KAMIS Open API 신청 검증용 라이브 사이트 운영

## Phase 1 이후

- KAMIS Open API 연동 (`src/lib/data/kamis.ts`에 API 명세 문서화됨)
- 데이터 저장: JSONL 파일 또는 SQLite (외부 매니지드 DB X)
- GH Actions 매일 18:00 KST cron → git commit → Vercel 자동 재배포
- 광고 슬롯 활성화 (`ENABLE_ADS=true` 빌드)
- 즐겨찾기, 알림, 메뉴 원가 계산기

자세한 로드맵은 `/roadmap` 페이지 또는 `CLAUDE.md` 참고.

## 배포 (수동, gh/vercel CLI 도착 전)

1. GitHub repo 생성 → `git remote add origin <url>` → `git push -u origin master`
2. Vercel 대시보드에서 import → root 그대로 → 배포
3. 도메인 연결 (Vercel → Domains)
4. 환경변수 설정: `USE_KAMIS_MOCK=true` (Phase 0), 나머지는 Phase 1 진입 시

## 데이터 출처

가격 정보는 **농산물유통정보 KAMIS** (https://www.kamis.or.kr) 에서 가공합니다.
모든 페이지 하단에 출처를 표시합니다.

## 라이선스

TBD
