import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../../query/queryKey';
import { fetchGetMyPointHistory } from '@/lib/api/mp';
import { MaplePointHistoryParams } from '@/lib/api/mp/types';

export function useGetPointHistory({
  page,
  show,
  target,
  startDate,
  endDate,
}: MaplePointHistoryParams) {
  return useQuery({
    queryKey: queryKey.GET_POINT_HISTORY(page, target, startDate, endDate),
    queryFn: () =>
      fetchGetMyPointHistory({
        page,
        show,
        target,
        startDate,
        endDate,
      }),
    refetchOnWindowFocus: true,
    retry: false,
  });
}
