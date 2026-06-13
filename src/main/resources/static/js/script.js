// ===== PASSWORD GATE =====
let fromBirthdaySelector = false;
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

document.querySelector(".gate-input-row").style.opacity = "0";
document.querySelector(".gate-input-row").style.transition = "opacity 0.6s ease";

function checkAnswer() {
    const val = gateInput.value.trim().toLowerCase();
    if (val === GATE_ANSWER) {
        gateOverlay.classList.add("hidden");
        setTimeout(() => gateOverlay.remove(), 900);
    } else {
        gateError.textContent = "that's not right... try again 🌙";
        gateInput.value = "";
        gateInput.focus();
        setTimeout(() => gateError.textContent = "", 2500);
    }
}

gateBtn.addEventListener("click", checkAnswer);
gateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkAnswer();
});

// ===== BACKGROUND =====
const panels = document.querySelectorAll(".panel");
const navItems = document.querySelectorAll(".nav-item");
const bgA = document.getElementById("bg-a");
const bgB = document.getElementById("bg-b");
let current = bgA;

const BG_IMAGE = "url('/images/SidebarBG.jpeg')";

function initBackground() {
    bgA.style.backgroundImage = BG_IMAGE;
    bgA.classList.add("active");
    current = bgA;
}

// ===== SIDEBAR =====
function setActiveNav(id) {
    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.target === id) {
            item.classList.add("active");
        }
    });
}

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        const target = document.getElementById(item.dataset.target);
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// ===== SCROLL OBSERVER =====
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                setActiveNav(id);
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.3 }
);

panels.forEach((panel) => observer.observe(panel));
document.querySelector(".panel").classList.add("active");
initBackground();

// ===== MUSIC =====
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

// ===== FLOATING SUNFLOWERS =====
const m1Panel = document.getElementById("m1");
let sunflowerInterval = null;

function createSunflower() {
    const sunflower = document.createElement("span");
    sunflower.classList.add("sunflower");
    sunflower.textContent = "🌻";
    const x = Math.random() * 90 + 5;
    sunflower.style.left = `${x}%`;
    sunflower.style.bottom = "0";
    const size = Math.random() * 1.2 + 0.8;
    sunflower.style.fontSize = `${size}rem`;
    const duration = Math.random() * 4 + 4;
    sunflower.style.animationDuration = `${duration}s`;
    sunflower.style.animationDelay = "0s";
    m1Panel.appendChild(sunflower);
    setTimeout(() => sunflower.remove(), duration * 1000);
}

function startSunflowers() {
    if (sunflowerInterval) return;
    sunflowerInterval = setInterval(createSunflower, 600);
}

function stopSunflowers() {
    clearInterval(sunflowerInterval);
    sunflowerInterval = null;
    m1Panel.querySelectorAll(".sunflower").forEach((s) => s.remove());
}

const sunflowerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startSunflowers();
            } else {
                stopSunflowers();
            }
        });
    },
    { threshold: 0.4 }
);

sunflowerObserver.observe(m1Panel);

// ===== VISION BOARD =====
const visionBoardBtn = document.getElementById("visionBoardBtn");
const visionBoardOverlay = document.getElementById("visionBoardOverlay");
const visionBoardClose = document.getElementById("visionBoardClose");

visionBoardBtn.addEventListener("click", () => {
    visionBoardOverlay.classList.add("visible");
});

visionBoardClose.addEventListener("click", () => {
    visionBoardOverlay.classList.remove("visible");
});

// ===== PHOTO CARD =====
const photoCard = document.getElementById("photoCard");
const photoCardImg = document.getElementById("photoCardImg");
const photoCardExpanded = document.getElementById("photoCardExpanded");
const photoCardExpandedImg = document.getElementById("photoCardExpandedImg");

const letterPhotos = {
    sad: "/images/sad.jpeg",
    miss: "/images/missme.jpeg",
    birthday: "/images/birthday.jpeg",
    "3am": "/images/3am.jpeg",
    reminder: "/images/reminder.jpeg",
};

function showPhotoCard(key) {
    const src = letterPhotos[key];
    if (!src) return;
    photoCardImg.src = src;
    photoCardExpandedImg.src = src;
    setTimeout(() => photoCard.classList.add("visible"), 600);
}

function hidePhotoCard() {
    photoCard.classList.remove("visible");
    photoCardExpanded.classList.remove("visible");
}

photoCard.addEventListener("click", () => {
    photoCardExpanded.classList.add("visible");
});

photoCardExpanded.addEventListener("click", () => {
    photoCardExpanded.classList.remove("visible");
});

