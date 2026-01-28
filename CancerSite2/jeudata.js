// ========================================
// IMMUNE DEFENSE V4.0 - ULTIMATE CARD SYSTEM
// 80 CARTES + 3 BOOSTERS + SPIN SYSTEM
// ========================================

// RARETÉS
const RARITIES = {
    COMMON: { name: 'Commun', color: '#9e9e9e', glow: '#bdbdbd', spinChance: 50, stars: '⭐' },
    UNCOMMON: { name: 'Peu commun', color: '#4caf50', glow: '#81c784', spinChance: 30, stars: '⭐⭐' },
    RARE: { name: 'Rare', color: '#2196f3', glow: '#64b5f6', spinChance: 12, stars: '⭐⭐⭐' },
    SUPER_RARE: { name: 'Super Rare', color: '#9c27b0', glow: '#ba68c8', spinChance: 5, stars: '⭐⭐⭐⭐' },
    EPIC: { name: 'Épique', color: '#ff9800', glow: '#ffb74d', spinChance: 2, stars: '⭐⭐⭐⭐⭐' },
    LEGENDARY: { name: 'Légendaire', color: '#ffd700', glow: '#ffe57f', spinChance: 0.8, stars: '⭐⭐⭐⭐⭐⭐' },
    MYTHIC: { name: 'Mythique', color: '#f44336', glow: '#e57373', spinChance: 0.2, stars: '⭐⭐⭐⭐⭐⭐⭐' }
};

// TYPES DE BOOSTERS
const BOOSTER_TYPES = {
    ATTACK: { name: 'Booster Attaque', color: '#f44336', icon: '⚔️', description: 'Plus de chance de tours offensives' },
    DEFENSE: { name: 'Booster Défense', color: '#2196f3', icon: '🛡️', description: 'Plus de chance de tours défensives' },
    SUPPORT: { name: 'Booster Support', color: '#4caf50', icon: '💚', description: 'Plus de chance de tours de support' }
};

// CATEGORIES
const CARD_TYPES = {
    ATTACK: { name: 'Attaque', color: '#f44336', icon: '⚔️' },
    DEFENSE: { name: 'Défense', color: '#2196f3', icon: '🛡️' },
    SUPPORT: { name: 'Support', color: '#4caf50', icon: '💚' }
};

