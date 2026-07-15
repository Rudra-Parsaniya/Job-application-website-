import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  User, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Target
} from "lucide-react";

const DashboardLayout = ({ children, role = "jobseeker" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const jobseekerLinks = [
    { name: "Dashboard", path: "/jobseeker/dashboard", icon: LayoutDashboard },
    { name: "My Applications", path: "/jobseeker/applications", icon: FileText },
    { name: "Recommended", path: "/jobseeker/recommended", icon: Target },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const companyLinks = [
    { name: "Dashboard", path: "/company/dashboard", icon: LayoutDashboard },
    { name: "Post Job", path: "/company/post-job", icon: Briefcase },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const links = role === "jobseeker" ? jobseekerLinks : companyLinks;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white border-r border-black/5">
      <div className="p-6">
        <div className="text-xs font-bold text-primary/40 uppercase tracking-wider mb-4 px-3">
          Menu
        </div>
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => isMobile && setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-primary/60 hover:bg-black/5 hover:text-primary"
                }`}
              >
                <Icon size={18} className={isActive ? "text-accent" : "text-primary/50"} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-black/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-semibold text-primary/60 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
        >
          <LogOut size={18} className="text-primary/50 group-hover:text-red-500" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 z-50 bg-white shadow-premium lg:hidden top-[64px]"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Header (for toggling sidebar) */}
        <div className="lg:hidden p-4 border-b border-black/5 bg-white flex items-center justify-between shrink-0">
          <span className="font-bold text-primary">Dashboard</span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-black/5 text-primary"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
