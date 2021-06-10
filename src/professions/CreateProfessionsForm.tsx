import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router";


interface IProps {
      initId: number;
      name: string;
      initProfession?: string | null;
      mutationFn: (variables: {profession: Profession; id?: string }) => Promise<any>;
      }




function CreateProfessionsForm({
      initId,
      initName,
      initProfession,
      mutationFn,
}: IProps) {
      const [id, setId] = useState("");
      const [name, setName] = useState("");
      const [profession, setProfession] = useState("");

      useEffect(() => {
            setName(initName!);
            setId(initId!);
            setProfession(initProfession!);
          }, [initName, initId, initProfession]);
        
          const { mutate, isLoading, error, isSuccess } = useMutation(mutationFn);

  const { id } = useParams<{ id: string }>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const Professions = {
        name,
        id,
        profession,
        
      };
      mutate({ profession, id });
    };

  if (isLoading) return <p>Sending User...</p>;
  if (error) return <p>An error has occurred</p>;
  if (isSuccess) return <p>User successfuly added</p>;

return (
      <div>
            <h3 className="mb-6">Create Profession</h3>
            <div className="border border-black mb-2">
            <form onSubmit={handleSubmit}>
            <div className="form-example">
            <label htmlFor="Name"> Enter your first name: </label>                 
            <input
              type="text"
              name="Name"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
          </form>
        </div>
      </div>
);
}

export default CreateProfessionsForm;