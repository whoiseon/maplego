import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameEventView } from '@/lib/api/game';

export function useGetGameEventView(id: number) {
  return useQuery({
    queryKey: queryKey.GET_GAME_EVENT_VIEW(id),
    queryFn: () => fetchGetGameEventView(id),
    refetchOnWindowFocus: false,
  });
}
