import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function today(): string {
  return format(new Date(), 'EEEE d MMMM y', {
    locale: fr,
  });
}

export const getLocaleDate = (date: Date): Date => {
  const newDate = new Date(date);
  const timeZone = newDate.getTimezoneOffset();
  if (Math.sign(timeZone) === -1) return new Date(newDate.setMinutes(newDate.getMinutes() + Math.abs(timeZone)));
  return new Date(newDate.setMinutes(newDate.getMinutes() - timeZone));
};
