import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, AlertCircle, CheckCircle2 } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    salary: "",
    jobType: "Full-time",
    experienceRequired: "",
    skillsRequired: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/jobs", formData);
      navigate("/company/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="company">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">Post a New Job</h1>
        <p className="text-primary/60">
          Fill out the details below to create a new job listing.
        </p>
      </div>

      <Card className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm font-semibold text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Job Title"
              name="title"
              placeholder="e.g. Senior Frontend Developer"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[13px] font-semibold text-primary/80 ml-0.5">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 text-[14px] text-primary transition-all duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 hover:border-black/20 min-h-[120px] resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                name="location"
                placeholder="e.g. Remote, New York"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <Input
                label="Category"
                name="category"
                placeholder="e.g. Software Development"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Salary (per year in ₹/$, numbers only)"
                type="number"
                name="salary"
                placeholder="e.g. 1000000"
                value={formData.salary}
                onChange={handleChange}
                required
              />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[13px] font-semibold text-primary/80 ml-0.5">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white/50 text-[14px] text-primary transition-all duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 hover:border-black/20 cursor-pointer appearance-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Experience Required"
                name="experienceRequired"
                placeholder="e.g. 3-5 years"
                value={formData.experienceRequired}
                onChange={handleChange}
              />

              <Input
                label="Skills Required"
                name="skillsRequired"
                placeholder="e.g. React, Node.js, MongoDB"
                value={formData.skillsRequired}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 flex justify-end">
            <Button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 w-full md:w-auto flex items-center justify-center gap-2"
            >
              {loading ? (
                "Posting..."
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Publish Job
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default PostJob;