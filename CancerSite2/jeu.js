// IMMUNE DEFENSE V4.0 - ULTIMATE GAME LOGIC
console.log('🎮 V4.0 Loading...');

let currentScreen = 'mainMenu';
let selectedBooster = null;
let currentFilter = 'ALL';
let state = JSON.parse(JSON.stringify(gameState));
let animFrame = null;
let isPanning = false;
let panStart = { x: 0, y: 0 };
let selectedTowerObj = null;

// INIT
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    giveStarterCards();
    updateUI();
    initEventListeners();
    showScreen('mainMenu');
});

function initEventListeners() {
    document.getElementById('btnPlay').onclick = () => showScreen('deckSelectScreen');
    document.getElementById('btnSpin').onclick = () => showScreen('spinScreen');
    document.getElementById('btnCollection').onclick = () => showScreen('collectionScreen');
    document.getElementById('btnStats').onclick = () => showScreen('statsScreen');
}

// STARTER CARDS
function giveStarterCards() {
    const owned = Object.values(playerData.collection).filter(c => c.owned).length;
    if (owned === 0) {
        // Donner 10 cartes de départ
        const commons = Object.values(ALL_CARDS).filter(c => c.rarity === 'COMMON');
        for (let i = 0; i < 10; i++) {
            const card = commons[Math.floor(Math.random() * commons.length)];
            playerData.collection[card.id].owned = true;
            playerData.collection[card.id].quantity++;
        }
        saveData();
    }
}

// SCREENS
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
    
    if (screenId === 'collectionScreen') renderCollection();
    if (screenId === 'statsScreen') renderStats();
    if (screenId === 'deckSelectScreen') renderDeckSelect();
    if (screenId === 'mainMenu') updateUI();
}

function updateUI() {
    const owned = Object.values(playerData.collection).filter(c => c.owned).length;
    document.getElementById('collectionBadge').textContent = `${owned}/80`;
    document.getElementById('totalSpins').textContent = playerData.stats.totalSpins;
    document.getElementById('cardsUnlocked').textContent = `${owned}/80`;
}

// SPIN
function selectBooster(type) {
    selectedBooster = type;
    document.getElementById('spinAnimation').style.display = 'block';
    document.querySelector('.booster-select').style.display = 'none';
    
    setTimeout(() => doSpin(), 500);
}

function doSpin() {
    const pack = document.getElementById('cardPack');
    pack.classList.add('spinning');
    
    setTimeout(() => {
        pack.classList.remove('spinning');
        const card = spinCard(selectedBooster);
        revealCard(card);
    }, 2000);
}

