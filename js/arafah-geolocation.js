const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

function pickCityName(address = {}) {
    return address.city
        || address.town
        || address.village
        || address.municipality
        || address.county
        || address.state
        || 'Your location';
}

async function fetchJson(url) {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}

export async function reverseGeocode(lat, lng) {
    const url = new URL(NOMINATIM_REVERSE_URL);
    url.searchParams.set('lat', String(lat));
    url.searchParams.set('lon', String(lng));
    url.searchParams.set('format', 'json');
    url.searchParams.set('addressdetails', '1');

    const data = await fetchJson(url);
    return pickCityName(data.address);
}

export async function searchCity(query) {
    const term = query.trim();
    if (!term) {
        return [];
    }

    const url = new URL(NOMINATIM_SEARCH_URL);
    url.searchParams.set('q', term);
    url.searchParams.set('format', 'json');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('limit', '6');

    const results = await fetchJson(url);

    return results.map(result => ({
        lat: Number(result.lat),
        lng: Number(result.lon),
        city: pickCityName(result.address),
        displayName: result.display_name,
    }));
}

export async function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude: lat, longitude: lng } = position.coords;

                try {
                    const city = await reverseGeocode(lat, lng);
                    resolve({ lat, lng, city });
                } catch (error) {
                    resolve({ lat, lng, city: 'Your location' });
                }
            },
            error => {
                const denied = error?.code === error.PERMISSION_DENIED;
                reject(new Error(
                    denied
                        ? 'Location access denied. Search for your city instead.'
                        : 'We could not read your location. Search for your city instead.'
                ));
            },
            {
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    });
}
