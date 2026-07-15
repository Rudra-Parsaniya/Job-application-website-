import { Link, useNavigate } from "react-router-dom";
import { LogOut, Briefcase, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/20 px-6 h-16 flex items-center justify-between">
      <Link to="/" className="text-xl font-extrabold text-primary tracking-tight flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
          <Briefcase size={18} />
        </div>
        CareerPoint
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            {user.role === "jobseeker" && (
              <div className="flex items-center gap-6 mr-4">
                <Link to="/jobseeker/dashboard" className="text-sm font-semibold text-primary/80 hover:text-accent transition-colors">Jobs</Link>
                <Link to="/jobseeker/applications" className="text-sm font-semibold text-primary/80 hover:text-accent transition-colors">My Applications</Link>
                <Link to="/jobseeker/recommended" className="text-sm font-semibold text-primary/80 hover:text-accent transition-colors">Recommended</Link>
              </div>
            )}

            {user.role === "company" && (
              <div className="flex items-center gap-6 mr-4">
                <Link to="/company/dashboard" className="text-sm font-semibold text-primary/80 hover:text-accent transition-colors">My Jobs</Link>
                <Link to="/company/post-job" className="text-sm font-semibold text-primary/80 hover:text-accent transition-colors">Post Job</Link>
              </div>
            )}

            <div className="h-6 w-px bg-black/10"></div>

            <Link to="/profile" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
              <div className="w-8 h-8 rounded-full bg-background border border-black/5 flex items-center justify-center">
                <User size={16} className="text-primary/70" />
              </div>
              <span className="hidden sm:inline-block">Profile</span>
            </Link>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-sm font-semibold text-primary/70 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline-block">Sign out</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors">Sign in</Link>
            <Link to="/register" className="inline-flex items-center justify-center px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md">
              Join now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;