import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 600); // Start fading out after 600ms

    const unmountTimeout = setTimeout(() => {
      setIsMounted(false);
    }, 1200); // Unmount after CSS transition completes (600ms + 600ms)
    
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(unmountTimeout);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`loader-screen ${isFading ? 'hidden' : ''}`} aria-label="Loading portfolio">
      <div className="loader-ring"></div>
    </div>
  );
};

export default Loader;