function revealCard(card) {
    document.getElementById('cardPack').style.display = 'none';
    
    const revealed = document.getElementById('revealedCard');
    revealed.style.display = 'block';
    revealed.style.borderColor = RARITIES[card.rarity].color;
    revealed.style.color = RARITIES[card.rarity].color;
    revealed.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-type type-${card.type}">${CARD_TYPES[card.type].icon} ${CARD_TYPES[card.type].name}</div>
        <div class="card-rarity">${RARITIES[card.rarity].stars}</div>
        <div class="card-rarity">${RARITIES[card.rarity].name}</div>
        <div class="card-effect">${card.gameEffect}</div>
    `;
    
    document.getElementById('educationContent').innerHTML = `
        <p><strong>${card.name}</strong></p>
        <p><em>Dans le jeu:</em> ${card.gameEffect}</p>
        <p><em>Dans le corps humain:</em> ${card.realBody}</p>
    `;
    
    updateUI();
}

function resetSpin() {
    document.getElementById('cardPack').style.display = 'flex';
    document.getElementById('revealedCard').style.display = 'none';
    document.getElementById('spinAnimation').style.display = 'none';
    document.querySelector('.booster-select').style.display = 'flex';
    selectedBooster = null;
}

// COLLECTION
function filterCollection(type) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderCollection();
}

function renderCollection() {
    const grid = document.getElementById('collectionGrid');
    grid.innerHTML = '';
    
    Object.values(ALL_CARDS).forEach(card => {
        if (currentFilter !== 'ALL' && card.type !== currentFilter) return;
        
        const owned = playerData.collection[card.id].owned;
        const div = document.createElement('div');
        div.className = `card ${card.type}${!owned ? ' locked' : ''}`;
        div.innerHTML = `
            <div class="card-icon">${owned ? card.icon : '🔒'}</div>
            <div class="card-name">${owned ? card.name : '???'}</div>
            <div class="card-type-badge type-${card.type}">${CARD_TYPES[card.type].icon}</div>
            <div class="card-rarity-stars">${owned ? RARITIES[card.rarity].stars : ''}</div>
            <div class="card-cost">${owned ? card.cost + '💰' : ''}</div>
        `;
        
        if (owned) {
            div.onclick = () => showCardDetail(card);
        }
        
        grid.appendChild(div);
    });
}

function showCardDetail(card) {
    alert(`${card.name}\n\n🎮 ${card.gameEffect}\n\n🧬 ${card.realBody}`);
}

// STATS
function renderStats() {
    document.getElementById('statGames').textContent = playerData.stats.gamesPlayed;
    document.getElementById('statWins').textContent = playerData.stats.gamesWon;
    document.getElementById('statKills').textContent = playerData.stats.totalKills;
    document.getElementById('statWave').textContent = playerData.stats.highestWave;
    document.getElementById('statSpins').textContent = playerData.stats.totalSpins;
    const owned = Object.values(playerData.collection).filter(c => c.owned).length;
    document.getElementById('statCards').textContent = `${owned}/80`;
}

// DECK SELECT
function renderDeckSelect() {
    const selectedDeck = document.getElementById('selectedDeck');
    const available = document.getElementById('availableCards');
    
    selectedDeck.innerHTML = '';
    playerData.activeDeck.forEach(card => {
        const div = createCardElement(card, true);
        div.onclick = () => removeFromDeck(card);
        selectedDeck.appendChild(div);
    });
    
    available.innerHTML = '';
    Object.values(playerData.collection).filter(c => c.owned).forEach(item => {
        const card = item.card;
        const inDeck = playerData.activeDeck.find(c => c.id === card.id);
        const div = createCardElement(card, false);
        
        if (!inDeck && playerData.activeDeck.length < 6) {
            div.onclick = () => addToDeck(card);
        } else if (inDeck) {
            div.classList.add('selected');
        }
        
        available.appendChild(div);
    });
    
    updateDeckCounter();
}

function createCardElement(card, small) {
    const div = document.createElement('div');
    div.className = `card ${card.type}`;
    div.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-type-badge type-${card.type}">${CARD_TYPES[card.type].icon}</div>
        <div class="card-cost">${card.cost}💰</div>
    `;
    return div;
}

function addToDeck(card) {
    if (playerData.activeDeck.length < 6) {
        playerData.activeDeck.push(card);
        renderDeckSelect();
    }
}

function removeFromDeck(card) {
    playerData.activeDeck = playerData.activeDeck.filter(c => c.id !== card.id);
    renderDeckSelect();
}

function updateDeckCounter() {
    document.getElementById('deckCount').textContent = playerData.activeDeck.length;
    document.getElementById('startBattleBtn').disabled = playerData.activeDeck.length !== 6;
}

// START BATTLE
function startBattle() {
    if (playerData.activeDeck.length !== 6) return;
    
    showScreen('gameScreen');
    playerData.stats.gamesPlayed++;
    saveData();
    
    state = JSON.parse(JSON.stringify(gameState));
    state.activeDeck = playerData.activeDeck.map(c => ({...c}));
    
    initGame();
}

function initGame() {
    renderGameDeck();
    createBuildSpots();
    drawPath();
    initPanZoom();
    updateHUD();
    startGameLoop();
}

// GAME DECK
function renderGameDeck() {
    const container = document.getElementById('deckCards');
    container.innerHTML = '';
    
    state.activeDeck.forEach(card => {
        const div = createCardElement(card);
        div.onclick = () => selectCard(card, div);
        container.appendChild(div);
        card.element = div;
    });
}

