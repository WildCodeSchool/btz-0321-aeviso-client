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
    <div className="users-container flex w-full justify-around mt-10">
      <div className="flex flex-col">
        <h3 className="text-2xl">Collaborateurs affectés au projet :</h3>
        <div>
          {usersAlreadyAffected.map((id) => (
            <div key={id} className="flex justify-between items-center mt-4">
              <DisplayUser key={id} id={id} />
              <button
                className="bg-customRed rounded-lg w-1/4 text-white h-8"
                onClick={() => removeUser({ projectId, userId: id })}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl">Ajouter des collaborateurs :</h3>
        <div>
          {companyUsers
            .filter((id) => !usersAlreadyAffected.includes(id))
            .map((id) => (
              <div key={id} className="flex justify-between items-center mt-4">
                <DisplayUser id={id} />
                <button
                  className="bg-customGreen rounded-lg w-1/4 text-white h-8"
                  onClick={() => addUserInProject({ projectId, userId: id })}
                >
                  Ajouter
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UsersInProject;
