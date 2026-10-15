import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  label?: string;
  fallbackText?: string;
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  label,
  fallbackText,
  priority = false,
  loading,
  decoding = 'async',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const effectiveLoading = loading || (priority ? 'eager' : 'lazy');

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#161C1F] via-[#101416] to-[#0A0D0E] border border-white/5 text-[#9AA3A8] select-none ${className}`}
        style={{
          width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
          height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
          minHeight: height ? undefined : '220px',
        }}
        role="img"
        aria-label={alt || label || 'Image preview'}
      >
        <div className="w-10 h-10 mb-3 rounded-full border border-[#C9A66B]/30 flex items-center justify-center bg-[#C9A66B]/5 text-[#C9A66B]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="font-syne text-xs uppercase tracking-widest text-[#F2EFE9] text-center font-medium">
          {label || alt || 'LIVI ARCHITECTURAL VISUAL'}
        </span>
        {fallbackText && (
          <span className="text-[11px] text-[#9AA3A8] mt-1 text-center max-w-[80%]">
            {fallbackText}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={effectiveLoading}
      decoding={decoding}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
