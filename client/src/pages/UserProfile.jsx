import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User as UserIcon, Building, Mail, Briefcase, FileText, Code, CheckCircle2 } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !user) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto mt-8">
          <Link to="/users" className="flex items-center gap-2 text-primary/60 hover:text-primary mb-6 transition-colors w-fit">
            <ArrowLeft size={16} />
            Back to Search
          </Link>
          <Card className="p-12 text-center text-red-500 bg-red-500/5">
            <p>{error || "User not found"}</p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 mt-4">
        <Link to="/users" className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors w-fit">
          <ArrowLeft size={16} />
          Back to Search
        </Link>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className={`w-32 h-32 rounded-2xl flex flex-shrink-0 items-center justify-center text-white ${user.role === 'company' ? 'bg-indigo-500' : 'bg-primary'}`}>
               {user.role === 'company' && user.companyLogo ? (
                 <img src={user.companyLogo} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
               ) : user.role === 'company' ? (
                 <Building size={48} />
               ) : (
                 <UserIcon size={48} />
               )}
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-primary">{user.name}</h1>
                <p className="text-primary/60 text-lg">{user.role === 'company' ? 'Company' : 'Job Seeker'}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {user.email && (
                  <div className="flex items-center gap-2 text-primary/70">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                )}
                {user.role === 'company' && user.companyWebsite && (
                   <div className="flex items-center gap-2 text-primary/70">
                     <Building size={16} />
                     <a href={user.companyWebsite.startsWith('http') ? user.companyWebsite : `https://${user.companyWebsite}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">Website</a>
                   </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {user.bio && (
              <Card className="p-8 space-y-4">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <UserIcon size={20} className="text-primary/60" />
                  About
                </h2>
                <p className="text-primary/70 whitespace-pre-wrap leading-relaxed">{user.bio}</p>
              </Card>
            )}

            {user.role === 'jobseeker' && user.skills && (
              <Card className="p-8 space-y-4">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Code size={20} className="text-primary/60" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills.split(',').map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-primary/5 text-primary/80 rounded-lg text-sm font-medium border border-primary/10">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            {user.role === 'jobseeker' && user.resumeLink && (
              <Card className="p-6">
                <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-primary/60" />
                  Resume
                </h3>
                <a href={user.resumeLink} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Resume
                  </Button>
                </a>
              </Card>
            )}

            {user.role === 'company' && user.industry && (
               <Card className="p-6">
                  <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                    <Briefcase size={18} className="text-primary/60" />
                    Industry
                  </h3>
                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="font-medium text-indigo-900">{user.industry}</p>
                  </div>
               </Card>
            )}
            
            <Card className="p-6">
              <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary/60" />
                Member Since
              </h3>
              <p className="text-primary/70">
                {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