// 80 CARTES COMPLÈTES AVEC INFO ÉDUCATIVE
const ALL_CARDS = {
    // ATTACK - COMMON (15 cartes)
    basic_tcell: {
        id: 1, name: "Lymphocyte T Basique", icon: "🔵", rarity: 'COMMON', type: 'ATTACK', cost: 40,
        damage: 10, range: 100, fireRate: 900, speed: 7,
        gameEffect: "Attaque les ennemis à portée moyenne",
        realBody: "Les lymphocytes T détectent et détruisent les cellules infectées par des virus."
    },
    cytotoxic_t: {
        id: 2, name: "Cellule T Cytotoxique", icon: "💥", rarity: 'COMMON', type: 'ATTACK', cost: 45,
        damage: 12, range: 90, fireRate: 1000, speed: 6,
        gameEffect: "Frappe rapide et puissante",
        realBody: "Les cellules T cytotoxiques libèrent des toxines pour tuer les cellules infectées."
    },
    nk_cell: {
        id: 3, name: "Cellule NK", icon: "💢", rarity: 'COMMON', type: 'ATTACK', cost: 50,
        damage: 15, range: 110, fireRate: 1100, speed: 7,
        gameEffect: "Tue les ennemis endommagés",
        realBody: "Les Natural Killer (NK) attaquent les cellules tumorales et infectées sans activation préalable."
    },
    neutrophil: {
        id: 4, name: "Neutrophile", icon: "⚪", rarity: 'COMMON', type: 'ATTACK', cost: 42,
        damage: 11, range: 95, fireRate: 850, speed: 8,
        gameEffect: "Première ligne d'attaque rapide",
        realBody: "Les neutrophiles sont les premiers à arriver sur un site d'infection et engloutissent les bactéries."
    },
    eosinophil: {
        id: 5, name: "Éosinophile", icon: "🔴", rarity: 'COMMON', type: 'ATTACK', cost: 48,
        damage: 13, range: 100, fireRate: 950, speed: 7,
        gameEffect: "Efficace contre les parasites",
        realBody: "Les éosinophiles combattent les parasites et jouent un rôle dans les réactions allergiques."
    },
    basophil: {
        id: 6, name: "Basophile", icon: "🔵", rarity: 'COMMON', type: 'ATTACK', cost: 44,
        damage: 10, range: 105, fireRate: 1000, speed: 7,
        gameEffect: "Libère des toxines",
        realBody: "Les basophiles libèrent de l'histamine lors des réactions allergiques."
    },
    helper_t: {
        id: 7, name: "Lymphocyte T Helper", icon: "🤝", rarity: 'COMMON', type: 'ATTACK', cost: 46,
        damage: 12, range: 110, fireRate: 920, speed: 8,
        gameEffect: "Coordonne les attaques",
        realBody: "Les cellules T helper activent d'autres cellules immunitaires pour combattre l'infection."
    },
    killer_cell: {
        id: 8, name: "Cellule Tueuse", icon: "☠️", rarity: 'COMMON', type: 'ATTACK', cost: 52,
        damage: 16, range: 85, fireRate: 1050, speed: 6,
        gameEffect: "Dégâts massifs à courte portée",
        realBody: "Cellules spécialisées qui détruisent les cellules cancéreuses et infectées."
    },
    phagocyte: {
        id: 9, name: "Phagocyte", icon: "👄", rarity: 'COMMON', type: 'ATTACK', cost: 43,
        damage: 11, range: 90, fireRate: 900, speed: 7,
        gameEffect: "Engloutit les petits ennemis",
        realBody: "Les phagocytes avalent et digèrent les pathogènes et débris cellulaires."
    },
    granulocyte: {
        id: 10, name: "Granulocyte", icon: "⚡", rarity: 'COMMON', type: 'ATTACK', cost: 47,
        damage: 13, range: 100, fireRate: 880, speed: 8,
        gameEffect: "Attaque chimique",
        realBody: "Cellules contenant des granules toxiques pour détruire les microbes."
    },
    monocyte: {
        id: 11, name: "Monocyte", icon: "🔶", rarity: 'COMMON', type: 'ATTACK', cost: 49,
        damage: 14, range: 95, fireRate: 970, speed: 6,
        gameEffect: "Se transforme en macrophage",
        realBody: "Les monocytes circulent dans le sang et deviennent des macrophages dans les tissus."
    },
    lymphocyte: {
        id: 12, name: "Lymphocyte", icon: "💠", rarity: 'COMMON', type: 'ATTACK', cost: 41,
        damage: 10, range: 115, fireRate: 850, speed: 9,
        gameEffect: "Reconnaissance et attaque",
        realBody: "Cellules clés de l'immunité adaptative, reconnaissent des antigènes spécifiques."
    },
    plasma_cell: {
        id: 13, name: "Plasmocyte", icon: "✨", rarity: 'COMMON', type: 'ATTACK', cost: 55,
        damage: 18, range: 120, fireRate: 1200, speed: 8,
        gameEffect: "Tire des anticorps",
        realBody: "Cellules B activées qui produisent et sécrètent des anticorps en masse."
    },
    mast_cell: {
        id: 14, name: "Mastocyte", icon: "💣", rarity: 'COMMON', type: 'ATTACK', cost: 51,
        damage: 15, range: 100, fireRate: 1050, speed: 7,
        gameEffect: "Explose en zone",
        realBody: "Cellules qui libèrent de l'histamine lors des réactions allergiques et inflammations."
    },
    dendritic_cell: {
        id: 15, name: "Cellule Dendritique", icon: "🌿", rarity: 'COMMON', type: 'ATTACK', cost: 50,
        damage: 14, range: 105, fireRate: 950, speed: 7,
        gameEffect: "Identifie et marque les ennemis",
        realBody: "Présentent les antigènes aux lymphocytes T pour déclencher une réponse immunitaire."
    },

    // ATTACK - UNCOMMON (12 cartes)
    tcell_pro: {
        id: 16, name: "T-Cell Professionnel", icon: "🔷", rarity: 'UNCOMMON', type: 'ATTACK', cost: 70,
        damage: 25, range: 120, fireRate: 800, speed: 8,
        gameEffect: "Attaque puissante et rapide",
        realBody: "Lymphocytes T hautement spécialisés et entraînés contre un pathogène spécifique."
    },
    nk_warrior: {
        id: 17, name: "NK Guerrier", icon: "💎", rarity: 'UNCOMMON', type: 'ATTACK', cost: 85,
        damage: 30, range: 130, fireRate: 1200, speed: 7, aoe: 40,
        gameEffect: "Dégâts de zone autour de la cible",
        realBody: "Cellules NK activées qui tuent plusieurs cellules infectées à la fois."
    },
    rapid_shooter: {
        id: 18, name: "Tireur Rapide", icon: "⚡", rarity: 'UNCOMMON', type: 'ATTACK', cost: 75,
        damage: 18, range: 100, fireRate: 500, speed: 12,
        gameEffect: "Cadence de tir très élevée",
        realBody: "Cellules immunitaires qui sécrètent rapidement des molécules cytotoxiques."
    },
    piercer: {
        id: 19, name: "Perceur", icon: "🎯", rarity: 'UNCOMMON', type: 'ATTACK', cost: 80,
        damage: 28, range: 115, fireRate: 1000, speed: 10, pierce: 2,
        gameEffect: "Les projectiles traversent 2 ennemis",
        realBody: "Anticorps qui peuvent neutraliser plusieurs pathogènes alignés."
    },
    dual_shot: {
        id: 20, name: "Double Tir", icon: "🎲", rarity: 'UNCOMMON', type: 'ATTACK', cost: 95,
        damage: 20, range: 125, fireRate: 900, speed: 9, multishot: 2,
        gameEffect: "Tire sur 2 ennemis simultanément",
        realBody: "Cellules capables de cibler plusieurs pathogènes en même temps."
    },
    charger: {
        id: 21, name: "Chargeur", icon: "💥", rarity: 'UNCOMMON', type: 'ATTACK', cost: 88,
        damage: 35, range: 90, fireRate: 1600, speed: 5,
        gameEffect: "Frappe lourde et lente",
        realBody: "Macrophages qui accumulent de l'énergie pour une attaque dévastatrice."
    },
    toxin: {
        id: 22, name: "Cellule Toxine", icon: "☠️", rarity: 'UNCOMMON', type: 'ATTACK', cost: 82,
        damage: 15, range: 105, fireRate: 800, speed: 7, poison: 5,
        gameEffect: "Empoisonne les ennemis (5 DPS)",
        realBody: "Cellules qui sécrètent des toxines qui endommagent progressivement les pathogènes."
    },
    enhanced_nk: {
        id: 23, name: "NK Amélioré", icon: "💢", rarity: 'UNCOMMON', type: 'ATTACK', cost: 78,
        damage: 26, range: 110, fireRate: 950, speed: 8,
        gameEffect: "Tue les cellules faibles en priorité",
        realBody: "Natural Killer avec récepteurs activateurs renforcés."
    },
    cytokine_shooter: {
        id: 24, name: "Tireur Cytokine", icon: "🌟", rarity: 'UNCOMMON', type: 'ATTACK', cost: 86,
        damage: 29, range: 115, fireRate: 1050, speed: 8,
        gameEffect: "Signaux d'alarme qui renforcent l'attaque",
        realBody: "Cellules qui libèrent des cytokines pour amplifier la réponse immunitaire."
    },
    antibody_launcher: {
        id: 25, name: "Lanceur d'Anticorps", icon: "✨", rarity: 'UNCOMMON', type: 'ATTACK', cost: 92,
        damage: 32, range: 140, fireRate: 1300, speed: 10,
        gameEffect: "Longue portée, cible les ennemis lointains",
        realBody: "Plasmocytes qui produisent des anticorps à longue portée."
    },
    interferon_cell: {
        id: 26, name: "Cellule Interféron", icon: "🛡️", rarity: 'UNCOMMON', type: 'ATTACK', cost: 84,
        damage: 24, range: 120, fireRate: 1100, speed: 7, slow: 0.3,
        gameEffect: "Ralentit les ennemis touchés",
        realBody: "Cellules qui libèrent des interférons, ralentissant la réplication virale."
    },
    complement_cell: {
        id: 27, name: "Cellule Complément", icon: "⭐", rarity: 'UNCOMMON', type: 'ATTACK', cost: 90,
        damage: 30, range: 125, fireRate: 1200, speed: 8,
        gameEffect: "Marque les ennemis pour plus de dégâts",
        realBody: "Protéines du système du complément qui marquent les pathogènes pour destruction."
    },

    // ATTACK - RARE (8 cartes)
    sniper_cell: {
        id: 28, name: "Cellule Sniper", icon: "🎯", rarity: 'RARE', type: 'ATTACK', cost: 150,
        damage: 100, range: 250, fireRate: 3000, speed: 15,
        gameEffect: "Portée extrême, dégâts massifs",
        realBody: "Lymphocytes T mémoire qui visent précisément les cellules infectées."
    },
    chain_lighter: {
        id: 29, name: "Éclair en Chaîne", icon: "⚡", rarity: 'RARE', type: 'ATTACK', cost: 160,
        damage: 40, range: 140, fireRate: 1500, speed: 12, chain: 3,
        gameEffect: "L'attaque rebondit sur 3 ennemis",
        realBody: "Cascades de signaux immunitaires qui se propagent entre cellules."
    },
    triple_shot: {
        id: 30, name: "Triple Tir", icon: "🎰", rarity: 'RARE', type: 'ATTACK', cost: 155,
        damage: 30, range: 135, fireRate: 1100, speed: 10, multishot: 3,
        gameEffect: "Attaque 3 ennemis à la fois",
        realBody: "Cellule B produisant 3 types d'anticorps différents."
    },
    plasma_cannon: {
        id: 31, name: "Canon Plasma", icon: "🔵", rarity: 'RARE', type: 'ATTACK', cost: 158,
        damage: 75, range: 160, fireRate: 2000, speed: 12,
        gameEffect: "Tir puissant de plasmocytes",
        realBody: "Plasmocyte hyperstimulé produisant une quantité massive d'anticorps."
    },
    critical_cell: {
        id: 32, name: "Cellule Critique", icon: "💥", rarity: 'RARE', type: 'ATTACK', cost: 152,
        damage: 70, range: 140, fireRate: 1700, speed: 10, crit: 0.35,
        gameEffect: "35% chance de coup critique (x3 dégâts)",
        realBody: "Cellules avec récepteurs ultra-sensibles pour des attaques décisives."
    },
    venom_cell: {
        id: 33, name: "Cellule Venin", icon: "🐍", rarity: 'RARE', type: 'ATTACK', cost: 145,
        damage: 30, range: 128, fireRate: 1300, speed: 9, poison: 20,
        gameEffect: "Poison puissant (20 DPS)",
        realBody: "Granulocytes libérant des enzymes qui digèrent les pathogènes."
    },
    laser_cell: {
        id: 34, name: "Cellule Laser", icon: "🔴", rarity: 'RARE', type: 'ATTACK', cost: 165,
        damage: 85, range: 180, fireRate: 2200, speed: 14, pierce: 4,
        gameEffect: "Traverse 4 ennemis",
        realBody: "Attaque immunitaire concentrée qui détruit plusieurs cellules infectées alignées."
    },
    devastator: {
        id: 35, name: "Dévastateur", icon: "💢", rarity: 'RARE', type: 'ATTACK', cost: 163,
        damage: 85, range: 130, fireRate: 2200, speed: 8, aoe: 55,
        gameEffect: "Explosion de zone massive",
        realBody: "Burst oxydatif des neutrophiles qui tue tout autour."
    },

    // ATTACK - SUPER RARE (5 cartes)
    memory_tcell: {
        id: 36, name: "T-Cell Mémoire", icon: "🧠", rarity: 'SUPER_RARE', type: 'ATTACK', cost: 300,
        damage: 200, range: 220, fireRate: 4000, speed: 16, crit: 0.4,
        gameEffect: "Se souvient des ennemis, 40% crit",
        realBody: "Lymphocytes T mémoire qui réagissent rapidement aux infections récurrentes."
    },
    nuclear_cell: {
        id: 37, name: "Cellule Nucléaire", icon: "☢️", rarity: 'SUPER_RARE', type: 'ATTACK', cost: 230,
        damage: 150, range: 150, fireRate: 3000, speed: 10, aoe: 90,
        gameEffect: "Explosion nucléaire",
        realBody: "Apoptose massive - mort cellulaire programmée qui détruit tout autour."
    },
    quantum_destroyer: {
        id: 38, name: "Destructeur Quantique", icon: "🌌", rarity: 'SUPER_RARE', type: 'ATTACK', cost: 240,
        damage: 140, range: 190, fireRate: 2300, speed: 15, chain: 4,
        gameEffect: "Chaîne sur 4 ennemis",
        realBody: "Cascade immunitaire qui se propage exponentiellement."
    },
    ultimate_sniper: {
        id: 39, name: "Sniper Ultime", icon: "🎯", rarity: 'SUPER_RARE', type: 'ATTACK', cost: 225,
        damage: 180, range: 280, fireRate: 3500, speed: 22,
        gameEffect: "Portée maximale, précision parfaite",
        realBody: "Anticorps monoclonaux ultra-spécifiques."
    },
    void_cell: {
        id: 40, name: "Cellule du Vide", icon: "🌑", rarity: 'SUPER_RARE', type: 'ATTACK', cost: 235,
        damage: 130, range: 175, fireRate: 2100, speed: 13, aoe: 75, poison: 20,
        gameEffect: "Zone + poison mortel",
        realBody: "Nécrose - mort cellulaire qui libère des toxines environnantes."
    },

    // ATTACK - EPIC (3 cartes)
    cytokine_storm: {
        id: 41, name: "Tempête Cytokine", icon: "🌪️", rarity: 'EPIC', type: 'ATTACK', cost: 280,
        damage: 150, range: 160, fireRate: 3500, speed: 8, aoe: 100,
        gameEffect: "Tempête dévastatrice de zone",
        realBody: "Réponse immunitaire hyperactive - libération massive de cytokines."
    },
    titan_cell: {
        id: 42, name: "Cellule Titan", icon: "⚡", rarity: 'EPIC', type: 'ATTACK', cost: 320,
        damage: 250, range: 200, fireRate: 3000, speed: 14, aoe: 85, crit: 0.3,
        gameEffect: "Géant destructeur avec zone et critique",
        realBody: "Macrophage géant multinucléé formé par fusion de macrophages."
    },
    infinity_cell: {
        id: 43, name: "Cellule Infinie", icon: "♾️", rarity: 'EPIC', type: 'ATTACK', cost: 310,
        damage: 180, range: 240, fireRate: 2800, speed: 18, pierce: 8, chain: 5,
        gameEffect: "Perce 8 ennemis ET rebondit 5 fois",
        realBody: "Immunité adaptative - mémoire immunitaire permanente et évolutive."
    },

    // ATTACK - LEGENDARY (2 cartes)
    antibody_god: {
        id: 44, name: "Dieu Anticorps", icon: "👑", rarity: 'LEGENDARY', type: 'ATTACK', cost: 400,
        damage: 300, range: 280, fireRate: 3000, speed: 25, crit: 0.5, aoe: 60,
        gameEffect: "Puissance divine - 50% crit + zone",
        realBody: "Anticorps polyvalent IgG - la défense ultime du corps humain."
    },
    celestial_cell: {
        id: 45, name: "Cellule Céleste", icon: "✨", rarity: 'LEGENDARY', type: 'ATTACK', cost: 420,
        damage: 350, range: 300, fireRate: 2800, speed: 28, pierce: 10, chain: 6, aoe: 70,
        gameEffect: "Combinaison de TOUS les effets",
        realBody: "Immunité innée + adaptative parfaitement coordonnée."
    },

    // ATTACK - MYTHIC (1 carte)
    immune_destroyer: {
        id: 46, name: "Destructeur Ultime", icon: "💀", rarity: 'MYTHIC', type: 'ATTACK', cost: 500,
        damage: 500, range: 320, fireRate: 2500, speed: 30, crit: 0.6, aoe: 120, pierce: 10, chain: 8,
        gameEffect: "DESTRUCTION TOTALE - tous effets max",
        realBody: "Système immunitaire parfait - l'évolution ultime de la défense humaine."
    },

    // DEFENSE - COMMON (5 cartes)
    barrier_cell: {
        id: 47, name: "Cellule Barrière", icon: "🚧", rarity: 'COMMON', type: 'DEFENSE', cost: 45,
        damage: 8, range: 75, fireRate: 1200, speed: 4, armor: 0.2,
        gameEffect: "Ralentit les ennemis de 20%",
        realBody: "Cellules épithéliales - première barrière physique contre les pathogènes."
    },
    mucus_cell: {
        id: 48, name: "Cellule Mucus", icon: "💧", rarity: 'COMMON', type: 'DEFENSE', cost: 50,
        damage: 10, range: 80, fireRate: 1300, speed: 5, slow: 0.3,
        gameEffect: "Ralentit les ennemis dans le mucus",
        realBody: "Cellules caliciformes qui produisent du mucus pour piéger les pathogènes."
    },
    skin_cell: {
        id: 49, name: "Cellule Cutanée", icon: "🛡️", rarity: 'COMMON', type: 'DEFENSE', cost: 48,
        damage: 9, range: 70, fireRate: 1250, speed: 4,
        gameEffect: "Bouclier physique résistant",
        realBody: "Kératinocytes - cellules de la peau formant une barrière imperméable."
    },
    tight_junction: {
        id: 50, name: "Jonction Serrée", icon: "🔗", rarity: 'COMMON', type: 'DEFENSE', cost: 52,
        damage: 11, range: 85, fireRate: 1350, speed: 5,
        gameEffect: "Bloque le passage des ennemis",
        realBody: "Jonctions entre cellules qui empêchent les pathogènes de passer."
    },
    complement_blocker: {
        id: 51, name: "Bloqueur Complément", icon: "🚫", rarity: 'COMMON', type: 'DEFENSE', cost: 46,
        damage: 8, range: 90, fireRate: 1150, speed: 6,
        gameEffect: "Neutralise les attaques ennemies",
        realBody: "Protéines régulatrices qui empêchent l'activation excessive du complément."
    },

    // DEFENSE - UNCOMMON (5 cartes)
    freezer: {
        id: 52, name: "Cellule Glaciale", icon: "❄️", rarity: 'UNCOMMON', type: 'DEFENSE', cost: 90,
        damage: 22, range: 110, fireRate: 1400, speed: 6, slow: 0.4,
        gameEffect: "Ralentit fortement (40%)",
        realBody: "Hypothermie locale qui ralentit le métabolisme des pathogènes."
    },
    shield_wall: {
        id: 53, name: "Mur Bouclier", icon: "🧱", rarity: 'UNCOMMON', type: 'DEFENSE', cost: 95,
        damage: 25, range: 95, fireRate: 1500, speed: 5, armor: 0.3,
        gameEffect: "Haute résistance, ralentit zone",
        realBody: "Barrière cellulaire renforcée - tissus conjonctifs denses."
    },
    stun_cell: {
        id: 54, name: "Cellule Étourdissante", icon: "💫", rarity: 'UNCOMMON', type: 'DEFENSE', cost: 88,
        damage: 20, range: 100, fireRate: 1600, speed: 6, stun: 500,
        gameEffect: "Étourdit brièvement les ennemis",
        realBody: "Choc osmotique qui désactive temporairement les pathogènes."
    },
    trap_cell: {
        id: 55, name: "Cellule Piège", icon: "🕸️", rarity: 'UNCOMMON', type: 'DEFENSE', cost: 92,
        damage: 18, range: 105, fireRate: 1450, speed: 7, slow: 0.5,
        gameEffect: "Piège et ralentit massivement",
        realBody: "Filets d'ADN extracellulaires (NETs) qui piègent les bactéries."
    },
    fortress: {
        id: 56, name: "Forteresse Cellulaire", icon: "🏰", rarity: 'UNCOMMON', type: 'DEFENSE', cost: 100,
        damage: 28, range: 90, fireRate: 1700, speed: 4, armor: 0.4,
        gameEffect: "Défense ultra-résistante",
        realBody: "Capsule tissulaire - encapsulement des corps étrangers."
    },

    // DEFENSE - RARE (3 cartes)
    macro_tank: {
        id: 57, name: "Macrophage Tank", icon: "🔶", rarity: 'RARE', type: 'DEFENSE', cost: 130,
        damage: 50, range: 100, fireRate: 2000, speed: 5, slow: 0.5,
        gameEffect: "Tank qui ralentit et résiste",
        realBody: "Macrophage M1 - phagocyte géant qui engloutit les envahisseurs."
    },
    freeze_tower: {
        id: 58, name: "Tour Glaciale", icon: "🧊", rarity: 'RARE', type: 'DEFENSE', cost: 138,
        damage: 38, range: 125, fireRate: 1500, speed: 7, slow: 0.6, aoe: 45,
        gameEffect: "Ralentit en zone (60%)",
        realBody: "Inflammation contrôlée qui ralentit la propagation de l'infection."
    },
    immune_wall: {
        id: 59, name: "Mur Immunitaire", icon: "🛡️", rarity: 'RARE', type: 'DEFENSE', cost: 145,
        damage: 45, range: 110, fireRate: 1800, speed: 5, armor: 0.5,
        gameEffect: "50% de réduction des dégâts",
        realBody: "Barrière hémato-encéphalique - protection ultime du cerveau."
    },

    // DEFENSE - SUPER RARE (2 cartes)
    time_cell: {
        id: 60, name: "Cellule Temporelle", icon: "⏰", rarity: 'SUPER_RARE', type: 'DEFENSE', cost: 210,
        damage: 90, range: 170, fireRate: 1800, speed: 14, slow: 0.7,
        gameEffect: "Ralentit massivement le temps",
        realBody: "Contrôle du cycle cellulaire - arrête la réplication des pathogènes."
    },
    shield_master: {
        id: 61, name: "Maître Bouclier", icon: "🛡️", rarity: 'SUPER_RARE', type: 'DEFENSE', cost: 195,
        damage: 80, range: 140, fireRate: 1900, speed: 8, armor: 0.5,
        gameEffect: "Protection maximale (50% armure)",
        realBody: "Système du complément régulé - protection sans auto-dommages."
    },

    // DEFENSE - EPIC (1 carte)
    apocalypse_tower: {
        id: 62, name: "Tour Apocalypse", icon: "💀", rarity: 'EPIC', type: 'DEFENSE', cost: 330,
        damage: 220, range: 190, fireRate: 3200, speed: 12, aoe: 110, slow: 0.5,
        gameEffect: "Zone massive + ralentissement",
        realBody: "Réponse inflammatoire systémique - défense de dernier recours du corps."
    },

    // SUPPORT - COMMON (5 cartes)
    basic_healer: {
        id: 63, name: "Soigneur Basique", icon: "💚", rarity: 'COMMON', type: 'SUPPORT', cost: 60,
        damage: 0, range: 120, fireRate: 0, speed: 0, heal: 0.5,
        gameEffect: "Soigne les tours alliées",
        realBody: "Plaquettes - réparent les tissus endommagés."
    },
    booster_cell: {
        id: 64, name: "Cellule Boost", icon: "⬆️", rarity: 'COMMON', type: 'SUPPORT', cost: 55,
        damage: 0, range: 130, fireRate: 0, speed: 0, boost: 0.1,
        gameEffect: "+10% dégâts aux tours proches",
        realBody: "Cytokines IL-2 - stimulent la prolifération des cellules immunitaires."
    },
    energy_cell: {
        id: 65, name: "Cellule Énergie", icon: "⚡", rarity: 'COMMON', type: 'SUPPORT', cost: 58,
        damage: 0, range: 125, fireRate: 0, speed: 0, energize: 0.15,
        gameEffect: "+15% vitesse de tir aux alliés",
        realBody: "Mitochondries - fournissent l'ATP (énergie) aux cellules immunitaires."
    },
    regen_cell: {
        id: 66, name: "Cellule Régénération", icon: "🌱", rarity: 'COMMON', type: 'SUPPORT', cost: 62,
        damage: 0, range: 115, fireRate: 0, speed: 0, regen: 1,
        gameEffect: "Régénère 1 PV/sec aux tours",
        realBody: "Cellules souches - se différencient pour remplacer les cellules mortes."
    },
    scout_support: {
        id: 67, name: "Support Éclaireur", icon: "👁️", rarity: 'COMMON', type: 'SUPPORT', cost: 52,
        damage: 0, range: 150, fireRate: 0, speed: 0, vision: 1.3,
        gameEffect: "+30% portée aux tours proches",
        realBody: "Cellules dendritiques - détectent les pathogènes et alertent le système."
    },

    // SUPPORT - UNCOMMON (5 cartes)
    mega_healer: {
        id: 68, name: "Méga Soigneur", icon: "💚", rarity: 'UNCOMMON', type: 'SUPPORT', cost: 85,
        damage: 0, range: 140, fireRate: 0, speed: 0, heal: 1.5,
        gameEffect: "Soins puissants (1.5/sec)",
        realBody: "Facteurs de croissance - accélèrent la réparation tissulaire."
    },
    mega_booster: {
        id: 69, name: "Méga Amplificateur", icon: "📈", rarity: 'UNCOMMON', type: 'SUPPORT', cost: 92,
        damage: 0, range: 150, fireRate: 0, speed: 0, boost: 0.2,
        gameEffect: "+20% dégâts en zone",
        realBody: "Interféron gamma - active massivement les macrophages."
    },
    speed_cell: {
        id: 70, name: "Cellule Vitesse", icon: "💨", rarity: 'UNCOMMON', type: 'SUPPORT', cost: 88,
        damage: 0, range: 145, fireRate: 0, speed: 0, haste: 0.25,
        gameEffect: "+25% vitesse d'attaque",
        realBody: "Adrénaline - accélère toutes les réactions physiologiques."
    },
    shield_support: {
        id: 71, name: "Support Bouclier", icon: "🛡️", rarity: 'UNCOMMON', type: 'SUPPORT', cost: 90,
        damage: 0, range: 135, fireRate: 0, speed: 0, armor_boost: 0.2,
        gameEffect: "+20% armure aux alliés",
        realBody: "Protéines du complément - renforcent la membrane cellulaire."
    },
    resource_cell: {
        id: 72, name: "Cellule Ressource", icon: "💰", rarity: 'UNCOMMON', type: 'SUPPORT', cost: 95,
        damage: 0, range: 0, fireRate: 0, speed: 0, income: 2,
        gameEffect: "+2 💰 par seconde",
        realBody: "Métabolisme - production continue d'énergie et ressources."
    },

    // SUPPORT - RARE (3 cartes)
    dendrite_king: {
        id: 73, name: "Roi Dendritique", icon: "⭐", rarity: 'RARE', type: 'SUPPORT', cost: 142,
        damage: 0, range: 180, fireRate: 0, speed: 0, boost: 0.25,
        gameEffect: "+25% dégâts zone large",
        realBody: "Cellule dendritique mature - active massivement les lymphocytes T."
    },
    ultra_healer: {
        id: 74, name: "Soigneur Ultime", icon: "💚", rarity: 'RARE', type: 'SUPPORT', cost: 150,
        damage: 0, range: 160, fireRate: 0, speed: 0, heal: 3,
        gameEffect: "Soins massifs (3/sec)",
        realBody: "Régénération tissulaire complète - guérison rapide des blessures."
    },
    range_master: {
        id: 75, name: "Maître Portée", icon: "🎯", rarity: 'RARE', type: 'SUPPORT', cost: 148,
        damage: 0, range: 200, fireRate: 0, speed: 0, range_boost: 0.4,
        gameEffect: "+40% portée aux tours",
        realBody: "Anticorps à longue portée - atteignent des sites distants."
    },

    // SUPPORT - SUPER RARE (2 cartes)
    omega_booster: {
        id: 76, name: "Booster Oméga", icon: "🔼", rarity: 'SUPER_RARE', type: 'SUPPORT', cost: 205,
        damage: 0, range: 220, fireRate: 0, speed: 0, boost: 0.4,
        gameEffect: "+40% dégâts zone énorme",
        realBody: "Cascade de cytokines - amplification exponentielle de la réponse."
    },
    regenerator: {
        id: 77, name: "Régénérateur", icon: "💚", rarity: 'SUPER_RARE', type: 'SUPPORT', cost: 230,
        damage: 0, range: 160, fireRate: 0, speed: 0, heal: 2,
        gameEffect: "Régénération + ressources",
        realBody: "Cellules souches pluripotentes - régénération complète des tissus."
    },

    // SUPPORT - EPIC (2 cartes)
    god_booster: {
        id: 78, name: "Booster Divin", icon: "👼", rarity: 'EPIC', type: 'SUPPORT', cost: 270,
        damage: 0, range: 250, fireRate: 0, speed: 0, boost: 0.5,
        gameEffect: "+50% dégâts - buff divin",
        realBody: "Activation complète du système immunitaire adaptatif."
    },
    universal_support: {
        id: 79, name: "Support Universel", icon: "🌟", rarity: 'EPIC', type: 'SUPPORT', cost: 290,
        damage: 0, range: 240, fireRate: 0, speed: 0, boost: 0.3, heal: 2, armor_boost: 0.2,
        gameEffect: "Buff multiple - attaque, soin, armure",
        realBody: "Homéostasie parfaite - équilibre optimal de tous les systèmes."
    },

    // SUPPORT - LEGENDARY (1 carte)
    celestial_support: {
        id: 80, name: "Support Céleste", icon: "✨", rarity: 'LEGENDARY', type: 'SUPPORT', cost: 380,
        damage: 0, range: 280, fireRate: 0, speed: 0, boost: 0.6, heal: 3, armor_boost: 0.3, range_boost: 0.5,
        gameEffect: "TOUS LES BUFFS au maximum",
        realBody: "Système immunitaire transcendant - perfection biologique absolue."
    }
};

