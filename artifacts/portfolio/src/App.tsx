import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import NaseehaPage from "@/pages/naseeha";
import AnalyticsPage from "@/pages/analytics";
import { usePageTracker } from "@/hooks/usePageTracker";

const queryClient = new QueryClient();

function TrackedRouter() {
  usePageTracker();
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lecture-intelligence" component={NaseehaPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <TrackedRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
