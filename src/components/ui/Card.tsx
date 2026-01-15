interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--background-card)]
        border border-[var(--border)]
        rounded-xl
        p-6
        ${hover ? "transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--background-card-hover)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
