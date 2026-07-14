import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import ViewApplicants from "./pages/ViewApplicants";
import MyApplications from "./pages/MyApplications";
import RecommendedJobs from "./pages/RecommendedJobs";
import JobDetail from "./pages/JobDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/jobseeker/dashboard"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobseeker/applications"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobseeker/recommended"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <RecommendedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <JobDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute allowedRole="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/post-job"
          element={
            <ProtectedRoute allowedRole="company">
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/jobs/:jobId/edit"
          element={
            <ProtectedRoute allowedRole="company">
              <EditJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/jobs/:jobId/applicants"
          element={
            <ProtectedRoute allowedRole="company">
              <ViewApplicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;