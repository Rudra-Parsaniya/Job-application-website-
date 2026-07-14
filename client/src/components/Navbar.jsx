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

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        CareerPoint
      </Link>

      <div style={styles.links}>
        {user ? (
          <>
            {user.role === "jobseeker" && (
              <>
                <Link to="/jobseeker/dashboard" style={styles.link}>Jobs</Link>
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
            <button onClick={handleLogout} style={styles.logoutButton}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Sign in</Link>
            <Link to="/register" style={styles.primaryButton}>Join now</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    height: "52px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e1e3eb",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    textDecoration: "none",
    color: "#0a66c2",
    fontSize: "20px",
    fontWeight: "700",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  links: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#191919",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: "color 0.15s ease",
  },
  logoutButton: {
    padding: "6px 16px",
    backgroundColor: "transparent",
    color: "#191919",
    border: "1px solid #e1e3eb",
    borderRadius: "24px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: "background-color 0.15s ease",
  },
  primaryButton: {
    padding: "6px 16px",
    backgroundColor: "#0a66c2",
    color: "#ffffff",
    border: "none",
    borderRadius: "24px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textDecoration: "none",
    transition: "background-color 0.15s ease",
  },
};

export default Navbar;