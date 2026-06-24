# KAMIS 실데이터 운영 가이드 (Phase 1)

## 데이터 파이프라인 한눈에

```
KAMIS Open API (periodProductList #16/#17, 소매)
   │  scripts/collect-prices.mjs  (매일 18:00 KST, GH Actions)
   ▼
data/prices.jsonl   ── git commit/push (kamis-bot)
   │  CF Pages 자동 재빌드 (USE_KAMIS_MOCK=false)
   ▼
src/lib/data/store.ts → SSG → sajangsise.com
```

- **소매가 단독.** KAMIS 도매·소매는 단위 체계가 달라(배추 소매 1포기 vs 도매 1망) 한 카드에 못 묶음 → 소매(cls=01)만 수집·표시.
- **단위 출처**: `data/kamis-codes.json`의 `unit` (예: 삼겹살 100g, 사과 10개). store.ts가 빌드 시 품목 unit을 이 값으로 덮어씀.
- **전국 평균** (`p_countrycode` 비움 → countyname "평균").
- KAMIS 일별 미수록 12품목(가공식품·오리·제철)은 홈에서 자동 숨김 → 실데이터 38품목 노출.

## 스크립트

| 스크립트 | 용도 | 실행 |
|---|---|---|
| `scripts/resolve-codes.mjs` | 품목→KAMIS 코드 해석 → `data/kamis-codes.json` | 1회성(코드 안정적). 품목 추가 시 재실행 |
| `scripts/collect-prices.mjs` | 소매가 수집 → `data/prices.jsonl` append (멱등) | 매일 cron. 수동: `--backfill 365` / `--date YYYY-MM-DD` / `--start --end` |
| `scripts/kamis-probe.mjs` | 응답 구조 디버그 | 필요 시 |

모두 `.env`의 `KAMIS_API_KEY`/`KAMIS_API_ID` 자동 로드. 호출 ≤ 초당 4회.

## 라이브 전환 체크리스트 (mock → 실데이터)

1. **1년치 backfill** (택1):
   - 사장님 한국 PC: `node scripts/collect-prices.mjs --backfill 365` (네트워크 빠름)
   - 또는 GH Actions → "Collect KAMIS prices" → Run workflow → backfill `365`
2. `data/prices.jsonl` + `data/kamis-codes.json` 커밋·푸시 (이미 됨/자동).
3. **GitHub Secrets 등록** (repo Settings → Secrets → Actions):
   - `KAMIS_API_KEY`, `KAMIS_API_ID`
4. **Cloudflare Pages 환경변수 변경**: `USE_KAMIS_MOCK` → **`false`**
   - 빌드는 커밋된 JSONL을 읽음 → CF 빌드에 API 키 불필요.
5. main 푸시 → CF 자동 재빌드 → 실데이터 라이브.
6. 이후 매일 18:00 KST cron이 새 일자 append → 자동 재배포.

## 주의

- `.env` 절대 커밋 금지(gitignore됨). 키는 GitHub Secrets / CF 환경변수에만.
- prices.jsonl은 GH Actions bot이 관리 — 사람이 직접 편집 X.
- 매칭 보정이 필요하면 `scripts/kamis-items.mjs`의 `OVERRIDE` 수정 후 `resolve-codes.mjs` 재실행.
