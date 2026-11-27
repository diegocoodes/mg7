import React from "react";
import { business } from "./content.js";

export default function ContactMap() {
  const destination = encodeURIComponent(
    `${business.address}, ${business.city}, ${business.postalCode}, Brasil`,
  );

  return (
    <section className="contact-map" aria-labelledby="map-title">
      <div className="contact-map-heading">
        <div>
          <h3 id="map-title">VENHA ATÉ A MG’7.</h3>
          <address>
            {business.address}
            <br />
            {business.city} · CEP {business.postalCode}
          </address>
        </div>
        <a
          className="button button-outline"
          href={`https://www.google.com/maps/dir/?api=1&destination=${destination}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Como chegar
          <span className="sr-only"> pelo Google Maps (abre em nova aba)</span>
        </a>
      </div>
      <iframe
        className="contact-map-frame"
        title={`Localização da ${business.name} em ${business.city}`}
        src={`https://www.google.com/maps?q=${destination}&z=16&hl=pt-BR&output=embed`}
        width="1200"
        height="380"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