// Système de jeu (chemin, spots, etc.)
const battlePath = [
    { x: 50, y: 450 }, { x: 200, y: 450 }, { x: 200, y: 200 },
    { x: 400, y: 200 }, { x: 400, y: 700 }, { x: 700, y: 700 },
    { x: 700, y: 300 }, { x: 900, y: 300 }, { x: 900, y: 600 },
    { x: 1100, y: 600 }, { x: 1100, y: 250 }, { x: 1350, y: 250 }
];

const buildingSpots = [
    { x: 100, y: 100 }, { x: 300, y: 100 }, { x: 500, y: 100 }, { x: 700, y: 100 }, { x: 900, y: 100 }, { x: 1100, y: 100 }, { x: 1300, y: 100 },
    { x: 100, y: 300 }, { x: 300, y: 350 }, { x: 500, y: 300 }, { x: 800, y: 200 }, { x: 1000, y: 350 }, { x: 1200, y: 300 }, { x: 1300, y: 350 },
    { x: 100, y: 550 }, { x: 300, y: 500 }, { x: 500, y: 550 }, { x: 600, y: 500 }, { x: 800, y: 450 }, { x: 1000, y: 500 }, { x: 1200, y: 550 },
    { x: 100, y: 700 }, { x: 300, y: 750 }, { x: 500, y: 700 }, { x: 600, y: 800 }, { x: 800, y: 750 }, { x: 1000, y: 700 }, { x: 1200, y: 750 },
    { x: 100, y: 850 }, { x: 300, y: 850 }, { x: 500, y: 850 }, { x: 700, y: 850 }, { x: 900, y: 850 }, { x: 1100, y: 850 }, { x: 1300, y: 850 }
].map(spot => ({ ...spot, occupied: false }));

