const STORAGE_KEY = 'arafah_duas_1447';
const SUGGESTIONS = [
    'My deen and closeness to Allah',
    'Forgiveness for my sins',
    'My parents and family',
    'The Ummah of the Prophet ﷺ',
    'Jannah al-Firdaws',
];

let draggingId = null;

function containsArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
}

function readItems() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function writeItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createItem(text) {
    return {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text,
    };
}

function buildExportCard(items) {
    const wrapper = document.createElement('div');
    wrapper.className = 'dua-export-card';
    wrapper.innerHTML = `
        <div class="dua-export-ornament" aria-hidden="true"></div>
        <h3>Du'ā list</h3>
        <p>9 Dhul-Hijjah 1447</p>
        <div class="dua-export-list"></div>
        <div class="dua-export-foot">Du'ā list — 9 Dhul-Hijjah 1447</div>
    `;

    const list = wrapper.querySelector('.dua-export-list');
    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'dua-export-row';
        row.innerHTML = `
            <span class="dua-export-index">${String(index + 1).padStart(2, '0')}</span>
            <span class="dua-export-text${containsArabic(item.text) ? ' is-arabic' : ''}"${containsArabic(item.text) ? ' lang="ar" dir="rtl"' : ''}>${item.text}</span>
        `;
        list.appendChild(row);
    });

    return wrapper;
}

export function initDuaBuilder(el) {
    const input = el.querySelector('[data-dua-input]');
    const addButton = el.querySelector('[data-dua-add]');
    const list = el.querySelector('[data-dua-list]');
    const counter = el.querySelector('[data-dua-count]');
    const suggestions = el.querySelector('[data-dua-suggestions]');
    const saveButton = el.querySelector('[data-dua-save]');

    let items = readItems();

    function persist() {
        writeItems(items);
        counter.textContent = String(items.length);
    }

    function renderSuggestions() {
        suggestions.innerHTML = '';
        SUGGESTIONS.forEach(text => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'dua-suggestion';
            button.textContent = text;
            button.addEventListener('click', () => {
                items.push(createItem(text));
                render();
            });
            suggestions.appendChild(button);
        });
    }

    function render() {
        list.innerHTML = '';

        if (!items.length) {
            list.innerHTML = '<p class="dua-empty">Add the du\'ā you do not want to forget before Maghrib.</p>';
            persist();
            return;
        }

        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'dua-item';
            row.draggable = true;
            row.dataset.id = item.id;
            row.innerHTML = `
                <button type="button" class="dua-drag" aria-label="Reorder du'a item">⋮⋮</button>
                <div class="dua-item-text${containsArabic(item.text) ? ' is-arabic' : ''}" contenteditable="true" role="textbox" aria-multiline="true"${containsArabic(item.text) ? ' lang="ar" dir="rtl"' : ''}></div>
                <button type="button" class="dua-delete" aria-label="Delete du'a item">✕</button>
            `;

            const editor = row.querySelector('.dua-item-text');
            editor.textContent = item.text;

            row.addEventListener('dragstart', event => {
                draggingId = item.id;
                row.classList.add('is-dragging');
                event.dataTransfer.effectAllowed = 'move';
            });

            row.addEventListener('dragend', () => {
                draggingId = null;
                row.classList.remove('is-dragging');
                list.querySelectorAll('.is-drop-target').forEach(target => target.classList.remove('is-drop-target'));
            });

            row.addEventListener('dragover', event => {
                event.preventDefault();
                if (draggingId && draggingId !== item.id) {
                    row.classList.add('is-drop-target');
                }
            });

            row.addEventListener('dragleave', () => {
                row.classList.remove('is-drop-target');
            });

            row.addEventListener('drop', event => {
                event.preventDefault();
                row.classList.remove('is-drop-target');
                const from = items.findIndex(entry => entry.id === draggingId);
                const to = items.findIndex(entry => entry.id === item.id);
                if (from === -1 || to === -1 || from === to) {
                    return;
                }
                const [moved] = items.splice(from, 1);
                items.splice(to, 0, moved);
                render();
            });

            editor.addEventListener('input', () => {
                item.text = editor.textContent.trim();
                editor.classList.toggle('is-arabic', containsArabic(item.text));
                if (containsArabic(item.text)) {
                    editor.setAttribute('lang', 'ar');
                    editor.setAttribute('dir', 'rtl');
                } else {
                    editor.removeAttribute('lang');
                    editor.removeAttribute('dir');
                }
                persist();
            });

            row.querySelector('.dua-delete').addEventListener('click', () => {
                items = items.filter(entry => entry.id !== item.id);
                render();
            });

            list.appendChild(row);
        });

        persist();
    }

    function addFromInput() {
        const value = input.value.trim();
        if (!value) {
            input.focus();
            return;
        }
        items.push(createItem(value));
        input.value = '';
        render();
        list.querySelector('.dua-item:last-child .dua-item-text')?.focus();
    }

    addButton.addEventListener('click', addFromInput);
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });

    saveButton.addEventListener('click', async () => {
        if (!window.html2canvas) {
            return;
        }

        const exportCard = buildExportCard(items);
        document.body.appendChild(exportCard);
        const canvas = await window.html2canvas(exportCard, {
            backgroundColor: '#F7F3EC',
            scale: 2,
        });
        exportCard.remove();

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'arafah-dua-list.png';
        link.click();
    });

    renderSuggestions();
    render();
}
