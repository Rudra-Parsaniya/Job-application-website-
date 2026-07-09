import { useState, useEffect } from "react";
import api from "../services/api";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [applyMessage, setApplyMessage] = useState("");

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
    fetchRecommended();
  }, []);

  const handleApply = async (jobId) => {
    setApplyMessage("");
    try {
      await api.post("/applications", { jobId });
      setApplyMessage("Applied successfully!");
    } catch (err) {
      setApplyMessage(err.response?.data?.message || "Failed to apply");
    }
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
            <button onClick={() => handleApply(job._id)} style={styles.button}>
              Apply
            </button>
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
    maxWidth: "700px",
    margin: "0 auto",
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
  applyMessage: {
    color: "#16a34a",
    fontWeight: "600",
  },
};

export default RecommendedJobs;