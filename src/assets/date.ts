import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function today(): string {
  return format(new Date(), 'EEEE d MMMM y', {
    locale: fr,
  });
}
