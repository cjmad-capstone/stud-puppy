import React, {useEffect, useRef} from 'react'
import 'https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js';
import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
import {MAPBOX_TOKEN} from "../../const/secrets.js";
import  './Map.module.css'

const Map = () => {

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initMap = () => {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-73.990593, 40.740121], // starting position [lng, lat]
            zoom: 9, // starting zoom
            projection: 'globe' // display the map as a 3D globe
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
        });

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );
    }

    useEffect(initMap, [])



    return (
        <div id='map' style={{
            width: 600,
            height: 300
        }} />
    )
}

export default Map