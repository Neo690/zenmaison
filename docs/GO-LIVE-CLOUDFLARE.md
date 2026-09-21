# 🔑 GO-LIVE ZenMaison — Cloudflare token + secrets GitHub (10 minutes)

> Objectif : faire passer le workflow de déploiement au vert →
> **https://zenmaison.pages.dev** en ligne, et tous les futurs `git push`
> déploient automatiquement.

---

## Étape 1 — Créer le token API Cloudflare (3 min)

1. Va sur **https://dash.cloudflare.com/profile/api-tokens**
   (connecté à ton compte Cloudflare — le même qui héberge `aliwatch.pages.dev`)
2. **Create Token** → en bas de la liste : **Create Custom Token** → *Get started*
3. Configure :
   - **Token name** : `zenmaison-pages-deploy`
   - **Permissions** : `Account` → `Cloudflare Pages` → **`Edit`**
     (une seule ligne suffit — pas de User token, pas de zone)
   - **Account Resources** : `Include` → ton compte (`[ton pseudo] 's Account`)
   - **Zone Resources** : laisse *(vide)* — Pages n'en a pas besoin
   - **Client IP** : laisse vide (GitHub Actions = IPs variables)
   - **TTL** : laisse tel quel
4. **Continue to summary** → **Create Token**
5. **Copie le token immédiatement** (il ne sera plus jamais affiché) —
   il commence par une quarantaine de caractères alphanumériques.

> ⚠️ Le scope minimal `Cloudflare Pages: Edit` ne permet PAS de toucher à tes
> DNS, zones ou Workers. Si la clé fuit un jour, le risque est limité au déploiement.

## Étape 2 — Récupérer ton Account ID (1 min)

1. Va sur **https://dash.cloudflare.com** → menu gauche **Workers & Pages**
2. Le **Account ID** est affiché à droite de l'écran d'accueil
   (chaîne hexadécimale de 32 caractères) — ou ouvre n'importe quelle page du
   dashboard : c'est le segment après `/accounts/` dans l'URL.
3. Copie-le.

## Étape 3 — Poser les 2 secrets sur le repo (2 min)

Dans un terminal PowerShell (les commandes sont prêtes, seul le repo compte) :

```powershell
cd C:\dev\repos\zenmaison

# Colle le token quand demandé (saisie masquée, rien ne s'affiche)
C:\Users\ghost\tools\bin\gh.exe secret set CLOUDFLARE_API_TOKEN

# Colle l'Account ID quand demandé
C:\Users\ghost\tools\bin\gh.exe secret set CLOUDFLARE_ACCOUNT_ID
```

Vérification :

```powershell
C:\Users\ghost\tools\bin\gh.exe secret list
# attendu : CLOUDFLARE_ACCOUNT_ID  updated YYYY-MM-DD
#           CLOUDFLARE_API_TOKEN   updated YYYY-MM-DD
```

## Étape 4 — Relancer le déploiement (1 min)

```powershell
cd C:\dev\repos\zenmaison
C:\Users\ghost\tools\bin\gh.exe workflow run deploy.yml
sleep 40
C:\Users\ghost\tools\bin\gh.exe run list --limit 1
# attendu : completed  success
```

Au premier run, wrangler **crée le projet Pages automatiquement** (upload direct).
Si `zenmaison` est déjà pris globalement comme nom de projet, l'erreur le dira —
change alors `--project-name zenmaison` en `--project-name zenmaison-shop` dans
`.github/workflows/deploy.yml` et pousse.

## Étape 5 — Vérifier le site (2 min)

1. **https://zenmaison.pages.dev** doit afficher la boutique
2. Test complet : ajoute 2 produits au panier → « Payer avec Stripe » →
   tant que `config.js` est vide, le rappel propre s'affiche (normal)
3. Une fois tes Payment Links collés dans `config.js` + push : le vrai
   tunnel de paiement est actif.

## Alternative sans token (dépannage)

Si tu veux mettre en ligne **sans créer de token** : dashboard Cloudflare →
Workers & Pages → Create → Pages → **Upload assets** → glisse le contenu du
dossier `C:\dev\repos\zenmaison` (sans `.git`). Mais les mises à jour seront
manuelles — le workflow reste la bonne voie.

---

## Récapitulatif des étapes suivantes (paiement)

| # | Action | Où | Durée |
|---|--------|-----|-------|
| 1 | Activer le compte Stripe (identité + IBAN) | dashboard.stripe.com | 10 min |
| 2 | 10 Products + Payment Links (redirect → `/merci.html`) | Stripe | 20 min |
| 3 | Coller les liens dans `config.js` + commit/push | local | 5 min |
| 4 | Compléter `mentions-legales.html` + `cgv.html` ([...]) | local | 10 min |
| 5 | Micro-entreprise (avant la première pub) | formalites.entreprises.gouv.fr | 30 min |
