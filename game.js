// Inicjalizacja statystyk
let playerHP = 100;
let enemyHP = 100;

// Funkcja ataku
function attack() {
    const playerDamage = Math.floor(Math.random() * 20) + 10; // Zmienny damage
    const enemyDamage = Math.floor(Math.random() * 15) + 5; // Zmienny damage przeciwnika

    // Redukcja HP
    playerHP -= enemyDamage;
    enemyHP -= playerDamage;

    // Aktualizacja UI
    document.getElementById("playerHP").textContent = playerHP;
    document.getElementById("enemyHP").textContent = enemyHP;

    // Logowanie do bitwy
    let logMessage = `Gracz zadał ${playerDamage} obrażeń! `;
    logMessage += `Przeciwnik zadał ${enemyDamage} obrażeń!`;
    document.getElementById("battleLog").textContent = logMessage;

    // Sprawdzanie końca walki
    if (playerHP <= 0) {
        alert("Przegrałeś!");
        resetGame();
    } else if (enemyHP <= 0) {
        alert("Wygrałeś!");
        resetGame();
    }
}

// Funkcja resetująca grę
function resetGame() {
    playerHP = 100;
    enemyHP = 100;
    document.getElementById("playerHP").textContent = playerHP;
    document.getElementById("enemyHP").textContent = enemyHP;
    document.getElementById("battleLog").textContent = "";
}

// Event listener dla przycisku ataku
document.getElementById("attackBtn").addEventListener("click", attack);
