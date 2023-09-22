import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { fetchUpdateUserProfile } from '@/lib/api/user';
import { ServerMessage } from '@/components/desktop/profile/mePassword/PasswordChangeCard';
import { queryKey } from '@/lib/query/queryKey';

export function useUpdateProfile(
  setMessage: Dispatch<SetStateAction<ServerMessage>>,
) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: fetchUpdateUserProfile,
    onSuccess: async (data) => {
      await queryClient.refetchQueries(queryKey.GET_ME);

      if (data.statusCode === 200) {
        setMessage({
          type: 'success',
          message: '프로필이 성공적으로 변경되었습니다.',
        });
        return;
      }

      setMessage({
        type: 'error',
        message: data.message,
      });
    },
    onError: (error: any) => {},
  });

  return [mutate, isLoading] as [typeof mutate, typeof isLoading];
}
