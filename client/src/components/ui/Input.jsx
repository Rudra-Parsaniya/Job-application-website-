const Input = ({ label, type = "text", placeholder, value, onChange, required = false, style, ...props }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginBottom: "16px",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#191919",
  };

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #e1e3eb",
    fontSize: "14px",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    outline: "none",
    fontFamily: "inherit",
    ":focus": {
      borderColor: "#0a66c2",
      boxShadow: "0 0 0 2px rgba(10, 102, 194, 0.1)",
    },
    ...style,
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        {...props}
      />
    </div>
  );
};

export default Input;
