# ZenMaison 🏡

Boutique dropshipping **statique** — zéro backend, zéro abonnement.
Pages HTML/CSS/JS pur déployées sur Cloudflare Pages, paiements via **Stripe Payment Links**.

```
index.html            Boutique (catalogue rendu par app.js)
app.js                Catalogue 10 produits + panier localStorage + checkout
config.js             ⚙️ Liens Stripe + email + seuil livraison gratuite  ← À REMPLIR
style.css             Design (vert/crème, responsive)
merci.html            Redirection post-paiement (vide le panier)
mentions-legales.html ⚖️ À COMPLÉTER (champs [...])
cgv.html              ⚖️ À COMPLÉTER (champs [...])
```

## 🚀 Mise en ligne (30 minutes)

### 1. Stripe — les paiements (15 min)
1. Créer un compte sur [dashboard.stripe.com](https://dashboard.stripe.com) (gratuit, pas d'abonnement — 1,5 % + 0,25 € par transaction Europe).
2. Activer le compte (identité + IBAN pour les virements).
3. Pour **chaque produit** : Products → Add product (nom + prix de `app.js`) → **Payment Link** → créer.
   - After payment → *Redirect customers to your website* → `https://TON-SITE.pages.dev/merci.html`
4. Copier chaque lien `https://buy.stripe.com/...` dans **`config.js`**.

> Au départ, laisse les `STRIPE_LINKS` vides : le site marche en démo et le
> bouton affiche un rappel propre au lieu de casser.

### 2. Cloudflare Pages — l'hébergement (5 min)
```bash
npx wrangler pages deploy . --project-name zenmaison
```
ou via le dashboard : *Workers & Pages → Create → Pages → Upload assets*.
URL obtenue : `https://zenmaison.pages.dev` (sous-domaine gratuit).

### 3. Juridique — avant la première pub (10 min)
- Compléter `mentions-legales.html` et `cgv.html` (champs `[...]`).
- **Statut obligatoire** pour vendre régulièrement : micro-entreprise
  (gratuit, en ligne sur formalites.entreprises.gouv.fr, comptabilité = un
  livre de recettes).
- Prévenir sa banque / activer les virements Stripe.

## 💰 Les marges (dans `app.js`)

| Produit | Coût Ali | Prix vente | Marge nette* |
|---|---|---|---|
| Crochets muraux ×10 | 2,10 € | 9,90 € | ~5,90 € |
| Organisateurs tiroir ×4 | 3,20 € | 14,90 € | ~8,90 € |
| Lampes LED armoire ×3 | 4,10 € | 16,90 € | ~9,60 € |
| Distributeur savon auto | 5,40 € | 19,90 € | ~10,70 € |
| Boîtes hermétiques ×6 | 6,30 € | 22,90 € | ~12,20 € |
| Étagère sous évier | 7,10 € | 24,90 € | ~13,10 € |
| Étiqueteuse bluetooth | 8,20 € | 27,90 € | ~14,40 € |
| Housse canapé | 9,80 € | 29,90 € | ~14,40 € |

\* après ~19 % (commission Stripe, retours, imprévus). Marges brutes 3-4×.

## 📦 Workflow de commande (début, < 5 min/jour)

1. Reçoit l'email Stripe « Paiement reçu » (nom, adresse, produit).
2. Commande le produit sur AliExpress (livraison **directe à l'adresse client**, sans facture dans le colis — cocher « ship without invoice » si dispo).
3. Colle le numéro de suivi AliExpress dans un email au client.
4. À chaque scan transporteur, le client reçoit la mise à jour.

> Volumes > 5 commandes/jour : brancher **DSers** (plan gratuit) sur un compte
> AliExpress business pour automatiser l'étape 2.

## 🏷️ Nom de domaine (plus tard)

Quand les ventes commencent : acheter `zenmaison.fr` (~7 €/an) sur Cloudflare
Registrar → Pages → Custom domain. En attendant, le `.pages.dev` suffit.

## 📣 Acquisition (le vrai travail)

- **TikTok/Reels** : 2-3 vidéos/jour « avant/après rangement » avec le produit en scène (UGC simple, pas besoin de visage).
- **liwatch synergy** : ton bot aliwatch surveille déjà les prix AliExpress — il peut alerter si le coût d'un produit remonte (marge en danger).
- Pub payante seulement après les 10 premières ventes organiques.
