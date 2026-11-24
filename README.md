# MG’7 Studio Detail

Site institucional da MG’7 Studio Detail, especializada em proteção automotiva em Vila Velha, ES. Desenvolvido em React, Vite e TypeScript, com conteúdo pré-renderizado para SEO e publicação estática na Vercel.

## Publicar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new) e importe `diegocoodes/mg7`.
2. Mantenha a pasta raiz do projeto como `./`.
3. Confirme as configurações abaixo e clique em **Deploy**.

| Configuração | Valor |
| --- | --- |
| Framework | Vite |
| Node.js | 24.x |
| Instalação | `npm ci` |
| Build | `npm run build` |
| Diretório de saída | `dist` |

Esses valores já estão definidos em `vercel.json` e `package.json`. O site é estático: a Vercel publica os arquivos de `dist`, incluindo os vídeos locais.

### Domínio e SEO

O build configura canonical, Open Graph, JSON-LD, robots e sitemap com o domínio disponibilizado pela Vercel. Mantenha habilitado o acesso às System Environment Variables nas configurações do projeto. A ordem é `SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL` e, somente no desenvolvimento local, `http://localhost:4173`.

Ao conectar um domínio próprio, cadastre `SITE_URL=https://www.seu-dominio.com.br` nas variáveis de ambiente do projeto e faça um novo deploy. Em instalações locais, a variável também pode ser configurada em `.env.local`, seguindo `.env.example`. Arquivos de ambiente locais ficam fora do Git.

Referências: [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite), [configuração do projeto](https://vercel.com/docs/project-configuration/vercel-json) e [variáveis de ambiente](https://vercel.com/docs/environment-variables/system-environment-variables).

## Executar localmente

Requer Node.js 24 e npm.

```sh
npm ci
npm run dev
```

Desenvolvimento: `http://127.0.0.1:5173`.

```sh
npm run typecheck
npm run build
npm run check
npm start
```

`npm start` permite conferir o build em `http://127.0.0.1:4173`. O comando é usado somente na máquina local; a Vercel usa a publicação estática configurada. `npm run check` verifica assets, âncoras, imagens, formulário e SEO local.

## Recursos

- Hero com vídeo local, sem som, em loop e sem controles visíveis; versão menor para celular.
- Abertura animada com o logo, que pode ser pulada ao clicar ou usar o teclado.
- Seção Essência com o logo original animado, brilho e aro em vermelho e dourado.
- Categorias de PPF, vitrificação e películas, com vídeos próprios e luzes nas bordas.
- Background vermelho nos serviços e dourado no contato, com alternativa estática sem WebGL.
- Galeria ampliável, animações de entrada e reflexos nas imagens.
- Avaliações reais fornecidas pela empresa, com faixa animada e controle de pausa.
- Formulário que prepara uma mensagem para WhatsApp; o envio é confirmado no próprio WhatsApp.
- Navegação por teclado e respeito à preferência de redução de movimento.
- Imagens WebP e fontes locais; vídeos e efeitos pausam quando saem da tela.

## Estrutura

```text
components/ui/       Componente WebGL do background
lib/                 Utilitários TypeScript
public/assets/       Imagens, fontes, vídeos e licenças
scripts/             Build, validação e servidor local
src/                 Componentes React, dados e estilos
index.html           Template, metadados e dados estruturados
vercel.json          Configuração de publicação
```

`dist`, `node_modules`, artefatos temporários e configurações locais de hospedagem ficam fora do repositório. O build pré-renderiza o React em HTML e ativa as interações com hidratação no navegador.

## Conteúdo e contato

- Textos, serviços, fotos e contato: `src/content.js`.
- Avaliações reais e associação de avatares: `src/reviews.js` e `src/review-profiles.js`.
- Vídeo principal e poster: `src/HeroVideo.jsx` e arquivos `hero-video*` em `public/assets/`.
- Vídeos dos serviços: `ppf.mp4`, `vitrificação.mp4` e `pelicula.mp4` em `public/assets/`.
- Logo restaurado: `public/assets/mg7-logo.webp`.

WhatsApp: **(27) 99780-6961**. Endereço: **R. Henrique Laranja, 44 — Olaria, Vila Velha — ES, 29100-350**. Instagram: [@mg7studiodetail](https://www.instagram.com/mg7studiodetail/).

Ao alterar contato e endereço, atualize também o JSON-LD em `index.html`. A certificação apresentada se refere ao PPF. Não foram criados preços, garantias, avaliações ou promessas de durabilidade.

As fotos dos trabalhos vêm do perfil público da empresa, com URLs de origem em `src/content.js`. Os vídeos foram fornecidos pela empresa; o filme do Mustang é uma referência visual e não é apresentado como um trabalho realizado pela MG’7. Os comentários recebidos incompletos continuam como trechos. Avatares sem imagem confirmada usam as iniciais do cliente.

## Créditos

- [Porsche na garagem / Unsplash](https://unsplash.com/photos/black-porsche-911-parked-in-garage-JLo6yNuYvnM), Philipp Katzenberger.
- [Porsche lateral / Unsplash](https://unsplash.com/photos/a-black-car-parked-in-front-of-a-building-9VH2Id9o8eA), Franco Debartolo.
- [Porsche traseira / Unsplash](https://unsplash.com/photos/the-rear-end-of-a-grey-porsche-sports-car-ZoTYwN9yGl4).
- [Aplicação de filme protetor / Pexels](https://www.pexels.com/photo/bearded-man-applying-foil-on-sports-car-hood-20051468/), WAVYVISUALS.
- [Polimento de pintura / Pexels](https://www.pexels.com/photo/person-waxing-a-car-6026083/), Orhun Rüzgar Öz.
- [Cuidado automotivo / Pexels](https://www.pexels.com/photo/man-polishing-a-car-14908957/), Geancarlo Peruzzolo.

Manrope e Barlow Condensed: SIL Open Font License em `public/assets/OFL.txt`. Permanent Marker: Apache License 2.0 em `public/assets/PermanentMarker-LICENSE.txt`.
