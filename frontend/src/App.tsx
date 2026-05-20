import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./components/AppLayout";
import FeedPage from "./pages/FeedPage";
import PulsePage from "./pages/PulsePage";
import EventsPage from "./pages/EventsPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import MarketplacePage from "./pages/MarketplacePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<FeedPage />} />
          <Route path="pulse" element={<PulsePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
