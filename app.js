// ZenMaison — catalogue produits (10 best-sellers maison & organisation)
// Coût = prix AliExpress indicatif ; marge = prix vente − coût − ~19 % (paiement,
// retours, imprévus). Prix psychologiques en ,90 €.

const PRODUITS = [
  { id: 'organisateur-tiroir', nom: 'Set 4 organisateurs de tiroir modulables',
    emoji: '🗃️', categorie: 'Rangement', prix: 14.90, cout: 3.20, barre: 24.90,
    note: 4.7, avis: 231, etiquettes: ['vente'] },

  { id: 'dispenser-savon', nom: 'Distributeur de savon automatique sans contact',
    emoji: '🧴', categorie: 'Cuisine', prix: 19.90, cout: 5.40, barre: 29.90,
    note: 4.6, avis: 187, etiquettes: ['vente'] },

  { id: 'rangement-sous-evier', nom: 'Étagère coulissante sous évier',
    emoji: '🚿', categorie: 'Cuisine', prix: 24.90, cout: 7.10, barre: 39.90,
    note: 4.5, avis: 142, etiquettes: [] },

  { id: 'boites-hermetiques', nom: 'Set 6 boîtes hermétiques empilables',
    emoji: '🫙', categorie: 'Cuisine', prix: 22.90, cout: 6.30, barre: 34.90,
    note: 4.8, avis: 305, etiquettes: ['populaire'] },

  { id: 'lumiere-armoire', nom: 'Pack 3 lampes LED à détection pour armoire',
    emoji: '💡', categorie: 'Éclairage', prix: 16.90, cout: 4.10, barre: 27.90,
    note: 4.4, avis: 198, etiquettes: ['vente'] },

  { id: 'organisateur-bureau', nom: 'Organisateur de bureau en bambou',
    emoji: '🗂️', categorie: 'Bureau', prix: 18.90, cout: 5.20, barre: 29.90,
    note: 4.6, avis: 167, etiquettes: [] },

  { id: 'housse-canape', nom: 'Housse de canapé stretch anti-taches',
    emoji: '🛋️', categorie: 'Salon', prix: 29.90, cout: 9.80, barre: 49.90,
    note: 4.3, avis: 121, etiquettes: ['populaire'] },

  { id: 'crochets-adhesifs', nom: 'Pack 10 crochets muraux invisibles',
    emoji: '🪝', categorie: 'Rangement', prix: 9.90, cout: 2.10, barre: 16.90,
    note: 4.5, avis: 274, etiquettes: ['petit-prix'] },

  { id: 'tapis-entree', nom: 'Tapis d\'entrée absorbant ultra-fin',
    emoji: '🚪', categorie: 'Salon', prix: 21.90, cout: 6.40, barre: 34.90,
    note: 4.4, avis: 156, etiquettes: [] },

  { id: 'etiqueteuse', nom: 'Étiqueteuse bluetooth pour bocaux & dossiers',
    emoji: '🏷️', categorie: 'Bureau', prix: 27.90, cout: 8.20, barre: 44.90,
    note: 4.7, avis: 210, etiquettes: ['populaire'] },
];

// ---------- Utilitaires ----------
const eur = n => n.toFixed(2).replace('.', ',') + ' €';

// ---------- Panier (localStorage) ----------
const CLE_PANIER = 'zenmaison_panier_v1';
let panier = {};
try { panier = JSON.parse(localStorage.getItem(CLE_PANIER) || '{}'); } catch (e) { panier = {}; }

function sauverPanier() {
  try { localStorage.setItem(CLE_PANIER, JSON.stringify(panier)); } catch (e) {}
  majCompteur();
}

function majCompteur() {
  const n = Object.values(panier).reduce((a, b) => a + b, 0);
  document.getElementById('compteur-panier').textContent = n;
}

function ajouter(id) {
  panier[id] = (panier[id] || 0) + 1;
  sauverPanier();
  ouvrirTiroir();
  renderPanier();
}

function changerQte(id, delta) {
  if (!panier[id]) return;
  panier[id] += delta;
  if (panier[id] <= 0) delete panier[id];
  sauverPanier();
  renderPanier();
}

function totalPanier() {
  return Object.entries(panier).reduce((t, [id, q]) => {
    const p = PRODUITS.find(x => x.id === id);
    return p ? t + p.prix * q : t;
  }, 0);
}

// ---------- Rendu produits ----------
function etoiles(note) {
  const plein = Math.round(note);
  return '★'.repeat(plein) + '☆'.repeat(5 - plein);
}

