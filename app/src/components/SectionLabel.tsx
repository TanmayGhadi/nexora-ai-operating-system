import React from 'react';

interface SectionLabelProps {
  text: string;
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ text, className = '' }) => {
  return (
    <span
      className={`inline-block uppercase text-[12px] font-medium tracking-[0.08em] text-nexora-text-muted bg-white/[0.04] border border-white/[0.08] rounded-lg px-[14px] py-[6px] ${className}`}
    >
      {text}
    </span>
  );
};

export default SectionLabel;
