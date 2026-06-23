// ===== FLOATING SUNFLOWERS (Sunflower section) =====
const m1Panel = document.getElementById("m1");
let sunflowerInterval = null;

function createSunflower() {
    const sunflower = document.createElement("span");
    sunflower.classList.add("sunflower");
    sunflower.textContent = "🌻";
    const x = Math.random() * 90 + 5;
    sunflower.style.left = `${x}%`;
    sunflower.style.bottom = "0";
    const size = Math.random() * 1.2 + 0.8;
    sunflower.style.fontSize = `${size}rem`;
    const duration = Math.random() * 4 + 4;
    sunflower.style.animationDuration = `${duration}s`;
    sunflower.style.animationDelay = "0s";
    m1Panel.appendChild(sunflower);
    setTimeout(() => sunflower.remove(), duration * 1000);
}

function startSunflowers() {
    if (sunflowerInterval) return;
    sunflowerInterval = setInterval(createSunflower, 600);
}

function stopSunflowers() {
    clearInterval(sunflowerInterval);
    sunflowerInterval = null;
    m1Panel.querySelectorAll(".sunflower").forEach((s) => s.remove());
}

const sunflowerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startSunflowers();
            } else {
                stopSunflowers();
            }
        });
    },
    { threshold: 0.4 }
);

sunflowerObserver.observe(m1Panel);
