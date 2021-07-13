import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { companies, project } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import DisplayUser from './DisplayUser';

interface IProps {
  projectId: string;
}

function UsersInProject({ projectId }: IProps): JSX.Element {
  const [usersAlreadyAffected, setUsersAlreadyAffected] = useState<string[]>([]);
  const [companyUsers, setCompanyUsers] = useState<string[]>([]);

  const { user: userStore } = useUserFromStore();

  const { refetch: refetchProjectUsers } = useQuery(['projectUsers', projectId], () => project.getUsers(projectId), {
    onSuccess: (data) => setUsersAlreadyAffected(data.map((user) => user.id)),
  });

  const { refetch: refetchCompanyUsers } = useQuery(
    ['companyUsers', userStore.companyId],
    () => companies.getUsers(userStore.companyId as string),
    {
      onSuccess: (data) => setCompanyUsers(data.map((user) => user.id)),
    }
  );

  const { mutate: addUserInProject } = useMutation(project.addUser, {
    onSuccess: () => {
      refetchCompanyUsers();
      refetchProjectUsers();
    },
  });

  const { mutate: removeUser } = useMutation(project.removeUser, {
    onSuccess: () => {
      refetchCompanyUsers();
      refetchProjectUsers();
    },
  });

  return (
    <div>
      <h3>Collaborateurs affectés au projet :</h3>
      <div>
        {usersAlreadyAffected.map((id) => (
          <div key={id}>
            <DisplayUser key={id} id={id} />
            <button onClick={() => removeUser({ projectId, userId: id })}>Supprimer</button>
          </div>
        ))}
      </div>
      <h3>Ajouter des collaborateurs :</h3>
      <div>
        {companyUsers
          .filter((id) => !usersAlreadyAffected.includes(id))
          .map((id) => (
            <div key={id}>
              <DisplayUser id={id} />
              <button onClick={() => addUserInProject({ projectId, userId: id })}>Ajouter</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UsersInProject;