const MICROBE_TYPES = {
    bacteria: { name: "Bactérie", colors: ['#f44', '#f66', '#f88'] },
    virus: { name: "Virus", colors: ['#fc0', '#fd4', '#fe8'] },
    fungus: { name: "Champignon", colors: ['#8f8', '#af8', '#cf8'] },
    parasite: { name: "Parasite", colors: ['#f8f', '#faf', '#fcf'] },
    prion: { name: "Prion", colors: ['#8ff', '#aff', '#cff'] }
};

const waveData = [
    { wave: 1, type: 'bacteria', count: 10, health: 50, speed: 1.0, reward: 20 },
    { wave: 2, type: 'virus', count: 12, health: 60, speed: 1.3, reward: 25 },
    { wave: 3, type: 'bacteria', count: 15, health: 70, speed: 1.1, reward: 30 },
    { wave: 4, type: 'fungus', count: 18, health: 90, speed: 0.9, reward: 35 },
    { wave: 5, boss: true, type: 'bacteria', name: "MEGA BACTÉRIE", health: 1500, speed: 0.8, reward: 150, minions: [{ type: 'bacteria', count: 20, health: 80, speed: 1.2, reward: 20 }] },
    { wave: 6, type: 'virus', count: 20, health: 100, speed: 1.4, reward: 40 },
    { wave: 7, type: 'parasite', count: 15, health: 120, speed: 1.6, reward: 45 },
    { wave: 8, type: 'bacteria', count: 25, health: 110, speed: 1.2, reward: 50 },
    { wave: 9, type: 'virus', count: 30, health: 130, speed: 1.5, reward: 55 },
    { wave: 10, boss: true, type: 'virus', name: "SUPER VIRUS", health: 2500, speed: 1.0, reward: 200, minions: [{ type: 'virus', count: 25, health: 120, speed: 1.6, reward: 25 }] },
    { wave: 11, type: 'prion', count: 20, health: 150, speed: 1.3, reward: 60 },
    { wave: 12, type: 'parasite', count: 22, health: 170, speed: 1.7, reward: 65 },
    { wave: 13, type: 'fungus', count: 28, health: 200, speed: 1.0, reward: 70 },
    { wave: 14, type: 'bacteria', count: 35, health: 180, speed: 1.4, reward: 75 },
    { wave: 15, boss: true, type: 'parasite', name: "PARASITE GÉANT", health: 4000, speed: 1.2, reward: 300, minions: [{ type: 'parasite', count: 30, health: 190, speed: 1.8, reward: 35 }] },
    { wave: 16, type: 'prion', count: 35, health: 250, speed: 1.4, reward: 85 },
    { wave: 17, type: 'virus', count: 40, health: 220, speed: 1.7, reward: 90 },
    { wave: 18, type: 'fungus', count: 32, health: 280, speed: 1.1, reward: 95 },
    { wave: 19, type: 'parasite', count: 45, health: 300, speed: 1.8, reward: 100 },
    { wave: 20, boss: true, type: 'prion', name: "CELLULE CANCÉREUSE", health: 8000, speed: 1.3, reward: 500, minions: [{ type: 'bacteria', count: 40, health: 280, speed: 1.5, reward: 45 }] }
];

