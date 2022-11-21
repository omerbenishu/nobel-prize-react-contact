import useSWR from "swr";
import { API_LAUREATES } from "../config";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useLaureatesData() {
  const { data, error } = useSWR(API_LAUREATES, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

