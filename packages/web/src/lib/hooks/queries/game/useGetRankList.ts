import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import {
  fetchGetGameNotice,
  fetchGetGameRank,
  fetchGetGameUpdateNews,
} from '@/lib/api/game';

export function useGetRankList(target?: string, page?: number, world?: number) {
  return useQuery({
    queryKey: queryKey.GET_GAME_RANK(target, page, world),
    queryFn: () => fetchGetGameRank(target, page, world),
    refetchOnWindowFocus: false,
  });
}
