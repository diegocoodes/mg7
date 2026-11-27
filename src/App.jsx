import React, { useEffect, useRef, useState } from "react";
import { business, services, gallery, whatsappUrl } from "./content.js";
import { reviews, reviewsSource } from "./reviews.js";
import ServiceVideo from "./ServiceVideo.jsx";
import InkBackground from './InkBackground';
import HeroVideo from './HeroVideo';
import useSiteMotion from './useSiteMotion';
import AnimatedLogo from './AnimatedLogo';
import SiteIntro from './SiteIntro';
import ContactMap from './ContactMap';

function Icon({ name, className = "" }) {
  const paths = {
    shield: (
      <>
        <path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />
      </>
    ),
    window: (
      <>
        <path d="M3 19V7a2 2 0 0 1 2-2h11l5 9v5H3Z" />
        <path d="M3 14h18M8 5v9" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    plus: <path d="M12 4v16M4 12h16" />,
    close: <path d="m5 5 14 14M5 19 19 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    message: (
      <>
        <path d="M21 11a9 9 0 0 1-9 9H4l-3 2 2-6a9 9 0 1 1 18-5Z" />
        <path d="M7 9h10M7 13h6" />
      </>
    ),
    whatsapp: (
      <path
        fill="currentColor"
        stroke="none"
        d="M20.4 3.6A11.7 11.7 0 0 0 2 17.7L.5 23.5l6-1.6A11.7 11.7 0 0 0 20.4 3.6ZM12 21a9.4 9.4 0 0 1-4.8-1.3l-.4-.2-3.5.9.9-3.4-.3-.5A9.5 9.5 0 1 1 12 21Zm5.2-7.1c-.3-.1-1.7-.8-1.9-.9s-.4-.1-.6.2-.7.9-.9 1-.3.2-.6.1a7.6 7.6 0 0 1-3.8-3.3c-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.5L9.4 6.7c-.2-.5-.5-.4-.6-.4H8.3c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1.1 2.7 1.3 2.9 2 3.1 4.9 4.3c1.8.8 2.5.8 3.4.6.6-.1 1.7-.7 1.9-1.4s.2-1.3.2-1.4-.3-.2-.6-.4Z"
      />
    ),
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.spark}
    </svg>
  );
}

function Brand({ footer = false }) {
  return (
    <a
      className={`brand${footer ? " brand-footer" : ""}`}
      href="#inicio"
      aria-label="MG’7 Studio Detail — início"
    >
      <img
        className="brand-logo"
        src="/assets/mg7-logo.webp"
        width="560"
        height="313"
        alt="MG’7 Studio Detail — logotipo vermelho e dourado com silhueta de carro e cinco estrelas"
      />
    </a>
  );
}

function WhatsAppLink({ children, service = "", className = "", icon = true }) {
  return (
    <a
      className={`button ${className}`}
      href={whatsappUrl(service)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && <Icon name="whatsapp" />}
      {children || "Solicitar orçamento"}
    </a>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p className={`section-label${light ? " label-light" : ""}`}>
      <span aria-hidden="true">[</span> {children}{" "}
      <span aria-hidden="true">]</span>
    </p>
  );
}

