import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const ViewApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/applications/job/${jobId}`);
      setApplications(response.data.applications);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    setMessage("");
    try {
      await api.put(`/applications/${applicationId}/status`, { status: newStatus });
      setMessage("Status updated successfully");
      fetchApplicants();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div style={styles.container}>
      <Link to="/company/dashboard" style={styles.backLink}>← Back to Dashboard</Link>
      <h2>Applicants</h2>

      {message && <p style={styles.message}>{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applicants yet for this job.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} style={styles.card}>
            <h3>{app.applicant?.name}</h3>
            <p><strong>Email:</strong> {app.applicant?.email}</p>
            {app.applicant?.phone && <p><strong>Phone:</strong> {app.applicant.phone}</p>}
            {app.applicant?.skills && <p><strong>Skills:</strong> {app.applicant.skills}</p>}
            {app.applicant?.resumeLink && (
              <p>
                <strong>Resume:</strong>{" "}
                <a href={app.applicant.resumeLink} target="_blank" rel="noreferrer">
                  View Resume
                </a>
              </p>
            )}
            {app.coverNote && <p><strong>Cover Note:</strong> {app.coverNote}</p>}

            <label style={styles.label}>Status:</label>
            <select
              value={app.status}
              onChange={(e) => handleStatusChange(app._id, e.target.value)}
              style={styles.select}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
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
  backLink: {
    display: "inline-block",
    marginBottom: "15px",
    color: "#2563eb",
    textDecoration: "none",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  label: {
    display: "block",
    marginTop: "10px",
    marginBottom: "5px",
    fontWeight: "600",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  message: {
    color: "#16a34a",
    fontWeight: "600",
  },
};

export default ViewApplicants;