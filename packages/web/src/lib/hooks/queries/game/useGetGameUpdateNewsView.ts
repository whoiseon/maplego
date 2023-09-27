import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameUpdateNewsView } from '@/lib/api/game';

export function useGetGameUpdateNewsView(id: number, target?: string) {
  return useQuery({
    queryKey: queryKey.GET_GAME_UPDATE_NEWS_VIEW(id, target),
    queryFn: () => fetchGetGameUpdateNewsView(id, target),
    refetchOnWindowFocus: false,
  });
}
