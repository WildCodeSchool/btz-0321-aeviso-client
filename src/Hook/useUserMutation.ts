import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { user } from '../API/requests';

export default function useUserMutation(payload: IUserForm): User | undefined {
  const { data: userData, mutate: userMutate } = useMutation<User, AxiosError, IUserForm>('users', (data: IUser) =>
    user.create({
      user: data,
    })
  );

  userMutate(payload);

  return userData;
}