function selectCard(card, el) {
    state.activeDeck.forEach(c => c.element?.classList.remove('selected'));
    
    if (state.selectedCard === card) {
        state.selectedCard = null;
    } else {
        state.selectedCard = card;
        el.classList.add('selected');
    }
}

function toggleDeck() {
    const deck = document.getElementById('gameDeck');
    deck.classList.toggle('hidden');
    document.getElementById('deckToggleIcon').textContent = deck.classList.contains('hidden') ? '▲' : '▼';
}

// BUILD SPOTS
function createBuildSpots() {
    const container = document.getElementById('spotsLayer');
    container.innerHTML = '';
    
    buildingSpots.forEach((spot, i) => {
        const el = document.createElement('div');
        el.className = 'spot';
        el.style.left = spot.x + 'px';
        el.style.top = spot.y + 'px';
        el.style.transform = 'translate(-50%, -50%)';
        el.onclick = () => buildTower(i);
        container.appendChild(el);
        spot.element = el;
    });
}

function buildTower(spotId) {
    const spot = buildingSpots[spotId];
    if (spot.occupied || !state.selectedCard) return;
    
    const card = state.selectedCard;
    if (state.resources < card.cost) return;
    
    const tower = {
        id: Date.now(),
        spotId: spotId,
        x: spot.x,
        y: spot.y,
        ...JSON.parse(JSON.stringify(card)),
        lastShot: 0,
        tier: 0
    };
    
    state.towers.push(tower);
    state.resources -= card.cost;
    spot.occupied = true;
    spot.element.classList.add('occupied');
    
    createTowerElement(tower);
    updateHUD();
    state.selectedCard = null;
    card.element?.classList.remove('selected');
}

function createTowerElement(tower) {
    const el = document.createElement('div');
    el.className = `tower tier${tower.tier}`;
    el.style.left = tower.x + 'px';
    el.style.top = tower.y + 'px';
    el.style.transform = 'translate(-50%, -50%)';
    el.innerHTML = `
        <div class="tower-base" style="border-color:${CARD_TYPES[tower.type].color}"></div>
        <div class="tower-icon">${tower.icon}</div>
        <div class="tower-range" style="width:${tower.range*2}px;height:${tower.range*2}px"></div>
    `;
    el.onclick = (e) => {
        e.stopPropagation();
        showTowerPanel(tower);
    };
    document.getElementById('towersLayer').appendChild(el);
    tower.element = el;
}

// TOWER PANEL avec UPGRADE & SELL
function showTowerPanel(tower) {
    selectedTowerObj = tower;
    const panel = document.getElementById('towerPanel');
    panel.style.display = 'block';
    
    document.getElementById('towerInfo').innerHTML = `
        <div class="card ${tower.type}">
            <div class="card-icon">${tower.icon}</div>
            <div class="card-name">${tower.name}</div>
            <div class="card-type-badge type-${tower.type}">${CARD_TYPES[tower.type].icon}</div>
            <p style="margin:10px 0">Tier ${tower.tier}</p>
            <p>💰 ${tower.cost} | ⚔️ ${tower.damage} | 📍 ${tower.range}</p>
        </div>
    `;
    
    // Upgrade buttons
    for (let tier = 1; tier <= 3; tier++) {
        const btn = document.getElementById(`upgradeTier${tier}`);
        const cost = Math.floor(tower.cost * (tier === 1 ? 0.5 : tier === 2 ? 1 : 2));
        document.getElementById(`tier${tier}Cost`).textContent = cost + '💰';
        
        btn.disabled = tower.tier >= tier || state.resources < cost;
        btn.onclick = () => upgradeTower(tier);
    }
    
    // Sell button
    const sellValue = Math.floor(tower.cost * 0.7 * (1 + tower.tier * 0.3));
    document.getElementById('sellValue').textContent = sellValue;
}

