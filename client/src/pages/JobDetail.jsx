import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building, MapPin, Briefcase, Calendar, IndianRupee, Code, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const [resumeBase64, setResumeBase64] = useState("");
  const [resumeError, setResumeError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [jobRes, appsRes] = await Promise.all([
          api.get(`/jobs/${jobId}`),
          api.get("/applications/my"),
        ]);
        setJob(jobRes.data.job);
        const applied = appsRes.data.applications.some((app) => app.job?._id === jobId);
        setHasApplied(applied);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleApplySubmit = async () => {
    setMessage("");
    if (!coverNote.trim() || !resumeBase64) {
      setMessageType("error");
      setMessage("Both Cover Note and Resume are required.");
      return;
    }
    try {
      await api.post("/applications", { jobId, coverNote, resume: resumeBase64 });
      setMessage("Applied successfully!");
      setMessageType("success");
      setHasApplied(true);
      setShowApplyForm(false);
      setCoverNote("");
      setResumeBase64("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
      setMessageType("error");
    }
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

  if (loading) {
    return (
      <DashboardLayout role="jobseeker">
        <div className="flex justify-center items-center h-64">
          <p className="text-primary/60 font-medium animate-pulse">Loading job details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !job) {
    return (
      <DashboardLayout role="jobseeker">
        <div className="flex justify-center items-center h-64 text-red-500 font-semibold">
          {error || "Job not found."}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="jobseeker">
      <div className="mb-6">
        <Link 
          to="/jobseeker/dashboard" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary/60 hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-3 tracking-tight">
                  {job.title}
                </h1>
                {job.postedBy?.name && (
                  <div className="flex items-center gap-2 text-lg font-semibold text-accent mb-4">
                    {job.postedBy.companyLogo ? (
                      <img src={job.postedBy.companyLogo} alt={job.postedBy.name} className="w-8 h-8 object-contain rounded border border-black/10 bg-white" />
                    ) : (
                      <Building size={20} />
                    )}
                    {job.postedBy.name}
                    {job.postedBy?.industry && (
                      <span className="text-sm font-medium text-primary/40 bg-black/5 px-2 py-0.5 rounded-full ml-2">
                        {job.postedBy.industry}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/70 bg-black/5 px-4 py-2 rounded-xl">
                <MapPin size={16} className="text-primary/40" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/70 bg-black/5 px-4 py-2 rounded-xl">
                <Briefcase size={16} className="text-primary/40" />
                {job.jobType}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/70 bg-black/5 px-4 py-2 rounded-xl">
                <IndianRupee size={16} className="text-primary/40" />
                {job.salary}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/70 bg-black/5 px-4 py-2 rounded-xl">
                <Calendar size={16} className="text-primary/40" />
                {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">Job Description</h3>
              <div className="prose prose-sm max-w-none text-primary/70 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-black/[0.02] rounded-2xl border border-black/5 mb-8">
              <div>
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  Category
                </h4>
                <p className="text-primary/70 font-medium">{job.category}</p>
              </div>
              
              {job.experienceRequired && (
                <div>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Briefcase size={16} className="text-accent" />
                    Experience
                  </h4>
                  <p className="text-primary/70 font-medium">{job.experienceRequired}</p>
                </div>
              )}

              {job.skillsRequired && (
                <div className="md:col-span-2">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Code size={16} className="text-accent" />
                    Skills Required
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skillsRequired.split(',').map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 bg-white border border-black/10 rounded-lg text-sm font-semibold text-primary/70 shadow-sm">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-bold text-primary mb-4">Application</h3>
            
            {message && (
              <div className={`p-4 rounded-xl flex items-start gap-3 mb-6 ${
                messageType === "error" 
                  ? "bg-red-50 border border-red-100 text-red-700" 
                  : "bg-green-50 border border-green-100 text-green-700"
              }`}>
                {messageType === "error" ? (
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                ) : (
                  <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                )}
                <p className="text-sm font-semibold">{message}</p>
              </div>
            )}

            {hasApplied ? (
              <div className="bg-accent/10 text-accent p-4 rounded-xl flex items-center justify-center gap-2 font-bold border border-accent/20">
                <CheckCircle2 size={20} />
                Already Applied
              </div>
            ) : showApplyForm ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[13px] font-semibold text-primary/80 ml-0.5">
                    Cover Note (Required)
                  </label>
                  <textarea
                    placeholder="Why are you a good fit for this role?"
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 text-[14px] text-primary transition-all duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 hover:border-black/20 min-h-[100px] resize-y"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[13px] font-semibold text-primary/80 ml-0.5">
                    Upload Resume (PDF/Doc, Max 2MB) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-black/10 bg-white/50 text-[14px] text-primary transition-all duration-200 outline-none focus:border-accent"
                  />
                  {resumeError && <p className="text-red-500 text-xs mt-1">{resumeError}</p>}
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <Button onClick={handleApplySubmit} className="w-full py-3">
                    Submit Application
                  </Button>
                  <Button variant="outline" onClick={() => setShowApplyForm(false)} className="w-full py-3">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowApplyForm(true)} className="w-full py-3 text-lg">
                Apply Now
              </Button>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobDetail;
