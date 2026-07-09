import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>My Posted Jobs</h2>
        <Link to="/company/post-job" style={styles.postButton}>+ Post New Job</Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={styles.jobCard}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location} | <strong>Type:</strong> {job.jobType}</p>
            <Link to={`/company/jobs/${job._id}/applicants`} style={styles.viewButton}>
              View Applicants
            </Link>
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
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  postButton: {
    textDecoration: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "6px",
    fontWeight: "600",
  },
  jobCard: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  viewButton: {
    display: "inline-block",
    marginTop: "10px",
    textDecoration: "none",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "0.9rem",
  },
};

export default CompanyDashboard;