import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>JobTracker</h2>
        <div>
          <Link to="/login" style={styles.navButton}>Login</Link>
          <Link to="/register" style={styles.navButtonPrimary}>Register</Link>
        </div>
      </nav>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Jobs. Post Jobs. Track Everything.</h1>
        <p style={styles.heroSubtitle}>
          A simple platform connecting job seekers with companies — apply to jobs,
          track your applications, and manage hiring, all in one place.
        </p>
        <Link to="/register" style={styles.ctaButton}>Get Started</Link>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3>For Job Seekers</h3>
          <p>Search and filter jobs, apply in one click, and track your application status in real time.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>For Companies</h3>
          <p>Post job openings, review applicants, and manage hiring status all from one dashboard.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>Smart Recommendations</h3>
          <p>Job seekers get jobs recommended based on their own skills automatically.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #eee",
  },
  logo: {
    margin: 0,
    color: "#2563eb",
  },
  navButton: {
    marginRight: "15px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  navButtonPrimary: {
    textDecoration: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "500",
  },
  hero: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "#f8fafc",
  },
  heroTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#1e293b",
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    maxWidth: "600px",
    margin: "0 auto 30px auto",
  },
  ctaButton: {
    textDecoration: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "1rem",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "60px 40px",
    flexWrap: "wrap",
  },
  featureCard: {
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "25px",
    maxWidth: "280px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
};

export default Landing;