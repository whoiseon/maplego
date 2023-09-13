import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../query/queryKey';
import { fetchGetMe } from '../api/me';

export function useGetMyAccount() {
  return useQuery({
    queryKey: queryKey.GET_ME,
    queryFn: fetchGetMe,
    refetchOnWindowFocus: true,
    retry: false,
  });
}
