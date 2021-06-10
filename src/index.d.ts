interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  profession: string | null;
}

interface Professions {
  id?: number;
  name: string;
  profession: string | null;
}
