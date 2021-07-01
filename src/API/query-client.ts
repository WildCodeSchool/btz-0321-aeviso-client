import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.VITE_ENV === 'development' ? false : true,
    },
  },
});

export default queryClient;