function upgradeTower(tier) {
    if (!selectedTowerObj || selectedTowerObj.tier >= tier) return;
    
    const cost = Math.floor(selectedTowerObj.cost * (tier === 1 ? 0.5 : tier === 2 ? 1 : 2));
    if (state.resources < cost) return;
    
    state.resources -= cost;
    selectedTowerObj.tier = tier;
    
    // Boost stats
    selectedTowerObj.damage = Math.floor(selectedTowerObj.damage * (1 + tier * 0.5));
    selectedTowerObj.range = Math.floor(selectedTowerObj.range * (1 + tier * 0.2));
    selectedTowerObj.fireRate = Math.floor(selectedTowerObj.fireRate * 0.9);
    
    // Update visual
    selectedTowerObj.element.className = `tower tier${tier}`;
    
    updateHUD();
    showTowerPanel(selectedTowerObj);
}

function sellTower() {
    if (!selectedTowerObj) return;
    
    const sellValue = Math.floor(selectedTowerObj.cost * 0.7 * (1 + selectedTowerObj.tier * 0.3));
    state.resources += sellValue;
    
    const i = state.towers.indexOf(selectedTowerObj);
    state.towers.splice(i, 1);
    selectedTowerObj.element.remove();
    
    const spot = buildingSpots[selectedTowerObj.spotId];
    spot.occupied = false;
    spot.element.classList.remove('occupied');
    
    closeTowerPanel();
    updateHUD();
}

function closeTowerPanel() {
    document.getElementById('towerPanel').style.display = 'none';
    selectedTowerObj = null;
}

// PATH
function drawPath() {
    const canvas = document.getElementById('pathCanvas');
    canvas.width = 1400;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'rgba(0,212,255,0.3)';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(battlePath[0].x, battlePath[0].y);
    battlePath.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
}

// PAN/ZOOM
function initPanZoom() {
    const wrapper = document.getElementById('battlefieldWrapper');
    
    wrapper.onmousedown = (e) => {
        if (e.target === wrapper) {
            isPanning = true;
            panStart = { x: e.clientX - wrapper.scrollLeft, y: e.clientY - wrapper.scrollTop };
        }
    };
    
    wrapper.onmouseup = () => isPanning = false;
    wrapper.onmouseleave = () => isPanning = false;
    
    wrapper.onmousemove = (e) => {
        if (!isPanning) return;
        wrapper.scrollLeft = panStart.x - e.clientX;
        wrapper.scrollTop = panStart.y - e.clientY;
    };
}

// WAVE
function launchWave() {
    if (state.wave >= waveData.length) {
        victory();
        return;
    }
    
    const wave = waveData[state.wave];
    state.wave++;
    updateHUD();
    
    // Hide deck pendant vague
    document.getElementById('gameDeck').classList.add('hidden');
    
    if (wave.boss) {
        showBossAlert(wave);
        setTimeout(() => spawnWave(wave), 3000);
    } else {
        spawnWave(wave);
    }
}

function showBossAlert(wave) {
    const alert = document.getElementById('bossAlert');
    document.getElementById('bossNameAlert').textContent = wave.name;
    alert.style.display = 'flex';
    setTimeout(() => alert.style.display = 'none', 3000);
}

function spawnWave(wave) {
    let spawned = 0;
    const total = wave.boss ? wave.minions[0].count : wave.count;
    
    const interval = setInterval(() => {
        if (spawned >= total) {
            clearInterval(interval);
            return;
        }
        spawnEnemy(wave.boss ? wave.minions[0] : wave);
        spawned++;
    }, 800);
    
    if (wave.boss) {
        setTimeout(() => spawnBoss(wave), 2000);
    }
}

function spawnBoss(wave) {
    const boss = {
        id: Date.now(),
        type: wave.type,
        health: wave.health,
        maxHealth: wave.health,
        speed: wave.speed,
        reward: wave.reward,
        isBoss: true,
        pathIndex: 0,
        pathProgress: 0,
        x: battlePath[0].x,
        y: battlePath[0].y
    };
    state.enemies.push(boss);
    createEnemyElement(boss);
    
    state.bossActive = true;
    state.bossHealth = boss.health;
    state.bossMaxHealth = boss.maxHealth;
    document.getElementById('bossBar').style.display = 'block';
    document.getElementById('bossName').textContent = wave.name;
    updateBossBar();
}

