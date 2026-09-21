// ZenMaison — configuration client (à personnaliser)
// --------------------------------------------------
// STRIPE_LINKS : pour chaque produit, colle ici son Payment Link
// (Dashboard Stripe > Payment Links > créer : prix unique, « après paiement »
// rediriger vers https://TON-SITE.pages.dev/merci.html).
// Tant que les liens sont vides, le bouton « Payer » affiche un rappel.

const STRIPE_LINKS = {
  'organisateur-tiroir': '',      // ex : 'https://buy.stripe.com/xxxx'
  'dispenser-savon': '',
  'rangement-sous-evier': '',
  'boites-hermetiques': '',
  'lumiere-armoire': '',
  'organisateur-bureau': '',
  'housse-canape': '',
  'crochets-adhesifs': '',
  'tapis-entree': '',
  'etiqueteuse': '',
};

// Livraison gratuite au-delà de ce montant (affiché à la confirmation de commande)
const LIVRAISON_GRATUITE_DE = 35; // €

// Email de contact (footer + support client)
const CONTACT_EMAIL = 'contact@zenmaison.fr';
