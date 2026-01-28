// ============================
//  CONFIGURATION & UTILITAIRES
// ============================

const CONFIG = {
  STORAGE_KEYS: {
    TOTAL_DONS: 'totalDons',
    DERNIER_DON: 'dernierDon',
    DONS: 'dons'
  },
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300
};

// Fonction debounce pour optimiser les performances
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Fonction pour gérer localStorage de manière sécurisée
const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${key}:`, error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Erreur lors de l'écriture de ${key}:`, error);
      return false;
    }
  }
};

// ============================
//  MENU BURGER + OVERLAY
// ============================

class MenuManager {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.overlayMenu = document.getElementById('overlayMenu');
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.hamburger || !this.overlayMenu) return;

    // Événement du hamburger
    this.hamburger.addEventListener('click', () => this.toggle());

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Fermer en cliquant en dehors
    this.overlayMenu.addEventListener('click', (e) => {
      if (e.target === this.overlayMenu) {
        this.close();
      }
    });

    // Gérer les accordéons
    this.initAccordions();
  }

  open() {
    this.overlayMenu.classList.add('open');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
  }

  close() {
    this.overlayMenu.classList.remove('open');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
    document.body.style.overflow = ''; // Rétablir le scroll
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  initAccordions() {
    const menuItems = document.querySelectorAll('.main-menu > li');
    
    menuItems.forEach(li => {
      const toggle = li.querySelector('.menu-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', () => {
        const wasExpanded = li.classList.contains('expanded');
        
        // Fermer tous les autres
        menuItems.forEach(otherLi => {
          if (otherLi !== li) {
            otherLi.classList.remove('expanded');
            const otherToggle = otherLi.querySelector('.menu-toggle');
            if (otherToggle) {
              otherToggle.setAttribute('aria-expanded', 'false');
            }
          }
        });

        // Toggle celui-ci
        li.classList.toggle('expanded');
        toggle.setAttribute('aria-expanded', !wasExpanded);
      });
    });
  }
}

// ============================
//  NAVIGATION SMOOTH
// ============================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Sidebar links
    document.querySelectorAll('.sidebar a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });

    // Autres liens internes
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (!target) return;

    // Fermer le menu si ouvert
    if (window.menuManager && window.menuManager.isOpen) {
      window.menuManager.close();
    }

    // Scroll smooth
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Update focus pour accessibilité
    target.focus({ preventScroll: true });
  }
}

// ============================
//  SYSTÈME DE DONS
// ============================

class DonationSystem {
  constructor() {
    this.totalDons = 0;
    this.dernierDon = 0;
    this.dons = [];
    this.form = document.getElementById('donForm');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.loadFromStorage();
    this.updateDisplay();
    this.renderFeed();
    this.attachEventListeners();
  }

  loadFromStorage() {
    this.totalDons = storage.get(CONFIG.STORAGE_KEYS.TOTAL_DONS, 0);
    this.dernierDon = storage.get(CONFIG.STORAGE_KEYS.DERNIER_DON, 0);
    this.dons = storage.get(CONFIG.STORAGE_KEYS.DONS, []);
  }

  saveToStorage() {
    storage.set(CONFIG.STORAGE_KEYS.TOTAL_DONS, this.totalDons);
    storage.set(CONFIG.STORAGE_KEYS.DERNIER_DON, this.dernierDon);
    storage.set(CONFIG.STORAGE_KEYS.DONS, this.dons);
  }

  updateDisplay() {
    const totalEl = document.getElementById('donTotal');
    const dernierEl = document.getElementById('dernierDon');
    
    if (totalEl) totalEl.textContent = `${this.totalDons} $`;
    if (dernierEl) dernierEl.textContent = `${this.dernierDon} $`;
  }

  renderFeed() {
    const container = document.getElementById('donLiveFeed');
    if (!container) return;

    container.innerHTML = '';
    
    // Afficher les dons les plus récents en premier
    [...this.dons].reverse().forEach(don => {
      this.createDonCard(don, false);
    });
  }

