import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="16" cy="14" r="3" fill="#3B6AFF" />
        <circle cx="10" cy="20" r="2.5" fill="#7C3BFF" />
        <circle cx="22" cy="20" r="2.5" fill="#4ECDC4" />
        <path
          d="M16 14L10 20M16 14L22 20M10 20L22 20"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
      {!iconOnly && (
        <span className="text-[15px] font-bold tracking-[0.12em] text-nexora-text-primary">
          NEXORA
        </span>
      )}
    </div>
  );
};

export default Logo;
