import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import api from "../services/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", formData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.role === "jobseeker" ? "/jobseeker/dashboard" : "/company/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-background">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Welcome back</h1>
            <p className="text-primary/60 text-sm mb-8">Enter your credentials to access your account.</p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="flex justify-end -mt-2 mb-4">
                  <Link to="/forgot-password" className="text-sm font-semibold text-accent hover:text-accent-light transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full py-3 mt-2">
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-primary/60">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-primary hover:text-accent transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side decorative panel */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-secondary/80 mix-blend-multiply" />
        <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-[100px]" />
        
        <div className="relative z-10 max-w-md text-white p-12">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
            <Briefcase size={24} className="text-accent-light" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6">Discover your next big opportunity.</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-10">
            Join a network of ambitious professionals and forward-thinking companies. Your career growth starts here.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-white/50">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-primary"></div>
              <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-primary"></div>
              <div className="w-8 h-8 rounded-full bg-white/40 border-2 border-primary"></div>
            </div>
            <p>Join 10,000+ users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;