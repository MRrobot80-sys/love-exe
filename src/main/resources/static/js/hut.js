const m2Panel = document.getElementById("m2");
const hutContent = document.querySelector(".hut-content");

/* =========================================================
   STATIC DECOR — injected so the HTML doesn't need editing
   ========================================================= */
function injectDecor() {
    // simple, childless decor elements
    const simpleDecor = ["hut-walls", "hut-rug", "hut-cat"];

    simpleDecor.forEach((className) => {
        if (m2Panel.querySelector(`.${className}`)) return; // don't duplicate
        const el = document.createElement("div");
        el.classList.add(className);
        m2Panel.insertBefore(el, hutContent);
    });

    // window valance (sits with the window, just above hutWindow in the DOM)
    if (!m2Panel.querySelector(".hut-window-valance")) {
        const valance = document.createElement("div");
        valance.classList.add("hut-window-valance");
        m2Panel.insertBefore(valance, hutContent);
    }

    // wood stove, with its glass door / handle / base as children
    if (!m2Panel.querySelector(".hut-stove")) {
        const stove = document.createElement("div");
        stove.classList.add("hut-stove");

        const base = document.createElement("div");
        base.classList.add("stove-base");

        const glass = document.createElement("div");
        glass.classList.add("stove-glass");

        const handle = document.createElement("div");
        handle.classList.add("stove-handle");

        stove.appendChild(base);
        stove.appendChild(glass);
        stove.appendChild(handle);

        m2Panel.insertBefore(stove, hutContent);
    }

    // red sectional sofa with throw pillows
    if (!m2Panel.querySelector(".hut-sofa")) {
        const sofa = document.createElement("div");
        sofa.classList.add("hut-sofa");

        for (let i = 0; i < 3; i++) {
            const pillow = document.createElement("div");
            pillow.classList.add("sofa-pillow");
            sofa.appendChild(pillow);
        }

        m2Panel.insertBefore(sofa, hutContent);
    }
}
injectDecor();

/* =========================================================
   EMBERS — DRIFTING UP FROM THE STOVE AREA
   ========================================================= */
const hutEmbers = document.getElementById("hutEmbers");
function spawnEmber() {
    const ember = document.createElement("div");
    ember.classList.add("hut-ember");
    const size = 2 + Math.random() * 3;
    ember.style.width = size + "px";
    ember.style.height = size + "px";
    // embers drift up from roughly where the stove sits (right side)
    ember.style.left = `calc(85% + ${(Math.random() - 0.5) * 60}px)`;
    ember.style.bottom = "140px";
    ember.style.background = "rgba(255,140,40,0.8)";
    ember.style.setProperty("--dur", 5 + Math.random() * 3 + "s");
    ember.style.setProperty("--drift", (Math.random() - 0.5) * 40 + "px");
    hutEmbers.appendChild(ember);
    setTimeout(() => ember.remove(), 9000);
}
const emberInterval = setInterval(spawnEmber, 1200);

/* =========================================================
   VISION BOARD
   ========================================================= */
const visionBoardBtn = document.getElementById("visionBoardBtn");
const visionBoardOverlay = document.getElementById("visionBoardOverlay");
const visionBoardClose = document.getElementById("visionBoardClose");

visionBoardBtn.addEventListener("click", () => {
    visionBoardOverlay.classList.add("visible");
});
visionBoardClose.addEventListener("click", () => {
    visionBoardOverlay.classList.remove("visible");
});

/* close on backdrop click too, not just the X */
visionBoardOverlay.addEventListener("click", (e) => {
    if (e.target === visionBoardOverlay) {
        visionBoardOverlay.classList.remove("visible");
    }
});

/* =========================================================
   CLEANUP — stop spawning embers if this panel scrolls far
   out of view, so background tabs/sections don't keep working
   ========================================================= */
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                clearInterval(emberInterval);
                observer.disconnect();
            }
        });
    }, { threshold: 0 });
    observer.observe(m2Panel);
}