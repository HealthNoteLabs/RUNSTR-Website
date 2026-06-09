"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/validation";
import { Button } from "./Button";

type Status = "idle" | "submitting" | "success" | "error";

export function EmailSignup({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: email.trim().toLowerCase() });

    if (error) {
      // Unique-violation = already subscribed; treat as success.
      if (error.code === "23505") {
        setStatus("success");
        setMessage("You're already on the list. Go the distance.");
        return;
      }
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }
    setStatus("success");
    setMessage("You're in. Work hard, last longer.");
    setEmail("");
  }

  if (status === "success") {
    return (
      <p className={`text-[var(--accent)] font-medium ${className}`}>{message}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-md ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 px-4 py-3 rounded-lg bg-[var(--background-card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <Button onClick={() => {}} disabled={status === "submitting"}>
          {status === "submitting" ? "Joining..." : "Subscribe"}
        </Button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{message}</p>
      )}
    </form>
  );
}
