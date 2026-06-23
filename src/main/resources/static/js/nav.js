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
