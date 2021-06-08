import React, { createContext, ReactNode, useContext, useState } from "react";

const userFormContext = createContext(null);

export const useUserForm = () => useContext(userFormContext);

export const UserFormProvider = ({ children }: { children: ReactNode }) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profession, setProfession] = useState<string>("");

  return (
    <userFormContext.Provider
      value={{
        firstname,
        setFirstname,
        lastname,
        setLastName,
        email,
        setEmail,
        profession,
        setProfession,
      }}
    >
      {children}
    </userFormContext.Provider>
  );
};

export default userFormContext;