function spawnEnemy(config) {
    const enemy = {
        id: Date.now() + Math.random(),
        type: config.type,
        health: config.health,
        maxHealth: config.health,
        speed: config.speed,
        reward: config.reward,
        pathIndex: 0,
        pathProgress: 0,
        x: battlePath[0].x,
        y: battlePath[0].y
    };
    state.enemies.push(enemy);
    createEnemyElement(enemy);
}

function createEnemyElement(enemy) {
    const el = document.createElement('div');
    el.className = `enemy ${enemy.type}`;
    el.style.width = enemy.isBoss ? '80px' : '30px';
    el.style.height = enemy.isBoss ? '80px' : '30px';
    el.innerHTML = `
        <div class="enemy-body"></div>
        <div class="enemy-hp"><div class="enemy-hp-fill"></div></div>
    `;
    document.getElementById('enemiesLayer').appendChild(el);
    enemy.element = el;
}

// GAME LOOP
function startGameLoop() {
    function loop() {
        if (!state.gamePaused) {
            updateEnemies();
            updateTowers();
            updateProjectiles();
        }
        animFrame = requestAnimationFrame(loop);
    }
    loop();
}

function updateEnemies() {
    state.enemies.forEach((enemy, i) => {
        moveEnemy(enemy);
        if (enemy.pathIndex >= battlePath.length - 1 && enemy.pathProgress >= 1) {
            state.life--;
            removeEnemy(enemy, i);
            updateHUD();
            if (state.life <= 0) gameOver();
        }
    });
}

function moveEnemy(enemy) {
    if (enemy.pathIndex >= battlePath.length - 1) return;
    
    const curr = battlePath[enemy.pathIndex];
    const next = battlePath[enemy.pathIndex + 1];
    const dx = next.x - curr.x;
    const dy = next.y - curr.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    enemy.pathProgress += (enemy.speed * state.gameSpeed) / dist;
    
    if (enemy.pathProgress >= 1) {
        enemy.pathProgress = 0;
        enemy.pathIndex++;
    }
    
    const t = enemy.pathProgress;
    enemy.x = curr.x + dx * t;
    enemy.y = curr.y + dy * t;
    
    if (enemy.element) {
        enemy.element.style.left = enemy.x + 'px';
        enemy.element.style.top = enemy.y + 'px';
        enemy.element.style.transform = 'translate(-50%, -50%)';
    }
}

function damageEnemy(enemy, dmg) {
    enemy.health -= dmg;
    
    if (enemy.element) {
        const fill = enemy.element.querySelector('.enemy-hp-fill');
        fill.style.width = (enemy.health/enemy.maxHealth)*100 + '%';
    }
    
    if (enemy.isBoss) {
        state.bossHealth = enemy.health;
        updateBossBar();
    }
    
    if (enemy.health <= 0) killEnemy(enemy);
}

function killEnemy(enemy) {
    const i = state.enemies.indexOf(enemy);
    state.resources += enemy.reward;
    state.kills++;
    playerData.stats.totalKills++;
    removeEnemy(enemy, i);
    updateHUD();
    
    if (enemy.isBoss) {
        state.bossActive = false;
        document.getElementById('bossBar').style.display = 'none';
    }
}

function removeEnemy(enemy, i) {
    enemy.element?.remove();
    if (i >= 0) state.enemies.splice(i, 1);
}

function updateTowers() {
    const now = Date.now();
    state.towers.forEach(tower => {
        if (tower.damage === 0) return;
        if (now - tower.lastShot < tower.fireRate) return;
        
        const target = findTarget(tower);
        if (target) {
            shootProjectile(tower, target);
            tower.lastShot = now;
        }
    });
}

