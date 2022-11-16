import useSWR from "swr";
import { API_LAUREATES, API_TEAMS_ENDPOINT } from "../config";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useTeamData() {
  const { data, error } = useSWR(API_LAUREATES, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

