import type { Item, ItemPriceSeries, PricePoint } from './items';

/**
 * KAMIS Open API — 일별 품목별 도·소매가격정보
 *
 * 엔드포인트:
 *   GET http://www.kamis.or.kr/service/price/xml.do?action=periodProductList
 *
 * 요청 파라미터:
 *   p_cert_key           인증 Key (env.KAMIS_API_KEY)
 *   p_cert_id            요청자 id (env.KAMIS_API_ID)
 *   p_returntype         json | xml — 우리는 json 사용
 *   p_startday           YYYY-MM-DD
 *   p_endday             YYYY-MM-DD
 *   p_productclscode     01:소매 / 02:도매 (default 02)
 *   p_itemcategorycode   부류코드 (e.g. 200 = 채소류)
 *   p_itemcode           품목코드 (e.g. 212)
 *   p_kindcode           품종코드 (e.g. 00)
 *   p_productrankcode    등급코드 (e.g. 04)
 *   p_countrycode        지역코드 (default 전체)
 *                          도매: 1101서울 2100부산 2200대구 2401광주 2501대전
 *                          소매: 위 5개 + 더 많은 시
 *   p_convert_kg_yn      Y/N — kg단위 환산 여부 (default N, 정보조사 단위)
 *
 * 응답 필드:
 *   itemname, kindname, countyname, marketname, yyyy, regday, price
 *
 * 에러 코드:
 *   000 Success / 001 no data / 200 wrong params / 900 unauth
 *
 * 제약:
 *   - 당일로부터 1년치만. 그 이상은 KAMIS에 별도 문의.
 *   - rate limit 명시 안 됐지만 CLAUDE.md 정책 = 초당 5회 미만.
 *   - 50개 품목 × 도매/소매 × 1년 = 약 36,500 호출 → 일별 cron으로 누적.
 *
 * 부류/품목/품종/등급 코드표:
 *   첨부 엑셀 다운로드 (브라우저 세션 필요).
 *   Phase 1 진입 시 코드표 파싱 → `src/lib/data/kamis-codes.ts` 매핑 생성.
 *
 * Phase 0에서는 client.ts가 mock.ts로 분기하므로 이 모듈은 호출되지 않는다.
 */

export const KAMIS_ENDPOINT = 'http://www.kamis.or.kr/service/price/xml.do';

export async function getAllItems(): Promise<Item[]> {
  throw new Error('KAMIS provider not implemented yet (Phase 1)');
}

export async function getLatestPrices(): Promise<
  Map<string, { current: PricePoint; previous: PricePoint }>
> {
  throw new Error('KAMIS provider not implemented yet (Phase 1)');
}

export async function getItemSeries(_code: string): Promise<ItemPriceSeries | null> {
  throw new Error('KAMIS provider not implemented yet (Phase 1)');
}
