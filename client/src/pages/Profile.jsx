import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2, User, Building, Phone, Code, Link as LinkIcon, Trash2 } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/me");
      setProfile(response.data.user);
      setFormData(response.data.user);
    } catch (err) {
      console.log(err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        setError("Image size should be less than 500KB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, companyLogo: reader.result });
        setError(""); // clear error if successful
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);
    try {
      const response = await api.put("/users/me", formData);
      setProfile(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setMessage("Profile updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await api.delete("/users/me");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="jobseeker">
        <div className="flex justify-center items-center h-64">
          <p className="text-primary/60 font-medium animate-pulse">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout role="jobseeker">
        <div className="flex justify-center items-center h-64 text-red-500 font-semibold">
          Could not load profile.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={profile.role}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">My Profile</h1>
        <p className="text-primary/60">
          Update your personal details and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-8">
            <form onSubmit={handleUpdate} className="space-y-6">
              {message && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-semibold text-green-700">{message}</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-semibold text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <Input
                  label="Email (cannot be changed)"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-black/5 opacity-70 cursor-not-allowed"
                />

                <Input
                  label={profile.role === "company" ? "Company Name" : "Full Name"}
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[13px] font-semibold text-primary/80 ml-0.5">
                    Bio / About
                  </label>
                  <textarea
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 text-[14px] text-primary transition-all duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 hover:border-black/20 min-h-[100px] resize-y"
                  />
                </div>

                {profile.role === "jobseeker" && (
                  <>
                    <Input
                      label="Skills"
                      name="skills"
                      placeholder="e.g. React, Node.js, MongoDB"
                      value={formData.skills || ""}
                      onChange={handleChange}
                    />
                    <Input
                      label="Resume Link"
                      name="resumeLink"
                      placeholder="https://your-resume-link.com"
                      value={formData.resumeLink || ""}
                      onChange={handleChange}
                    />
                  </>
                )}

                {profile.role === "company" && (
                  <>
                    <Input
                      label="Company Website"
                      name="companyWebsite"
                      placeholder="https://..."
                      value={formData.companyWebsite || ""}
                      onChange={handleChange}
                    />
                    <Input
                      label="Industry"
                      name="industry"
                      placeholder="e.g. IT Services, Healthcare"
                      value={formData.industry || ""}
                      onChange={handleChange}
                    />
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="text-[13px] font-semibold text-primary/80 ml-0.5">
                        Company Logo (Max 500KB)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white/50 text-[14px] text-primary transition-all duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 hover:border-black/20"
                      />
                      {(formData.companyLogo || profile.companyLogo) && (
                        <div className="mt-2">
                          <img src={formData.companyLogo || profile.companyLogo} alt="Logo preview" className="h-16 object-contain rounded-md border border-black/10 p-1 bg-white" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-black/5 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="px-8 py-3 w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {saving ? (
                    "Saving..."
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 text-center">
            <div className="w-24 h-24 mx-auto bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4">
              {profile.role === "company" ? <Building size={40} /> : <User size={40} />}
            </div>
            <h3 className="text-xl font-bold text-primary mb-1">{profile.name}</h3>
            <p className="text-sm font-semibold text-primary/40 uppercase tracking-wider mb-4">
              {profile.role}
            </p>
            <div className="text-sm text-primary/60">
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          </Card>

          <Card className="p-6 border-red-100 bg-red-50/50">
            <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600/70 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <Trash2 size={16} />
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;