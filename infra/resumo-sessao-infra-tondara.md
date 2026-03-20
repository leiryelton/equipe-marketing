# Resumo da Sessão — Infraestrutura Tondara
**Data:** 15/03/2026
**Contexto:** Leiryelton está abrindo a **Tondara** (engenharia de dados + dev de sistemas) com a sócia Brenda. Já fechou o primeiro cliente: site de topografia **Araratopografia**.

---

## 1. Contexto do Negócio

- **Empresa:** Tondara — engenharia de dados e desenvolvimento de sistemas
- **Sócios:** Leiryelton (técnico) + Brenda (comercial)
- **Foco:** Construtoras PME + agronegócio no Centro-Oeste
- **Produtos:** 4 pilares de serviços + produto B2C chamado **Tondara Chat**
- **Arquivos de contexto:**
  - `/home/leiryelton/Documentos/equipe-marketing/contexto/plano-negocio-tondara-comercial.md`
  - `/home/leiryelton/Documentos/equipe-marketing/contexto/oferta-de-produtos-v2.md`

---

## 2. Decisão de Infraestrutura

### Stack de plataforma interna (já existe)
Roda em **Docker Compose** com: API de proxy de agentes IA, frontend, MySQL, Apache Airflow.

**Decisão:** Hospedar em **VPS Hetzner** (Alemanha, €4-6/mês).
- Melhor custo-benefício para workloads de backend/dados
- ⚠️ Hostinger parece barato mas o preço **quase dobra na renovação**
- Azure/AWS: overkill e caro para fase inicial

### Sites estáticos de clientes (Astro)
**Decisão:** **Cloudflare Workers com Static Assets** (substituiu Cloudflare Pages).
- Free tier: sites ilimitados, bandwidth ilimitado, 500 builds/mês
- CDN global com PoP em São Paulo → latência ~5-15ms (vs ~200ms do VPS na Alemanha)
- Repositório pode ser **privado** no GitHub

---

## 3. Estrutura do Projeto — studioTondara

**Monorepo** em `/home/leiryelton/Documentos/Projetos/studioTondara/`

```
studioTondara/
├── clients/
│   ├── araratopografia/
│   │   ├── site/                 ← projeto Astro
│   │   │   ├── astro.config.mjs  ← output: 'static'
│   │   │   ├── wrangler.toml     ← CRIADO nesta sessão
│   │   │   └── public/assets/    ← imagens (eram symlinks, agora cópias reais)
│   │   └── Dockerfile
│   └── demo-cliente/
├── nginx/conf.d/default.conf
└── docker-compose.yml
```

### wrangler.toml criado (para deploy no Cloudflare)
```toml
name = "araratopografia"
compatibility_date = "2025-03-14"

[assets]
directory = "./dist"
```
**Localização:** `clients/araratopografia/site/wrangler.toml`

---

## 4. Deploy no Cloudflare Workers — Passo a Passo

1. Cloudflare Dashboard → Workers & Pages → Create → Connect to Git
2. Repositório: `studioTondara` (GitHub)
3. **Root directory:** `clients/araratopografia/site`
4. **Build command:** `npm run build`
5. **Output directory:** `dist`
6. O `wrangler.toml` precisa estar **commitado antes do primeiro deploy**

---

## 5. Erros Encontrados e Soluções

### Erro 1 — `root directory not found`
- **Causa:** `wrangler.toml` não havia sido commitado/pushado
- **Fix:** `git add wrangler.toml && git commit && git push origin main`

### Erro 2 — `ENOENT: no such file or directory, stat hero-image.png`
- **Causa:** Os arquivos em `public/assets/` eram **symlinks absolutos** apontando para `context/midia/`. O Git commita o symlink, mas no servidor Cloudflare o destino não existe.
- **8 arquivos afetados:** hero-image.png, pattern.png, logo.png, logo-dark.png, icone-georreferenciamento.png, icone-licenciamento.png, icone-topografia.png, icone-urbanismo.png
- **Fix:** Substituir symlinks por cópias reais:
```bash
cd clients/araratopografia/site/public/assets
for f in $(find . -maxdepth 1 -type l); do
  target=$(readlink "$f")
  cp --remove-destination "$target" "$f"
done
git add .
git commit -m "fix: replace symlinks with real files"
git push origin main
```

### Erro 3 — `error: src refspec master does not match any`
- **Causa:** Branch é `main`, não `master`
- **Fix:** `git push origin main`

### Bug Docker identificado (ainda não corrigido)
- `astro.config.mjs` tem `output: 'static'` (gera apenas HTML/CSS/JS estáticos)
- Dockerfile usa `CMD ["node", "./dist/server/entry.mjs"]` (que só existe em `output: 'server'`)
- **Resultado:** container crasha ao iniciar
- **Fix futuro:** Mudar Dockerfile para servir arquivos estáticos com nginx ou `serve`

---

## 6. Status do Site Araratopografia

✅ **Site publicado em:** https://araratopografia.leiryelton.workers.dev/

❌ **Vídeo de fundo não aparece** — era symlink não resolvido ou arquivo muito grande (>25MB limite do Cloudflare Workers)

---

## 7. Próximos Passos

### 7.1 — Comprar e configurar o domínio araratopografia.com.br

O domínio **ainda não foi comprado**. Foi pesquisado e está **disponível no registro.br**.

**Recomendação:** Comprar **direto no Cloudflare** (cloudflare.com/products/registrar):
- Preço de custo (sem markup)
- DNS já gerenciado pelo Cloudflare automaticamente
- Processo de apontar pro Worker é instantâneo depois:
  - Worker → Settings → Domains & Routes → Add Custom Domain → `araratopografia.com.br`

**Se optar pelo registro.br:**
1. Após compra, acessar painel do registro.br → domínio → DNS
2. Trocar nameservers para os fornecidos pelo Cloudflare (obtidos ao adicionar o domínio no painel CF)
3. Aguardar propagação (1-24h)
4. Depois adicionar Custom Domain no Worker

### 7.2 — Vídeo de fundo

- Cloudflare Workers tem limite de **25MB por arquivo** → não dá para subir vídeo grande diretamente no git/deploy
- **Solução recomendada:** Cloudflare R2 (object storage)
  - Free tier: **10GB armazenamento + sem custo de egress**
  - Fluxo: upload do vídeo no R2 → URL pública → colocar no `src` do `<video>` no componente Astro
- **Antes do upload:** comprimir com ffmpeg para reduzir tamanho

---

## 8. Comandos Úteis

```bash
# Deploy manual via wrangler (alternativa ao CI/CD)
cd clients/araratopografia/site
npx wrangler deploy

# Build local do Astro
npm run build

# Verificar symlinks
find public/assets -maxdepth 1 -type l

# Converter symlinks para arquivos reais
for f in $(find . -maxdepth 1 -type l); do
  cp --remove-destination "$(readlink "$f")" "$f"
done
```

---

## 9. Referências

- Cloudflare Workers CI/CD: https://developers.cloudflare.com/workers/ci-cd/builds/
- Cloudflare R2: https://developers.cloudflare.com/r2/
- Cloudflare registrar: https://www.cloudflare.com/products/registrar/
