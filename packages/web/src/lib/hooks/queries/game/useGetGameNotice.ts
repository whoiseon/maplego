import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameNotice, fetchGetGameUpdateNews } from '@/lib/api/game';

export function useGetGameNotice(target?: string, page?: number) {
  return useQuery({
    queryKey: queryKey.GET_GAME_NOTICE(target, page),
    queryFn: () => fetchGetGameNotice(target, page === 1 ? undefined : page),
    refetchOnWindowFocus: false,
  });
}
