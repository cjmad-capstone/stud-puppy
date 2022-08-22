import React, {useEffect, useRef} from 'react'
import 'https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js';
import {MAPBOX_TOKEN} from "../../const/secrets.js";
import './Map.module.css'

const Map = () => {
    console.log(mapboxgl)

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initMap = () => {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
            projection: 'globe' // display the map as a 3D globe
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
        });
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