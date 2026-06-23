// ===== VISION BOARD (The Hut section) =====
const visionBoardBtn = document.getElementById("visionBoardBtn");
const visionBoardOverlay = document.getElementById("visionBoardOverlay");
const visionBoardClose = document.getElementById("visionBoardClose");

visionBoardBtn.addEventListener("click", () => {
    visionBoardOverlay.classList.add("visible");
});

visionBoardClose.addEventListener("click", () => {
    visionBoardOverlay.classList.remove("visible");
});