const gameState = {
    resources: 300,
    life: 30,
    wave: 0,
    kills: 0,
    towers: [],
    enemies: [],
    projectiles: [],
    selectedCard: null,
    selectedTower: null,
    gamePaused: false,
    gameSpeed: 1,
    bossActive: false,
    deckVisible: true,
    cameraX: 0,
    cameraY: 0
};

const playerData = {
    collection: {},
    activeDeck: [],
    stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        totalKills: 0,
        totalSpins: 0,
        highestWave: 0
    }
};

// Initialiser collection
Object.keys(ALL_CARDS).forEach(key => {
    playerData.collection[ALL_CARDS[key].id] = {
        card: ALL_CARDS[key],
        owned: false,
        quantity: 0
    };
});

function saveData() {
    localStorage.setItem('immuneDefenseV4', JSON.stringify({
        collection: playerData.collection,
        stats: playerData.stats
    }));
}

function loadData() {
    const saved = localStorage.getItem('immuneDefenseV4');
    if (saved) {
        const data = JSON.parse(saved);
        playerData.collection = data.collection || playerData.collection;
        playerData.stats = data.stats || playerData.stats;
    }
}

function spinCard(boosterType = null) {
    let rand = Math.random() * 100;
    let cumulative = 0;
    
    for (const [rarityKey, rarityData] of Object.entries(RARITIES)) {
        cumulative += rarityData.spinChance;
        if (rand <= cumulative) {
            let cardsPool = Object.values(ALL_CARDS).filter(c => c.rarity === rarityKey);
            
            if (boosterType) {
                cardsPool = cardsPool.filter(c => c.type === boosterType);
            }
            
            const wonCard = cardsPool[Math.floor(Math.random() * cardsPool.length)];
            
            playerData.collection[wonCard.id].owned = true;
            playerData.collection[wonCard.id].quantity++;
            playerData.stats.totalSpins++;
            saveData();
            
            return wonCard;
        }
    }
}

console.log('✅ V4.0 Data - 80 CARTES ÉDUCATIVES chargées!');