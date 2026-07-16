import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Code, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";

const ViewApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/applications/job/${jobId}`);
      setApplications(response.data.applications);
    } catch (err) {
      console.log(err);
      setError("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    setMessage("");
    setError("");
    try {
      await api.put(`/applications/${applicationId}/status`, { status: newStatus });
      setMessage("Status updated successfully");
      fetchApplicants();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <DashboardLayout role="company">
      <div className="mb-6">
        <Link 
          to="/company/dashboard" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary/60 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">Applicants</h1>
            <p className="text-primary/60">
              Review candidates and manage their application status.
            </p>
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border border-black/5 shadow-sm text-sm font-semibold text-primary/70">
            Total: <span className="text-primary font-bold">{applications.length}</span>
          </div>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
          <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-semibold text-green-700">{message}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-semibold text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6 h-64 animate-pulse">
              <div className="w-1/3 h-6 bg-black/5 rounded-md mb-4" />
              <div className="w-full h-4 bg-black/5 rounded-md mb-2" />
              <div className="w-3/4 h-4 bg-black/5 rounded-md" />
            </Card>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-black/5 shadow-sm">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={32} className="text-primary/40" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-3">No applicants yet</h3>
          <p className="text-primary/60 max-w-md mx-auto leading-relaxed">
            There are no applications for this position at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {applications.map((app) => (
            <Card key={app._id} className="p-6 flex flex-col relative group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {app.applicant?.name}
                  </h3>
                  <div className="flex flex-col gap-1.5 mt-4">
                    <div className="flex items-center gap-2 text-sm text-primary/70">
                      <Mail size={16} className="text-primary/40" />
                      <a href={`mailto:${app.applicant?.email}`} className="hover:text-accent transition-colors">
                        {app.applicant?.email}
                      </a>
                    </div>
                    {app.applicant?.phone && (
                      <div className="flex items-center gap-2 text-sm text-primary/70">
                        <Phone size={16} className="text-primary/40" />
                        <span>{app.applicant.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs font-semibold text-primary/40 uppercase tracking-wider">
                    Status
                  </span>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-black/10 bg-white text-sm font-semibold text-primary cursor-pointer hover:border-black/20 focus:border-accent outline-none"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/5 flex-1">
                {app.applicant?.skills && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                      <Code size={16} className="text-primary/40" />
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {app.applicant.skills.split(',').map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-black/5 text-primary/70 rounded-full text-xs font-semibold">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {app.coverNote && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                      <FileText size={16} className="text-primary/40" />
                      Cover Note
                    </h4>
                    <p className="text-sm text-primary/70 bg-black/[0.02] p-4 rounded-xl italic">
                      "{app.coverNote}"
                    </p>
                  </div>
                )}
              </div>

              {app.applicant?.resumeLink && (
                <div className="mt-6 pt-4 border-t border-black/5 flex justify-end">
                  <a 
                    href={app.applicant.resumeLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-xl text-sm font-semibold hover:bg-accent hover:text-white transition-colors"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ViewApplicants;