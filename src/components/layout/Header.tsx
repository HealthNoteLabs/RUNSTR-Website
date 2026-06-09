"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container, Button } from "@/components/ui";
import { navLinks } from "@/lib/constants";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/70 backdrop-blur-xl border-b border-[var(--border)]/50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/no-burnout-logo.png"
              alt="No Burnout"
              width={40}
              height={40}
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-display text-2xl tracking-wide text-[var(--accent)]">
              NO BURNOUT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 relative inline-flex items-center gap-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[var(--accent)] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
                {"badge" in link && link.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-black bg-[var(--accent)] rounded-full px-1.5 py-0.5 leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="/ember" size="sm">
              Get Ember
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--border)]/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2"
                >
                  {link.label}
                  {"badge" in link && link.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-black bg-[var(--accent)] rounded-full px-1.5 py-0.5 leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Button href="/ember" size="sm" className="mt-2">
                Get Ember
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
