// Inicjalizacja statystyk
let playerHP = 150;
let enemyHP = 150;
let playerPosition = 0;
const minPosition = -150;
const maxPosition = 150;

// Pobranie elementów UI
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const battleLog = document.getElementById("battleLog");
const startBtn = document.getElementById("startBtn");
const moveLeftBtn = document.getElementById("moveLeftBtn");
const moveRightBtn = document.getElementById("moveRightBtn");
const coinTossModal = document.getElementById("coinTossModal");
const headsBtn = document.getElementById("headsBtn");
const tailsBtn = document.getElementById("tailsBtn");
const axeAttackBtn = document.createElement("button");
axeAttackBtn.textContent = "Uderz Siekierką!";
axeAttackBtn.style.display = "none";
document.body.appendChild(axeAttackBtn);

// Zmienne kontrolujące rozgrywkę
let isPlayerTurn = false;
let gameStarted = false;

// Funkcja losująca orzeł (true) lub reszka (false)
function tossCoin() {
    return Math.random() < 0.5 ? 'orzeł' : 'reszka';
}

// Funkcja zamykająca modal
function closeModal() {
    coinTossModal.style.display = 'none';
    document.body.classList.remove('modal-active');
}

// Funkcja ataku
function attack() {
    if (!gameStarted || !isPlayerTurn) return;

    const playerDamage = Math.floor(Math.random() * 20) + 10; // Zmienny damage
    const enemyDamage = Math.floor(Math.random() * 20) + 10; // Zmienny damage przeciwnika

    // Redukcja HP
    playerHP -= enemyDamage;
    enemyHP -= playerDamage;

    // Aktualizacja UI
    document.getElementById("playerHP").textContent = playerHP;
    document.getElementById("enemyHP").textContent = enemyHP;

    // Logowanie do bitwy
    let logMessage = `Gracz zadał ${playerDamage} obrażeń! `;
    logMessage += `Przeciwnik zadał ${enemyDamage} obrażeń!`;
    battleLog.textContent = logMessage;

    // Sprawdzanie, czy pokazać przycisk "uderz siekierką"
    checkAxeAttackAvailability();

    // Sprawdzanie końca walki
    if (playerHP <= 0) {
        alert("Przegrałeś!");
        resetGame();
    } else if (enemyHP <= 0) {
        alert("Wygrałeś!");
        resetGame();
    } else {
        isPlayerTurn = false;
        startTurnCycle();
    }
}

// Funkcja poruszająca postacią
function moveCharacter(direction, isPlayer) {
    const step = 50;

    if (isPlayer) {
        if (direction === "left" && playerPosition > minPosition) {
            playerPosition -= step;
        } else if (direction === "right" && playerPosition < maxPosition) {
            playerPosition += step;
        }
        player.style.transform = `translateX(${playerPosition}px)`;
    } else {
        // Przeciwnik porusza się losowo
        const enemyStep = Math.random() < 0.5 ? -step : step;
        enemy.style.transform = `translateX(${enemyStep}px)`;
    }
}

// Funkcja resetująca grę
function resetGame() {
    playerHP = 150;
    enemyHP = 150;
    playerPosition = 0;
    document.getElementById("playerHP").textContent = playerHP;
    document.getElementById("enemyHP").textContent = enemyHP;
    battleLog.textContent = "";
    startBtn.disabled = false;
    gameStarted = false;
    player.style.transform = "translateX(0px)";
    enemy.style.transform = "translateX(0px)";
    axeAttackBtn.style.display = "none";
}

// Funkcja, która porusza bossem losowo
function bossMove() {
    if (!gameStarted || isPlayerTurn) return;

    // Ruch bossa
    const moveDirection = Math.random() < 0.5 ? 'left' : 'right';
    moveCharacter(moveDirection, false);

    // Po ruchu bossa, gracz może działać
    isPlayerTurn = true;
    battleLog.innerText = 'Twoja tura! Poruszaj się lub atakuj!';
}

// Funkcja uruchamiająca naprzemienność tur
function startTurnCycle() {
    if (isPlayerTurn) {
        battleLog.innerText = 'Twoja tura! Poruszaj się lub atakuj!';
    } else {
        battleLog.innerText = 'Tura bossa! Porusza się...';
        setTimeout(bossMove, 1000); // Boss porusza się po sekundzie
    }
}

// Funkcja rozpoczęcia gry
function startGame() {
    gameStarted = true;
    startBtn.disabled = true;
    moveLeftBtn.disabled = false;
    moveRightBtn.disabled = false;
    battleLog.innerText = isPlayerTurn ? 'Zaczynasz grę!' : 'Boss zaczyna grę!';
    startTurnCycle();
}

// Funkcja sprawdzająca dostępność przycisku "uderz siekierką"
function checkAxeAttackAvailability() {
    if ((playerHP <= 50 && enemyHP > 60) || (enemyHP <= 50 && playerHP > 60)) {
        axeAttackBtn.style.display = "block";
    } else {
        axeAttackBtn.style.display = "none";
    }
}

// Obsługa przycisku "uderz siekierką"
axeAttackBtn.addEventListener("click", () => {
    if (!gameStarted || !isPlayerTurn) return;

    const axeDamage = 20;
    if (playerHP <= 50 && enemyHP > 60) {
        enemyHP -= axeDamage;
        battleLog.textContent = `Gracz uderzył siekierką i zadał dodatkowe ${axeDamage} obrażeń!`;
    } else if (enemyHP <= 50 && playerHP > 60) {
        playerHP -= axeDamage;
        battleLog.textContent = `Przeciwnik uderzył siekierką i zadał dodatkowe ${axeDamage} obrażeń!`;
    }

    // Aktualizacja HP na UI
    document.getElementById("playerHP").textContent = playerHP;
    document.getElementById("enemyHP").textContent = enemyHP;

    axeAttackBtn.style.display = "none";

    // Sprawdzanie końca walki
    if (playerHP <= 0) {
        alert("Przegrałeś!");
        resetGame();
    } else if (enemyHP <= 0) {
        alert("Wygrałeś!");
        resetGame();
    } else {
        isPlayerTurn = false;
        startTurnCycle();
    }
});

// Obsługa kliknięcia przycisku "Start"
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    coinTossModal.style.display = 'block';
    document.body.classList.add('modal-active');
});

// Obsługa rzutów monetą
headsBtn.addEventListener('click', () => {
    const result = tossCoin();
    closeModal();
    if (result === 'orzeł') {
        alert('Wygrałeś! Wypadł orzeł!');
        isPlayerTurn = true;
    } else {
        alert('Przegrałeś! Wypadła reszka!');
        isPlayerTurn = false;
    }
    startGame();
});

tailsBtn.addEventListener('click', () => {
    const result = tossCoin();
    closeModal();
    if (result === 'reszka') {
        alert('Wygrałeś! Wypadła reszka!');
        isPlayerTurn = true;
    } else {
        alert('Przegrałeś! Wypadł orzeł!');
        isPlayerTurn = false;
    }
    startGame();
});

// Obsługa ruchu gracza
moveLeftBtn.addEventListener('click', () => {
    if (gameStarted && isPlayerTurn) {
        moveCharacter('left', true);
        isPlayerTurn = false;
        startTurnCycle();
    }
});

moveRightBtn.addEventListener('click', () => {
    if (gameStarted && isPlayerTurn) {
        moveCharacter('right', true);
        isPlayerTurn = false;
        startTurnCycle();
    }
});

// Obsługa ataku
const attackBtn = document.getElementById("attackBtn");
attackBtn.addEventListener("click", attack);

