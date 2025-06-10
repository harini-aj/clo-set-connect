import React, { useEffect, useRef } from "react";

interface LoadMoreTriggerProps {
  onVisible: () => void;
}

export const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({ onVisible }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible();
      },
      { threshold: 1.0 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [onVisible]);

  return <div ref={ref} style={{ height: 1 }} />;
};
