const bootPanel = document.getElementById("boot");
const bootContent = document.querySelector(".boot-content");

/* =========================================================
   STATIC DECOR — injected so the HTML doesn't need editing
   ========================================================= */
function injectBootDecor() {
    const simpleDecor = [
        "boot-desk",
        "boot-candle",
        "boot-candle-glow",
        "boot-quill",
        "boot-quill-ink",
        "boot-dust",
        "boot-vignette",
    ];

    simpleDecor.forEach((className) => {
        if (bootPanel.querySelector(`.${className}`)) return; // don't duplicate
        const el = document.createElement("div");
        el.classList.add(className);
        bootPanel.insertBefore(el, bootContent);
    });
}
injectBootDecor();

/* =========================================================
   DUST MOTES — DRIFTING IN THE CANDLELIGHT
   ========================================================= */
const bootDust = bootPanel.querySelector(".boot-dust");

function spawnMote() {
    const mote = document.createElement("div");
    mote.classList.add("boot-mote");

    const size = 1.5 + Math.random() * 2.5;
    mote.style.width = size + "px";
    mote.style.height = size + "px";

    // motes rise mostly from the candle's left-side glow area
    mote.style.left = `calc(10% + ${(Math.random() - 0.5) * 160}px)`;
    mote.style.bottom = `${10 + Math.random() * 15}%`;

    mote.style.setProperty("--dur", 7 + Math.random() * 5 + "s");
    mote.style.setProperty("--drift", (Math.random() - 0.5) * 60 + "px");

    bootDust.appendChild(mote);
    setTimeout(() => mote.remove(), 13000);
}
const moteInterval = setInterval(spawnMote, 900);

/* =========================================================
   CLEANUP — pause mote spawning once scrolled out of view
   ========================================================= */
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                clearInterval(moteInterval);
                observer.disconnect();
            }
        });
    }, { threshold: 0 });
    observer.observe(bootPanel);
}

/* =========================================================
   MUSIC (boot/intro section) — unchanged behavior
   ========================================================= */
const bootSong = document.getElementById("bootSong");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

musicBtn.addEventListener("click", () => {
    if (bootSong.paused) {
        bootSong.play();
        musicIcon.textContent = "⏸";
        musicLabel.textContent = "Playing...";
        musicBtn.classList.add("playing");
    } else {
        bootSong.pause();
        musicIcon.textContent = "▶";
        musicLabel.textContent = "Play our song";
        musicBtn.classList.remove("playing");
    }
});