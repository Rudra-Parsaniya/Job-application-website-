import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Building, Calendar, ArrowRight, CircleDashed, CheckCircle, XCircle, Clock } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await api.get("/applications/my");
      setApplications(response.data.applications);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Offer":
        return { color: "text-green-700 bg-green-50 border-green-200", icon: CheckCircle };
      case "Rejected":
        return { color: "text-red-700 bg-red-50 border-red-200", icon: XCircle };
      case "Interview":
        return { color: "text-yellow-700 bg-yellow-50 border-yellow-200", icon: Clock };
      default:
        return { color: "text-primary/70 bg-black/5 border-black/10", icon: CircleDashed };
    }
  };

  return (
    <DashboardLayout role="jobseeker">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">My Applications</h1>
          <p className="text-primary/60">
            Track your job applications and stay on top of your interviews.
          </p>
        </div>
        <div className="px-4 py-2 bg-white rounded-xl border border-black/5 shadow-sm text-sm font-semibold text-primary/70 inline-flex items-center gap-2">
          Total Applied: <span className="text-primary font-bold">{applications.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="p-6 h-48 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="w-1/2 h-6 bg-black/5 rounded-md" />
                <div className="w-20 h-6 bg-black/5 rounded-full" />
              </div>
              <div className="space-y-3 mt-8">
                <div className="w-3/4 h-4 bg-black/5 rounded-md" />
                <div className="w-2/3 h-4 bg-black/5 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-black/5 shadow-sm">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={32} className="text-primary/40" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-3">No applications yet</h3>
          <p className="text-primary/60 max-w-md mx-auto mb-8 leading-relaxed">
            You haven't applied to any jobs yet. Start exploring opportunities to land your dream role.
          </p>
          <Link to="/jobseeker/dashboard">
            <Button className="px-8 py-3">Browse Jobs</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => {
            const StatusIcon = getStatusBadge(app.status).icon;
            return (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card hover className="p-6 h-full flex flex-col relative group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-primary leading-tight mb-1">
                        {app.job?.title || "Unknown Job"}
                      </h3>
                      {app.job?.postedBy?.name && (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-primary/60">
                          {app.job.postedBy.companyLogo ? (
                            <img src={app.job.postedBy.companyLogo} alt={app.job.postedBy.name} className="w-5 h-5 object-contain rounded border border-black/10 bg-white" />
                          ) : (
                            <Building size={14} />
                          )}
                          {app.job.postedBy.name}
                        </div>
                      )}
                    </div>
                    
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full border flex items-center gap-1.5 whitespace-nowrap ${getStatusBadge(app.status).color}`}>
                      <StatusIcon size={12} />
                      {app.status || "Pending"}
                    </span>
                  </div>

                  <div className="mt-auto space-y-3 border-t border-black/5 pt-4">
                    <div className="flex items-center gap-2 text-sm text-primary/60">
                      <MapPin size={14} className="text-primary/40" />
                      <span className="truncate">{app.job?.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary/60">
                      <Briefcase size={14} className="text-primary/40" />
                      {app.job?.jobType || "Full-time"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary/60">
                      <Calendar size={14} className="text-primary/40" />
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    <button className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyApplications;