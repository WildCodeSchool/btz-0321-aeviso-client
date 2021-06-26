interface Company {
  id: string;
  name: string;
  city: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  role?: 'USER' | 'ADMIN' | 'SUPERADMIN';
  email: string;
  password?: string;
  weeklyBasis?: 'h35' | 'h39';
  jobId: string;
  companyId?: string;
}

interface IOneUser {
  totalHours: string[];
  weeklyBasis: string;
  firstName: string;
  lastName: string;
  projectId: string;
  userId: string;
  job: string;
  start: Date;
  end: Date;
}

interface Job {
  id: string;
  label: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  code: string;
  taxation: string;
}

interface IRecord {
  id: string;
  userId: string;
  projectId: string;
  companyId: string;
  date: string;
  timeslot: 'MORNING' | 'AFTERNOON';
  comment: string;
}

interface IExportRecordQuery {
  companyId: string;
  projectId: string;
  start: string;
  end: string;
}

interface SelectItem {
  value: string;
  text: string;
}

interface IResultUser {
  id: string;
  firstName: string;
  lastName: string;
  weeklyBasis: 'h35' | 'h39';
  jobId: string;
}

interface INavbar {
  handleClose: () => void;
  Home: string;
  Rapport: string;
  Réglages: string;
  NouveauRapport: string;
}
