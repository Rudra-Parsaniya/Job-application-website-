const Container = ({ children, maxWidth = "1128px", padding = "0 24px", style, ...props }) => {
  const containerStyle = {
    maxWidth,
    margin: "0 auto",
    padding,
    width: "100%",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div style={containerStyle} {...props}>
      {children}
    </div>
  );
};

export default Container;
