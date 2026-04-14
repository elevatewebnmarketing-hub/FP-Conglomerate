import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop";
import { SiteContentProvider } from "@/content/SiteContentContext";
import Index from "./pages/Index.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import BusinessUnitsPage from "./pages/BusinessUnitsPage.tsx";
import BusinessUnitDetailPage from "./pages/BusinessUnitDetailPage.tsx";
import BusinessUnitSubPage from "./pages/BusinessUnitSubPage.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import CareersPage from "./pages/CareersPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

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
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/business-units" element={<BusinessUnitsPage />} />
              <Route path="/business-units/:unitId" element={<BusinessUnitDetailPage />} />
              <Route path="/business-units/:unitId/:subPageSlug" element={<BusinessUnitSubPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SiteContentProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
