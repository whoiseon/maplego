import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../query/queryKey';
import { fetchGetMe } from '../api/me';
import { User } from '../api/types';

export function useGetMyAccount() {
  const myAccount = useQuery({
    queryKey: queryKey.GET_ME,
    queryFn: () => fetchGetMe,
    refetchOnWindowFocus: true,
    retry: false,
  });

  return myAccount;
}
