import useSWRV, { mutate } from "swrv";
import { IKey, IConfig } from "swrv/dist/types";
import { getCurrentInstance, Ref, inject } from "vue";
import Api from "../service/api";

export function updateCache(key: string, data: any) {
  mutate(key, data);
}

export default function useRequest<Data = unknown>(
  key: IKey,
  config: IConfig = {}
) {
  const $api = inject<Api>("$api");

  return useSWRV(key, (url) => $api?.get<Data>(url), {
    dedupingInterval: 120000, // two minutes
    shouldRetryOnError: false,
    ...config,
  });
}
