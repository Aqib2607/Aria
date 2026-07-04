import { useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Skeleton } from "../components/ui/Skeleton";

// Lazy load landing page components for optimal bundle size
const Navbar = lazy(() => import("../components/landing/Navbar.tsx"));
const Hero = lazy(() => import("../components/landing/Hero.tsx"));
const SocialProof = lazy(() => import("../components/landing/SocialProof.tsx"));
const Features = lazy(() => import("../components/landing/Features.tsx"));
const HowItWorks = lazy(() => import("../components/landing/HowItWorks.tsx"));
const Footer = lazy(() => import("../components/landing/Footer.tsx"));

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null; // Avoid flicker before redirect

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Suspense fallback={<div className="h-16 w-full border-b border-border bg-background/80" />}>
        <Navbar />
      </Suspense>
      
      <main>
        <Suspense fallback={
          <div className="flex h-[80vh] items-center justify-center">
            <Skeleton className="h-64 w-3/4 max-w-4xl rounded-3xl" />
          </div>
        }>
          <Hero />
          <SocialProof />
          <Features />
          <HowItWorks />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-64 w-full bg-sidebar" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
