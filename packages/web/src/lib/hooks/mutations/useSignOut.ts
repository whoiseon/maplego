import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSignOut } from '@/lib/api/auth';
import { queryKey } from '@/lib/query/queryKey';

export function useSignOut() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: fetchSignOut,
    onSuccess: async () => {
      await queryClient.setQueryData(queryKey.IS_SIGNED_IN, false);
      await queryClient.setQueryData(queryKey.GET_ME, null);

      window.location.href = '/';
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  return [mutate, isLoading] as [typeof mutate, typeof isLoading];
}
