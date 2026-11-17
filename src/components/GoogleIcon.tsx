import React from 'react';

interface GoogleIconProps {
  name: string;
  size?: number | string;
  filled?: boolean;
  className?: string;
  weight?: 300 | 400 | 500 | 600 | 700;
}

export const GoogleIcon: React.FC<GoogleIconProps> = ({
  name,
  size = 20,
  filled = false,
  className = '',
  weight = 400,
}) => {
  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
