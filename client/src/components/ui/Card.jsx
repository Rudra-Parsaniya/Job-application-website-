const Card = ({ children, style, padding = "24px", ...props }) => {
  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e1e3eb",
    padding,
    ...style,
  };

  return (
    <div style={cardStyle} {...props}>
      {children}
    </div>
  );
};

export default Card;
