interface Company {
  id: number;
  name: string;
  city: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
}

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

interface Records {
  id: number;
  user_id: number;
  project_id: number;
  step_id: number;
  time_slot: string;
}