  createDonCard(don, animate = true) {
    const container = document.getElementById('donLiveFeed');
    if (!container) return;

    const card = document.createElement('div');
    card.classList.add('don-card');
    
    if (!animate) {
      card.style.animation = 'none';
    }

    const dedicationHTML = don.dedication 
      ? `<div class="don-card-dedication">🎁 Dédicace : ${this.escapeHtml(don.dedication)}</div>` 
      : '';

    card.innerHTML = `
      <div class="don-card-header">
        <span class="don-card-name">💛 ${this.escapeHtml(don.nom)}</span>
        <span class="don-card-amount">+${don.montant}$</span>
      </div>
      ${dedicationHTML}
      <div class="don-card-time">⏰ ${don.heure}</div>
    `;

    container.insertBefore(card, container.firstChild);

    // Limiter le nombre de cartes affichées pour performance
    const cards = container.querySelectorAll('.don-card');
    if (cards.length > 50) {
      cards[cards.length - 1].remove();
    }
  }

  getCurrentTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }

  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  showMessage(text) {
    const messageEl = document.getElementById('donMessage');
    if (!messageEl) return;

    messageEl.textContent = text;
    messageEl.style.display = 'block';

    // Masquer après 5 secondes
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 5000);
  }

  attachEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const nomInput = document.getElementById('donNom');
    const montantInput = document.getElementById('donMontant');
    const dedicationInput = document.getElementById('donDedication');

    const nom = nomInput.value.trim();
    const montant = Number(montantInput.value);
    const dedication = dedicationInput.value.trim();

    // Validation
    if (!nom || montant <= 0) {
      this.showMessage('⚠️ Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Créer l'objet don
    const don = {
      nom,
      montant,
      dedication,
      heure: this.getCurrentTime(),
      timestamp: Date.now()
    };

    // Mettre à jour les totaux
    this.totalDons += montant;
    this.dernierDon = montant;
    this.dons.push(don);

    // Sauvegarder
    this.saveToStorage();

    // Mettre à jour l'affichage
    this.updateDisplay();
    this.createDonCard(don, true);

    // Message de confirmation
    const message = dedication
      ? `Merci ${nom} pour votre don de ${montant}$ 💛 (dédié à : ${dedication})`
      : `Merci ${nom} pour votre don de ${montant}$ 💛`;
    
    this.showMessage(message);

    // Réinitialiser le formulaire
    this.form.reset();
    nomInput.focus(); // Retour du focus pour accessibilité
  }
}

// ============================
//  SYSTÈME DE RECHERCHE
// ============================

