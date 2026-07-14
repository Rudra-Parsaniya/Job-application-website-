import { useState, useEffect } from "react";
import api from "../services/api";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [applyMessage, setApplyMessage] = useState("");
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
      setAppliedJobIds((prev) => new Set([...prev, jobId]));
      setApplyingToJobId(null);
      setCoverNote("");
    } catch (err) {
      setApplyMessage(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleCancelApply = () => {
    setApplyingToJobId(null);
    setCoverNote("");
  };

  return (
    <div style={styles.container}>
      <h2>Recommended For You</h2>
      <p style={styles.subtitle}>Based on your skills</p>

      {applyMessage && <p style={styles.applyMessage}>{applyMessage}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>{message || "No recommendations available."}</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Skills Required:</strong> {job.skillsRequired}</p>

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
                  <button onClick={() => handleApplySubmit(job._id)} style={styles.button}>
                    Submit Application
                  </button>
                  <button onClick={handleCancelApply} style={styles.cancelButton}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => handleApplyClick(job._id)} style={styles.button}>
                Apply
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  subtitle: {
    color: "#64748b",
    marginBottom: "20px",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "#64748b",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
  },
  applyForm: {
    marginTop: "10px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "60px",
    marginBottom: "8px",
    boxSizing: "border-box",
  },
  applyActions: {
    display: "flex",
    gap: "10px",
  },
  appliedBadge: {
    display: "inline-block",
    padding: "8px 16px",
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  applyMessage: {
    color: "#16a34a",
    fontWeight: "600",
  },
};

export default RecommendedJobs;
