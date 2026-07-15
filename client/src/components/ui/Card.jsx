import { motion } from "framer-motion";

const Card = ({ children, className = "", hover = false, ...props }) => {
  const baseStyle = "bg-white rounded-2xl border border-black/5 shadow-sm";
  const hoverStyle = hover ? "transition-all duration-300 hover:shadow-premium hover:-translate-y-1 hover:border-accent/30" : "";
  
  const Component = hover ? motion.div : "div";

  return (
    <Component 
      className={`${baseStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
