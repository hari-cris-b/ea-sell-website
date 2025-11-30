import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TradingApp from './pages/trading/TradingApp';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TradingApp />
    </QueryClientProvider>
  );
}

export default App;