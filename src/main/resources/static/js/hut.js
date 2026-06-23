// ===== ANIMATED CAMPFIRE =====
const campfireScene = document.createElement("div");
campfireScene.classList.add("campfire-scene");
campfireScene.innerHTML = `
    <div class="campfire">
        <div class="fire-wrap">
            <div class="flame fl2"></div>
            <div class="flame fl3"></div>
            <div class="flame fl1"></div>
            <div class="flame fl4"></div>
            <div class="flame fl5"></div>
            <div class="fire-glow-spot"></div>
        </div>
        <div class="fire-logs"></div>
    </div>
`;
const hutContent = document.querySelector(".hut-content");
hutContent.insertBefore(campfireScene, hutContent.firstChild);

// ===== VISION BOARD =====
const visionBoardBtn     = document.getElementById("visionBoardBtn");
const visionBoardOverlay = document.getElementById("visionBoardOverlay");
const visionBoardClose   = document.getElementById("visionBoardClose");

visionBoardBtn.addEventListener("click",  () => visionBoardOverlay.classList.add("visible"));
visionBoardClose.addEventListener("click", () => visionBoardOverlay.classList.remove("visible"));

// ===== STRING LIGHTS =====
const hutLights = document.getElementById("hutLights");

const bulbColours = [
    { bg: "#ffcc44", glow: "rgba(255,200,50,0.85)"  },   // warm amber
    { bg: "#ff8c30", glow: "rgba(255,130,30,0.80)"  },   // orange
    { bg: "#ffe566", glow: "rgba(255,230,80,0.80)"  },   // yellow
    { bg: "#a8e06a", glow: "rgba(150,220,90,0.70)"  },   // soft green
    { bg: "#ffb060", glow: "rgba(255,165,60,0.80)"  },   // peach
    { bg: "#ff6b6b", glow: "rgba(255,90,90,0.70)"   },   // warm red
];

const NUM_BULBS = 20;

for (let i = 0; i < NUM_BULBS; i++) {
    const bulb  = document.createElement("div");
    const c     = bulbColours[i % bulbColours.length];
    const pct   = i / (NUM_BULBS - 1);
    const left  = pct * 100;
    // Natural catenary droop — deepest in the middle
    const droop = Math.sin(pct * Math.PI) * 16;

    bulb.classList.add("hut-bulb");
    bulb.style.left       = `calc(${left}% - 6px)`;
    bulb.style.top        = `${18 + droop}px`;
    bulb.style.background = c.bg;
    bulb.style.boxShadow  = `0 0 10px 4px ${c.glow}, 0 0 22px 8px ${c.glow.replace('0.8', '0.35').replace('0.7','0.3')}`;
    bulb.style.setProperty("--flicker-dur",   `${2 + Math.random() * 4}s`);
    bulb.style.setProperty("--flicker-delay", `${Math.random() * 5}s`);

    hutLights.appendChild(bulb);
}

// ===== EMBER PARTICLES =====
const hutEmbers   = document.getElementById("hutEmbers");
const m2Panel     = document.getElementById("m2");
let emberInterval = null;

function spawnEmber() {
    const ember = document.createElement("div");
    ember.classList.add("hut-ember");

    const size  = Math.random() * 5 + 3;             // 3–8px — chunky enough to see
    const left  = 15 + Math.random() * 70;            // middle 70% of panel
    const dur   = 4 + Math.random() * 5;              // 4–9s
    const drift = (Math.random() - 0.5) * 100;
    const delay = Math.random() * 0.8;

    // Alternating orange / gold / red
    const colours = [
        `rgba(255, ${100 + Math.floor(Math.random()*80)}, 10, 0.95)`,
        `rgba(255, ${180 + Math.floor(Math.random()*60)}, 30, 0.95)`,
        `rgba(255, 80, 10, 0.9)`,
    ];
    const col = colours[Math.floor(Math.random() * colours.length)];

    ember.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: 0;
        background: ${col};
        box-shadow: 0 0 ${size * 2.5}px ${size}px ${col};
        --ember-dur: ${dur}s;
        --ember-delay: ${delay}s;
        --ember-drift: ${drift}px;
    `;

    hutEmbers.appendChild(ember);
    setTimeout(() => ember.remove(), (dur + delay + 1) * 1000);
}

function startEmbers() {
    if (emberInterval) return;
    // Burst of embers immediately so it's not empty on entry
    for (let i = 0; i < 8; i++) setTimeout(spawnEmber, i * 150);
    emberInterval = setInterval(spawnEmber, 350);
}

function stopEmbers() {
    clearInterval(emberInterval);
    emberInterval = null;
}

const hutObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) startEmbers();
            else                       stopEmbers();
        });
    },
    { threshold: 0.2 }
);

hutObserver.observe(m2Panel);