import { UserSelection } from '../store/stats.slice';

interface IDatas {
  company: string;
  project: string;
  start: string;
  end: string;
  records: UserSelection[];
}

export const getTotalHours = (basis: 'h35' | 'h39', number: number): number => {
  return basis === 'h35' ? number * 3.5 : number * 4;
};

export const transformWeeklyBasisToNumber = (text: 'h35' | 'h39'): number => {
  return +text.replace('h', '');
};

export const calculateTotalHours = (array: UserSelection[]): number => {
  return array.reduce((acc, curr) => {
    return acc + curr.totalHours;
  }, 0);
};

export const exportToCsv = (data: IDatas): string => {
  const { company, project, start, end, records } = data;
  const header = [
    ['sep=,\r\n,Client :', company, '\r\n'],
    ['Projet : ', project, '\r\n'],
    ['Période du', start, 'au', end, '\r\n'],
    ['', '', '', '', '\r\n'],
    ['Collaborateur', 'Base hebdomadaire', 'Demi-journées', 'Total(h)', '\r\n'],
  ];
  const parsedRecords = records.map((item) => [item.name, item.weeklyBasis, item.halfDays, item.totalHours, '\r\n']);
  const totalHours = ['', '', 'Total projet', calculateTotalHours(records)];
  const content = [...header, ...parsedRecords, ...totalHours];
  const blob = new Blob([`${content}`], {
    type: 'text/csv;charset=utf-8',
  });
  return URL.createObjectURL(blob);
};
