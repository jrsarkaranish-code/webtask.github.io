const gameArea = document.getElementById("gameArea");
const bar = document.getElementById("bar");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");

let barX = gameArea.offsetWidth / 2 - 60;
let hearts = [];
let score = 0;
let gameActive = true;

function createHeart() {
    if (!gameActive) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * (gameArea.offsetWidth - 35) + "px";
    heart.style.top = "0px";
    gameArea.appendChild(heart);
    hearts.push(heart);
}

function moveHearts() {
    if (!gameActive) return;

    hearts.forEach((heart, i) => {
        let heartTop = parseInt(heart.style.top);
        heartTop += 4; // fall speed
        heart.style.top = heartTop + "px";

        // Check collision with bar
        const heartLeft = parseInt(heart.style.left);
        if (
            heartTop + 35 >= gameArea.offsetHeight - 30 &&
            heartLeft + 35 >= barX &&
            heartLeft <= barX + 120
        ) {
            // caught
            score++;
            scoreDisplay.innerText = "Score: " + score;
            heart.remove();
            hearts.splice(i, 1);
        }

        // Missed heart = game over
        if (heartTop > gameArea.offsetHeight) {
            endGame();
        }
    });
}

function endGame() {
    gameActive = false;
    gameOverScreen.style.display = "block";
    hearts.forEach(h => h.remove());
    hearts = [];
}

function restartGame() {
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    gameOverScreen.style.display = "none";
    gameActive = true;
    hearts = [];
}

// Move with touch or mouse
gameArea.addEventListener("mousemove", e => {
    if (!gameActive) return;
    let rect = gameArea.getBoundingClientRect();
    barX = e.clientX - rect.left - 60;
    if (barX < 0) barX = 0;
    if (barX > gameArea.offsetWidth - 120)
        barX = gameArea.offsetWidth - 120;
    bar.style.left = barX + "px";
});

gameArea.addEventListener("touchmove", e => {
    if (!gameActive) return;
    let rect = gameArea.getBoundingClientRect();
    let touchX = e.touches[0].clientX - rect.left;
    barX = touchX - 60;
    if (barX < 0) barX = 0;
    if (barX > gameArea.offsetWidth - 120)
        barX = gameArea.offsetWidth - 120;
    bar.style.left = barX + "px";
});

// Create hearts every 1 second
setInterval(createHeart, 1000);
// Move hearts every frame
setInterval(moveHearts, 20);
