import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "jobseeker") {
        navigate("/jobseeker/dashboard");
      } else {
        navigate("/company/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Container>
        <div style={styles.content}>
          <div style={styles.leftPanel}>
            <h1 style={styles.title}>Sign in</h1>
            <p style={styles.subtitle}>Stay updated on your professional world</p>

            {error && <div style={styles.error}>{error}</div>}

            <form style={styles.form} onSubmit={handleSubmit}>
              <Input
                label="Email or phone"
                type="email"
                name="email"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="6+ characters"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div style={styles.forgotPassword}>
                <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
              </div>

              <Button type="submit" disabled={loading} style={styles.button}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>

          <div style={styles.rightPanel}>
            <div style={styles.rightContent}>
              <h2 style={styles.rightTitle}>New to <span style={{color: '#007bff'}}>CareerPoint</span> ?</h2>
              <p style={styles.rightText}>
                Discover new opportunities, connect with professionals, and advance your career.
              </p>
              <Link to="/register">
                <Button variant="outline" style={styles.rightButton}>
                  Join now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 52px)",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0",
    maxWidth: "1128px",
    margin: "0 auto",
    width: "100%",
    minHeight: "600px",
  },
  leftPanel: {
    padding: "48px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#191919",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "32px",
    color: "#666666",
  },
  error: {
    backgroundColor: "#fde8e8",
    color: "#c53030",
    padding: "12px 16px",
    borderRadius: "4px",
    marginBottom: "24px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: "24px",
  },
  forgotLink: {
    color: "#0a66c2",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
  },
  button: {
    width: "100%",
  },
  rightPanel: {
    backgroundColor: "#f3f2ef",
    padding: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightContent: {
    maxWidth: "400px",
  },
  rightTitle: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#191919",
  },
  rightText: {
    fontSize: "16px",
    marginBottom: "32px",
    color: "#666666",
    lineHeight: "1.6",
  },
  rightButton: {
    width: "100%",
  },
};

export default Login;