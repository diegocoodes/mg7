export const business = {
  name: "MG’7 Studio Detail",
  whatsapp: "5527997806961",
  phone: "(27) 99780-6961",
  instagram: "https://www.instagram.com/mg7studiodetail/",
  address: "R. Henrique Laranja, 44 — Olaria",
  city: "Vila Velha, ES",
  postalCode: "29100-350",
  maps: "https://www.google.com/maps/search/?api=1&query=R.%20Henrique%20Laranja%2C%2044%20-%20Olaria%2C%20Vila%20Velha%20-%20ES%2C%2029100-350",
};

export function whatsappUrl(service = "") {
  const message = service
    ? `Olá, ${business.name}! Tenho interesse em ${service}. Gostaria de conhecer as opções e solicitar um orçamento para meu veículo.`
    : `Olá, ${business.name}! Gostaria de solicitar um orçamento para meu veículo.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const services = [
  {
    id: "ppf",
    title: "PPF",
    subtitle: "PAINT PROTECTION FILM",
    phrase: "O original merece ser preservado.",
    description:
      "Proteção transparente para ajudar a preservar a pintura contra impactos e marcas do uso diário.",
    image: "/assets/ppf.webp",
    video: "/assets/ppf.mp4",
    poster: "/assets/ppf-poster.webp",
    videoLabel: "Vídeo de PPF da MG’7 Studio Detail",
    width: 800,
    height: 1202,
    alt: "Profissional ajustando um filme transparente de proteção sobre o capô de um Porsche. Fotografia de referência.",
    points: [
      "Proteção para a pintura",
      "Atenção ao acabamento",
      "Aplicação com cuidado e precisão",
    ],
    icon: "shield",
    certified: true,
  },
  {
    id: "vitrificacao",
    title: "Vitrificação",
    subtitle: "BRILHO & CUIDADO",
    phrase: "O brilho que revela cada detalhe.",
    description:
      "Tratamento que realça o brilho e facilita a manutenção da pintura, valorizando o acabamento do seu carro.",
    image: "/assets/coating.webp",
    video: "/assets/vitrificação.mp4",
    poster: "/assets/vitrificacao-poster.webp",
    videoLabel: "Vídeo de vitrificação da MG’7 Studio Detail",
    width: 900,
    height: 600,
    alt: "Profissional com luvas realizando o polimento de uma pintura preta com reflexos. Fotografia de referência.",
    points: [
      "Brilho em evidência",
      "Manutenção facilitada",
      "Cuidado com o acabamento",
    ],
    icon: "spark",
  },
  {
    id: "peliculas",
    title: "Películas",
    subtitle: "HIGH PERFORMANCE",
    phrase: "Mais conforto em cada trajeto.",
    description:
      "Películas de alta performance para trazer mais conforto e proteção ao interior do seu veículo, com atenção à aplicação.",
    image: "/assets/finish.webp",
    video: "/assets/pelicula.mp4",
    poster: "/assets/peliculas-poster.webp",
    videoLabel: "Vídeo de películas High Performance da MG’7 Studio Detail",
    width: 1000,
    height: 1500,
    alt: "Vista lateral de um Porsche preto com vidros escuros sob iluminação urbana. Fotografia de referência.",
    points: [
      "Conforto a bordo",
      "Proteção para o interior",
      "Atenção à aplicação",
    ],
    icon: "window",
  },
];

export const gallery = [
  {
    image: "/assets/mg7-mercedes.webp",
    width: 800,
    height: 817,
    label: "ACABAMENTO",
    title: "Reflexos que impressionam.",
    alt: "Mercedes-Benz branco no estúdio da MG’7, com iluminação geométrica refletida no capô.",
    sourceUrl: "https://www.google.com/maps?cid=1404205694537588047&hl=pt-BR",
    cachedSourceUrl: "https://img.magicpin.com/12942791_store_images_2.webp",
  },
  {
    image: "/assets/mg7-fastback.webp",
    width: 800,
    height: 1067,
    label: "CUIDADO",
    title: "Detalhes em destaque.",
    alt: "Fiat Fastback vermelho fotografado no estúdio da MG’7, sob as luzes de inspeção.",
    sourceUrl: "https://www.google.com/maps?cid=1404205694537588047&hl=pt-BR",
    cachedSourceUrl: "https://img.magicpin.com/12942791_store_images_5.webp",
  },
  {
    image: "/assets/mg7-reflexos.webp",
    width: 800,
    height: 1422,
    label: "REFLEXOS",
    title: "Brilho de perto.",
    alt: "Detalhe frontal de um Toyota cinza com as luzes geométricas da MG’7 refletidas na pintura.",
    sourceUrl: "https://www.google.com/maps?cid=1404205694537588047&hl=pt-BR",
    cachedSourceUrl: "https://img.magicpin.com/12942791_store_images_1.webp",
  },
  {
    image: "/assets/mg7-civic.webp",
    width: 800,
    height: 1067,
    label: "MG’7 STUDIO",
    title: "Cuidado em cada ângulo.",
    alt: "Honda Civic escuro no estúdio da MG’7, com o logotipo da empresa na parede ao fundo.",
    sourceUrl: "https://www.google.com/maps?cid=1404205694537588047&hl=pt-BR",
    cachedSourceUrl: "https://img.magicpin.com/12942791_store_images_3.webp",
  },
];