function SketchStar({ className = "" }) {
  return (
    <svg
      className={`sketch-star ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m49 5 5 31L83 9 65 42l31 7-31 9 21 27-31-18-8 29-7-32L9 82l24-27-29-9 31-6L19 16l25 18Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="m23 48 51 4M47 24l4 51" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onOutside = (event) => {
      if (!event.target.closest(".site-header")) setOpen(false);
    };
    const media = window.matchMedia("(min-width: 901px)");
    const onMedia = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onOutside);
    media.addEventListener("change", onMedia);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onOutside);
      media.removeEventListener("change", onMedia);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="reading-progress" aria-hidden="true"><span /></div>
      <div className="container header-inner">
        <nav className="nav-left" aria-label="Serviços e trabalhos">
          <a href="#servicos">Serviços</a>
          <a href="#trabalhos">Trabalhos</a>
        </nav>
        <Brand />
        <div className="header-right">
          <nav className="nav-right" aria-label="Sobre e contato">
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>
          <WhatsAppLink className="button-small" icon={false}>
            Solicitar orçamento
          </WhatsAppLink>
        </div>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-controls="mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Navegação no celular"
        hidden={!open}
      >
        {[
          ["Início", "inicio"],
          ["Serviços", "servicos"],
          ["Trabalhos", "trabalhos"],
          ["Sobre", "sobre"],
          ["Contato", "contato"],
        ].map(([title, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {title}
          </a>
        ))}
        <WhatsAppLink>Solicitar orçamento</WhatsAppLink>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero hero-video-section" id="inicio" aria-labelledby="hero-title">
      <HeroVideo />
      <div className="hero-title-wrap">
        <h1
          id="hero-title"
          aria-label="Proteção premium"
        >
          <span className="hero-word">
            <span aria-hidden="true">{Array.from('PROTEÇÃO').map((letter, index) => (
              <span key={index} className="motion-letter" style={{'--letter-index': index}}>{letter}</span>
            ))}</span>
            <span className="sr-only">PROTEÇÃO</span>
          </span>
          <span className="hero-word hero-premium">
            PREMIUM<span className="hero-period">.</span>
          </span>
        </h1>
        <SketchStar className="hero-star" />
        <div className="cert-sticker">
          <Icon name="shield" />
          <span>
            PPF CERTIFIED
            <strong>
              GYEON<sup>®</sup>
            </strong>
          </span>
        </div>
        <div className="hero-actions">
          <WhatsAppLink>Solicitar orçamento pelo WhatsApp</WhatsAppLink>
          <a className="subtle-link" href="#servicos">
            Conhecer os serviços
            <Icon name="plus" />
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="sobre" aria-labelledby="about-title">
      <div className="container">
        <SectionLabel>ESSÊNCIA MG’7</SectionLabel>
        <h2 className="manifesto" id="about-title">
          <span className="motion-line">QUEM VALORIZA</span>
          <br />
          <span className="motion-line">SEU CARRO, <span className="marker">CUIDA.</span></span>
          <br />
          <span className="motion-line">QUEM CUIDA, <span className="outline-text">PROTEGE.</span></span>
          <br />
          <span className="manifesto-last motion-line">
            A GENTE ENTENDE <span className="marker">ISSO.</span>
          </span>
        </h2>
        <div className="about-bottom">
          <AnimatedLogo />
          <div className="about-copy">
            <p>
              Somos a <strong>MG’7 Studio Detail.</strong> Especialistas em
              proteção automotiva em Vila Velha, com atenção aos detalhes e foco
              na qualidade de cada aplicação.
            </p>
            <p>
              Do primeiro contato ao acabamento, entendemos o que seu veículo
              precisa para orientar a escolha da proteção.
            </p>
            <a className="subtle-link" href="#contato">
              Vamos cuidar do seu carro?
              <Icon name="plus" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const [orientation, setOrientation] = useState("vertical");
  const tabs = useRef([]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () =>
      setOrientation(media.matches ? "horizontal" : "vertical");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const selectWithKey = (event, index) => {
    let next;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % services.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index + services.length - 1) % services.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = services.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };
  return (
    <section
      className="services-section section ink-section"
      id="servicos"
      aria-labelledby="services-title"
    >
      <InkBackground tone="red" />
      <div className="container">
        <div className="section-heading">
          <SectionLabel>O CUIDADO CERTO</SectionLabel>
          <h2 id="services-title">
            <span className="motion-line">CADA CARRO.</span>
            <br />
            <span className="marker motion-line">UMA PROTEÇÃO.</span>
          </h2>
        </div>
        <div className="services-layout">
          <div
            className="service-tabs"
            role="tablist"
            aria-label="Conheça os serviços"
            aria-orientation={orientation}
          >
            {services.map((service, index) => (
              <button
                key={service.id}
                ref={(el) => (tabs.current[index] = el)}
                id={`tab-${service.id}`}
                className={`service-tab ${active === index ? "selected" : ""}`}
                role="tab"
                aria-selected={active === index}
                aria-controls={`panel-${service.id}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => selectWithKey(event, index)}
              >
                {service.title}
                <Icon name="plus" />
              </button>
            ))}
            <p className="tabs-note">
              PROTEÇÃO.
              <br />
              BRILHO.
              <br />
              CONFORTO.
            </p>
            <SketchStar className="services-star" />
          </div>
          <div className="service-panels">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`panel-${service.id}`}
                className="service-panel"
                role="tabpanel"
                aria-labelledby={`tab-${service.id}`}
                hidden={active !== index}
                tabIndex={0}
              >
                <ServiceVideo service={service} active={active === index} />
                <div className="service-content">
                  <p className="eyebrow">{service.subtitle}</p>
                  <h3>{service.title}</h3>
                  <p className="service-phrase">{service.phrase}</p>
                  <p className="service-description">{service.description}</p>
                  <ul>
                    {service.points.map((point) => (
                      <li key={point}>
                        <Icon name="check" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {service.certified && (
                    <p className="service-cert">
                      <Icon name="shield" />
                      PPF Certified GYEON®
                    </p>
                  )}
                  <WhatsAppLink
                    service={service.title}
                    className="button-outline"
                  >
                    Quero saber mais
                  </WhatsAppLink>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="service-disclaimer">
          Produtos, condições e opções de aplicação: consulte nossa equipe. A
          certificação GYEON® apresentada se refere ao PPF.
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const open = (index, event) => {
    trigger.current = event.currentTarget;
    setSelected(index);
  };
  const close = () => {
    dialog.current?.close();
  };
  useEffect(() => {
    if (selected === null) return;
    dialog.current?.showModal();
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [selected]);
  return (
    <section
      className="gallery-section"
      id="trabalhos"
      aria-labelledby="gallery-title"
    >
      <div className="container gallery-heading">
        <SectionLabel>O DETALHE FAZ A DIFERENÇA</SectionLabel>
        <h2 id="gallery-title">
          <span className="motion-line">FEITO PARA</span>
          <br />
          <span className="marker motion-line">OLHAR DE NOVO.</span>
        </h2>
        <SketchStar className="gallery-star" />
      </div>
      <div className="gallery-band">
        <div className="gallery-grid container">
          {gallery.map((item, index) => (
            <button
              key={item.label}
              className="gallery-item"
              onClick={(event) => open(index, event)}
              aria-label={`Ampliar foto da MG’7: ${item.title}`}
            >
              <span className="gallery-image">
                <img
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="gallery-spotlight" aria-hidden="true" />
              <span className="gallery-caption">
                <small>{item.label}</small>
                <strong>{item.title}</strong>
                <span className="gallery-plus">
                  <Icon name="plus" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="container gallery-bottom">
        <p>
          Fotos públicas do perfil da MG’7 no Google Maps.
          <br className="desktop-break" /> Veja mais imagens e avaliações no
          Google.
        </p>
        <a
          className="subtle-link"
          href={reviewsSource.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="pin" />
          Ver perfil no Google Maps
        </a>
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="lightbox-caption"
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        onClose={() => {
          setSelected(null);
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <button
          className="lightbox-close"
          aria-label="Fechar fotografia"
          onClick={close}
        >
          <Icon name="close" />
        </button>
        {selected !== null && (
          <>
            <img
              src={gallery[selected].image}
              width={gallery[selected].width}
              height={gallery[selected].height}
              alt={gallery[selected].alt}
            />
            <p id="lightbox-caption">
              {gallery[selected].title}{" "}
              <a
                href={gallery[selected].sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Foto do perfil da MG’7 no Google Maps.
              </a>
            </p>
          </>
        )}
      </dialog>
    </section>
  );
}

function ReviewAvatar({ review }) {
  const [failedAvatar, setFailedAvatar] = useState(null);
  const showPhoto = review.avatarUrl && failedAvatar !== review.avatarUrl;
  return (
    <span className="review-avatar" aria-hidden="true">
      {showPhoto ? (
        <img
          src={review.avatarUrl}
          width="43"
          height="43"
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailedAvatar(review.avatarUrl)}
        />
      ) : (
        review.author
          .trim()
          .split(/\s+/)
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
      )}
    </span>
  );
}

function Reviews() {
  const [paused, setPaused] = useState(false);
  const positiveReviews = reviews.filter(
    (review) =>
      (review.rating === 4 || review.rating === 5) &&
      review.author?.trim() &&
      review.text?.trim() &&
      review.sourceUrl,
  );
  const reviewCard = (review, duplicate = false) => (
    <article
      className="review-card"
      key={`${duplicate ? "copy-" : ""}${review.id}`}
    >
      <div className="review-card-top">
        <ReviewAvatar review={review} />
        <div>
          <h3>{review.author}</h3>
          <span className="review-source-label">
            {review.isExcerpt
              ? "Trecho de avaliação no Google"
              : "Avaliação no Google Maps"}
          </span>
        </div>
        <span className="review-google" aria-hidden="true">
          G
        </span>
      </div>
      <div
        className="review-stars"
        role="img"
        aria-label={`${review.rating} de 5 estrelas`}
      >
        <span aria-hidden="true">
          {"★".repeat(review.rating)}
          <span className="review-empty-stars">
            {"★".repeat(5 - review.rating)}
          </span>
        </span>
      </div>
      <blockquote>{review.text}</blockquote>
      <a
        href={review.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={duplicate ? -1 : undefined}
      >
        Ler avaliação no Google
      </a>
    </article>
  );
  return (
    <section
      className="reviews-section"
      id="avaliacoes"
      aria-labelledby="reviews-title"
    >
      <div className="container reviews-inner">
        <Icon name="message" />
        <div>
          <SectionLabel>HISTÓRIAS REAIS</SectionLabel>
          <h2 id="reviews-title">
            <span className="motion-line">CONFIANÇA SE CONSTRÓI.</span>
            <br />
            <span className="motion-line">DETALHE POR DETALHE.</span>
          </h2>
        </div>
        <div className="reviews-actions">
          <a
            className="subtle-link"
            href={reviewsSource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Leia as avaliações no Google
          </a>
          {positiveReviews.length > 0 && (
            <button
              type="button"
              className="reviews-pause"
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "Reproduzir avaliações" : "Pausar avaliações"}
            </button>
          )}
        </div>
      </div>
      {positiveReviews.length > 0 ? (
        <div
          className={`reviews-marquee ${paused ? "is-paused" : ""}`}
          role="region"
          aria-label="Seleção de avaliações positivas de clientes"
          tabIndex={0}
          style={{
            "--reviews-duration": `${Math.max(35, positiveReviews.length * 12)}s`,
          }}
        >
          <div className="reviews-track">
            <div className="reviews-group">
              {positiveReviews.map((review) => reviewCard(review))}
            </div>
            <div
              className="reviews-group reviews-copy"
              aria-hidden="true"
              inert
            >
              {positiveReviews.map((review) => reviewCard(review, true))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container reviews-direct">
          <p>
            Conheça as experiências compartilhadas por nossos clientes no perfil
            da MG’7.
          </p>
          <a
            className="button button-outline"
            href={reviewsSource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="message" />
            Ver avaliações de clientes
          </a>
        </div>
      )}
    </section>
  );
}

function QuoteForm() {
  const [messageUrl, setMessageUrl] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name")).trim();
    const vehicle = String(values.get("vehicle")).trim();
    if (!name || !vehicle) {
      const field = form.elements.namedItem(!name ? "name" : "vehicle");
      field.setCustomValidity("Preencha este campo.");
      field.reportValidity();
      return;
    }
    const text = `Olá, ${business.name}! Meu nome é ${name}.\nVeículo: ${vehicle}.\nTenho interesse em: ${values.get("service")}.\nGostaria de solicitar um orçamento.`;
    const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
    setMessageUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <form id="quote-form" className="quote-form" onSubmit={submit}>
      <div className="form-heading">
        <p className="eyebrow">VAMOS CUIDAR DO SEU CARRO?</p>
        <h3>COMECE POR AQUI.</h3>
        <p>Preencha e continue no WhatsApp.</p>
      </div>
      <label htmlFor="name">Seu nome</label>
      <input
        id="name"
        name="name"
        placeholder="Como podemos chamar você?"
        autoComplete="given-name"
        required
        maxLength={80}
        onInput={(event) => event.currentTarget.setCustomValidity("")}
      />
      <label htmlFor="vehicle">Seu veículo</label>
      <input
        id="vehicle"
        name="vehicle"
        placeholder="Ex.: Honda Civic 2024"
        required
        maxLength={120}
        onInput={(event) => event.currentTarget.setCustomValidity("")}
      />
      <label htmlFor="service">Qual cuidado você procura?</label>
      <div className="select-wrap">
        <select id="service" name="service" required defaultValue="">
          <option value="" disabled>
            Selecione um serviço
          </option>
          <option>PPF</option>
          <option>Vitrificação</option>
          <option>Películas High Performance</option>
          <option>Quero orientação da equipe</option>
        </select>
        <Icon name="chevron" />
      </div>
      <button className="button button-dark form-submit" type="submit">
        <Icon name="whatsapp" />
        Solicitar meu orçamento
      </button>
      <p className="form-note">
        Seus dados só serão enviados quando você confirmar a mensagem no
        WhatsApp.
      </p>
      <p className="form-status" role="status" aria-live="polite">
        {messageUrl && (
          <>
            Sua mensagem está pronta.{" "}
            <a href={messageUrl} target="_blank" rel="noopener noreferrer">
              Continuar no WhatsApp
            </a>
          </>
        )}
      </p>
    </form>
  );
}

function Contact() {
  return (
    <section
      className="contact-section section ink-section"
      id="contato"
      aria-labelledby="contact-title"
    >
      <InkBackground tone="gold" />
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionLabel>SEU PRÓXIMO PASSO</SectionLabel>
          <h2 id="contact-title">
            <span className="motion-line">SEU CARRO.</span>
            <br />
            <span className="motion-line">NOSSO <span className="marker">CUIDADO.</span></span>
          </h2>
          <p>
            Conte o que você procura. Nossa equipe ajuda você a escolher o
            cuidado ideal para o seu veículo.
          </p>
          <WhatsAppLink>Conversar pelo WhatsApp</WhatsAppLink>
          <a
            className="phone-link"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {business.phone}
          </a>
          <div className="contact-details">
            <a href={business.maps} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" />
              <span>
                <strong>Vila Velha, Espírito Santo</strong>
                <span>
                  {business.address}
                  <br />
                  CEP {business.postalCode} · Ver como chegar
                </span>
              </span>
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" />
              <span>
                <strong>@mg7studiodetail</strong>
                <span>Acompanhe a MG’7 no Instagram</span>
              </span>
            </a>
          </div>
          <SketchStar className="contact-star" />
        </div>
        <QuoteForm />
        <ContactMap />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-tape" aria-hidden="true">
        <span>PROTEÇÃO EM CADA DETALHE.</span>
        <Icon name="spark" />
        <span>MG’7 STUDIO DETAIL.</span>
        <Icon name="spark" />
        <span>PROTEÇÃO EM CADA DETALHE.</span>
      </div>
      <div className="container footer-main">
        <Brand footer />
        <p>
          Para quem cuida
          <br />
          do que te move.
        </p>
        <nav aria-label="Links do rodapé">
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
        <a
          className="social-link"
          href={business.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram da MG’7"
        >
          <Icon name="instagram" />
        </a>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 MG’7 Studio Detail. Todos os direitos reservados.</p>
        <span>VILA VELHA, ESPÍRITO SANTO.</span>
      </div>
    </footer>
  );
}

export default function App() {
  useSiteMotion();
  return (
    <>
      <SiteIntro />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <aside aria-label="Contato rápido">
        <a
          className="floating-whatsapp"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Solicitar orçamento pelo WhatsApp"
        >
          <Icon name="whatsapp" />
        </a>
      </aside>
    </>
  );
}
