import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../query/queryKey';
import { fetchGetMe } from '../api/me';
import { parseCookies } from 'nookies';

export function useGetMyAccount() {
  const queryClient = useQueryClient();
  const isSignedIn = !!queryClient.getQueryData(queryKey.IS_SIGNED_IN);

  return useQuery({
    queryKey: queryKey.GET_ME,
    queryFn: fetchGetMe,
    refetchOnWindowFocus: true,
    retry: false,
    enabled: isSignedIn,
  });
}
