import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

const Input = forwardRef(({ label, type = "text", placeholder, value, onChange, error, required = false, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 mb-4 w-full">
      {label && (
        <label className="text-[13px] font-semibold text-primary/80 ml-0.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white/50 text-[14px] text-primary transition-all duration-200 outline-none
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
              : 'border-black/10 focus:border-accent focus:ring-4 focus:ring-accent/10 hover:border-black/20'
            }
            ${className}`}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={16} />
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500 ml-0.5 mt-0.5 font-medium">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
