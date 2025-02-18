const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const player1 = { x: 100, y: 300, width: 40, height: 40, color: "blue", health: 100, shield: 100, shieldActive: false };
const player2 = { x: 600, y: 300, width: 40, height: 40, color: "red", health: 100, shield: 100, shieldActive: false };

let bullets = [];
const speed = 5;
let gameRunning = false;

const keys = {
    w: false, a: false, s: false, d: false, 
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false, 
    q: false, m: false
};

// 🎮 Start Game on Control Key Press
document.addEventListener("keydown", (e) => {
    if (e.key === "Control" && !gameRunning) {
        gameRunning = true;
        document.getElementById("startMessage").style.display = "none";
        gameLoop();
    }

    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
    if (e.key === "q" && player1.shield > 0) player1.shieldActive = true;
    if (e.key === "m" && player2.shield > 0) player2.shieldActive = true;
    if (e.key === " " && gameRunning) shoot(player1);
    if (e.key === "Enter" && gameRunning) shoot(player2);
});

document.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
    if (e.key === "q") player1.shieldActive = false;
    if (e.key === "m") player2.shieldActive = false;
});

// 🔳 Fullscreen Toggle
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 📌 Update Player Names
document.getElementById("p1Name").addEventListener("input", updatePlayerNames);
document.getElementById("p2Name").addEventListener("input", updatePlayerNames);

function updatePlayerNames() {
    document.getElementById("p1DisplayName").innerText = document.getElementById("p1Name").value;
    document.getElementById("p2DisplayName").innerText = document.getElementById("p2Name").value;
    document.getElementById("p1Label").innerText = `🟦 ${document.getElementById("p1Name").value}`;
    document.getElementById("p2Label").innerText = `🟥 ${document.getElementById("p2Name").value}`;
}

// 🚀 Restart Game
function restartGame() {
    player1.health = 100;
    player2.health = 100;
    bullets = [];
    gameRunning = false;
    document.getElementById("winner").innerText = "";
    document.getElementById("startMessage").style.display = "block";
    updateHealthUI();
}
