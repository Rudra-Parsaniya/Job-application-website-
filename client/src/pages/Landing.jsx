import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

// Add Google Fonts import
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const Landing = () => {
  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <Container>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}> 
              Find the right job or internship for you with <span style={{color: '#007bff', fontFamily: "'Noto Sans', sans-serif"}}>CareerPoint</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Connecting millions of job seekers with opportunities
            </p>
            <div style={styles.heroButtons}>
              <Link to="/register">
                <Button>Get started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section style={styles.browse}>
  <Container>
    <h2 style={styles.sectionTitle}>Why Only This Platform?</h2>

    <p style={{ ...styles.heroSubtitle, maxWidth: '1000px', margin: '0 auto 48px', textAlign: 'center' }}>
      Because job hunting shouldn't feel like shouting into the void. We connect ambitious talent
      with companies actively looking to hire — not just another listings board, but a smart tracker
      that keeps you organized, follows up on your behalf, and matches you with roles that actually
      fit your skills. For recruiters, it means faster access to serious, pre-qualified candidates
      instead of endless resume noise.
    </p>

    <div style={styles.bulletList}>
      <div style={styles.bulletItem}>
        <span style={styles.bullet}>•</span>
        <div style={styles.bulletContent}>
          <span style={styles.bulletHeading}>Smart Job Tracking</span>
          <span style={styles.bulletDescription}>Track every application effortlessly</span>
        </div>
      </div>
      <div style={styles.bulletItem}>
        <span style={styles.bullet}>•</span>
        <div style={styles.bulletContent}>
          <span style={styles.bulletHeading}>Perfect-Fit Matching</span>
          <span style={styles.bulletDescription}>Right candidates, right roles, faster</span>
        </div>
      </div>
      <div style={styles.bulletItem}>
        <span style={styles.bullet}>•</span>
        <div style={styles.bulletContent}>
          <span style={styles.bulletHeading}>Real-Time Updates</span>
          <span style={styles.bulletDescription}>Never miss a status change</span>
        </div>
      </div>
      <div style={styles.bulletItem}>
        <span style={styles.bullet}>•</span>
        <div style={styles.bulletContent}>
          <span style={styles.bulletHeading}>Built for Both Sides</span>
          <span style={styles.bulletDescription}>One platform, two success stories</span>
        </div>
      </div>
    </div>
  </Container>
</section>

      <section style={styles.features}>
        <Container>
          <h2 style={styles.sectionTitle}>Easy to Use</h2>
          <div style={styles.featureList}>
            <div style={styles.feature}>
              <div style={styles.featureNumber}>1</div>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Create a profile</h3>
                <p style={styles.featureText}>
                  Build your profile and let recruiters find you. Showcase your skills and experience.
                </p>
              </div>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureNumber}>2</div>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Search jobs</h3>
                <p style={styles.featureText}>
                  Browse thousands of job listings from top companies. Filter by location, salary, and more.
                </p>
              </div>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureNumber}>3</div>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Apply easily</h3>
                <p style={styles.featureText}>
                  Apply to jobs with one click. Track your applications and get updates in real-time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section style={styles.cta}>
        <Container>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to find your next opportunity?</h2>
            <p style={styles.ctaText}>
              Join millions of professionals who are already using CareerPoint to advance their careers.
            </p>
            <Link to="/register">
              <Button>Join now</Button>
            </Link>
          </div>
        </Container>
      </section>

      <footer style={styles.footer}>
        <Container>
          <div style={styles.footerGrid}>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>CareerPoint</h4>
              <p style={styles.footerText}>
                Connecting job seekers with opportunities worldwide.
              </p>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>For Job Seekers</h4>
              <Link to="#" style={styles.footerLink}>Browse Jobs</Link>
              <Link to="#" style={styles.footerLink}>Career Advice</Link>
              <Link to="#" style={styles.footerLink}>Salary Guide</Link>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>For Employers</h4>
              <Link to="#" style={styles.footerLink}>Post a Job</Link>
              <Link to="#" style={styles.footerLink}>Pricing</Link>
              <Link to="#" style={styles.footerLink}>Resources</Link>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>Company</h4>
              <Link to="#" style={styles.footerLink}>About Us</Link>
              <Link to="#" style={styles.footerLink}>Contact</Link>
              <Link to="#" style={styles.footerLink}>Privacy Policy</Link>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.copyright}>© 2024 CareerPoint. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#ffffff",
    color: "#191919",
  },
  hero: {
    padding: "96px 0 80px",
    backgroundColor: "#f3f2ef",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "56px",
    fontWeight: "700",
    lineHeight: "1.1",
    marginBottom: "24px",
    color: "#191919",
  },
  heroSubtitle: {
    fontSize: "24px",
    lineHeight: "1.4",
    marginBottom: "32px",
    color: "#191919",
    fontFamily: "'Manrope', sans-serif",
  },
  heroButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  browse: {
    padding: "80px 0",
    borderBottom: "1px solid #e1e3eb",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "40px",
    color: "#191919",
  },
  bulletList: {
    maxWidth: "800px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  },
  bulletItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  bullet: {
    fontSize: "24px",
    color: "#0a66c2",
    fontWeight: "700",
    lineHeight: "1",
  },
  bulletContent: {
    display: "flex",
    flexDirection: "column",
 },
  bulletHeading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#191919",
    fontFamily: "'Manrope', sans-serif",
  },
  bulletDescription: {
    fontSize: "16px",
    color: "#666666",
    fontFamily: "'Manrope', sans-serif",
    marginTop: "4px",
  },
  features: {
    padding: "80px 0",
    backgroundColor: "#ffffff",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  feature: {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  },
  featureNumber: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#0a66c2",
    lineHeight: "1",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#191919",
  },
  featureText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#666666",
    fontFamily: "'Manrope', sans-serif",
  },
  cta: {
    padding: "96px 0",
    backgroundColor: "#f3f2ef",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#191919",
  },
  ctaText: {
    fontSize: "20px",
    marginBottom: "32px",
    color: "#666666",
    fontFamily: "'Manrope', sans-serif",
  },
  footer: {
    padding: "64px 0 32px",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e1e3eb",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "48px",
    marginBottom: "48px",
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  footerTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#191919",
  },
  footerText: {
    fontSize: "14px",
    color: "#666666",
    lineHeight: "1.6",
    fontFamily: "'Manrope', sans-serif",
  },
  footerLink: {
    fontSize: "14px",
    color: "#666666",
    textDecoration: "none",
    transition: "color 0.15s ease",
    fontFamily: "'Manrope', sans-serif",
  },
  footerBottom: {
    paddingTop: "32px",
    borderTop: "1px solid #e1e3eb",
  },
  copyright: {
    fontSize: "14px",
    color: "#666666",
    fontFamily: "'Manrope', sans-serif",
  },
};

export default Landing;