// ========================================
// PORTFOLIO - MARWA HOUMAYED
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// === THÈME ===
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    themeIcon.classList.toggle('fa-moon', !isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
}

function getSavedTheme() {
    try {
        return localStorage.getItem('theme');
    } catch {
        return null;
    }
}

const savedTheme = getSavedTheme();
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
    const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(next);
    try {
        localStorage.setItem('theme', next);
    } catch {
        // stockage indisponible : le thème ne sera pas mémorisé
    }
});

// === MENU MOBILE ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function setMenuOpen(open) {
    navMenu.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}

hamburger.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('active'));
});

navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
});

// === DÉFILEMENT : barre de navigation, lien actif, bouton retour en haut ===
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('main section[id]');
const scrollTopBtn = document.getElementById('scrollTop');
let ticking = false;

function onScroll() {
    const y = window.scrollY;

    navbar.classList.toggle('scrolled', y > 50);
    scrollTopBtn.classList.toggle('visible', y > 500);

    let current = '';
    sections.forEach(section => {
        if (y >= section.offsetTop - 120) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
}, { passive: true });

onScroll();

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

// === EFFET MACHINE À ÉCRIRE ===
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Là où la technologie rencontre la finance',
    'Finissante en informatique à l\'UdeM',
    'Développement web frontend'
];

let phraseIndex = 0;
let charIndex = phrases[0].length;
let isDeleting = true;

function type() {
    const currentPhrase = phrases[phraseIndex];
    let delay;

    if (isDeleting) {
        charIndex--;
        delay = 40;
    } else {
        charIndex++;
        delay = 90;
    }

    typingText.textContent = currentPhrase.substring(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        delay = 2500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

// La première phrase s'affiche directement, puis l'animation commence
if (!prefersReducedMotion) {
    setTimeout(type, 3000);
}

// === APPARITION DES ÉLÉMENTS AU DÉFILEMENT ===
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('visible'));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
}

// === ANNÉE DU PIED DE PAGE ===
document.getElementById('year').textContent = new Date().getFullYear();
