import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameNoticeView } from '@/lib/api/game';

export function useGetGameNoticeView(id: number, target?: string) {
  return useQuery({
    queryKey: queryKey.GET_GAME_NOTICE_VIEW(id, target),
    queryFn: () => fetchGetGameNoticeView(id, target),
    refetchOnWindowFocus: false,
  });
}
