# Laranja Lima OS — fork de marca do Postiz

Este repositório é uma **versão modificada do [Postiz](https://github.com/gitroomhq/postiz-app)**,
distribuída sob a **GNU Affero General Public License v3.0 (AGPL-3.0)**, a mesma licença do
projeto original. O arquivo [`LICENSE`](./LICENSE) e os avisos de copyright originais
("Postiz – Social media schedule tool", Nevo David) foram **preservados**.

## Base

- **Upstream:** gitroomhq/postiz-app
- **Versão base:** `v2.21.8` (commit `9a7d9deafcf373c759e2ec7955206a2a31b003f3`)
- **Branch deste fork:** `llos-2.21.8`

## O que foi modificado (somente marca/UI)

- Logo símbolo (header/sidebar/OAuth) → `apps/frontend/src/components/new-layout/logo.tsx`
- Logo wordmark (login/billing) → `apps/frontend/src/components/ui/logo-text.component.tsx`
- Favicon e assets em `apps/frontend/public/` (favicon.ico/png, postiz-fav.png, logo*.svg, postiz*.svg)
- Nome do produto "Postiz" → "Laranja Lima OS" nos títulos de página e textos visíveis
- Rodapé de atribuição "Powered by Postiz v2.21.8" com link para o código-fonte deste fork

Nenhuma funcionalidade, lógica de backend, schema ou comportamento foi alterado — apenas a
identidade visual, conforme permitido pela AGPL-3.0 (sem cláusulas adicionais da Seção 7).

## Conformidade AGPL §13

O código-fonte correspondente à versão que roda em produção (https://social.laranjali.ma)
está disponível publicamente neste repositório, na tag/branch `llos-2.21.8`, conforme exigido
pela seção 13 da AGPL-3.0. O rodapé da aplicação linka diretamente para cá.
