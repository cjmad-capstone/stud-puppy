import { MAPBOX_API_KEY } from './consts.js';

export const reverseGeocode = async (lat, lon) => {
    const baseUrl = 'https://api.mapbox.com';
    const endPoint = '/geocoding/v5/mapbox.places/';
    try {
        const res = await fetch(
            `${
                baseUrl + endPoint + lon
            },${lat}.json?access_token=${MAPBOX_API_KEY}`
        );
        const data = await res.json();
        return data.features;
    } catch (err) {
        console.error(err);
        return null;
    }
};
