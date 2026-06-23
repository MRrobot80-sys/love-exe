// ===== HAND-DRAWN SUNFLOWER STICKERS (Sunflower section) =====
const m1Panel = document.getElementById("m1");
let sunflowerInterval = null;

// SVG recreating the hand-drawn sticker exactly:
// yellow house-shaped outline, hand-drawn sunflower, brown center, green leaf
function createSunflowerSVG() {
    const size = Math.random() * 20 + 28; // 28–48px
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 120 130");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size * 1.08);
    svg.innerHTML = `
      <defs>
        <filter id="sf-sketch" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="2" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      <!-- House-shaped yellow background -->
      <path d="
        M 18 130
        Q 16 128 16 125
        L 16 62
        L 4  62
        Q 2  62 3 60
        L 58 8
        Q 60 6 62 8
        L 117 60
        Q 118 62 116 62
        L 104 62
        L 104 125
        Q 104 128 102 130
        Z
      " fill="#f5d832" stroke="#2a1a00" stroke-width="2.5" stroke-linejoin="round" filter="url(#sf-sketch)"/>

      <!-- STEM -->
      <path d="M 60 118 Q 58 100 59 88 Q 60 80 60 72" 
            stroke="#8B5E3C" stroke-width="3.5" stroke-linecap="round" fill="none" filter="url(#sf-sketch)"/>

      <!-- LEAF -->
      <path d="M 59 95 Q 44 88 40 78 Q 52 80 59 90"
            fill="#4a8c2a" stroke="#2d5a15" stroke-width="1.8" stroke-linejoin="round" filter="url(#sf-sketch)"/>
      <path d="M 59 90 Q 44 84 40 78" stroke="#2d5a15" stroke-width="1" fill="none"/>

      <!-- PETALS — outer ring, hand-drawn irregular shapes -->
      <g fill="#f5c400" stroke="#2a1a00" stroke-width="1.6" stroke-linejoin="round" filter="url(#sf-sketch)">
        <!-- top -->
        <path d="M 57 58 Q 54 44 60 38 Q 66 44 63 58 Z"/>
        <!-- top-right -->
        <path d="M 68 62 Q 78 52 85 55 Q 82 65 70 68 Z"/>
        <!-- right -->
        <path d="M 72 72 Q 86 70 89 77 Q 84 84 71 80 Z"/>
        <!-- bottom-right -->
        <path d="M 67 83 Q 76 92 73 98 Q 65 96 62 84 Z"/>
        <!-- bottom-left -->
        <path d="M 53 83 Q 48 94 42 93 Q 41 85 51 80 Z"/>
        <!-- left -->
        <path d="M 48 72 Q 34 72 32 78 Q 36 85 50 80 Z"/>
        <!-- top-left -->
        <path d="M 52 62 Q 42 54 38 57 Q 39 67 52 68 Z"/>
        <!-- extra petal top-right inner -->
        <path d="M 64 60 Q 72 48 78 50 Q 76 61 65 66 Z"/>
        <!-- extra petal top-left inner -->
        <path d="M 56 60 Q 48 48 42 51 Q 44 62 56 66 Z"/>
      </g>

      <!-- INNER PETALS — slightly darker yellow -->
      <g fill="#e8b800" stroke="#2a1a00" stroke-width="1.2" stroke-linejoin="round" filter="url(#sf-sketch)">
        <path d="M 58 64 Q 56 55 60 51 Q 64 55 62 64 Z"/>
        <path d="M 65 67 Q 73 63 75 67 Q 72 73 64 72 Z"/>
        <path d="M 63 76 Q 69 82 66 85 Q 61 83 60 76 Z"/>
        <path d="M 55 76 Q 51 83 47 81 Q 47 75 55 73 Z"/>
        <path d="M 55 67 Q 47 63 46 68 Q 48 74 56 72 Z"/>
      </g>

      <!-- BROWN CENTER DISC -->
      <circle cx="60" cy="70" r="14" fill="#6b3a1f" stroke="#2a1a00" stroke-width="2" filter="url(#sf-sketch)"/>
      <!-- Center texture dots -->
      <circle cx="57" cy="67" r="1.8" fill="#4a2510" opacity="0.7"/>
      <circle cx="63" cy="67" r="1.6" fill="#4a2510" opacity="0.7"/>
      <circle cx="60" cy="72" r="2"   fill="#4a2510" opacity="0.7"/>
      <circle cx="55" cy="71" r="1.5" fill="#4a2510" opacity="0.6"/>
      <circle cx="65" cy="72" r="1.5" fill="#4a2510" opacity="0.6"/>
      <circle cx="59" cy="63" r="1.4" fill="#8a5030" opacity="0.5"/>
      <circle cx="63" cy="74" r="1.3" fill="#8a5030" opacity="0.5"/>

      <!-- Outline stroke over house shape for the hand-drawn border feel -->
      <path d="
        M 18 130
        Q 16 128 16 125
        L 16 62
        L 4  62
        Q 2  62 3 60
        L 58 8
        Q 60 6 62 8
        L 117 60
        Q 118 62 116 62
        L 104 62
        L 104 125
        Q 104 128 102 130
        Z
      " fill="none" stroke="#2a1a00" stroke-width="2.8" stroke-linejoin="round"/>
    `;
    return svg;
}

function spawnSunflower() {
    const wrap = document.createElement("div");
    wrap.classList.add("sunflower");

    const x        = Math.random() * 88 + 2;
    const size     = Math.random() * 20 + 28;
    const duration = Math.random() * 5 + 6;
    const rotate   = (Math.random() - 0.5) * 40;
    const drift    = (Math.random() - 0.5) * 60;

    wrap.style.cssText = `
        left: ${x}%;
        bottom: 0;
        width: ${size}px;
        height: ${size * 1.08}px;
        --drift: ${drift}px;
        --rotate: ${rotate}deg;
        animation-duration: ${duration}s;
        animation-delay: 0s;
    `;

    wrap.appendChild(createSunflowerSVG());
    m1Panel.appendChild(wrap);
    setTimeout(() => wrap.remove(), duration * 1000 + 200);
}

function startSunflowers() {
    if (sunflowerInterval) return;
    for (let i = 0; i < 3; i++) setTimeout(spawnSunflower, i * 300);
    sunflowerInterval = setInterval(spawnSunflower, 700);
}

function stopSunflowers() {
    clearInterval(sunflowerInterval);
    sunflowerInterval = null;
    m1Panel.querySelectorAll(".sunflower").forEach(s => s.remove());
}

const sunflowerObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) startSunflowers();
        else stopSunflowers();
    }),
    { threshold: 0.4 }
);

sunflowerObserver.observe(m1Panel);