const baseDeDonnees = [
  {
    titre: "Leucémie",
    categorie: "Type de cancer",
    motsCles: ["sang", "globules blancs", "moelle osseuse", "enfants"],
    description: "La leucémie est un cancer du sang qui affecte la production des globules blancs dans la moelle osseuse. C'est l'un des cancers les plus courants chez les enfants et les jeunes."
  },
  {
    titre: "Lymphome",
    categorie: "Type de cancer",
    motsCles: ["lymphocytes", "ganglions", "système immunitaire"],
    description: "Le lymphome est un cancer du système lymphatique, souvent détecté par des ganglions enflés. Il existe plusieurs types, dont le lymphome de Hodgkin et le lymphome non hodgkinien."
  },
  {
    titre: "Tumeurs cérébrales",
    categorie: "Type de cancer",
    motsCles: ["cerveau", "maux de tête", "vision", "équilibre"],
    description: "Les tumeurs cérébrales sont des masses anormales dans le cerveau pouvant affecter la vision, l'équilibre et le comportement. Elles peuvent être bénignes ou malignes."
  },
  {
    titre: "Sarcome",
    categorie: "Type de cancer",
    motsCles: ["os", "muscles", "tissus mous"],
    description: "Les sarcomes sont des cancers rares qui touchent les os ou les tissus mous comme les muscles. Ils représentent environ 15% des cancers chez les enfants et adolescents."
  },
  {
    titre: "Cancer du sein",
    categorie: "Type de cancer",
    motsCles: ["sein", "tumeur", "masse", "femmes", "adolescents"],
    description: "Le cancer du sein est une tumeur qui se développe dans les cellules du sein. Bien que rare chez les jeunes, il peut survenir et nécessite une détection précoce."
  },
  {
    titre: "Chimiothérapie",
    categorie: "Traitement",
    motsCles: ["traitement", "médicaments", "cancer", "cellules"],
    description: "La chimiothérapie utilise des médicaments puissants pour détruire les cellules cancéreuses. C'est l'un des traitements les plus courants contre le cancer."
  },
  {
    titre: "Radiothérapie",
    categorie: "Traitement",
    motsCles: ["rayons", "tumeurs", "traitement", "radiation"],
    description: "La radiothérapie utilise des rayons ciblés pour réduire ou éliminer les tumeurs. Elle peut être utilisée seule ou en combinaison avec d'autres traitements."
  },
  {
    titre: "Immunothérapie",
    categorie: "Traitement",
    motsCles: ["système immunitaire", "défense", "traitement", "innovation"],
    description: "L'immunothérapie aide le système immunitaire à reconnaître et attaquer les cellules cancéreuses. C'est une approche innovante qui donne des résultats prometteurs."
  },
  {
    titre: "Greffe de moelle osseuse",
    categorie: "Traitement",
    motsCles: ["moelle", "greffe", "globules blancs", "transplantation"],
    description: "La greffe de moelle osseuse remplace la moelle malade par une moelle saine pour reconstruire le système immunitaire. Elle est souvent utilisée pour traiter la leucémie."
  },
  {
    titre: "Fatigue extrême",
    categorie: "Symptôme",
    motsCles: ["fatigue", "épuisement", "symptôme", "énergie"],
    description: "Une fatigue persistante et inhabituelle peut être un signe de cancer ou un effet secondaire des traitements. Elle ne disparaît pas avec le repos."
  },
  {
    titre: "Fièvre persistante",
    categorie: "Symptôme",
    motsCles: ["fièvre", "infection", "symptôme", "température"],
    description: "Une fièvre qui dure plusieurs jours sans cause apparente peut être liée à certains types de cancer, notamment la leucémie."
  },
  {
    titre: "Douleurs osseuses",
    categorie: "Symptôme",
    motsCles: ["os", "douleur", "symptôme", "articulations"],
    description: "Les douleurs osseuses persistantes, surtout la nuit, peuvent être un signe de leucémie ou de sarcome osseux."
  },
  {
    titre: "Perte de poids involontaire",
    categorie: "Symptôme",
    motsCles: ["poids", "appétit", "symptôme", "amaigrissement"],
    description: "Une perte de poids rapide et inexpliquée peut être un signe précoce de cancer et nécessite une consultation médicale."
  },
  {
    titre: "Causes possibles du cancer",
    categorie: "Causes",
    motsCles: ["génétique", "mutation", "environnement", "facteurs"],
    description: "Le cancer peut être causé par des mutations génétiques, des facteurs environnementaux (tabac, pollution), des infections virales ou une combinaison de ces éléments."
  },
  {
    titre: "Prévention du cancer",
    categorie: "Prévention",
    motsCles: ["alimentation", "sport", "habitudes", "santé", "mode de vie"],
    description: "Une alimentation saine, l'activité physique régulière, l'évitement du tabac et la protection solaire réduisent significativement les risques de cancer."
  },
  {
    titre: "Statistiques sur le cancer chez les jeunes",
    categorie: "Statistiques",
    motsCles: ["jeunes", "statistiques", "cas", "données", "enfants"],
    description: "Chaque année, environ 1000 jeunes au Canada reçoivent un diagnostic de cancer. Les types les plus courants sont la leucémie, les tumeurs cérébrales et les lymphomes."
  }
];

class SearchSystem {
  constructor() {
    this.searchBar = document.getElementById('searchBar');
    this.suggestionsBox = document.getElementById('suggestions');
    this.overlay = document.getElementById('searchOverlay');
    this.overlayContent = document.getElementById('searchOverlayContent');
    this.init();
  }

  init() {
    if (!this.searchBar) return;

    // Recherche avec debounce pour performance
    this.searchBar.addEventListener('input', debounce((e) => {
      this.handleSearch(e.target.value);
    }, CONFIG.DEBOUNCE_DELAY));

    // Fermer suggestions si clic ailleurs
    document.addEventListener('click', (e) => {
      if (!this.searchBar.contains(e.target) && !this.suggestionsBox.contains(e.target)) {
        this.hideSuggestions();
      }
    });

    // Gérer la fermeture de l'overlay
    this.initOverlay();
  }

