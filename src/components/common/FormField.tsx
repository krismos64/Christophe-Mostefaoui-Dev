import { motion } from "framer-motion";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
  icon?: React.ReactNode;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder,
  rows = 4,
  className = "",
  icon
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  const hasError = error && touched;
  const isValid = !error && touched && value;
  const isPasswordField = type === "password";
  const actualType = isPasswordField && showPassword ? "text" : type;

  const baseInputClasses = `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
    bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-0 relative z-0
  `;

  const borderClasses = hasError
    ? "border-red-400 focus:border-red-500"
    : isValid
    ? "border-green-400 focus:border-green-500"
    : isFocused
    ? "border-blue-500 focus:border-blue-600"
    : "border-gray-300 dark:border-gray-600 focus:border-blue-500";

  const shadowClasses = hasError
    ? "focus:shadow-lg focus:shadow-red-500/20"
    : isValid
    ? "focus:shadow-lg focus:shadow-green-500/20"
    : "focus:shadow-lg focus:shadow-blue-500/20";

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Floating Label - Only show if label is provided */}
      {label && (
        <motion.label
          htmlFor={name}
          className={`
            absolute left-4 transition-all duration-300 pointer-events-none z-10
            ${isFocused || value
              ? "-top-2 text-xs px-2 rounded shadow-sm"
              : "top-3 text-sm"
            }
            ${hasError
              ? "text-red-500"
              : isValid
              ? "text-green-500"
              : isFocused
              ? "text-blue-500"
              : "text-gray-500 dark:text-gray-400"
            }
          `}
          style={{
            backgroundColor: isFocused || value 
              ? theme === 'dark' 
                ? 'rgb(17 24 39)' 
                : 'rgb(255 255 255)' 
              : 'transparent'
          }}
          animate={{
            y: isFocused || value ? 0 : 0,
            scale: isFocused || value ? 1 : 1,
          }}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </motion.label>
      )}

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {/* Input/Textarea */}
        {type === "textarea" ? (
          <motion.textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            rows={rows}
            className={`${baseInputClasses} ${borderClasses} ${shadowClasses} ${
              icon ? "pl-10" : ""
            } resize-none`}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        ) : (
          <motion.input
            type={actualType}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className={`${baseInputClasses} ${borderClasses} ${shadowClasses} ${
              icon ? "pl-10" : ""
            } ${isPasswordField ? "pr-10" : ""}`}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {/* Password Toggle */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}

        {/* Validation Icons */}
        {touched && (
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {hasError ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : isValid ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : null}
          </motion.div>
        )}
      </div>

      {/* Error Message */}
      <motion.div
        className="min-h-[20px] mt-1"
        initial={false}
        animate={{ height: hasError ? "auto" : 0 }}
      >
        {hasError && (
          <motion.p
            className="text-red-500 text-xs flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </motion.p>
        )}
      </motion.div>

      {/* Glowing Border Effect */}
      {isFocused && (
        <motion.div
          className={`absolute inset-0 rounded-xl pointer-events-none ${
            hasError
              ? "bg-red-500/10"
              : isValid
              ? "bg-green-500/10"
              : "bg-blue-500/10"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
}