import React, { useState } from 'react';
import ProjectList from './projectListe';
import UniqueProject from './uniqueProject';

function Projects() {
  const [isProject, setIsProject] = useState<boolean>(true);
  return <div>{isProject ? <ProjectList setIsProject={setIsProject} /> : <UniqueProject />}</div>;
}

export default Projects;
