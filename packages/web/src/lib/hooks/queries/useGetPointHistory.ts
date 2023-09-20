import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../../query/queryKey';
import { fetchGetMyPointHistory } from '@/lib/api/mp';

export function useGetPointHistory(page: number, show: number) {
  return useQuery({
    queryKey: queryKey.GET_POINT_HISTORY,
    queryFn: () => fetchGetMyPointHistory(page, show),
    refetchOnWindowFocus: true,
    retry: false,
  });
}
