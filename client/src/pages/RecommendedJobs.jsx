import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, AlertCircle, CheckCircle2, Sparkles, Target, Code, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [applyMessage, setApplyMessage] = useState("");
  const [applyMessageType, setApplyMessageType] = useState("success");
  const [applyingToJobId, setApplyingToJobId] = useState(null);
  const [coverNote, setCoverNote] = useState("");

  const fetchAppliedJobs = async () => {
    try {
      const response = await api.get("/applications/my");
      const ids = new Set(response.data.applications.map((app) => app.job?._id));
      setAppliedJobIds(ids);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecommended = async () => {
    setLoading(true);
    try {
      const response = await api.get("/jobs/recommended");
      setJobs(response.data.jobs);
      if (response.data.message) setMessage(response.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
    fetchRecommended();
  }, []);

  const handleApplyClick = (jobId) => {
    setApplyingToJobId(jobId);
    setCoverNote("");
    setApplyMessage("");
  };

  const handleApplySubmit = async (jobId) => {
    setApplyMessage("");
    try {
      await api.post("/applications", { jobId, coverNote });
      setApplyMessage("Applied successfully!");
      setApplyMessageType("success");
      setAppliedJobIds((prev) => new Set([...prev, jobId]));
      setTimeout(() => {
        setApplyingToJobId(null);
        setCoverNote("");
      }, 1500);
    } catch (err) {
      setApplyMessage(err.response?.data?.message || "Failed to apply");
      setApplyMessageType("error");
    }
  };

  const handleCancelApply = () => {
    setApplyingToJobId(null);
    setCoverNote("");
    setApplyMessage("");
  };

  return (
    <DashboardLayout role="jobseeker">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-accent/10 rounded-xl text-accent">
            <Sparkles size={24} />
          </div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Recommended For You</h1>
        </div>
        <p className="text-primary/60">
          Curated job opportunities based on your skills and profile profile.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="p-6 h-64 animate-pulse flex flex-col">
              <div className="w-1/2 h-6 bg-black/5 rounded-md mb-4" />
              <div className="w-full h-4 bg-black/5 rounded-md mb-2" />
              <div className="w-3/4 h-4 bg-black/5 rounded-md mb-8" />
              <div className="mt-auto w-1/3 h-10 bg-black/5 rounded-xl" />
            </Card>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-black/5 shadow-sm">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target size={32} className="text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-3">No recommendations yet</h3>
          <p className="text-primary/60 max-w-md mx-auto mb-8 leading-relaxed">
            {message || "We don't have enough information to recommend jobs yet. Make sure your profile is complete with your latest skills."}
          </p>
          <Link to="/profile">
            <Button className="px-8 py-3">Update Profile</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card hover className="p-6 h-full flex flex-col">
                <Link to={`/jobs/${job._id}`} className="block group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
                      {job.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-black/5 text-primary/40 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
                
                <p className="text-sm text-primary/60 line-clamp-2 mb-6">
                  {job.description}
                </p>

                {job.skillsRequired && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-primary/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Code size={14} /> Match Criteria
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skillsRequired.split(',').map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 bg-accent/10 text-accent rounded-lg text-xs font-semibold border border-accent/20">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-black/5">
                  {appliedJobIds.has(job._id) ? (
                    <div className="w-full py-2.5 bg-green-50 text-green-600 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border border-green-100">
                      <CheckCircle2 size={18} />
                      Already Applied
                    </div>
                  ) : applyingToJobId === job._id ? (
                    <div className="bg-black/[0.02] p-4 rounded-xl border border-black/5">
                      {applyMessage && (
                        <div className={`p-3 rounded-lg flex items-start gap-2 mb-3 text-sm font-semibold ${
                          applyMessageType === "error" 
                            ? "bg-red-50 text-red-600 border border-red-100" 
                            : "bg-green-50 text-green-600 border border-green-100"
                        }`}>
                          {applyMessageType === "error" ? <AlertCircle size={16} className="mt-0.5 shrink-0" /> : <CheckCircle2 size={16} className="mt-0.5 shrink-0" />}
                          {applyMessage}
                        </div>
                      )}
                      
                      {!applyMessage || applyMessageType === "error" ? (
                        <>
                          <textarea
                            placeholder="Add a cover note (optional)"
                            value={coverNote}
                            onChange={(e) => setCoverNote(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white text-[13px] text-primary transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 mb-3 min-h-[80px] resize-y"
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => handleApplySubmit(job._id)} className="flex-1 py-2 text-sm">
                              Submit
                            </Button>
                            <Button variant="outline" onClick={handleCancelApply} className="flex-1 py-2 text-sm">
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  ) : (
                    <Button onClick={() => handleApplyClick(job._id)} className="w-full py-2.5">
                      Apply Now
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default RecommendedJobs;
