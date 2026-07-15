import { motion } from 'framer-motion';

const Button = ({ children, variant = "primary", type = "button", disabled = false, onClick, className = "", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md focus:ring-primary/50",
    secondary: "bg-white text-primary border border-primary/20 hover:bg-background shadow-sm focus:ring-primary/20",
    accent: "bg-accent text-white hover:bg-[#5aa3b3] shadow-sm hover:shadow-md focus:ring-accent/50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm focus:ring-red-500/50",
    outline: "bg-transparent text-primary border border-black/10 hover:border-black/20 hover:bg-black/5 focus:ring-black/10",
    ghost: "bg-transparent text-primary hover:bg-black/5 focus:ring-black/10",
  };

  const buttonStyle = `${baseStyle} ${variants[variant] || variants.primary} ${className}`;

  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonStyle}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
