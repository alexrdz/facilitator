import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import PrepPage from "@/pages/prep";
import HypePage from "@/pages/hype";
import ReflectionPage from "@/pages/reflection";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PrepPage} />
      <Route path="/hype" component={HypePage} />
      <Route path="/reflection" component={ReflectionPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
