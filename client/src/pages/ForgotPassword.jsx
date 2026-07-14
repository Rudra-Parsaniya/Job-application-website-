import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("If an account exists with this email, a reset link has been sent.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>Enter your email to receive a password reset link</p>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.message}>{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p style={styles.linkText}>
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#f8fafc",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#1e293b",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#64748b",
    fontSize: "0.9rem",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "#dc2626",
    fontSize: "0.9rem",
    marginBottom: "10px",
    textAlign: "center",
  },
  message: {
    color: "#16a34a",
    fontSize: "0.9rem",
    marginBottom: "10px",
    textAlign: "center",
  },
  linkText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "0.9rem",
  },
};

export default ForgotPassword;
