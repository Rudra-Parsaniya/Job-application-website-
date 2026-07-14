const Button = ({ children, variant = "primary", type = "button", disabled = false, onClick, style, ...props }) => {
  const baseStyle = {
    padding: "12px 24px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "background-color 0.15s ease",
    fontFamily: "inherit",
    ...style,
  };

  const variants = {
    primary: {
      backgroundColor: "#0a66c2",
      color: "#ffffff",
      ":hover": { backgroundColor: "#004182" },
    },
    secondary: {
      backgroundColor: "#ffffff",
      color: "#0a66c2",
      border: "1px solid #0a66c2",
      ":hover": { backgroundColor: "#f3f2ef" },
    },
    danger: {
      backgroundColor: "#d9534f",
      color: "#ffffff",
      ":hover": { backgroundColor: "#c9302c" },
    },
    outline: {
      backgroundColor: "transparent",
      color: "#191919",
      border: "1px solid #e1e3eb",
      ":hover": { backgroundColor: "#f3f2ef", borderColor: "#191919" },
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#0a66c2",
      ":hover": { backgroundColor: "#f3f2ef" },
    },
  };

  const buttonStyle = {
    ...baseStyle,
    ...variants[variant],
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
