function getAdhan() {
    if (!window.adhan) {
        throw new Error('Adhan.js is not available.');
    }

    return window.adhan;
}

export function formatTime(date) {
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
}

export function getPrayerTimes(lat, lng, date) {
    const adhan = getAdhan();
    const coordinates = new adhan.Coordinates(lat, lng);
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Shafi;

    const times = new adhan.PrayerTimes(
        coordinates,
        new adhan.DateComponents(date.getFullYear(), date.getMonth() + 1, date.getDate()),
        params
    );

    return {
        fajr: times.fajr,
        sunrise: times.sunrise,
        dhuhr: times.dhuhr,
        asr: times.asr,
        maghrib: times.maghrib,
        isha: times.isha,
    };
}
