/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly USE_KAMIS_MOCK?: string;
  readonly KAMIS_API_KEY?: string;
  readonly KAMIS_API_ID?: string;
  readonly ENABLE_ADS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
