import { useState, useEffect } from "react";
import api from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await api.get("/applications/my");
      setApplications(response.data.applications);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const statusColor = (status) => {
    if (status === "Offer") return "#16a34a";
    if (status === "Rejected") return "#dc2626";
    if (status === "Interview") return "#d97706";
    return "#64748b";
  };

  return (
    <div style={styles.container}>
      <h2>My Applications</h2>
      <p style={styles.count}>Total Applied: {applications.length}</p>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} style={styles.card}>
            <h3>{app.job?.title}</h3>
            <p><strong>Location:</strong> {app.job?.location}</p>
            <p><strong>Job Type:</strong> {app.job?.jobType}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: statusColor(app.status), fontWeight: "600" }}>
                {app.status}
              </span>
            </p>
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
  count: {
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
};

export default MyApplications;