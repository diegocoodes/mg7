import React, { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const AnodizedInk = lazy(() => import('@/components/ui/anodized-ink'));

class InkBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function InkBackground({ tone = 'red' }: { tone?: 'red' | 'gold' }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [maxDpr, setMaxDpr] = useState(0.6);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(motion.matches);
      setMaxDpr(window.matchMedia('(max-width: 700px)').matches ? 0.6 : 0.8);
    };
    sync();
    motion.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, {rootMargin: '120px'});
    observer.observe(root);
    return () => { observer.disconnect(); motion.removeEventListener('change', sync); };
  }, []);

  return (
    <div ref={rootRef} className={`ink-background ink-background-${tone}`} aria-hidden="true">
      <div className="ink-static" />
      {ready && !reduced && <InkBoundary><Suspense fallback={null}>
        <AnodizedInk
          height="100%"
          preset={tone === 'red' ? 'crimson' : 'aurum'}
          colors={{deep: '#111215', ink: tone === 'red' ? '#d71912' : '#a87815', sheen: '#e6b82e'}}
          speed={0.3}
          turbulence={0.85}
          scale={1.1}
          sheen={0.5}
          grain={0.15}
          glow={0.25}
          interactive={false}
          ripples={false}
          maxDpr={maxDpr}
          maxFps={30}
          className="ink-canvas-root"
        />
      </Suspense></InkBoundary>}
    </div>
  );
}
