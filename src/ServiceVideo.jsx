import React, { useEffect, useRef, useState } from "react";

export default function ServiceVideo({ service, active }) {
  const playerRef = useRef(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    player.muted = true;
    if (!active) {
      player.pause();
      player.load();
      return;
    }
    let inView = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (
        document.hidden ||
        !inView ||
        motion.matches ||
        manuallyPaused.current
      ) {
        player.pause();
      } else {
        player.play().catch(() => {});
      }
    };
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
              updatePlayback();
            },
            { threshold: [0, 0.35] },
          )
        : null;
    observer?.observe(player);
    document.addEventListener("visibilitychange", updatePlayback);
    motion.addEventListener("change", updatePlayback);
    return () => {
      player.pause();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      motion.removeEventListener("change", updatePlayback);
    };
  }, [active]);

  const togglePlayback = () => {
    const player = playerRef.current;
    if (player.paused) {
      manuallyPaused.current = false;
      player.play().catch(() => {});
    } else {
      manuallyPaused.current = true;
      player.pause();
    }
  };

  return (
    <figure className={`service-photo service-video${playing ? ' is-playing' : ''}`}>
      <button
        type="button"
        className="service-video-toggle"
        onClick={togglePlayback}
        aria-label={`Reproduzir ou pausar vídeo de ${service.title}`}
        aria-pressed={playing}
        title={
          playing
            ? "Clique no vídeo para pausar"
            : "Clique no vídeo para reproduzir"
        }
      >
        <video
          ref={playerRef}
          src={active ? service.video : undefined}
          poster={service.poster}
          width="720"
          height="1280"
          controls={false}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          Seu navegador não reproduz este vídeo.
        </video>
      </button>
      <svg className="service-video-lights" aria-hidden="true" focusable="false">
        <rect className="video-edge-base" pathLength="100" />
        <rect className="video-edge-trail video-edge-red" pathLength="100" />
        <rect className="video-edge-trail video-edge-gold" pathLength="100" />
      </svg>
      <figcaption className="sr-only">
        {service.title} em ação · MG’7 Studio Detail
      </figcaption>
    </figure>
  );
}
