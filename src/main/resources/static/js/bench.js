// ===== THE BENCH — midnight river atmosphere =====

const m3Panel = document.getElementById("m3");

// ─── SKY ───
const sky = document.createElement("div");
sky.classList.add("bench-sky");
m3Panel.insertBefore(sky, m3Panel.firstChild);

// ─── STARS ───
const NUM_STARS = 55;
for (let i = 0; i < NUM_STARS; i++) {
    const star = document.createElement("div");
    star.classList.add("bench-star");
    const size = Math.random() * 2 + 1;
    star.style.cssText = `
        width: ${size}px; height: ${size}px;
        top: ${Math.random() * 48}%;
        left: ${Math.random() * 100}%;
        --star-dur: ${2 + Math.random() * 4}s;
        --star-delay: ${Math.random() * 5}s;
        --star-brightness: ${0.4 + Math.random() * 0.6};
    `;
    sky.appendChild(star);
}

// ─── MOON ───
const moon = document.createElement("div");
moon.classList.add("bench-moon");
moon.style.cssText = "top: 10%; right: 18%;";
sky.appendChild(moon);

// ─── CLOUDS ───
const clouds = document.createElement("div");
clouds.classList.add("bench-clouds");
for (let i = 1; i <= 4; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("bench-cloud");
    clouds.appendChild(cloud);
}
sky.appendChild(clouds);

// ─── HORIZON ───
const horizon = document.createElement("div");
horizon.classList.add("bench-horizon");
horizon.style.cssText = "top: 48%; height: 32px;";
const horizonGlow = document.createElement("div");
horizonGlow.classList.add("bench-horizon-glow");
horizon.appendChild(horizonGlow);
m3Panel.insertBefore(horizon, m3Panel.firstChild);

// ─── RIVER (canvas-based water) ───
const river = document.createElement("div");
river.classList.add("bench-river");

const canvas = document.createElement("canvas");
canvas.classList.add("bench-river-canvas");
river.appendChild(canvas);
m3Panel.insertBefore(river, m3Panel.firstChild);

// Canvas water rendering
function initRiver() {
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width  = river.offsetWidth;
        canvas.height = river.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Reflection light columns from the photo — warm ambers and golds
    const lightCols = [
        { x: 0.04, width: 0.055, color: "255,158,32",  intensity: 0.7 },
        { x: 0.11, width: 0.04,  color: "255,180,50",  intensity: 0.5 },
        { x: 0.18, width: 0.07,  color: "255,148,28",  intensity: 0.75 },
        { x: 0.27, width: 0.05,  color: "255,200,70",  intensity: 0.55 },
        { x: 0.33, width: 0.08,  color: "255,155,35",  intensity: 0.8 },
        { x: 0.42, width: 0.06,  color: "255,170,45",  intensity: 0.65 },
        { x: 0.50, width: 0.09,  color: "255,145,25",  intensity: 0.85 },
        { x: 0.60, width: 0.05,  color: "255,188,58",  intensity: 0.6 },
        { x: 0.67, width: 0.07,  color: "255,152,32",  intensity: 0.7 },
        { x: 0.76, width: 0.04,  color: "255,175,50",  intensity: 0.5 },
        { x: 0.82, width: 0.06,  color: "255,160,38",  intensity: 0.65 },
        { x: 0.90, width: 0.05,  color: "255,195,65",  intensity: 0.55 },
    ];

    // Wave parameters per row
    const ROWS = 80;
    const waves = Array.from({ length: ROWS }, (_, i) => ({
        speed:     0.0006 + Math.random() * 0.001,
        amplitude: 2 + Math.random() * 5,
        frequency: 0.008 + Math.random() * 0.012,
        phase:     Math.random() * Math.PI * 2,
        offset:    Math.random() * Math.PI * 2,
    }));

    let t = 0;

    function draw() {
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // Deep water background
        ctx.fillStyle = "#040d18";
        ctx.fillRect(0, 0, W, H);

        // Moon reflection — soft silver column near top
        const moonX = W * 0.82;
        const moonGrad = ctx.createLinearGradient(moonX - 30, 0, moonX + 30, 0);
        moonGrad.addColorStop(0,   "rgba(220,210,170,0)");
        moonGrad.addColorStop(0.4, "rgba(220,210,170,0.07)");
        moonGrad.addColorStop(0.5, "rgba(235,225,185,0.14)");
        moonGrad.addColorStop(0.6, "rgba(220,210,170,0.07)");
        moonGrad.addColorStop(1,   "rgba(220,210,170,0)");
        ctx.fillStyle = moonGrad;
        ctx.fillRect(moonX - 30, 0, 60, H * 0.4);

        // Draw each horizontal wave row
        for (let row = 0; row < ROWS; row++) {
            const y      = (row / ROWS) * H;
            const rowT   = row / ROWS;                         // 0 = top, 1 = bottom
            const w      = waves[row];
            const waveX  = Math.sin(t * w.speed * 1000 + w.offset) * w.amplitude;

            // For each light column, draw a shimmering streak on this row
            lightCols.forEach(col => {
                const cx      = col.x * W + waveX;
                const colW    = col.width * W;
                const fade    = Math.sin(t * 0.8 + w.phase + col.x * 6) * 0.5 + 0.5;
                const alpha   = col.intensity * fade * (0.3 + rowT * 0.7); // brighter lower down

                const grad = ctx.createLinearGradient(cx - colW / 2, 0, cx + colW / 2, 0);
                grad.addColorStop(0,   `rgba(${col.color},0)`);
                grad.addColorStop(0.3, `rgba(${col.color},${(alpha * 0.6).toFixed(3)})`);
                grad.addColorStop(0.5, `rgba(${col.color},${alpha.toFixed(3)})`);
                grad.addColorStop(0.7, `rgba(${col.color},${(alpha * 0.6).toFixed(3)})`);
                grad.addColorStop(1,   `rgba(${col.color},0)`);

                ctx.fillStyle = grad;
                ctx.fillRect(cx - colW / 2, y, colW, H / ROWS + 1);
            });

            // Subtle horizontal ripple line
            if (row % 4 === 0) {
                const lineAlpha = 0.04 + rowT * 0.08;
                const lineY = y + Math.sin(t * 0.0004 * 1000 + row * 0.3) * 1.5;
                ctx.beginPath();
                ctx.moveTo(0, lineY);
                ctx.lineTo(W, lineY);
                ctx.strokeStyle = `rgba(180,140,60,${lineAlpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }

        t += 0.016;
        requestAnimationFrame(draw);
    }

    // Only animate when visible
    const riverObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) draw();
        });
    }, { threshold: 0.1 });
    riverObserver.observe(m3Panel);
}

// Init after DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRiver);
} else {
    initRiver();
}