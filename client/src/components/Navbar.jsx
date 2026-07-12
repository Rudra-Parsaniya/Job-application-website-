import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav style={styles.navbar}>
      <h3 style={styles.logo}>JobTracker</h3>

      <div style={styles.links}>
        {user.role === "jobseeker" && (
          <>
            <Link to="/jobseeker/dashboard" style={styles.link}>Browse Jobs</Link>
            <Link to="/jobseeker/applications" style={styles.link}>My Applications</Link>
            <Link to="/jobseeker/recommended" style={styles.link}>Recommended</Link>
          </>
        )}

        {user.role === "company" && (
          <>
            <Link to="/company/dashboard" style={styles.link}>My Jobs</Link>
            <Link to="/company/post-job" style={styles.link}>Post Job</Link>
          </>
        )}

        <Link to="/profile" style={styles.link}>Profile</Link>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1e293b",
    fontFamily: "Arial, sans-serif",
  },
  logo: {
    color: "#fff",
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  link: {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  logoutButton: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Navbar;