// ===== BIRTHDAY YEAR LETTERS =====
let fromBirthdaySelector = false;

const birthdayLetters = {
    "2023": `To my baby.<br><br>
             I don't think you knew what you were starting when you first texted me.<br><br>
             Neither did I.<br><br>
             Happy birthday, Amna. I'm so glad you showed up.`,

    "2024": `HAPPPYYYYYY 21ST BIRTHDAYYY KIDOOOOOOO.<br><br>
             I am blessed to have a friend like you in my life.
             When you first texted me — I never expected we'd become friends.
             I thought you needed advice and that was it.
             But like, the friendship felt too smooth.
             Now I feel like I have known you my whole life.<br><br>
             I am so very very proud of you for coming this far
             and being so strong and dealing with everything.
             It takes a lot of courage.<br><br>
             You deserve all the love in this world.
             I really hope you find someone that treats you like a 👸
             because like, you deserve it.<br><br>
             I want to thank you for being there for me
             when I needed someone — even though I don't like to talk about stuff,
             you make it easy. I really appreciate it from the bottom of my heart.<br><br>
             When we became friends, I was very down because of everything.
             But you really helped me through it.
             It's very rare to find people who genuinely care —
             and you are one of the few I know is real with me.<br><br>
             I will always be here for you. Always always.<br><br>
             You deserve the best of everything, Amna.
             I am very very proud of you for being who you are today.<br><br>
             Happy birthday once again, kiddo. 🎀`,

    "2025": `HAPPY 22nd BIRTHDAYYYY TO NUGGETTT.<br><br>
             Three years, Amna. Three years of your bak bak and my bak bak
             and somehow we're still here. Better than ever, actually.<br><br>
             I needed you more than you needed me when we became friends.
             I don't say that often. But it's true.<br><br>
             Thank you for bardashting me and my constant ranting about cricket and F1.
             You are literally the first person my brain goes to
             when something happens. Anything. Big or small.
             Talking to you is how I debrief my day.
             My brain needs it to function normally. No pressure.<br><br>
             I am so very very too much wala proud of you.
             The kind of proud that feels like —
             wow, look at her. Look at how far she's come.<br><br>
             You deserve days that feel gentle, nights that feel peaceful,
             and people who value you the way you deserve to be valued.<br><br>
             I pray you heal from the things you don't talk about.
             I pray this year opens doors you didn't even know existed.
             I pray life surprises you in the best ways.<br><br>
             You are in every prayer I make. Every single one.<br><br>
             Welcome to 22. Your era begins here. ✨💛`,
};

// ===== BIRTHDAY SELECTOR =====
const bdaySelector = document.getElementById("bdaySelector");
const bdayCountdown = document.getElementById("bdayCountdown");
const bdaySelectorBackBtn = document.getElementById("bdaySelectorBackBtn");

function getCountdownToDec2() {
    const now = new Date();
    const thisYear = now.getFullYear();
    let next = new Date(thisYear, 11, 2);
    if (now >= next) next = new Date(thisYear + 1, 11, 2);
    const diff = next - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h to go ✨`;
}

bdayCountdown.textContent = getCountdownToDec2();

bdaySelectorBackBtn.addEventListener("click", () => {
    bdaySelector.classList.remove("visible");
});

document.querySelectorAll(".bday-card:not(.bday-card-countdown)").forEach((card) => {
    card.addEventListener("click", () => {
        const year = card.dataset.year;
        letterContent.innerHTML = birthdayLetters[year];
        fromBirthdaySelector = true;
        bdaySelector.classList.remove("visible");
        overlay.classList.add("visible");
    });
});

// ===== CONFETTI =====
// Launches once when the birthday selector first opens — call launchConfetti()
// wherever you want this fired (e.g. from the "Open on your birthday" button).
function launchConfetti() {
    const duration = 4000;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 55,
            origin: { x: 0.3 },
            colors: ["#f0c6ff", "#c6d4ff", "#ffb3c6", "#fff0a0", "#b3ffe0"],
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#f0c6ff", "#c6d4ff", "#ffb3c6", "#fff0a0", "#b3ffe0"],
        });
    }, 250);
}
