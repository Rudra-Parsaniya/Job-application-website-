import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

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

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm("Delete this job? All applications for it will also be removed.");
    if (!confirmed) return;

    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div style={styles.container}>
      <Container>
        <div style={styles.header}>
          <h2 style={styles.title}>My Posted Jobs</h2>
          <Link to="/company/post-job">
            <Button>+ Post New Job</Button>
          </Link>
        </div>

        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : jobs.length === 0 ? (
          <p style={styles.noJobs}>You haven't posted any jobs yet.</p>
        ) : (
          <div style={styles.jobList}>
            {jobs.map((job) => (
              <Card key={job._id} style={styles.jobCard}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <p style={styles.jobDescription}>{job.description}</p>
                <p style={styles.jobDetails}>
                  <strong>Location:</strong> {job.location} | <strong>Type:</strong> {job.jobType}
                </p>
                <div style={styles.actions}>
                  <Link to={`/company/jobs/${job._id}/applicants`}>
                    <Button variant="secondary">View Applicants</Button>
                  </Link>
                  <Link to={`/company/jobs/${job._id}/edit`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(job._id)}>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
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
    color: "#191919",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
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
    marginBottom: "12px",
    lineHeight: "1.6",
  },
  jobDetails: {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "16px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
};

export default CompanyDashboard;