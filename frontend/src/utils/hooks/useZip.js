import { useCallback, useEffect, useState } from 'react';
import { useCurrentPosition } from 'react-use-geolocation';
import { reverseGeocode } from '../reverseGeocode.js';

const useZip = () => {
    const [pos, err] = useCurrentPosition();
    const [zip, setZip] = useState();

    const getZip = useCallback(async (lat, lon) => {
        const data = await reverseGeocode(lat, lon);
        return data.filter((feat) => feat.id.includes('postcode'))[0].text;
    }, []);

    useEffect(() => {
        if (pos) {
            getZip(pos.coords.latitude, pos.coords.longitude).then((zip) =>
                setZip(zip)
            );
        }
    }, [getZip, pos]);

    return [zip, err];
};

export { useZip };
