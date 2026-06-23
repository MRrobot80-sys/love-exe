// ===== MUSIC (boot/intro section) =====
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