// ===== OPEN WHEN LETTERS =====
const letters = {
    sad: `HIIII BABYYY.<br><br>
          Why is my baby sad😔😔. Its not nice to be sad amna. I love love you.
          Since I am writing this without knowing the reason for sadness(I hope
          I am not the one to make you sad) I don't know what happened. But I know
          you well enough to know that when you're sad, you go quiet. You convince yourself
          you're being too much.<br><br>
          You're allowed to fall apart a little. You don't have to explain it
          or fix it today. Just don't disappear on yourself.<br><br>
          I'm here, even when I'm not there. You know that.`,

    miss: `Awwww someone is missing me🤭🤭.<br><br>
           I for sure miss my baby girl too rn (I am probably sleeping rn).
           I want you to know that I think about you all the timeeeee. When something
           funny happens and you're the first person I want to tell.
           When a song comes on that you would've sent me first. When I see a couple walking
           together or talking or laughing I miss you a little extra. Because like that could be us.
           But its okay Amna. We wont always be far apart.
           Distance is weird. It doesn't erase anything.
           It just stretches it out. And everything we are to each other
           stays exactly where we left it — waiting.<br><br>
           But fear not baby girl. The day will come inshallah when we will go
           on the long drive with our fav song and talking about life. So its okay.
           I miss you too.`,

    birthday: `Happy birthday.<br><br>
               I hope today feels like something. Not just another day,
               not just cake and notifications — something that actually lands.<br><br>
               You've made it another year. And somewhere in that year,
               you made a difference to someone without even knowing it.<br><br>
               I'm glad you exist. Genuinely.`,

    "3am": `Ummmmm excuse me mam?<br><br>
            Why are we still awake.<br><br>
            Why are we not sleeping?<br><br>
            Chalain ab agar aap jaag hi rehi hain toh
            aajayain jaldi sey icecream khaanay chaltay hain.
            Amna. you should like go to sleep because like
            you will feel nausea subah ko and ulti ulti feel hoga.
            and then you will ignore ignore me all day because you didnt
            sleep raat ko. Which is very katti-able baat.<br><br>
            (its 08:25am when i am writting this)`,

    reminder: `I need you to hear this.<br><br>
               You are not behind. You are not failing.
               You are not the sum of your unfinished things.<br><br>
               You are someone who shows up — quietly, consistently,
               even when no one's watching. Even when it's hard.
               Even when you don't feel like it.<br><br>
               That's not a small thing. That's actually everything.<br><br>
               You are so deeply, specifically loved —
               not despite who you are, but because of exactly who you are.<br><br>
               Don't forget that. Even on the days it's hard to believe.`,
};

// ===== BIRTHDAY YEAR LETTERS =====
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
             Welcome to 22. Your era begins here. ✨💛`
};

const overlay = document.getElementById("letterOverlay");
const letterContent = document.getElementById("letterContent");
const backBtn = document.getElementById("backBtn");

// ===== BIRTHDAY GATE =====
const birthdayGateOverlay = document.getElementById("birthdayGateOverlay");
const birthdayGateInput = document.getElementById("birthdayGateInput");
const birthdayGateBtn = document.getElementById("birthdayGateBtn");
const birthdayGateError = document.getElementById("birthdayGateError");

// ===== BIRTHDAY SELECTOR =====
const bdaySelector = document.getElementById("bdaySelector");
const bdayCountdown = document.getElementById("bdayCountdown");

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
const bdaySelectorBackBtn = document.getElementById("bdaySelectorBackBtn");
bdaySelectorBackBtn.addEventListener("click", () => {
    bdaySelector.classList.remove("visible");
    birthdayGateOverlay.classList.remove("visible");
});

document.querySelectorAll(".bday-card:not(.bday-card-countdown)").forEach(card => {
    card.addEventListener("click", () => {
        const year = card.dataset.year;
        letterContent.innerHTML = birthdayLetters[year];
        fromBirthdaySelector = true;
        bdaySelector.classList.remove("visible");
        overlay.classList.add("visible");
    });
});

function checkBirthdayPassword() {
    const val = birthdayGateInput.value.trim().toLowerCase();
    if (val === "dinonugget") {
        birthdayGateOverlay.classList.remove("visible");
        bdaySelector.classList.add("visible");
        launchConfetti();
    } else {
        birthdayGateError.textContent = "that's not right... try again 🎂";
        birthdayGateInput.value = "";
        birthdayGateInput.focus();
        setTimeout(() => (birthdayGateError.textContent = ""), 2500);
    }
}

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

birthdayGateBtn.addEventListener("click", checkBirthdayPassword);
birthdayGateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkBirthdayPassword();
});

// ===== OPEN WHEN CLICK HANDLER =====
document.querySelectorAll(".ow-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.letter;
        if (key === "birthday") {
            birthdayGateOverlay.classList.add("visible");
            birthdayGateInput.value = "";
            birthdayGateError.textContent = "";
            setTimeout(() => birthdayGateInput.focus(), 100);
        } else {
            letterContent.innerHTML = letters[key];
            overlay.classList.add("visible");
            showPhotoCard(key);
        }
    });
});

// ===== BACK / CLOSE =====
backBtn.addEventListener("click", () => {
    overlay.classList.remove("visible");
    hidePhotoCard();
    if (fromBirthdaySelector) {
        fromBirthdaySelector = false;
        bdaySelector.classList.add("visible");
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        overlay.classList.remove("visible");
        hidePhotoCard();
        if (fromBirthdaySelector) {
            fromBirthdaySelector = false;
            bdaySelector.classList.add("visible");
        }
        visionBoardOverlay.classList.remove("visible");
        birthdayGateOverlay.classList.remove("visible");
    }
});