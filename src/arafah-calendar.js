import { formatTime } from './arafah-prayer.js';

const STORAGE_KEY = 'arafah_calendar_1447';

const GROUPS = [
    ['Before Fajr', ['Tahajjud', 'Istighfar × 100', 'Suhoor', 'Set intention to fast']],
    ['Fajr', ['Fajr prayer', 'Morning adhkar', 'Surah Al-Kahf', 'Duha prayer']],
    ['Morning', ['Quran recitation', 'Dhikr: Lā ilāha illallāh', 'Salawat on the Prophet ﷺ', 'Rest']],
    ['Dhuhr to Asr', ['Dhuhr prayer', 'Du\'ā session', 'Review du\'ā list', 'Asr prayer']],
    ['Asr to Maghrib', ['Intensive du\'ā', 'Call on Allah by His names', 'Repeat the best dhikr', 'Ask for the Ummah']],
    ['Maghrib', ['Break fast', 'Maghrib prayer', 'Shukr (gratitude)']],
];

function readCalendar() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
        return {};
    }
}

function writeCalendar(calendar) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calendar));
}

function slotKey(date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function buildSlots(prayerTimes) {
    const start = new Date(prayerTimes.fajr.getTime() - 90 * 60 * 1000);
    const end = new Date(prayerTimes.maghrib.getTime() + 30 * 60 * 1000);
    const slots = [];

    for (let cursor = new Date(start); cursor <= end; cursor = new Date(cursor.getTime() + 30 * 60 * 1000)) {
        slots.push(new Date(cursor));
    }

    return slots;
}

function seedSuggested(slots, prayerTimes) {
    const calendar = {};
    const targets = [
        [prayerTimes.fajr.getTime() - 60 * 60 * 1000, 'Tahajjud'],
        [prayerTimes.fajr.getTime() - 30 * 60 * 1000, 'Suhoor'],
        [prayerTimes.fajr.getTime(), 'Fajr prayer'],
        [prayerTimes.fajr.getTime() + 30 * 60 * 1000, 'Morning adhkar'],
        [prayerTimes.sunrise.getTime() + 30 * 60 * 1000, 'Duha prayer'],
        [prayerTimes.sunrise.getTime() + 60 * 60 * 1000, 'Quran recitation'],
        [prayerTimes.dhuhr.getTime(), 'Dhuhr prayer'],
        [prayerTimes.dhuhr.getTime() + 30 * 60 * 1000, 'Du\'ā session'],
        [prayerTimes.asr.getTime(), 'Asr prayer'],
        [prayerTimes.asr.getTime() + 30 * 60 * 1000, 'Intensive du\'ā'],
        [prayerTimes.maghrib.getTime(), 'Break fast'],
        [prayerTimes.maghrib.getTime() + 30 * 60 * 1000, 'Maghrib prayer'],
    ];

    targets.forEach(([time, label]) => {
        const match = slots.reduce((closest, slot) => {
            if (!closest) {
                return slot;
            }
            return Math.abs(slot.getTime() - time) < Math.abs(closest.getTime() - time) ? slot : closest;
        }, null);

        if (!match) {
            return;
        }

        const key = slotKey(match);
        if (!calendar[key]) {
            calendar[key] = [];
        }
        calendar[key].push({ id: `${key}-${label}`, label });
    });

    return calendar;
}

export function initCalendar(el, prayerTimes) {
    const chips = el.querySelector('[data-calendar-chips]');
    const slotsWrap = el.querySelector('[data-calendar-slots]');
    const resetButton = el.querySelector('[data-calendar-reset]');
    const saveButton = el.querySelector('[data-calendar-save]');
    const slots = buildSlots(prayerTimes);

    let calendar = Object.keys(readCalendar()).length ? readCalendar() : seedSuggested(slots, prayerTimes);
    let draggedLabel = '';

    function persist() {
        writeCalendar(calendar);
    }

    function addToNextEmpty(label) {
        const target = slots.find(slot => !(calendar[slotKey(slot)] || []).length);
        const key = slotKey(target || slots[0]);
        if (!calendar[key]) {
            calendar[key] = [];
        }
        calendar[key].push({ id: `${Date.now()}-${Math.random()}`, label });
        renderSlots();
    }

    function renderChips() {
        chips.innerHTML = GROUPS.map(([group, labels]) => `
            <div class="calendar-group">
                <h3>${group}</h3>
                <div class="calendar-chip-list">
                    ${labels.map(label => `
                        <div class="calendar-chip-wrap">
                            <button type="button" class="calendar-chip" draggable="true" data-label="${label}">${label}</button>
                            <button type="button" class="calendar-chip-add btn btn-secondary btn-sm" data-add-label="${label}">Add</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        chips.querySelectorAll('.calendar-chip').forEach(chip => {
            chip.addEventListener('dragstart', event => {
                draggedLabel = chip.dataset.label || '';
                chip.classList.add('is-dragging');
                event.dataTransfer.effectAllowed = 'copyMove';
                event.dataTransfer.setData('text/plain', draggedLabel);
            });

            chip.addEventListener('dragend', () => {
                draggedLabel = '';
                chip.classList.remove('is-dragging');
                slotsWrap.querySelectorAll('.is-dragover').forEach(slot => slot.classList.remove('is-dragover'));
            });
        });

        chips.querySelectorAll('[data-add-label]').forEach(button => {
            button.addEventListener('click', () => addToNextEmpty(button.dataset.addLabel || ''));
        });
    }

    function renderSlots() {
        slotsWrap.innerHTML = slots.map(slot => {
            const key = slotKey(slot);
            const items = calendar[key] || [];
            return `
                <div class="calendar-slot" data-slot-key="${key}" aria-dropeffect="move">
                    <div class="calendar-slot-time">${formatTime(slot)}</div>
                    <div class="calendar-slot-items">
                        ${items.map(item => `
                            <span class="calendar-slot-tag">
                                ${item.label}
                                <button type="button" data-remove-id="${item.id}" data-slot-remove="${key}" aria-label="Remove ${item.label}">✕</button>
                            </span>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');

        slotsWrap.querySelectorAll('.calendar-slot').forEach(slot => {
            slot.addEventListener('dragover', event => {
                event.preventDefault();
                slot.classList.add('is-dragover');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('is-dragover');
            });

            slot.addEventListener('drop', event => {
                event.preventDefault();
                slot.classList.remove('is-dragover');
                const label = event.dataTransfer.getData('text/plain') || draggedLabel;
                if (!label) {
                    return;
                }
                const key = slot.dataset.slotKey;
                if (!calendar[key]) {
                    calendar[key] = [];
                }
                calendar[key].push({ id: `${Date.now()}-${Math.random()}`, label });
                renderSlots();
            });
        });

        slotsWrap.querySelectorAll('[data-remove-id]').forEach(button => {
            button.addEventListener('click', () => {
                const key = button.dataset.slotRemove;
                calendar[key] = (calendar[key] || []).filter(item => item.id !== button.dataset.removeId);
                renderSlots();
            });
        });

        persist();
    }

    resetButton.onclick = () => {
        calendar = seedSuggested(slots, prayerTimes);
        renderSlots();
    };

    saveButton.onclick = async () => {
        if (!window.html2canvas) {
            return;
        }

        const canvas = await window.html2canvas(el, {
            backgroundColor: '#F7F3EC',
            scale: 2,
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'arafah-calendar.png';
        link.click();
    };

    renderChips();
    renderSlots();
}
