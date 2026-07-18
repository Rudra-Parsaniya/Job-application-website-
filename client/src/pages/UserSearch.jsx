import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User as UserIcon, Building, Briefcase } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/users/search?query=${encodeURIComponent(query)}`);
      setUsers(response.data.users);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Failed to search users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Find Users</h1>
          <p className="text-primary/60 mt-2">Search for job seekers and companies to expand your network.</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                icon={Search}
                className="w-full"
              />
            </div>
            <Button type="submit" isLoading={loading}>
              Search
            </Button>
          </form>
        </Card>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {users.map((user) => (
                <Card key={user._id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${user.role === 'company' ? 'bg-indigo-500' : 'bg-primary'}`}>
                        {user.role === 'company' ? <Building size={24} /> : <UserIcon size={24} />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{user.name}</h3>
                        <p className="text-sm text-primary/60">{user.role === 'company' ? 'Company' : 'Job Seeker'}</p>
                      </div>
                    </div>
                    <Link to={`/users/${user._id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                  
                  {user.bio && (
                    <p className="mt-4 text-sm text-primary/70 line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.role === 'jobseeker' && user.skills && user.skills.split(',').slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/5 text-primary/70 rounded-md text-xs font-medium">
                        {skill.trim()}
                      </span>
                    ))}
                    {user.role === 'company' && user.industry && (
                      <span className="px-2 py-1 bg-indigo-500/10 text-indigo-700 rounded-md text-xs font-medium flex items-center gap-1">
                        <Briefcase size={12} />
                        {user.industry}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : hasSearched && !loading ? (
            <Card className="p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary/40">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary">No users found</h3>
              <p className="text-primary/60 mt-2">Try adjusting your search criteria</p>
            </Card>
          ) : null}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserSearch;