  normaliser(texte) {
    return texte
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, '');
  }

  handleSearch(query) {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      this.hideSuggestions();
      return;
    }

    const suggestions = this.findSuggestions(trimmedQuery);
    this.displaySuggestions(suggestions);
  }

  findSuggestions(query) {
    const normalizedQuery = this.normaliser(query);

    return baseDeDonnees.filter(item => {
      const titre = this.normaliser(item.titre);
      const mots = this.normaliser(item.motsCles.join(' '));
      const desc = this.normaliser(item.description);
      
      return titre.includes(normalizedQuery) || 
             mots.includes(normalizedQuery) ||
             desc.includes(normalizedQuery);
    }).slice(0, 5);
  }

  displaySuggestions(suggestions) {
    if (!this.suggestionsBox) return;

    this.suggestionsBox.innerHTML = '';

    if (suggestions.length === 0) {
      this.hideSuggestions();
      return;
    }

    suggestions.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('suggestion-item');
      div.setAttribute('role', 'option');
      div.setAttribute('tabindex', '0');

      div.innerHTML = `
        <div class="suggestion-title">${this.escapeHtml(item.titre)}</div>
        <div class="suggestion-category">${this.escapeHtml(item.categorie)}</div>
      `;

      // Click et Enter
      div.addEventListener('click', () => this.selectSuggestion(item));
      div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.selectSuggestion(item);
        }
      });

      this.suggestionsBox.appendChild(div);
    });

    this.suggestionsBox.style.display = 'block';
  }

  hideSuggestions() {
    if (this.suggestionsBox) {
      this.suggestionsBox.style.display = 'none';
    }
  }

  selectSuggestion(item) {
    this.searchBar.value = item.titre;
    this.hideSuggestions();
    this.showOverlay(item);
  }

  showOverlay(item) {
    if (!this.overlay || !this.overlayContent) return;

    this.overlayContent.innerHTML = `
      <button class="close-overlay" aria-label="Fermer">✕</button>
      <h3 id="search-result-title">${this.escapeHtml(item.titre)}</h3>
      <div class="categorie" style="color: var(--text-medium); margin-bottom: 1rem;">
        📁 ${this.escapeHtml(item.categorie)}
      </div>
      <p style="line-height: 1.8; font-size: 1.1rem;">
        ${this.escapeHtml(item.description)}
      </p>
      ${item.motsCles.length > 0 ? `
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--bg-light);">
          <strong style="color: var(--primary);">Mots-clés :</strong>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            ${item.motsCles.map(mot => 
              `<span style="background: var(--bg-primary); padding: 4px 12px; border-radius: 20px; font-size: 0.9rem;">
                ${this.escapeHtml(mot)}
              </span>`
            ).join('')}
          </div>
        </div>
      ` : ''}
    `;

    this.overlay.classList.add('show');
    this.overlay.style.display = 'flex';

    // Focus sur le bouton de fermeture
    const closeBtn = this.overlayContent.querySelector('.close-overlay');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  initOverlay() {
    if (!this.overlay) return;

    // Fermer avec le bouton X
    this.overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('close-overlay')) {
        this.closeOverlay();
      }
      // Fermer si clic sur le fond
      if (e.target === this.overlay) {
        this.closeOverlay();
      }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
        this.closeOverlay();
      }
    });
  }

  closeOverlay() {
    if (!this.overlay) return;

    this.overlay.classList.remove('show');
    
    setTimeout(() => {
      this.overlay.style.display = 'none';
    }, CONFIG.ANIMATION_DURATION);
  }

  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

// ============================
//  INITIALISATION
// ============================

document.addEventListener('DOMContentLoaded', () => {
  // Initialiser tous les systèmes
  window.menuManager = new MenuManager();
  window.smoothScroll = new SmoothScroll();
  window.donationSystem = new DonationSystem();
  window.searchSystem = new SearchSystem();

  console.log('✅ CancéroJeune chargé avec succès!');
});

// ============================
//  GESTION DES ERREURS
// ============================

window.addEventListener('error', (e) => {
  console.error('Erreur détectée:', e.message);
  // En production, on pourrait envoyer ces erreurs à un service de monitoring
});

// Gérer les erreurs de chargement d'images
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      console.warn('Image non trouvée:', this.src);
    });
  });
});