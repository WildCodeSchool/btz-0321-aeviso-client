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
      <div className="flex flex-col w-full h-full dark:bg-component shadow-mainShadow bg-white rounded-xl  mt-5 sm:mt-0 sm:mr-5 overflow-y-auto">
        <h3 className="text-2xl font-bold p-5 rounded-t-lg bg-white shadow-buttonShadow dark:shadow-inputShadow dark:bg-component sm:sticky top-0">
          Collaborateurs affectés au projet
        </h3>
        <div className="mx-5 pb-5">
          {usersAlreadyAffected.map((id) => (
            <div key={id} className="flex justify-between items-center mt-4 border-b border-gray-400 pb-2">
              <DisplayUser key={id} id={id} />
              <button
                className="bg-customRed shadow-buttonShadow rounded-md w-4/12 ml-2 text-white h-8"
                onClick={() => removeUser({ projectId, userId: id })}
              >
                Supprimer
              </button>
            </div>
          ))}
          {usersAlreadyAffected.length === 0 && (
            <p className="mt-5 text-xl font-bold text-mainBg text-opacity-70">
              {"Aucun Collaborateur n'est affecté à ce projet"}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full w-full pb-5 dark:bg-component shadow-mainShadow bg-white rounded-xl mt-5 overflow-y-auto">
        <h3 className="text-2xl p-5 rounded-t-lg font-bold bg-white shadow-buttonShadow dark:shadow-inputShadow dark:bg-component sm:sticky top-0">
          Ajouter des collaborateurs
        </h3>
        <div className="mx-4 pb-5">
          {companyUsers
            .filter((id) => !usersAlreadyAffected.includes(id))
            .map((id) => (
              <div key={id} className="flex justify-between items-center mt-4  border-b border-gray-400 pb-2">
                <DisplayUser id={id} />
                <button
                  className="bg-customGreen shadow-buttonShadow rounded-md w-1/4 text-white h-8"
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
