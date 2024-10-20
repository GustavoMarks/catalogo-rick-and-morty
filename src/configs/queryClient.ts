import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 30 * 1, // 30 seconds
			refetchOnWindowFocus: false,
		},
	},
});

export default queryClient;
