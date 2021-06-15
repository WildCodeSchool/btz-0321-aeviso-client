interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  profession: string | null;
}

interface Job {
  id?: string;
  name: string;
  profession: string | null;
}

interface Project {
  id: number;
  name: string;
  description: string;
  code: string;
  taxation: string;
}
