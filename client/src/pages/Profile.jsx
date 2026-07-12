import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/me");
      setProfile(response.data.user);
      setFormData(response.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await api.put("/users/me", formData);
      setProfile(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await api.delete("/users/me");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p style={styles.container}>Loading...</p>;
  if (!profile) return <p style={styles.container}>Could not load profile.</p>;

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleUpdate}>
        <h2>My Profile</h2>

        {message && <p style={styles.message}>{message}</p>}

        <label style={styles.label}>Email (cannot be changed)</label>
        <input type="email" value={profile.email} disabled style={styles.inputDisabled} />

        <label style={styles.label}>
          {profile.role === "company" ? "Company Name" : "Full Name"}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Bio / About</label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          style={styles.textarea}
        />

        {profile.role === "jobseeker" && (
          <>
            <label style={styles.label}>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. React, Node.js, MongoDB"
              value={formData.skills || ""}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Resume Link</label>
            <input
              type="text"
              name="resumeLink"
              placeholder="https://..."
              value={formData.resumeLink || ""}
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        {profile.role === "company" && (
          <>
            <label style={styles.label}>Company Website</label>
            <input
              type="text"
              name="companyWebsite"
              placeholder="https://..."
              value={formData.companyWebsite || ""}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Industry</label>
            <input
              type="text"
              name="industry"
              placeholder="e.g. IT Services"
              value={formData.industry || ""}
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        <button type="submit" style={styles.button}>Save Changes</button>
        <button type="button" onClick={handleDelete} style={styles.deleteButton}>
          Delete Account
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "0.85rem",
    color: "#475569",
    marginTop: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  inputDisabled: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#f1f5f9",
    color: "#64748b",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "60px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
  },
  deleteButton: {
    padding: "12px",
    backgroundColor: "#fff",
    color: "#dc2626",
    border: "1px solid #dc2626",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  message: {
    color: "#16a34a",
    fontWeight: "600",
    textAlign: "center",
  },
};

export default Profile;