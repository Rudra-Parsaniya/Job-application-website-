import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

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
    try {
      await api.post("/applications", { jobId, coverNote });
      setMessage("Applied successfully!");
      setMessageType("success");
      setHasApplied(true);
      setShowApplyForm(false);
      setCoverNote("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
      setMessageType("error");
    }
  };

  if (loading) return <p style={styles.container}>Loading...</p>;
  if (error) return <p style={{ ...styles.container, color: "#dc2626" }}>{error}</p>;
  if (!job) return <p style={styles.container}>Job not found.</p>;

  return (
    <div style={styles.container}>
      <Link to="/jobseeker/dashboard" style={styles.backLink}>← Back to Jobs</Link>

      <div style={styles.card}>
        <h2>{job.title}</h2>
        {job.postedBy?.name && (
          <p style={styles.company}><strong>Company:</strong> {job.postedBy.name}</p>
        )}
        {job.postedBy?.industry && (
          <p><strong>Industry:</strong> {job.postedBy.industry}</p>
        )}

        <p style={styles.description}>{job.description}</p>

        <div style={styles.details}>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Job Type:</strong> {job.jobType}</p>
          <p><strong>Salary:</strong> ₹{job.salary}</p>
          {job.experienceRequired && (
            <p><strong>Experience:</strong> {job.experienceRequired}</p>
          )}
          {job.skillsRequired && (
            <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
          )}
        </div>

        {message && (
          <p style={messageType === "error" ? styles.errorMessage : styles.successMessage}>
            {message}
          </p>
        )}

        {hasApplied ? (
          <span style={styles.appliedBadge}>Already Applied</span>
        ) : showApplyForm ? (
          <div style={styles.applyForm}>
            <textarea
              placeholder="Cover note (optional)"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              style={styles.textarea}
            />
            <div style={styles.applyActions}>
              <button onClick={handleApplySubmit} style={styles.applyButton}>
                Submit Application
              </button>
              <button onClick={() => setShowApplyForm(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowApplyForm(true)} style={styles.applyButton}>
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "15px",
    color: "#2563eb",
    textDecoration: "none",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "25px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  company: {
    color: "#475569",
    marginBottom: "10px",
  },
  description: {
    lineHeight: "1.6",
    margin: "15px 0",
  },
  details: {
    backgroundColor: "#f8fafc",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  applyButton: {
    padding: "10px 20px",
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  cancelButton: {
    padding: "10px 20px",
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
    minHeight: "80px",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  applyActions: {
    display: "flex",
    gap: "10px",
  },
  appliedBadge: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    borderRadius: "6px",
    fontWeight: "600",
  },
  successMessage: {
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: "10px",
  },
  errorMessage: {
    color: "#dc2626",
    fontWeight: "600",
    marginBottom: "10px",
  },
};

export default JobDetail;
