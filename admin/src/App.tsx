import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop";
import { SiteContentProvider } from "@/content/SiteContentContext";
import { getStaffToken } from "@/lib/elevateApi";
import AdminPage from "./pages/AdminPage.tsx";
import StaffLoginPage from "./pages/StaffLoginPage.tsx";
import LeadsPage from "./pages/LeadsPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import CmsBlogPage from "./pages/cms/CmsBlogPage.tsx";
import CmsHiringPage from "./pages/cms/CmsHiringPage.tsx";
import CmsPortfolioPage from "./pages/cms/CmsPortfolioPage.tsx";

const queryClient = new QueryClient();

const publicSiteFallback =
  import.meta.env.VITE_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "http://localhost:8080";

function AdminHome() {
  return <Navigate to={getStaffToken() ? "/leads" : "/login"} replace />;
}

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/login" element={<StaffLoginPage />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/cms/blog" element={<CmsBlogPage />} />
              <Route path="/cms/hiring" element={<CmsHiringPage />} />
              <Route path="/cms/portfolio" element={<CmsPortfolioPage />} />
              <Route path="/content" element={<AdminPage publicSiteFallback={publicSiteFallback} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SiteContentProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