function findTarget(tower) {
    let best = null;
    let bestProg = -1;
    
    state.enemies.forEach(enemy => {
        const dx = enemy.x - tower.x;
        const dy = enemy.y - tower.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist <= tower.range) {
            const prog = enemy.pathIndex + enemy.pathProgress;
            if (prog > bestProg) {
                bestProg = prog;
                best = enemy;
            }
        }
    });
    
    return best;
}

function shootProjectile(tower, target) {
    const proj = {
        id: Date.now() + Math.random(),
        x: tower.x,
        y: tower.y,
        targetId: target.id,
        damage: tower.damage,
        speed: 10,
        color: CARD_TYPES[tower.type].color
    };
    
    state.projectiles.push(proj);
    createProjectileElement(proj);
}

function createProjectileElement(proj) {
    const el = document.createElement('div');
    el.className = 'projectile';
    el.style.backgroundColor = proj.color;
    el.style.color = proj.color;
    document.getElementById('projectilesLayer').appendChild(el);
    proj.element = el;
}

function updateProjectiles() {
    state.projectiles.forEach((proj, i) => {
        const target = state.enemies.find(e => e.id === proj.targetId);
        if (!target) {
            removeProjectile(proj, i);
            return;
        }
        
        const dx = target.x - proj.x;
        const dy = target.y - proj.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        proj.x += (dx/dist) * proj.speed * state.gameSpeed;
        proj.y += (dy/dist) * proj.speed * state.gameSpeed;
        
        if (proj.element) {
            proj.element.style.left = proj.x + 'px';
            proj.element.style.top = proj.y + 'px';
            proj.element.style.transform = 'translate(-50%, -50%)';
        }
        
        if (dist < 20) {
            damageEnemy(target, proj.damage);
            removeProjectile(proj, i);
        }
    });
}

function removeProjectile(proj, i) {
    proj.element?.remove();
    if (i >= 0) state.projectiles.splice(i, 1);
}

// UI
function updateHUD() {
    document.getElementById('hudMoney').textContent = state.resources;
    document.getElementById('hudLives').textContent = state.life;
    document.getElementById('hudWave').textContent = state.wave;
    document.getElementById('hudKills').textContent = state.kills;
}

function updateBossBar() {
    const pct = (state.bossHealth / state.bossMaxHealth) * 100;
    document.getElementById('bossHpBar').style.width = pct + '%';
    document.getElementById('bossHp').textContent = Math.floor(state.bossHealth);
    document.getElementById('bossMaxHp').textContent = state.bossMaxHealth;
}

function toggleSpeed() {
    state.gameSpeed = state.gameSpeed === 1 ? 2 : 1;
    document.getElementById('btnSpeed').textContent = state.gameSpeed === 2 ? '⏩' : '▶️';
}

function togglePause() {
    state.gamePaused = !state.gamePaused;
    document.getElementById('btnPause').textContent = state.gamePaused ? '▶️' : '⏸️';
}

function quitGame() {
    if (confirm('Quitter la partie ?')) {
        cancelAnimationFrame(animFrame);
        showScreen('mainMenu');
    }
}

// END
function victory() {
    cancelAnimationFrame(animFrame);
    playerData.stats.gamesWon++;
    if (state.wave > playerData.stats.highestWave) playerData.stats.highestWave = state.wave;
    saveData();
    
    document.getElementById('victoryStats').innerHTML = `
        <p>Vague: ${state.wave}/20</p>
        <p>Tués: ${state.kills}</p>
        <p>Ressources: ${state.resources}💰</p>
    `;
    document.getElementById('victoryScreen').style.display = 'flex';
}

function gameOver() {
    cancelAnimationFrame(animFrame);
    if (state.wave > playerData.stats.highestWave) playerData.stats.highestWave = state.wave;
    saveData();
    
    document.getElementById('defeatStats').innerHTML = `
        <p>Vague atteinte: ${state.wave}/20</p>
        <p>Tués: ${state.kills}</p>
    `;
    document.getElementById('defeatScreen').style.display = 'flex';
}

console.log('✅ V4.0 Loaded - ULTIMATE EDITION!');