import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import api from "../services/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", lastName: "", email: "", password: "", role: "jobseeker" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-background">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Create an account</h1>
            <p className="text-primary/60 text-sm mb-8">Join CareerPoint to discover opportunities or hire top talent.</p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white/50 p-1.5 rounded-xl border border-black/5 flex items-center mb-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "jobseeker" })}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    formData.role === "jobseeker" 
                      ? "bg-white text-primary shadow-sm ring-1 ring-black/5" 
                      : "text-primary/50 hover:text-primary"
                  }`}
                >
                  I want to find a job
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "company" })}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    formData.role === "company" 
                      ? "bg-white text-primary shadow-sm ring-1 ring-black/5" 
                      : "text-primary/50 hover:text-primary"
                  }`}
                >
                  I want to hire talent
                </button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    label={formData.role === "company" ? "Company name" : "First name"}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {formData.role === "jobseeker" && (
                  <div className="flex-1">
                    <Input
                      label="Last name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </div>

              <Input
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password (6+ characters)"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <p className="text-xs text-primary/50 leading-relaxed mt-4">
                By clicking "Agree & Join", you agree to the CareerPoint{" "}
                <Link to="#" className="font-semibold text-primary hover:text-accent">Terms</Link> and{" "}
                <Link to="#" className="font-semibold text-primary hover:text-accent">Privacy Policy</Link>.
              </p>

              <Button type="submit" disabled={loading} className="w-full py-3 mt-4">
                {loading ? "Creating account..." : "Agree & Join"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-primary/60">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:text-accent transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side decorative panel */}
      <div className="hidden lg:flex flex-1 bg-secondary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent/80 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-soft/20 blur-[100px]" />
        
        <div className="relative z-10 max-w-md text-white p-12">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
            <Target size={24} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6">Target your next big move.</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            Whether you are looking for your dream job or the perfect candidate, we provide the smart tools to help you succeed.
          </p>
          <ul className="space-y-4">
            {["Smart matching algorithms", "Application tracking tools", "Direct messaging system"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;