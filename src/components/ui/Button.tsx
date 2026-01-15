import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg";

  const variants = {
    primary: "bg-[var(--accent)] text-black hover:bg-[var(--accent-light)]",
    secondary: "bg-[var(--background-card)] text-white hover:bg-[var(--background-card-hover)] border border-[var(--border)]",
    outline: "bg-transparent text-[var(--accent)] border-2 border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
