// ===== SUNFLOWER SECTION =====

const m1Panel = document.getElementById("m1");

// ─── SUN ───
const sfSun = document.createElement("div");
sfSun.classList.add("sf-sun");
m1Panel.appendChild(sfSun);

// ─── LIGHT RAYS ───
const sfRays = document.createElement("div");
sfRays.classList.add("sf-rays");
const RAY_COUNT = 14;
for (let i = 0; i < RAY_COUNT; i++) {
    const ray = document.createElement("div");
    ray.classList.add("sf-ray");
    ray.style.transform = `rotate(${(360 / RAY_COUNT) * i}deg)`;
    ray.style.opacity = 0.5 + Math.random() * 0.5;
    ray.style.height = `${2 + Math.random() * 3}px`;
    sfRays.appendChild(ray);
}
m1Panel.appendChild(sfRays);

// ─── GROUND GLOW ───
const sfGlow = document.createElement("div");
sfGlow.classList.add("sf-ground-glow");
m1Panel.appendChild(sfGlow);

// ─── STANDING SUNFLOWERS (bottom, semi-transparent so text stays readable) ───
const sfStanding = document.createElement("div");
sfStanding.classList.add("sf-standing");
m1Panel.appendChild(sfStanding);

const standingConfig = [
    { left: "2%",  height: "48vh", scale: 1.00 },
    { left: "9%",  height: "38vh", scale: 0.85 },
    { left: "16%", height: "52vh", scale: 1.05 },
    { left: "23%", height: "35vh", scale: 0.80 },
    { left: "30%", height: "45vh", scale: 0.95 },
    { left: "38%", height: "55vh", scale: 1.10 },
    { left: "46%", height: "40vh", scale: 0.88 },
    { left: "54%", height: "50vh", scale: 1.02 },
    { left: "62%", height: "36vh", scale: 0.82 },
    { left: "69%", height: "47vh", scale: 0.98 },
    { left: "76%", height: "53vh", scale: 1.06 },
    { left: "83%", height: "38vh", scale: 0.86 },
    { left: "90%", height: "44vh", scale: 0.93 },
    { left: "96%", height: "49vh", scale: 1.00 },
];

