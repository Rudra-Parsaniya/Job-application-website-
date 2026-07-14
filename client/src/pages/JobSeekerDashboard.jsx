import { useState, useEffect } from "react";
import api from "../services/api";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

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
      const params = { page, limit: 5 };
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
    setMessage("");
  };

  const handleApplySubmit = async (jobId) => {
    setMessage("");
    try {
      await api.post("/applications", { jobId, coverNote });
      setMessage("Applied successfully!");
      setAppliedJobIds((prev) => new Set([...prev, jobId]));
      setApplyingToJobId(null);
      setCoverNote("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleCancelApply = () => {
    setApplyingToJobId(null);
    setCoverNote("");
  };

  return (
    <div style={styles.container}>
      <Container>
        <h2 style={styles.title}>Browse Jobs</h2>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSearchSubmit} style={styles.filterBar}>
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.filterInput}
          />
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.filterInput}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.filterInput}
          />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            style={styles.select}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <Button type="submit">Search</Button>
        </form>

        {loading ? (
          <p style={styles.loading}>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p style={styles.noJobs}>No jobs found.</p>
        ) : (
          <div style={styles.jobList}>
            {jobs.map((job) => (
              <Card key={job._id} style={styles.jobCard}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <p style={styles.jobDescription}>{job.description}</p>
                <div style={styles.jobDetails}>
                  <span style={styles.detail}><strong>Location:</strong> {job.location}</span>
                  <span style={styles.detail}><strong>Category:</strong> {job.category}</span>
                  <span style={styles.detail}><strong>Job Type:</strong> {job.jobType}</span>
                  <span style={styles.detail}><strong>Salary:</strong> ₹{job.salary}</span>
                  {job.skillsRequired && (
                    <span style={styles.detail}><strong>Skills:</strong> {job.skillsRequired}</span>
                  )}
                </div>

                {appliedJobIds.has(job._id) ? (
                  <span style={styles.appliedBadge}>Already Applied</span>
                ) : applyingToJobId === job._id ? (
                  <div style={styles.applyForm}>
                    <textarea
                      placeholder="Cover note (optional)"
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      style={styles.textarea}
                    />
                    <div style={styles.applyActions}>
                      <Button onClick={() => handleApplySubmit(job._id)}>
                        Submit Application
                      </Button>
                      <Button variant="outline" onClick={handleCancelApply}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => handleApplyClick(job._id)}>
                    Apply
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}

        <div style={styles.pagination}>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            variant="outline"
          >
            Previous
          </Button>
          <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
          <Button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    padding: "48px 0",
    backgroundColor: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "32px",
    color: "#191919",
  },
  message: {
    textAlign: "center",
    color: "#0a66c2",
    fontWeight: "600",
    marginBottom: "24px",
    fontSize: "14px",
  },
  filterBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "32px",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  filterInput: {
    flex: 1,
    minWidth: "200px",
  },
  select: {
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #e1e3eb",
    fontSize: "14px",
    fontFamily: "inherit",
    minWidth: "150px",
    backgroundColor: "#ffffff",
  },
  loading: {
    textAlign: "center",
    color: "#666666",
    fontSize: "16px",
  },
  noJobs: {
    textAlign: "center",
    color: "#666666",
    fontSize: "16px",
  },
  jobList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  jobCard: {
    padding: "24px",
  },
  jobTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#191919",
  },
  jobDescription: {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "16px",
    lineHeight: "1.6",
  },
  jobDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  detail: {
    fontSize: "14px",
    color: "#666666",
  },
  applyForm: {
    marginTop: "16px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #e1e3eb",
    minHeight: "80px",
    marginBottom: "12px",
    boxSizing: "border-box",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  applyActions: {
    display: "flex",
    gap: "12px",
  },
  appliedBadge: {
    display: "inline-block",
    padding: "8px 16px",
    backgroundColor: "#f3f2ef",
    color: "#666666",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "14px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    marginTop: "32px",
  },
  pageInfo: {
    fontSize: "14px",
    color: "#666666",
  },
};

export default JobSeekerDashboard;
