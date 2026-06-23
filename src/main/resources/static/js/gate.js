// ===== PASSWORD GATE (entry envelope) =====
const gateOverlay = document.getElementById("gateOverlay");
const gatePrompt = document.getElementById("gatePrompt");
const gateInput = document.getElementById("gateInput");
const gateBtn = document.getElementById("gateBtn");
const gateError = document.getElementById("gateError");
const envelope = document.getElementById("envelope");
const envelopeFlap = document.getElementById("envelopeFlap");
const envelopeWrap = document.getElementById("envelopeWrap");
const gateBox = document.getElementById("gateBox");

const GATE_QUESTION = "Am i a fairy or batman?";
const GATE_ANSWER = "fairy";

const hint = document.createElement("div");
hint.classList.add("envelope-hint");
hint.textContent = "tap to open ✦";
envelope.appendChild(hint);

document.querySelector(".gate-input-row").style.opacity = "0";
document.querySelector(".gate-input-row").style.transition = "opacity 0.6s ease";

function typeWriter(text, element, speed = 60) {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            document.querySelector(".gate-input-row").style.opacity = "1";
            gateInput.focus();
        }
    }, speed);
}

envelope.addEventListener("click", () => {
    envelopeFlap.classList.add("open");
    envelope.style.animation = "none";
    setTimeout(() => {
        envelopeWrap.style.opacity = "0";
        envelopeWrap.style.pointerEvents = "none";
    }, 900);
    setTimeout(() => {
        envelopeWrap.style.display = "none";
        gateBox.classList.add("visible");
        typeWriter(GATE_QUESTION, gatePrompt);
    }, 1500);
});

function checkAnswer() {
    const val = gateInput.value.trim().toLowerCase();
    if (val === GATE_ANSWER) {
        gateOverlay.classList.add("hidden");
        setTimeout(() => gateOverlay.remove(), 900);
    } else {
        gateError.textContent = "that's not right... try again 🌙";
        gateInput.value = "";
        gateInput.focus();
        setTimeout(() => (gateError.textContent = ""), 2500);
    }
}

gateBtn.addEventListener("click", checkAnswer);
gateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkAnswer();
});
