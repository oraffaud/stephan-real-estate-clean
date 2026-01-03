export const PROPERTIES = [
  {
    id: 'valbonne-jardin',
    featured: true,
    type: 'Villa',
    typeKey: (typeof type === "string" ? type.toLowerCase() : "villa"),
    area: 'Valbonne',
    areaKey: (typeof area === "string" ? area.toLowerCase().split(" ")[0] : "valbonne"),
    priceEUR: 1250000,
    beds: 4,
    baths: 3,
    sqm: 165,
    title: {
      en: 'Contemporary villa with garden — Valbonne',
      fr: 'Villa contemporaine avec jardin — Valbonne'
    },
    description: {
      en: 'A light-filled, modern villa in a quiet residential pocket close to the village. Open-plan living, landscaped garden and a pool-ready plot. Ideal for a family base or a second home with easy access to Sophia Antipolis and the coast.',
      fr: 'Villa moderne baignée de lumière dans un environnement résidentiel calme, proche du village. Pièce de vie ouverte, jardin paysagé et terrain prêt à accueillir une piscine. Parfait pour une résidence familiale ou secondaire, à proximité de Sophia Antipolis et du littoral.'
    },
    highlights: {
      en: ['Walkable village lifestyle', 'Flexible home office space', 'Landscaped garden — pool-ready'],
      fr: ['Vie au village à pied', 'Espace bureau modulable', 'Jardin paysagé — piscine possible']
    },
    images: [
      '/properties/valbonne-jardin-1.svg',
      '/properties/valbonne-jardin-2.svg',
      '/properties/valbonne-jardin-3.svg',
      '/properties/valbonne-jardin-4.svg'
    ]
  },
  {
    id: 'mougins-atelier',
    featured: true,
    type: 'Villa',
    typeKey: (typeof type === "string" ? type.toLowerCase() : "villa"),
    area: 'Mougins',
    areaKey: (typeof area === "string" ? area.toLowerCase().split(" ")[0] : "valbonne"),
    priceEUR: 2350000,
    beds: 5,
    baths: 4,
    sqm: 240,
    title: {
      en: 'Architect-designed villa with studio — Mougins',
      fr: 'Villa d’architecte avec studio — Mougins'
    },
    description: {
      en: 'An elegant property with clean lines and generous volumes, featuring a separate artist studio/guest suite. South-facing terraces, refined finishes and privacy — minutes from the old village and international schools.',
      fr: 'Une propriété élégante aux lignes contemporaines et volumes généreux, avec un studio indépendant (atelier / suite invités). Terrasses plein sud, finitions soignées et intimité — à quelques minutes du vieux village et des écoles internationales.'
    },
    highlights: {
      en: ['Separate studio/guest suite', 'Quiet and private setting', 'Near international schools'],
      fr: ['Studio / suite invités indépendante', 'Cadre calme et préservé', 'Proche écoles internationales']
    },
    images: [
      '/properties/mougins-atelier-1.svg',
      '/properties/mougins-atelier-2.svg',
      '/properties/mougins-atelier-3.svg',
      '/properties/mougins-atelier-4.svg'
    ]
  },
  {
    id: 'cannes-penthouse',
    featured: true,
    type: 'Apartment',
    typeKey: (typeof type === "string" ? type.toLowerCase() : "villa"),
    area: 'Cannes',
    areaKey: (typeof area === "string" ? area.toLowerCase().split(" ")[0] : "valbonne"),
    priceEUR: 3100000,
    beds: 3,
    baths: 2,
    sqm: 140,
    title: {
      en: 'Penthouse terrace & sea glimpse — Cannes',
      fr: 'Penthouse avec terrasse & aperçu mer — Cannes'
    },
    description: {
      en: 'A refined penthouse with a generous terrace and a bright living room opening onto the outdoors. Designed for entertaining, close to the Croisette and amenities.',
      fr: 'Penthouse raffiné avec grande terrasse et séjour lumineux tourné vers l’extérieur. Pensé pour recevoir, à proximité de la Croisette et des commodités.'
    },
    highlights: {
      en: ['Large terrace for entertaining', 'Walk to city life', 'Bright top-floor living'],
      fr: ['Grande terrasse pour recevoir', 'Tout à pied', 'Dernier étage lumineux']
    },
    images: [
      '/properties/cannes-penthouse-1.svg',
      '/properties/cannes-penthouse-2.svg',
      '/properties/cannes-penthouse-3.svg',
      '/properties/cannes-penthouse-4.svg'
    ]
  },
  {
    id: 'antibes-seaview',
    featured: false,
    type: 'Apartment',
    typeKey: (typeof type === "string" ? type.toLowerCase() : "villa"),
    area: 'Antibes',
    areaKey: (typeof area === "string" ? area.toLowerCase().split(" ")[0] : "valbonne"),
    priceEUR: 980000,
    beds: 2,
    baths: 2,
    sqm: 92,
    title: {
      en: 'Sea-view apartment near the old town — Antibes',
      fr: 'Appartement vue mer proche du vieil Antibes — Antibes'
    },
    description: {
      en: 'A comfortable sea-view apartment ideal for a lock-up-and-leave lifestyle. Two suites, a balcony for sunset moments, and quick access to beaches and the historic center.',
      fr: 'Appartement confortable avec vue mer, parfait pour une résidence secondaire facile à gérer. Deux suites, balcon pour les couchers de soleil, accès rapide aux plages et au centre historique.'
    },
    highlights: {
      en: ['Sea view', 'Two en-suite bedrooms', 'Close to beaches'],
      fr: ['Vue mer', 'Deux chambres en suite', 'Proche plages']
    },
    images: [
      '/properties/antibes-seaview-1.svg',
      '/properties/antibes-seaview-2.svg',
      '/properties/antibes-seaview-3.svg',
      '/properties/antibes-seaview-4.svg'
    ]
  },
  {
    id: 'grasse-stonehouse',
    featured: false,
    type: 'House',
    typeKey: (typeof type === "string" ? type.toLowerCase() : "villa"),
    area: 'Grasse',
    areaKey: (typeof area === "string" ? area.toLowerCase().split(" ")[0] : "valbonne"),
    priceEUR: 1490000,
    beds: 4,
    baths: 3,
    sqm: 190,
    title: {
      en: 'Renovated stone house with olive trees — Grasse',
      fr: 'Maison en pierre rénovée, oliviers — Grasse'
    },
    description: {
      en: 'A charming stone property combining authentic character and modern comfort. Terraced garden, olive trees and outdoor dining areas — perfect for the hinterland lifestyle while staying close to the coast.',
      fr: 'Une maison en pierre de caractère associant authenticité et confort moderne. Jardin en restanques, oliviers et espaces repas extérieurs — l’esprit arrière-pays tout en restant proche du littoral.'
    },
    highlights: {
      en: ['Authentic stone character', 'Terraced garden with olives', 'Great indoor/outdoor flow'],
      fr: ['Charme de la pierre', 'Jardin en restanques, oliviers', 'Très belle vie dedans/dehors']
    },
    images: [
      '/properties/grasse-stonehouse-1.svg',
      '/properties/grasse-stonehouse-2.svg',
      '/properties/grasse-stonehouse-3.svg',
      '/properties/grasse-stonehouse-4.svg'
    ]
  },
  {
    id: 'stpaul-panorama',
    featured: false,
    type: 'Villa',
    typeKey: (typeof type === "string" ? type.toLowerCase() : "villa"),
    area: 'Saint-Paul-de-Vence',
    areaKey: (typeof area === "string" ? area.toLowerCase().split(" ")[0] : "valbonne"),
    priceEUR: 2850000,
    beds: 5,
    baths: 4,
    sqm: 260,
    title: {
      en: 'Panoramic villa near Saint-Paul-de-Vence',
      fr: 'Villa panoramique près de Saint-Paul-de-Vence'
    },
    description: {
      en: 'A serene villa with panoramic views and generous terraces. A timeless Mediterranean feel, ideal for hosting friends and family in absolute comfort.',
      fr: 'Villa paisible avec vue panoramique et grandes terrasses. Esprit méditerranéen intemporel, idéale pour recevoir en tout confort.'
    },
    highlights: {
      en: ['Panoramic views', 'Generous terraces', 'Mediterranean atmosphere'],
      fr: ['Vue panoramique', 'Grandes terrasses', 'Atmosphère méditerranéenne']
    },
    images: [
      '/properties/stpaul-panorama-1.svg',
      '/properties/stpaul-panorama-2.svg',
      '/properties/stpaul-panorama-3.svg',
      '/properties/stpaul-panorama-4.svg'
    ]
  }
];

export function getProperty(id) {
  return PROPERTIES.find((p) => p.id === id);
}

export const TYPES = Array.from(new Set(PROPERTIES.map((p) => p.type)));

export function filterProperties({ q = '', type = '', bedsMin = 0, priceMax = 0 } = {}) {
  const query = String(q || '').trim().toLowerCase();
  return PROPERTIES.filter((p) => {
    if (type && p.type !== type) return false;
    if (bedsMin && p.beds < Number(bedsMin)) return false;
    if (priceMax && p.priceEUR > Number(priceMax)) return false;
    if (!query) return true;
    const hay = `${p.area} ${p.type} ${p.id} ${p.title.en} ${p.title.fr}`.toLowerCase();
    return hay.includes(query);
  });
}
