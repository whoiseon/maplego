import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameUpdateNews } from '@/lib/api/game';

export function useGetGameUpdateNews(target?: string, page?: number) {
  return useQuery({
    queryKey: queryKey.GET_GAME_UPDATE_NEWS(target, page),
    queryFn: () =>
      fetchGetGameUpdateNews(target, page === 1 ? undefined : page),
    refetchOnWindowFocus: false,
  });
}