standingConfig.forEach((cfg, i) => {
    const wrap = document.createElement("div");
    wrap.classList.add("sf-standing-flower");
    wrap.style.cssText = `
        left: ${cfg.left};
        height: ${cfg.height};
        transform: scaleX(${cfg.scale});
        animation-delay: ${(i * 0.3).toFixed(1)}s;
    `;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 60 300");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "xMidYMax meet");

    const hx = 30, hy = 42, hr = 16;
    const petalCount = 12;
    let petals = "";
    for (let p = 0; p < petalCount; p++) {
        const ang = (Math.PI * 2 / petalCount) * p;
        const px = hx + Math.cos(ang) * (hr + 10);
        const py = hy + Math.sin(ang) * (hr + 10);
        petals += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}"
            rx="9" ry="5"
            transform="rotate(${((ang * 180) / Math.PI).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"
            fill="#f5c400" stroke="#c98a00" stroke-width="0.8"/>`;
    }

    svg.innerHTML = `
        <!-- stem -->
        <path d="M ${hx} ${hy + hr} Q ${hx - 5} 170 ${hx + 3} 300"
              stroke="#4a7a20" stroke-width="4" stroke-linecap="round" fill="none"/>
        <!-- leaf left -->
        <path d="M ${hx} 140 Q ${hx - 22} 120 ${hx - 18} 105 Q ${hx - 6} 118 ${hx} 135"
              fill="#5a8c2a" stroke="#3a6010" stroke-width="0.8"/>
        <!-- leaf right -->
        <path d="M ${hx + 3} 180 Q ${hx + 24} 160 ${hx + 20} 145 Q ${hx + 8} 158 ${hx + 3} 175"
              fill="#5a8c2a" stroke="#3a6010" stroke-width="0.8"/>
        ${petals}
        <!-- centre disc -->
        <circle cx="${hx}" cy="${hy}" r="${hr}" fill="#6b3a1f" stroke="#3a1a00" stroke-width="1.2"/>
        <circle cx="27" cy="39" r="2" fill="#4a2510" opacity="0.7"/>
        <circle cx="33" cy="39" r="1.8" fill="#4a2510" opacity="0.7"/>
        <circle cx="30" cy="44" r="2.2" fill="#4a2510" opacity="0.7"/>
        <circle cx="25" cy="44" r="1.6" fill="#4a2510" opacity="0.6"/>
        <circle cx="35" cy="44" r="1.6" fill="#4a2510" opacity="0.6"/>
    `;

    wrap.appendChild(svg);
    sfStanding.appendChild(wrap);
});

// ─── POLLEN PARTICLES ───
const sfPollenWrap = document.createElement("div");
sfPollenWrap.classList.add("sf-pollen-wrap");
m1Panel.appendChild(sfPollenWrap);

let pollenInterval = null;

function spawnPollen() {
    const p = document.createElement("div");
    p.classList.add("sf-pollen");
    const size  = Math.random() * 4 + 2;
    const left  = Math.random() * 95 + 2;
    const dur   = 8 + Math.random() * 9;
    const drift = (Math.random() - 0.5) * 120;
    const delay = Math.random() * 1.2;
    const hue   = 42 + Math.floor(Math.random() * 20);
    const alpha = 0.55 + Math.random() * 0.4;
    p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: ${10 + Math.random() * 30}%;
        background: hsla(${hue}, 100%, 65%, ${alpha});
        box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, 100%, 70%, ${alpha * 0.5});
        --pd-dur: ${dur}s;
        --pd-delay: ${delay}s;
        --pd-drift: ${drift}px;
    `;
    sfPollenWrap.appendChild(p);
    setTimeout(() => p.remove(), (dur + delay + 1) * 1000);
}

// ─── FALLING SUNFLOWERS ───
let sunflowerInterval = null;

function createFallingSunflowerSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 80 80");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const cx = 40, cy = 40, hr = 14;
    const petalCount = 12;
    let petals = "";
    for (let p = 0; p < petalCount; p++) {
        const ang = (Math.PI * 2 / petalCount) * p;
        const px = cx + Math.cos(ang) * (hr + 9);
        const py = cy + Math.sin(ang) * (hr + 9);
        petals += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}"
            rx="8" ry="4.5"
            transform="rotate(${((ang * 180) / Math.PI).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"
            fill="#f5c400" stroke="#c98a00" stroke-width="0.8"/>`;
    }

    svg.innerHTML = `
        ${petals}
        <circle cx="${cx}" cy="${cy}" r="${hr}" fill="#6b3a1f" stroke="#3a1a00" stroke-width="1.2"/>
        <circle cx="37" cy="37" r="2"   fill="#4a2510" opacity="0.7"/>
        <circle cx="43" cy="37" r="1.8" fill="#4a2510" opacity="0.7"/>
        <circle cx="40" cy="43" r="2.2" fill="#4a2510" opacity="0.7"/>
        <circle cx="35" cy="42" r="1.5" fill="#4a2510" opacity="0.6"/>
        <circle cx="45" cy="42" r="1.5" fill="#4a2510" opacity="0.6"/>
    `;
    return svg;
}

function spawnFallingSunflower() {
    const wrap = document.createElement("div");
    wrap.classList.add("sf-falling");

    const size     = Math.random() * 25 + 35;      // 35–60px
    const left     = Math.random() * 90 + 2;
    const duration = Math.random() * 8 + 12;        // 12–20s, slow fall
    const rotate   = (Math.random() - 0.5) * 60;
    const drift    = (Math.random() - 0.5) * 80;

    wrap.style.cssText = `
        left: ${left}%;
        top: -80px;
        width: ${size}px;
        height: ${size}px;
        --sf-drift: ${drift}px;
        --sf-rotate: ${rotate}deg;
        animation-duration: ${duration}s;
    `;

    wrap.appendChild(createFallingSunflowerSVG());
    m1Panel.appendChild(wrap);
    setTimeout(() => wrap.remove(), duration * 1000 + 500);
}

// ─── START / STOP on scroll ───
function startEffects() {
    if (sunflowerInterval) return;
    // Stagger a few immediately
    for (let i = 0; i < 3; i++) setTimeout(spawnFallingSunflower, i * 1500);
    // Then one every 4s — sparse
    sunflowerInterval = setInterval(spawnFallingSunflower, 4000);
    // Pollen
    for (let i = 0; i < 4; i++) setTimeout(spawnPollen, i * 800);
    pollenInterval = setInterval(spawnPollen, 1800);
}

function stopEffects() {
    clearInterval(sunflowerInterval);
    sunflowerInterval = null;
    clearInterval(pollenInterval);
    pollenInterval = null;
    m1Panel.querySelectorAll(".sf-falling").forEach(s => s.remove());
}

const sunflowerObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) startEffects();
        else stopEffects();
    }),
    { threshold: 0.4 }
);

sunflowerObserver.observe(m1Panel);