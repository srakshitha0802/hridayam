import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#D3E5FD]/40 via-white to-[#84ADEB]/30 text-[#1E428E] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <GoogleIcon name="menu_book" size={28} className="text-[#3869C3] mb-2" />
        <span className="font-display text-sm font-semibold tracking-tight max-w-[22ch]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}