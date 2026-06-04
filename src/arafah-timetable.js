import { formatTime } from './arafah-prayer.js';

function getTahajjudStart(prayerTimes) {
    const previousMaghrib = prayerTimes.previousMaghrib || new Date(prayerTimes.maghrib.getTime() - 24 * 60 * 60 * 1000);
    const nightLength = prayerTimes.fajr.getTime() - previousMaghrib.getTime();
    return new Date(previousMaghrib.getTime() + (nightLength * 2 / 3));
}

function makeTimelineItems(prayerTimes) {
    const tahajjud = getTahajjudStart(prayerTimes);

    return [
        {
            title: 'The day before Arafah',
            label: 'Clear the decks and protect the day.',
            points: [
                'Take the day off work or studies',
                'Tell family and friends about the day’s virtues',
                'Let people know you will be busy with worship all day',
                'Sleep straight after Isha',
                'Set an alarm for an hour before Fajr',
            ],
        },
        {
            title: 'Last third of the night (Tahajjud)',
            label: formatTime(tahajjud),
            points: [
                'Recite the du\'ā for waking, and make du\'ā',
                'Have suhoor',
                'Pray some night prayer (qiyām)',
                'Ask Allah for aid to make the most of the day',
                'Spend the final 5–10 minutes in istighfār',
            ],
        },
        {
            title: `Fajr (${formatTime(prayerTimes.fajr)})`,
            label: 'Open the day in worship.',
            points: [
                'Make wudū, picture each sin falling away',
                'Repeat after the adhān and recite its du\'ās',
                'Pray the Fajr sunnah and fard',
                'Recite the adhkār after Fajr and the morning adhkār',
                'Recite some Qur\'an',
                'Stay awake until sunrise if you can',
            ],
        },
        {
            title: `After sunrise (Shuruq) (${formatTime(prayerTimes.sunrise)})`,
            label: 'Rest with intention, then return.',
            points: [
                'If you rest, intend it as strength for worship',
                'Sleep only as much as you need to function',
                'Pray 4 rak\'ahs of Duhā',
                'Take care of your family’s needs before Dhuhr',
                'Alternate acts of worship so you do not tire',
            ],
        },
        {
            title: `Dhuhr to Asr (${formatTime(prayerTimes.dhuhr)} → ${formatTime(prayerTimes.asr)})`,
            label: 'Build toward the key window.',
            points: [
                'Pray Dhuhr',
                'Make du\'ā',
                'Alternate worship, Qur\'an, hifdh, charity',
                'Send a reminder to your family',
            ],
        },
        {
            title: `Asr to Maghrib: The Key Window (${formatTime(prayerTimes.asr)} → ${formatTime(prayerTimes.maghrib)})`,
            label: 'The peak hour. Do not hold back.',
            featured: true,
            points: [
                'Du\'ā, du\'ā, du\'ā, the peak hour',
                'Beg Allah to free you from the Fire',
                'Prepare your iftar',
                'Stay humble, beware self-amazement',
            ],
        },
    ];
}

export function initTimetable(el, prayerTimes) {
    const saveButton = el.querySelector('[data-timetable-save]');
    const list = el.querySelector('[data-timetable-list]');

    const items = makeTimelineItems(prayerTimes);
    list.innerHTML = items.map((item, index) => `
        <article class="timeline-row${item.featured ? ' is-featured' : ''}" style="transition-delay:${index * 80}ms">
            <div class="timeline-node" aria-hidden="true"></div>
            <div class="timeline-card">
                <button type="button" class="timeline-toggle" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="timeline-panel-${index}">
                    <span>
                        <strong>${item.title}</strong>
                        <small>${item.label}</small>
                    </span>
                    <span class="timeline-chevron" aria-hidden="true">+</span>
                </button>
                <div id="timeline-panel-${index}" class="timeline-panel${index === 0 ? ' open' : ''}">
                    <ul>
                        ${item.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </article>
    `).join('');

    list.querySelectorAll('.timeline-toggle').forEach(button => {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        const chevron = button.querySelector('.timeline-chevron');

        if (panel.classList.contains('open')) {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
            chevron.textContent = '−';
        }

        button.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');
            panel.classList.toggle('open', !isOpen);
            panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
            button.setAttribute('aria-expanded', String(!isOpen));
            chevron.textContent = isOpen ? '+' : '−';
        });
    });

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
        link.download = 'arafah-timetable.png';
        link.click();
    };
}
