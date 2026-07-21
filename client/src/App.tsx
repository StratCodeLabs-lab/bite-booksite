// Bite BookSite — App.tsx
// Gece Okuyucusu teması: koyu lacivert + amber/altın

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PostsProvider } from "./contexts/PostsContext";

// Pages
import Home from "./pages/Home";
import Library from "./pages/Library";
import BookDetail from "./pages/BookDetail";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import AuthPage from "./pages/AuthPage";
import AdminPanel from "./pages/AdminPanel";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const { currentUser } = useAuth();
  
  return (
    <PostsProvider currentUserId={currentUser?.id}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/library" component={Library} />
        <Route path="/book/:id" component={BookDetail} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/feed" component={Feed} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/search" component={SearchPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </PostsProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster 
              theme="dark"
              toastOptions={{
                style: {
                  background: 'oklch(0.15 0.04 258)',
                  border: '1px solid oklch(0.75 0.18 65 / 0.2)',
                  color: 'oklch(0.93 0.02 75)',
                },
              }}
            />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
