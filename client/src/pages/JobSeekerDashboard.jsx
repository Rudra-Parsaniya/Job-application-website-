import { useState, useEffect } from "react";
import api from "../services/api";

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 5 };
      if (search) params.search = search;
      if (category) params.category = category;
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
    fetchJobs();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  const handleApply = async (jobId) => {
    setMessage("");
    try {
      await api.post("/applications", { jobId });
      setMessage("Applied successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Browse Jobs</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSearchSubmit} style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          style={styles.input}
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div key={job._id} style={styles.jobCard}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
              {job.skillsRequired && (
                <p><strong>Skills:</strong> {job.skillsRequired}</p>
              )}
              <button onClick={() => handleApply(job._id)} style={styles.applyButton}>
                Apply
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={styles.pageButton}
        >
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          style={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  filterBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  jobCard: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  applyButton: {
    padding: "8px 16px",
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
  },
  pageButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  message: {
    textAlign: "center",
    color: "#16a34a",
    fontWeight: "600",
  },
};

export default JobSeekerDashboard;