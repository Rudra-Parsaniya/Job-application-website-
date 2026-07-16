import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Edit, Trash2, Users } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/jobs/my");
      setJobs(response.data.jobs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm("Delete this job? All applications for it will also be removed.");
    if (!confirmed) return;

    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <DashboardLayout role="company">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">My Posted Jobs</h1>
          <p className="text-primary/60">
            Manage your job listings and review applicants.
          </p>
        </div>
        <Link to="/company/post-job">
          <Button className="px-6 py-2.5">
            + Post New Job
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 h-48 animate-pulse">
              <div className="w-2/3 h-6 bg-black/5 rounded-md mb-4" />
              <div className="w-full h-4 bg-black/5 rounded-md mb-2" />
              <div className="w-3/4 h-4 bg-black/5 rounded-md" />
            </Card>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-black/5 shadow-sm">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={32} className="text-primary/40" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-3">No jobs posted yet</h3>
          <p className="text-primary/60 max-w-md mx-auto mb-8 leading-relaxed">
            Start hiring top talent by posting your first job opportunity.
          </p>
          <Link to="/company/post-job">
            <Button className="px-8 py-3">Post a Job</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card hover className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold text-primary leading-tight mb-2">
                  {job.title}
                </h3>
                <p className="text-sm text-primary/60 line-clamp-2 mb-6">
                  {job.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  <div className="flex items-center gap-2 text-sm text-primary/70">
                    <MapPin size={16} className="text-primary/40" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary/70">
                    <Briefcase size={16} className="text-primary/40" />
                    <span>{job.jobType}</span>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Link to={`/company/jobs/${job._id}/applicants`} className="col-span-2">
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2 py-2">
                      <Users size={16} />
                      View Applicants
                    </Button>
                  </Link>
                  <Link to={`/company/jobs/${job._id}/edit`}>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-2">
                      <Edit size={16} />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(job._id)}
                    className="w-full flex items-center justify-center gap-2 py-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CompanyDashboard;