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

const overlay = document.getElementById("letterOverlay");
const letterContent = document.getElementById("letterContent");
const backBtn = document.getElementById("backBtn");

// ===== OPEN WHEN CLICK HANDLER =====
document.querySelectorAll(".ow-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.letter;
        if (key === "birthday") {
            // Birthday goes straight to the year selector (no password gate).
            bdaySelector.classList.add("visible");
            launchConfetti();
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
    }
});
