import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
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
      await api.post("/auth/register", formData);
      navigate("/login");
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
            <h1 style={styles.title}>Join CareerPoint</h1>
            <p style={styles.subtitle}>Create your account and start your journey</p>

            {error && <div style={styles.error}>{error}</div>}

            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.roleSelector}>
                <label style={styles.roleLabel}>I want to:</label>
                <div style={styles.roleButtons}>
                  <button
                    type="button"
                    style={formData.role === "jobseeker" ? styles.roleButtonActive : styles.roleButton}
                    onClick={() => setFormData({ ...formData, role: "jobseeker" })}
                  >
                    Find a job
                  </button>
                  <button
                    type="button"
                    style={formData.role === "company" ? styles.roleButtonActive : styles.roleButton}
                    onClick={() => setFormData({ ...formData, role: "company" })}
                  >
                    Hire talent
                  </button>
                </div>
              </div>

              <Input
                label={formData.role === "company" ? "Company name" : "First name"}
                type="text"
                name="name"
                placeholder=""
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Last name"
                type="text"
                name="lastName"
                placeholder=""
                value={formData.lastName || ""}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required={formData.role === "jobseeker"}
                style={{ display: formData.role === "company" ? "none" : "block" }}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password (6+ characters)"
                type="password"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                required
              />

              <p style={styles.agreement}>
                By clicking Agree & Join, you agree to the CareerPoint{" "}
                <Link to="#" style={styles.link}>User Agreement</Link>,{" "}
                <Link to="#" style={styles.link}>Privacy Policy</Link>, and{" "}
                <Link to="#" style={styles.link}>Cookie Policy</Link>.
              </p>

              <Button type="submit" disabled={loading} style={styles.button}>
                {loading ? "Creating account..." : "Agree & Join"}
              </Button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Already on CareerPoint? <Link to="/login" style={styles.link}>Sign in</Link>
              </p>
            </div>
          </div>

          <div style={styles.rightPanel}>
            <div style={styles.rightContent}>
              <h2 style={styles.rightTitle}>Search for jobs</h2>
              <p style={styles.rightText}>
                Explore thousands of job opportunities from top companies worldwide.
              </p>
              <div style={styles.benefits}>
                <div style={styles.benefit}>
                  <span style={styles.bullet}>•</span>
                  <span style={styles.benefitText}>Advanced job search filters</span>
                </div>
                <div style={styles.benefit}>
                  <span style={styles.bullet}>•</span>
                  <span style={styles.benefitText}>Personalized job recommendations</span>
                </div>
                <div style={styles.benefit}>
                  <span style={styles.bullet}>•</span>
                  <span style={styles.benefitText}>Application tracking dashboard</span>
                </div>
                <div style={styles.benefit}>
                  <span style={styles.bullet}>•</span>
                  <span style={styles.benefitText}>Direct messaging with employers</span>
                </div>
              </div>
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
  roleSelector: {
    marginBottom: "24px",
  },
  roleLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#191919",
    marginBottom: "8px",
    display: "block",
  },
  roleButtons: {
    display: "flex",
    gap: "12px",
  },
  roleButton: {
    flex: 1,
    padding: "8px 16px",
    borderRadius: "4px",
    border: "1px solid #e1e3eb",
    backgroundColor: "#ffffff",
    color: "#666666",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  roleButtonActive: {
    flex: 1,
    padding: "8px 16px",
    borderRadius: "4px",
    border: "2px solid #0a66c2",
    backgroundColor: "#ffffff",
    color: "#0a66c2",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  agreement: {
    fontSize: "12px",
    color: "#666666",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  button: {
    width: "100%",
  },
  footer: {
    marginTop: "24px",
  },
  footerText: {
    fontSize: "14px",
    color: "#666666",
  },
  link: {
    color: "#0a66c2",
    textDecoration: "none",
    fontWeight: "600",
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
  benefits: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  benefit: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  bullet: {
    fontSize: "20px",
    color: "#0a66c2",
  },
  benefitText: {
    fontSize: "14px",
    color: "#666666",
  },
};

export default Register;