import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { isWebGLAvailable } from './WebGLCapability';
import { ErrorBoundary } from './ErrorBoundary';
import { SafeImage } from '../SafeImage';

// Code-split Three.js canvas scene with React.lazy
const LazyHeroScene = lazy(() => import('./HeroGlassHouseScene'));

export const Hero3DContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender3D, setShouldRender3D] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check WebGL support
    if (!isWebGLAvailable()) {
      setShouldRender3D(false);
      return;
    }

    // 2. Check mobile viewport (< 768px)
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setShouldRender3D(false);
      return;
    }

    // 3. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    setShouldRender3D(true);

    // 4. Track off-screen visibility via IntersectionObserver to pause rendering
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShouldRender3D(false);
      } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setShouldRender3D(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const staticFallback = (
    <div className="w-full h-full relative">
      <SafeImage
        src="/images/hero-home.webp"
        alt="Cinematic glass villa at dusk in Lahore"
        width={1600}
        height={900}
        priority
        className="w-full h-full object-cover brightness-[0.72] contrast-[1.08]"
      />
    </div>
  );

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {shouldRender3D ? (
        <ErrorBoundary fallback={staticFallback}>
          <Suspense fallback={staticFallback}>
            <LazyHeroScene inView={inView} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        staticFallback
      )}
    </div>
  );
};