function rendreProduits() {
  const grille = document.getElementById('grille');
  grille.innerHTML = '';
  for (const p of PRODUITS) {
    const carte = document.createElement('article');
    carte.className = 'carte';
    const ets = (p.etiquettes || []).map(t =>
      `<span class="etiquette et-${t}">${t === 'vente' ? 'Promo' : t === 'populaire' ? 'Best-seller' : 'Petit prix'}</span>`).join('');
    carte.innerHTML = `
      <div class="visuel">${p.emoji}</div>
      <div class="carte-corps">
        <small class="categorie">${p.categorie}</small>
        <h3>${p.nom}</h3>
        <div class="etiquettes">${ets}</div>
        <div class="note">${etoiles(p.note)} <small>(${p.avis} avis)</small></div>
        <div class="prix-ligne">
          <span class="prix">${eur(p.prix)}</span>
          ${p.barre ? `<span class="prix-barre">${eur(p.barre)}</span>` : ''}
        </div>
        <button class="btn" data-id="${p.id}">Ajouter au panier</button>
      </div>`;
    grille.appendChild(carte);
  }
  grille.addEventListener('click', e => {
    const b = e.target.closest('button[data-id]');
    if (b) ajouter(b.dataset.id);
  }, { once: false });
}

// ---------- Tiroir panier ----------
function ouvrirTiroir() {
  document.getElementById('panier-tiroir').classList.add('ouvert');
  document.getElementById('overlay').classList.add('ouvert');
}
function fermerTiroir() {
  document.getElementById('panier-tiroir').classList.remove('ouvert');
  document.getElementById('overlay').classList.remove('ouvert');
}

function renderPanier() {
  const corps = document.getElementById('tiroir-corps');
  const items = Object.entries(panier);
  if (!items.length) {
    corps.innerHTML = '<div class="panier-vide">Votre panier est vide 🧺</div>';
    document.getElementById('total').textContent = eur(0);
    document.getElementById('btn-stripe').classList.add('btn-desactive');
    return;
  }
  corps.innerHTML = items.map(([id, q]) => {
    const p = PRODUITS.find(x => x.id === id);
    return `
      <div class="ligne-panier">
        <div class="mini">${p.emoji}</div>
        <div>
          <div>${p.nom}</div>
          <small>${eur(p.prix)} × ${q}</small>
        </div>
        <div class="qte-boutons">
          <button data-d="-1" data-id="${id}">−</button>
          <span>${q}</span>
          <button data-d="1" data-id="${id}">+</button>
        </div>
      </div>`;
  }).join('');
  document.getElementById('total').textContent = eur(totalPanier());
  document.getElementById('btn-stripe').classList.remove('btn-desactive');
}

// ---------- Checkout Stripe (Payment Links) ----------
// Renseigne STRIPE_LINKS dans config.js (voir README, section « Activer les paiements »).
function allerAuStripe() {
  const items = Object.entries(panier);
  if (!items.length) return;
  const manquants = items.filter(([id]) => !STRIPE_LINKS[id]);
  if (manquants.length) {
    alert('Paiement bientôt disponible pour : ' +
      manquants.map(([id]) => (PRODUITS.find(p => p.id === id) || {}).nom).join(', ') +
      '\n\nLes liens Stripe sont configurés dans config.js.');
    return;
  }
  // Simple : chaque produit a son Payment Link ; quantité pré-remplie via ?quantity=
  const [id, q] = items[0];
  const url = new URL(STRIPE_LINKS[id]);
  url.searchParams.set('quantity', String(q));
  // Multi-produits : on ouvre le premier ; les suivants en localStorage pour reprise
  if (items.length > 1) {
    localStorage.setItem('zenmaison_reprise', JSON.stringify(items.slice(1)));
  }
  window.location.href = url.toString();
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  rendreProduits();
  majCompteur();
  renderPanier();
  document.getElementById('lien-panier').addEventListener('click', e => { e.preventDefault(); ouvrirTiroir(); });
  document.getElementById('btn-fermer').addEventListener('click', fermerTiroir);
  document.getElementById('overlay').addEventListener('click', fermerTiroir);
  document.getElementById('tiroir-corps').addEventListener('click', e => {
    const b = e.target.closest('button[data-d]');
    if (b) changerQte(b.dataset.id, parseInt(b.dataset.d, 10));
  });
  document.getElementById('btn-stripe').addEventListener('click', allerAuStripe);
});
