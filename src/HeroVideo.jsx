import React, { useEffect, useRef } from 'react';

export const heroMedia = {
  video: '/assets/hero-video.mp4',
  mobileVideo: '/assets/hero-video-mobile.mp4',
  poster: '/assets/hero-video-poster.webp',
  mobilePoster: '/assets/hero-video-poster.webp',
};

export default function HeroVideo() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroMedia.video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let disposed = false;
    const update = () => {
      if (disposed || !visible || document.hidden || motion.matches) {
        video.pause();
        return;
      }
      // Do not request the video on devices with reduced motion enabled.
      if (!video.hasAttribute('src')) {
        video.src = window.matchMedia('(max-width: 700px)').matches
          ? heroMedia.mobileVideo : heroMedia.video;
      }
      video.muted = true;
      video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(rootRef.current);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      disposed = true;
      video.pause();
      observer.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return (
    <div className="hero-video-background" ref={rootRef} aria-hidden="true">
      <picture>
        <source media="(max-width: 700px)" srcSet={heroMedia.mobilePoster} />
        <img src={heroMedia.poster} width="1920" height="1280" alt="" fetchPriority="high" />
      </picture>
      {heroMedia.video && <video
        ref={videoRef}
        poster={heroMedia.poster}
        controls={false}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
      />}
    </div>
  );
}
