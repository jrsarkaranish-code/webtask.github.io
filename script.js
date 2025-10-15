// Scanner logic
const status = document.getElementById('status');
if (status) {
    setTimeout(() => {
        status.innerText = "Access Granted 💖";
        setTimeout(() => { window.location.href = 'main.html'; }, 1500);
    }, 3000);
}

// Floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.width = 10 + Math.random() * 20 + 'px';
    heart.style.height = heart.style.width;
    heart.style.animationDuration = 3 + Math.random() * 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 300);