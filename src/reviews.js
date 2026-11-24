import { reviewProfiles } from "./review-profiles.js";

// Transcrições fornecidas pelo cliente nesta conversa em 23/11/2026.
// Textos expandidos somente até onde o conteúdo recebido permite confirmar.
// As avaliações negativas e o último texto incompleto sem opinião conclusiva
// não integram esta seleção positiva. Não representa a totalidade do Google.
const sourceUrl = "https://maps.app.goo.gl/m9pNjN5modm9LonS6";
const suppliedReviews = [
  {
    id: "maysa",
    author: "Maysa",
    rating: 4,
    text: "Atendimento de excelencia e trabalho impecável da equipe , fora os produtos que são usados todos com garantia, enfim estou muito satisfeita . O maycon super atencioso e o pós deles muito satisfatório também. Me deram total atenção e assistência durante todo o serviço no meu carro!",
  },
  {
    id: "pedro-henrique-pedruzzi",
    author: "Pedro Henrique Pedruzzi",
    rating: 5,
    isExcerpt: true,
    text: "Gostaria de agradecer ao comprometimento do Maycon e de toda a equipe da MG7 Estética, levei o carro no primeiro dia de uso para instalação do insufilm nanocerâmica e da vitrificação com o vitrificador exclusivo gyeon infinite.",
  },
  {
    id: "willian-agripino",
    author: "Willian Agripino",
    rating: 5,
    isExcerpt: true,
    text: "Confiar um carro zero km nas mãos de alguém exige total segurança, e entregar o meu SUV aos cuidados do Maycon na MG7 Estética Automotiva foi a melhor escolha que eu poderia ter feito.",
  },
  {
    id: "leandro-affonso",
    author: "LEANDRO AFFONSO",
    rating: 5,
    text: "Serviço impecável! Profissionalismo, excelência e atenção aos mínimos detalhes. Resultado de altíssimo nível, superando as expectativas. A MG7 está de parabéns! Carimbo a indicação!",
  },
  {
    id: "marcio-luiz",
    author: "Marcio Luiz",
    rating: 5,
    isExcerpt: true,
    text: "Extremamente satisfeito com todos os serviços e atendimento da Equipe MG7, meus agradecimentos ao Maycon, Marquinhos e Evandro pela excelência e profissionalismo, tudo feito com muito capricho e atenção aos mínimos detalhes…",
  },
  {
    id: "rodrigo-cereja",
    author: "Rodrigo Cereja",
    rating: 5,
    text: "Fiz uma vitrificação completa em meu carro, e sai da loja extremamente satisfeito! O atendimento é muito top, e o serviço de extrema qualidade, estou muito satisfeito!! Voltarei sempre!",
  },
  {
    id: "cristiano-guimaraes",
    author: "Cristiano Guimaraes",
    rating: 5,
    text: "Excelente serviço e atendimento. Recomendo demais. Em breve voltarei para realizar serviço em meu outro veículo",
  },
  {
    id: "jefferson-seith",
    author: "Jefferson Seith",
    rating: 5,
    text: "Serviço impecável! A limpeza VIP no HB20S feita pela MG7 superou todas as expectativas — carro renovado, cheiro agradável e acabamento digno de zero km. Excelente cuidado em cada detalhe!",
  },
  {
    id: "jugras-domingos-neto",
    author: "Jugras Domingos Neto",
    rating: 5,
    isExcerpt: true,
    text: "Gostaria de deixar meu agradecimento à equipe da MG’7 ESTÉTICA AUTOMOTIVA pelo serviço excepcional na colocação da película de insulfilme no meu carro. Atendimento de primeira, muita atenção aos detalhes e um acabamento impecável. Com certeza virei cliente fiel e recomendo de olhos fechados! 👏🚘",
  },
  {
    id: "wellington-gentil",
    author: "Wellington Gentil",
    rating: 5,
    isExcerpt: true,
    text: "Fiquei muito satisfeito com o serviço de vitrificação feito no meu carro pela MG7studio. Desde o primeiro contato, o Maycon mostrou profissionalismo, atenção e dedicação.",
  },
  {
    id: "tatiane-menezes",
    author: "Tatiane Menezes",
    rating: 5,
    isExcerpt: true,
    text: "Faço questão de deixar registrado o quanto fiquei satisfeita com o atendimento do Maicon. Fiz várias pesquisas pelo Google e acredito de verdade que Deus me guiou até ele.",
  },
  {
    id: "fabio-otto",
    author: "Fabio Otto",
    rating: 5,
    text: "Disparado a melhor estética automotiva que conheço! O padrão de atendimento e a qualidade no serviço prestado são muito acima da média. Vale cada centavo investido! Recomendo demais!",
  },
  {
    id: "andre-yamada",
    author: "Andre Yamada",
    rating: 5,
    isExcerpt: true,
    text: "O sucesso dessa empresa se dá pelo profissionalismo do Maycon e sua equipe altamente capacitados pra executar todos os serviços disponíveis.",
  },
  {
    id: "airton-moraes",
    author: "Airton Moraes",
    rating: 5,
    isExcerpt: true,
    text: "Trabalho de excelência com um atendimento altamente diferenciado. Indico pelo serviço e pelos profissionais. Nota 10 🙏😃",
  },
  {
    id: "naiara-ns",
    author: "Naiara NS",
    rating: 5,
    isExcerpt: true,
    text: "Hoje é dia de indicar com gosto! 🚗✨\n\nFiz alguns serviços na MG7 Estética Automotiva e estou simplesmente encantada…",
  },
  {
    id: "denilson-garcia",
    author: "Denilson Garcia",
    rating: 5,
    isExcerpt: true,
    text: "Quero começar dizendo o quanto o atendimento faz toda a diferença em um serviço.",
  },
  {
    id: "wellington-borges-costa",
    author: "Wellington Borges Costa",
    rating: 5,
    isExcerpt: true,
    text: "Qualidade, confiabilidade e pontualidade na entrega dos serviços, proprietário da total atenção para retirar dúvidas a respeito de todo serviço prestado, MG'7 está de parabéns. 👏👏",
  },
  {
    id: "humberto-coelho",
    author: "humberto coelho",
    rating: 5,
    text: "Pesquisei e encontrei essa empresa por conta do produto que gostaria de aplicar no meu veículo. São certificados pela marca GYEON. Me surpreendeu a qualidade dos profissionais com relação a aplicação, pois entendem realmente o que estão fazendo, explicam tudo antes, muito atenciosos, pós venda muito bom. Fora as garantias no serviço.",
  },
  {
    id: "junior-barreri",
    author: "Junior Barreri",
    rating: 5,
    isExcerpt: true,
    text: "Serviço TOP.",
  },
  {
    id: "eduardo-rigo",
    author: "Eduardo Rigo",
    rating: 5,
    isExcerpt: true,
    text: "Serviço excelente e atendimento de primeira!!\nMeu carro ficou lotado de piche de asfalto que grudou em uma viagem, estava pelo carro todo.",
  },
  {
    id: "walace-junior",
    author: "Walace Junior",
    rating: 5,
    isExcerpt: true,
    text: "Atendimento do Maycon e da equipe são nota 10. Explicam nos detalhes, te oferecem o que faz sentido e deixam o cliente à vontade para decidir qual serviço realizar de acordo com a própria necessidade, sem ficar empurrando serviços.",
  },
  {
    id: "junior-de-sa",
    author: "Junior De Sá",
    rating: 5,
    isExcerpt: true,
    text: "Quero agradecer à MG’7 por todo o serviço prestado, desde o primeiro atendimento até a execução do serviço. Fui muito bem atendido e fiquei muito satisfeito com todo o processo.",
  },
  {
    id: "alpha-consultoria",
    author: "Alpha Consultoria em Engenharia",
    rating: 5,
    isExcerpt: true,
    text: "Escolhi a MG7 pela excelente reputação que a empresa tem em cuidados automotivos, e a experiência confirmou tudo.",
  },
  {
    id: "paula-andrade",
    author: "Paula Andrade",
    rating: 5,
    isExcerpt: true,
    text: "Simplesmente chocada com o nível desse time de especialistas!! Eu deixei meu carro e recebi um novo quando busquei.",
  },
];
export const reviews = suppliedReviews.map((review) => ({
  ...review,
  sourceUrl,
  avatarUrl: reviewProfiles[review.id]?.avatarUrl || null,
  profileUrl: reviewProfiles[review.id]?.profileUrl || null,
}));

export const reviewsSource = {
  url: sourceUrl,
  label: "Google Maps",
  // A nota média não é calculada a partir de uma seleção de avaliações.
};
