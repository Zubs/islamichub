import { getPrayerTimes, formatTime } from './arafah-prayer.js';
import { initDuaBuilder } from './arafah-dua.js';
import { initTimetable } from './arafah-timetable.js';
import { initCalendar } from './arafah-calendar.js';

const ARAFAH_DATE = new Date(2026, 4, 25, 12, 0, 0);
const DAY_BEFORE = new Date(2026, 4, 24, 12, 0, 0);
const DEFAULT_LOCATION = {
    lat: 51.5074,
    lng: -0.1278,
    city: 'London',
};

let currentPrayerTimes = null;

function hideLoading() {
    const loading = document.getElementById('loading');
    if (!loading) {
        return;
    }
    loading.classList.add('hidden');
    window.setTimeout(() => loading.remove(), 500);
}

function setupRevealAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.arafah-reveal').forEach(el => observer.observe(el));
}

function setupHeroAnimations() {
    window.setTimeout(() => {
        document.querySelector('[data-hero-arabic]')?.classList.add('is-visible');
    }, 300);
}

function setupScrollCta() {
    document.querySelector('[data-begin]')?.addEventListener('click', () => {
        document.getElementById('why-this-day')?.scrollIntoView({ behavior: 'smooth' });
    });
}

function setupDuaGuide() {
    const block = document.querySelector('[data-dua-guide]');
    const button = document.querySelector('[data-dua-guide-toggle]');
    if (!block || !button) {
        return;
    }

    button.addEventListener('click', () => {
        const open = block.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(open));
    });
}

function setupVirtueCards() {
    document.querySelectorAll('.virtue-card[role="button"]').forEach(card => {
        const toggle = () => {
            const active = card.classList.toggle('is-reflected');
            card.setAttribute('aria-pressed', String(active));
        };

        card.addEventListener('click', toggle);
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });
    });
}

function setupAccordions() {
    document.querySelectorAll('[data-accordion-button]').forEach(button => {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        const icon = button.querySelector('[aria-hidden="true"]');
        if (!panel) {
            return;
        }

        if (button.getAttribute('aria-expanded') === 'true') {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
            if (icon) {
                icon.textContent = '−';
            }
        }

        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isOpen));
            panel.classList.toggle('open', !isOpen);
            panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
            if (icon) {
                icon.textContent = isOpen ? '+' : '−';
            }
        });
    });
}

function initPrayerContext() {
    const prayerTimes = getPrayerTimes(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng, ARAFAH_DATE);
    const previousTimes = getPrayerTimes(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng, DAY_BEFORE);
    currentPrayerTimes = {
        ...prayerTimes,
        previousMaghrib: previousTimes.maghrib,
    };

    initTimetable(document.querySelector('[data-timetable-root]'), currentPrayerTimes);
    initCalendar(document.querySelector('[data-calendar-root]'), currentPrayerTimes);
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(error => {
            console.error('[IslamicHub] service worker registration failed:', error);
        });
    });
}

function init() {
    setupRevealAnimations();
    setupHeroAnimations();
    setupScrollCta();
    setupAccordions();
    setupDuaGuide();
    setupVirtueCards();
    initDuaBuilder(document.querySelector('[data-dua-root]'));
    registerServiceWorker();
    initPrayerContext();
    hideLoading();
}

init();
