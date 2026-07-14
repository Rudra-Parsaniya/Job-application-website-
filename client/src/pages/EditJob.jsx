import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    salary: "",
    jobType: "Full-time",
    experienceRequired: "",
    skillsRequired: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get("/jobs/my");
        const job = response.data.jobs.find((j) => j._id === jobId);
        if (!job) {
          setError("Job not found");
          return;
        }
        setFormData({
          title: job.title,
          description: job.description,
          location: job.location,
          category: job.category,
          salary: job.salary,
          jobType: job.jobType,
          experienceRequired: job.experienceRequired || "",
          skillsRequired: job.skillsRequired || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load job");
      } finally {
        setFetching(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.put(`/jobs/${jobId}`, formData);
      navigate("/company/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p style={styles.container}>Loading...</p>;

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <Link to="/company/dashboard" style={styles.backLink}>← Back to Dashboard</Link>
        <h2>Edit Job</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Software Development)"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <select name="jobType" value={formData.jobType} onChange={handleChange} style={styles.input}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          name="experienceRequired"
          placeholder="Experience Required (e.g. 1-3 years)"
          value={formData.experienceRequired}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills Required (comma separated)"
          value={formData.skillsRequired}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default EditJob;
