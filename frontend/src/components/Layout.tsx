import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { TopNav } from "./layout/TopNav";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-medium)',
            borderRadius: 'var(--radius-md)',
          }
        }} 
      />
    </div>
  );
}
