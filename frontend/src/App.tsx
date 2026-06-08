import { QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/Navigation";
import { appQueryClient } from "@/config/app-query-client";

function App() {
  return (
    <QueryClientProvider client={appQueryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}

export default App;