import React from 'react';

function CreateUpdateProjects(): JSX.Element {
  // const {
  //   isLoading: postLoading,
  //   error: postError,
  //   mutate,
  // } = useMutation(project.create, {
  //   onSuccess: (data: Project) => {
  //     setListProject((project) => [...project, data]);
  //   },
  // });

  //   const {
  //     isLoading: updateLoading,
  //     error: updateError,
  //     mutate,
  //   } = useMutation(project.update, { onSuccess: () => history.push('/projects') });
  return (
    <div>
      {/* <div className="w-6/12">
        <h1 className=" text-2xl font-bold">Post a new project</h1>
        <form onSubmit={handleSubmit((data) => mutate({ data }))} className="flex flex-col">
          <label className="mt-5" htmlFor="name">
            Name
          </label>
          <input className="p-2 mt-2 border border-black" {...register('name')} type="text" />
          <label className="mt-5" htmlFor="description">
            Description
          </label>
          <textarea className="h-28 p-2 mt-2 border border-black" {...register('description')}></textarea>
          <input className="mt-5 py-1 border border-black" type="submit" />
        </form>
      </div> */}
    </div>
  );
}

export default CreateUpdateProjects;
