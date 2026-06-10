import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const inputClassName =
      `${styles.input} ${error ? styles.inputError : ""}`.trim();

    return (
      <div className={`${styles.wrapper} ${className}`.trim()}>
        <label className={styles.label}>{label}</label>
        <input ref={ref} className={inputClassName} {...props} />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);
