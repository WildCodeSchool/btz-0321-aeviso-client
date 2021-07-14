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
    <div className="users-container flex flex-col w-full justify-around">
      <div className="flex flex-col w-full py-5 dark:bg-component shadow-mainShadow bg-white rounded-xl p-5 mt-5 sm:mt-0 sm:mr-5">
        <h3 className="text-3xl font-bold">Collaborateurs affectés au projet</h3>
        <div>
          {usersAlreadyAffected.map((id) => (
            <div key={id} className="flex justify-between items-center mt-4">
              <DisplayUser key={id} id={id} />
              <button
                className="bg-customRed shadow-buttonShadow rounded-lg w-4/12 ml-2 text-white h-8"
                onClick={() => removeUser({ projectId, userId: id })}
              >
                Supprimer
              </button>
            </div>
          ))}
          {usersAlreadyAffected.length === 0 && (
            <p className="mt-5 text-4xl font-bold text-mainBg text-opacity-70">
              {"Aucun Collaborateurs n'est affecter à ce projet"}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full h-full  dark:bg-component shadow-mainShadow bg-white rounded-xl mt-5 overscroll-y-auto">
        <h3 className="text-3xl p-5 rounded-t-lg font-bold bg-white shadow-buttonShadow dark:shadow-inputShadow dark:bg-component sticky top-0">
          Ajouter des collaborateurs
        </h3>
        <div className="mx-4">
          {companyUsers
            .filter((id) => !usersAlreadyAffected.includes(id))
            .map((id) => (
              <div key={id} className="flex justify-between items-center mt-4">
                <DisplayUser id={id} />
                <button
                  className="bg-customGreen shadow-buttonShadow rounded-lg w-1/4 text-white h-8"
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
