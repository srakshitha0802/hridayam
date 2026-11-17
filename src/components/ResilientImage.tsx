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
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100/50 text-slate-800 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <GoogleIcon name="menu_book" size={28} className="text-pink-600 mb-2" />
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