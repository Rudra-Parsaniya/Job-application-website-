const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateRegister = ({ name, email, password, role }) => {
  const errors = [];
  if (!name?.trim()) errors.push("Name is required");
  if (!email?.trim()) errors.push("Email is required");
  else if (!isValidEmail(email)) errors.push("Invalid email format");
  if (!password) errors.push("Password is required");
  else if (password.length < 6) errors.push("Password must be at least 6 characters");
  if (!role || !["jobseeker", "company"].includes(role)) errors.push("Valid role is required");
  return errors;
};

const validateLogin = ({ email, password }) => {
  const errors = [];
  if (!email?.trim()) errors.push("Email is required");
  else if (!isValidEmail(email)) errors.push("Invalid email format");
  if (!password) errors.push("Password is required");
  return errors;
};

const validateJob = (body) => {
  const errors = [];
  const validJobTypes = ["Full-time", "Part-time", "Internship", "Contract"];

  if (!body.title?.trim()) errors.push("Job title is required");
  if (!body.description?.trim()) errors.push("Job description is required");
  if (!body.location?.trim()) errors.push("Location is required");
  if (!body.category?.trim()) errors.push("Category is required");
  if (body.salary === undefined || body.salary === "" || Number(body.salary) <= 0) {
    errors.push("Salary must be a positive number");
  }
  if (!body.jobType || !validJobTypes.includes(body.jobType)) {
    errors.push("Valid job type is required");
  }
  return errors;
};

const validateApplication = ({ jobId }) => {
  const errors = [];
  if (!jobId) errors.push("Job ID is required");
  return errors;
};

const validateForgotPassword = ({ email }) => {
  const errors = [];
  if (!email?.trim()) errors.push("Email is required");
  else if (!isValidEmail(email)) errors.push("Invalid email format");
  return errors;
};

const validateResetPassword = ({ token, password }) => {
  const errors = [];
  if (!token?.trim()) errors.push("Token is required");
  if (!password) errors.push("Password is required");
  else if (password.length < 6) errors.push("Password must be at least 6 characters");
  return errors;
};

module.exports = { validateRegister, validateLogin, validateJob, validateApplication, validateForgotPassword, validateResetPassword };
