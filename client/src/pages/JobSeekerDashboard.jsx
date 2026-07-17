import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase, Filter, ArrowRight, Activity, TrendingUp, CheckCircle, Target, User } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { motion } from "framer-motion";

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [applyingToJobId, setApplyingToJobId] = useState(null);
  const [coverNote, setCoverNote] = useState("");
  const [resumeBase64, setResumeBase64] = useState("");
  const [resumeError, setResumeError] = useState("");
  
  // Dummy stats for the SaaS feel
  const stats = [
    { label: "Applications Sent", value: appliedJobIds.size || 0, icon: ArrowRight, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Profile Views", value: "24", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Interviews", value: "2", icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const fetchAppliedJobs = async () => {
    try {
      const response = await api.get("/applications/my");
      const ids = new Set(response.data.applications.map((app) => app.job?._id));
      setAppliedJobIds(ids);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 6 };
      if (search) params.search = search;
      if (category) params.category = category;
      if (location) params.location = location;
      if (jobType) params.jobType = jobType;

      const response = await api.get("/jobs", { params });
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  const handleApplyClick = (jobId) => {
    setApplyingToJobId(jobId);
    setCoverNote("");
    setResumeBase64("");
    setResumeError("");
    setMessage("");
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setResumeError("Resume size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeBase64(reader.result);
        setResumeError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplySubmit = async (jobId) => {
    setMessage("");
    if (!coverNote.trim() || !resumeBase64) {
      setMessage("Both Cover Note and Resume are required.");
      return;
    }
    try {
      await api.post("/applications", { jobId, coverNote, resume: resumeBase64 });
      setMessage("Applied successfully!");
      setAppliedJobIds((prev) => new Set([...prev, jobId]));
      setApplyingToJobId(null);
      setCoverNote("");
      setResumeBase64("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <DashboardLayout role="jobseeker">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">Overview</h1>
        <p className="text-primary/60">Welcome back! Here's what's happening with your job search today.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Applications Sent", value: appliedJobIds.size || "0", icon: ArrowRight, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Profile Views", value: "24", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Recommended Jobs", value: "12+", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary/50 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Column: Job Feed */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Discover Jobs</h2>
          </div>
          
          {message && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium flex items-center gap-2">
              <CheckCircle size={18} />
              {message}
            </div>
          )}

          {/* Filter Bar */}
          <Card className="p-4 mb-8">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-2 block ml-1">Search</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
                  <input
                    placeholder="Job title or keyword"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-background/50 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-2 block ml-1">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
                  <input
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-background/50 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                  />
                </div>
              </div>

              <div className="w-full md:w-48">
                <label className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-2 block ml-1">Job Type</label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-background/50 text-sm appearance-none focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
              
              <Button type="submit" className="w-full md:w-auto h-[42px] px-6">
                Search
              </Button>
            </form>
          </Card>

          {/* Job List */}
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-black/5 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-black/5">
              <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-primary/40" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">No jobs found</h3>
              <p className="text-primary/50">Try adjusting your search filters.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {jobs.map((job) => (
                <Card key={job._id} hover className="p-6 overflow-hidden relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3 items-center">
                      {job.postedBy?.companyLogo && (
                        <img src={job.postedBy.companyLogo} alt={job.postedBy.name} className="w-12 h-12 object-contain rounded-lg border border-black/10 bg-white p-1" />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-primary mb-1">{job.title}</h3>
                        <p className="text-primary/60 text-sm font-medium">{job.postedBy?.name || 'Company Name'}</p>
                      </div>
                    </div>
                    {appliedJobIds.has(job._id) && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                        <CheckCircle size={12} />
                        Applied
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-black/5 text-primary/70 text-xs font-semibold rounded-md flex items-center gap-1">
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span className="px-2.5 py-1 bg-accent/10 text-accent-dark text-xs font-semibold rounded-md flex items-center gap-1">
                      <Briefcase size={12} /> {job.jobType}
                    </span>
                    {job.salary && (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
                        ₹{job.salary}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-primary/60 leading-relaxed mb-6 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="text-xs text-primary/40 font-semibold uppercase tracking-wider">
                      {job.category}
                    </div>
                    
                    {applyingToJobId === job._id ? (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col w-full absolute inset-0 bg-white p-6 z-10">
                        <h4 className="text-sm font-bold text-primary mb-3">Apply for {job.title}</h4>
                        <textarea
                          placeholder="Why are you a good fit? (Required)"
                          value={coverNote}
                          onChange={(e) => setCoverNote(e.target.value)}
                          className="w-full p-3 rounded-xl border border-black/10 bg-background/50 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all mb-3 h-20 resize-none"
                        />
                        <div className="mb-3">
                          <label className="text-[12px] font-semibold text-primary/80 ml-0.5 block mb-1">
                            Upload Resume (PDF/Doc, Max 2MB) *
                          </label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white/50 text-[13px] text-primary transition-all duration-200 outline-none focus:border-accent"
                          />
                          {resumeError && <p className="text-red-500 text-xs mt-1">{resumeError}</p>}
                        </div>
                        <div className="flex gap-3 justify-end mt-auto">
                          <Button variant="outline" onClick={() => setApplyingToJobId(null)} className="py-2 text-sm">
                            Cancel
                          </Button>
                          <Button onClick={() => handleApplySubmit(job._id)} className="py-2 text-sm">
                            Submit Application
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      !appliedJobIds.has(job._id) && (
                        <Button variant="outline" onClick={() => handleApplyClick(job._id)} className="py-2 px-6 text-sm">
                          Apply Now
                        </Button>
                      )
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                variant="outline"
                className="py-2 px-4"
              >
                Previous
              </Button>
              <span className="text-sm font-semibold text-primary/60">
                Page {page} of {totalPages}
              </span>
              <Button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                variant="outline"
                className="py-2 px-4"
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Mini Widgets (SaaS aesthetic) */}
        <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
              <User size={16} className="text-accent" /> Complete Profile
            </h3>
            <div className="w-full bg-black/5 rounded-full h-2 mb-3">
              <div className="bg-accent h-2 rounded-full w-[70%]"></div>
            </div>
            <p className="text-xs text-primary/60 mb-4 leading-relaxed">
              You are 70% complete. Add your skills to get better job recommendations.
            </p>
            <Link to="/profile">
              <Button variant="outline" className="w-full text-xs py-2">Update Profile</Button>
            </Link>
          </Card>

          <Card className="p-6 bg-primary text-accent border-none relative overflow-hidden">
             <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full bg-accent/20 blur-[30px]" />
             <h3 className="text-sm font-bold mb-2 relative z-10">Pro Tip</h3>
             <p className="text-xs text-primary/60 leading-relaxed mb-4 relative z-10">
               Companies look for candidates who write personalized cover notes. Always try to add one when applying!
             </p>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default JobSeekerDashboard;
