/* =========================================================
   OPEN WHEN — visual decor + per-category letter tinting

   This file is ADDITIVE: it does not redefine `letters`,
   `showPhotoCard`, or the existing .ow-btn / backBtn / Escape
   handlers from your other script. It only:
     1) injects background decor into #open
     2) adds/removes a tint-<category> class on .letterOverlay
        so open.css can color the paper per moment
   Load this AFTER your existing open-when script.
   ========================================================= */

const openPanel = document.getElementById("open");
const openContainer = openPanel ? openPanel.querySelector(".open-when-container") : null;

/* =========================================================
   DECOR INJECTION
   ========================================================= */
function injectOpenDecor() {
    if (!openPanel || !openContainer) return;

    const simpleDecor = ["open-window", "open-stars", "open-string-lights", "open-vignette"];

    simpleDecor.forEach((className) => {
        if (openPanel.querySelector(`.${className}`)) return; // don't duplicate
        const el = document.createElement("div");
        el.classList.add(className);
        openPanel.insertBefore(el, openContainer);
    });

    // scatter stars
    const starsLayer = openPanel.querySelector(".open-stars");
    if (starsLayer && starsLayer.childElementCount === 0) {
        const NUM_STARS = 28;
        for (let i = 0; i < NUM_STARS; i++) {
            const star = document.createElement("div");
            star.classList.add("open-star");
            const size = 1 + Math.random() * 2;
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.left = Math.random() * 60 + "%";
            star.style.top = Math.random() * 70 + "%";
            star.style.setProperty("--dur", 3 + Math.random() * 4 + "s");
            star.style.animationDelay = Math.random() * 4 + "s";
            starsLayer.appendChild(star);
        }
    }

    // string light bulbs above the clothesline
    const stringLayer = openPanel.querySelector(".open-string-lights");
    if (stringLayer && stringLayer.childElementCount === 0) {
        const NUM_BULBS = 10;
        for (let i = 0; i < NUM_BULBS; i++) {
            const bulb = document.createElement("div");
            bulb.classList.add("string-bulb");
            bulb.style.left = `${(i / NUM_BULBS) * 100}%`;
            bulb.style.animationDelay = `${(i % 5) * 0.5}s`;
            stringLayer.appendChild(bulb);
        }
    }
}
injectOpenDecor();

/* =========================================================
   PER-CATEGORY TINTING
   Hooks the same .ow-btn buttons your existing script already
   listens on. Adding a second listener does not remove or
   interfere with the first — both fire on click.
   ========================================================= */
const TINT_CLASSES = ["tint-sad", "tint-miss", "tint-birthday", "tint-3am", "tint-reminder"];

function applyTint(overlayEl, key) {
    if (!overlayEl) return;
    TINT_CLASSES.forEach((cls) => overlayEl.classList.remove(cls));
    if (key && TINT_CLASSES.includes(`tint-${key}`)) {
        overlayEl.classList.add(`tint-${key}`);
    }
}

function clearTint(overlayEl) {
    if (!overlayEl) return;
    TINT_CLASSES.forEach((cls) => overlayEl.classList.remove(cls));
}

document.querySelectorAll(".ow-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.letter;
        const overlayEl = document.getElementById("letterOverlay");
        // birthday skips the letter overlay entirely in the existing
        // script (goes to the year selector instead), so only tint
        // when the overlay is actually the thing being shown.
        if (key !== "birthday") {
            applyTint(overlayEl, key);
        }
    });
});

const openBackBtn = document.getElementById("backBtn");
if (openBackBtn) {
    openBackBtn.addEventListener("click", () => {
        clearTint(document.getElementById("letterOverlay"));
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        clearTint(document.getElementById("letterOverlay"));
    }
});

/* =========================================================
   CLEANUP — pause star/light animation cost when scrolled away
   (purely cosmetic; CSS animations are cheap, but this keeps
   things tidy if more decor is added later)
   ========================================================= */
if ("IntersectionObserver" in window && openPanel) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            openPanel.classList.toggle("open-offscreen", !entry.isIntersecting);
        });
    }, { threshold: 0 });
    observer.observe(openPanel);
}