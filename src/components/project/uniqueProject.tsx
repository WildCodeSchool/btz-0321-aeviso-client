import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { project } from "../../API/requests";
import { useForm } from "react-hook-form";

interface Params {
  id: string;
}

function UniqueProject() {
  const { register, handleSubmit } = useForm<Project>();
  const { id } = useParams<Params>();
  const history = useHistory();

  const {
    isLoading: projectLoading,
    error: projectError,
    data,
  } = useQuery<Project>(["project", id], () => project.getOne(id));

  const {
    isLoading: mutationLoading,
    error: mutationError,
    mutateAsync,
  } = useMutation(() => project.delete(id), {
    onSuccess: () => history.push("/projects"),
  });

  const {
    isLoading: updateLoading,
    error: updateError,
    mutate,
  } = useMutation(project.put, { onSuccess: () => history.push("/projects") });

  const loading = projectLoading || mutationLoading || updateLoading;
  const error = projectError || mutationError || updateError;
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <div className="flex font-roboto mx-10 my-10">
      <div className="w-4/12">
        <h1 className="text-3xl font-medium">{data!.name}</h1>
        <p className="mt-2">{data!.description}</p>
        <button
          className="w-40 mt-5 border border-black px-5 "
          onClick={() => mutateAsync()}
        >
          Delete
        </button>
      </div>
      <div className="w-6/12 ml-28">
        <h1 className="font-bold">Update this Project</h1>
        <form
          onSubmit={handleSubmit((data) => mutate({ data, id }))}
          className="flex flex-col"
        >
          <label className="mt-5" htmlFor="">
            Name
          </label>
          <input
            className="p-2 mt-2 border border-black"
            {...register("name")}
            type="text"
          />
          <label className="mt-5" htmlFor="">
            Description
          </label>
          <textarea
            className="h-28 p-2 mt-2 border border-black"
            {...register("description")}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

export default UniqueProject;
