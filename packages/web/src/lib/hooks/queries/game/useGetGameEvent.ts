import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/query/queryKey';
import { fetchGetGameEvents } from '@/lib/api/game';

export function useGetGameEvent() {
  return useQuery({
    queryKey: queryKey.GET_GAME_EVENT,
    queryFn: fetchGetGameEvents,
    refetchOnWindowFocus: false,
  });
}
