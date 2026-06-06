# BRANDING_CHANGES.md — Rebrand Postiz → Laranja Lima OS

Documento de manutenção do rebrand visual aplicado ao Postiz self-hosted em
`https://social.laranjali.ma` (VPS Hostinger). Use a cada atualização do Postiz
para reaplicar a marca.

Data do cutover: 2026-06-05.

---

## 1. Visão geral

- **Base upstream:** `gitroomhq/postiz-app` versão **v2.21.8**
  (commit `9a7d9deafcf373c759e2ec7955206a2a31b003f3`, release de 2026-05-22).
- **Licença:** AGPL-3.0 **pura** (sem cláusula da Seção 7, sem restrição de logo/marca).
  Rebrand permitido. `LICENSE` e o copyright original (Nevo David) **preservados**.
- **Estratégia:** fork público + build de imagem custom via GitHub Actions (GHCR).
  **NÃO** se builda no VPS (RAM insuficiente; o build do Next exige ~4 GB).

## 2. Fork e imagem

| Item | Valor |
|---|---|
| Repo do fork (público, AGPL §13) | https://github.com/laranjalima-os/postiz-llos |
| Branch/tag | `llos-2.21.8` |
| Imagem | `ghcr.io/laranjalima-os/postiz-llos:llos-2.21.8` (pacote GHCR **público**) |
| Digest da imagem em produção | `sha256:1f3ded2e9d062e311e5b09743224b85ad844676b2292bbe7ac83180599e2bc73` |
| Build | GitHub Actions `.github/workflows/build-llos.yml` (amd64, `Dockerfile.dev`) |

## 3. Alteração no VPS

Único ajuste em `/opt/postiz/docker-compose.yml` (serviço `postiz`, linha `image:`):

```diff
-    image: ghcr.io/gitroomhq/postiz-app:latest
+    image: ghcr.io/laranjalima-os/postiz-llos:llos-2.21.8
```

Backup do compose original: `docker-compose.yml.bak-20260605-cutover`.
Nenhum outro serviço, env, volume, rede ou label foi alterado.

## 4. Mapa de assets (origem: repo `laranjalima-os` pasta `/brand`)

| Slot na UI | Arquivo no fork | Asset de marca |
|---|---|---|
| Símbolo header/sidebar/OAuth | `apps/frontend/src/components/new-layout/logo.tsx` → `<img src="/ll-symbol.svg">` | `ll-symbol.svg` (color) |
| Wordmark login/billing | `apps/frontend/src/components/ui/logo-text.component.tsx` → `<img src="/ll-horizontal-white.svg">` | `ll-horizontal-white.svg` (login é fundo escuro #0E0E0E) |
| favicon.ico/.png, postiz-fav.png | `apps/frontend/public/` | gerados de `ll-symbol.png` (ico via Node) |
| logo.svg, postiz.svg, logo-text.svg, postiz-text.svg | `apps/frontend/public/` | `ll-symbol.svg` / `ll-horizontal-color.svg` |

Assets de marca commitados em `apps/frontend/public/`: `ll-symbol.svg`,
`ll-symbol-white.svg`, `ll-symbol.png`, `ll-horizontal-color.svg`,
`ll-horizontal-white.svg`, `ll-horizontal-color.png`.

## 5. Mudanças de nome/texto ("Postiz" → "Laranja Lima OS")

- Títulos de página (`title:` em `apps/frontend/src/app/(app)/**`): seletor
  `isGeneral ? 'Postiz' : 'Gitroom'` trocado para `'Laranja Lima OS'`. Inclui
  `auth/login`, `auth/page`, `auth/forgot`, `auth/activate`, `(site)/*`,
  `(preview)/p/[id]`, `admin/errors`, `agents`.
- FAQ de billing: `apps/frontend/src/components/billing/faq.component.tsx`.
- **Login** (`apps/frontend/src/app/(app)/auth/layout.tsx`): manchete trocada para
  "Grow your social presence with Laranja Lima OS" e o **painel de depoimentos
  `<TestimonialComponent/>` REMOVIDO** (os depoimentos citavam "Postiz"
  nominalmente; não foram reescritos para não fabricar endossos falsos).
  Dados em `libraries/react-shared-libraries/src/helpers/testomonials.tsx` ficaram
  sem referência (não vão para o bundle).
- **Rodapé (AGPL §13):** `apps/frontend/src/components/launches/launches.component.tsx`
  exibe "Powered by Postiz v2.21.8" com link para o fork.

### Resíduos conhecidos (menções "Postiz" secundárias, fora da chrome principal)

Não tratadas neste rebrand (baixa visibilidade); reavaliar se necessário:
- Título do vídeo em `components/billing/first.billing.component.tsx` ("Grow Fast With Postiz").
- Descrição default de agente em `launches/web3/providers/moltbook.provider.tsx`.
- String comentada em `onboarding/onboarding.tsx`.

## 6. Conformidade AGPL §13

O código-fonte correspondente ao binário em produção está público em
`laranjalima-os/postiz-llos` (tag `llos-2.21.8`). O rodapé da aplicação linka para lá.
`LICENSE` e avisos de copyright originais preservados. Ver também `FORK_NOTICE.md`.

## 7. Rollback (reverter para o Postiz original)

```bash
sed -i 's#ghcr.io/laranjalima-os/postiz-llos:llos-2.21.8#ghcr.io/gitroomhq/postiz-app@sha256:3ec7bc8ecf61f08c22e0954291702b097f944def515dc259cb3a441aba4046c0#' /opt/postiz/docker-compose.yml
cd /opt/postiz && docker compose up -d postiz
```
(Imagem antiga em execução antes do cutover: `ghcr.io/gitroomhq/postiz-app:latest`,
digest `sha256:3ec7bc8ecf61f08c22e0954291702b097f944def515dc259cb3a441aba4046c0`.)

## 8. Como reaplicar a cada upgrade do Postiz

Quando sair uma nova versão upstream (ex.: `vX.Y.Z`):

1. No repo do fork (clone local), trazer a árvore da nova tag e reaplicar as
   mudanças listadas nas seções 4–5 (os arquivos costumam mudar pouco). Como os
   logos são `<img>` para `/public`, geralmente só é preciso reconferir:
   `logo.tsx`, `logo-text.component.tsx`, os `title:` e o rodapé.
2. Atualizar `UPSTREAM_VERSION` e a tag no `.github/workflows/build-llos.yml`
   e no rodapé (`launches.component.tsx`).
3. Commit, criar branch/tag `llos-vX.Y.Z`, push → CI builda
   `ghcr.io/laranjalima-os/postiz-llos:llos-vX.Y.Z`.
4. Tornar o pacote GHCR público (UI: package → settings → Danger Zone → Public).
   *(Não há API REST para isso.)*
5. No VPS: `docker pull` da nova tag, depois trocar a linha `image:` no compose e
   `docker compose up -d postiz`. Validar e, se necessário, rollback pela seção 7.
