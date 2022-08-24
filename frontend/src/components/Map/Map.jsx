import React, {useEffect, useRef} from 'react'
import 'https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js';
import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
import {MAPBOX_TOKEN} from "../../const/secrets.js";
import  './Map.module.css'

const Map = () => {

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initMap = () => {
        //Custom Marker Code:
        const geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'message': 'Foo',
                        'iconSize': [30, 30]
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-98.3068, 29.5062]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'message': 'Bar',
                        'iconSize': [30, 30]
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-98.6802, 29.5612]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'message': 'Baz',
                        'iconSize': [30, 30]
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-98.4896, 29.4268]
                    }
                }
            ]
        };
        //Map Code:
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-98.4946, 29.4252], // starting position [lng, lat]
            zoom: 9, // starting zoom
            projection: 'globe' // display the map as a 3D globe
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
        });

        // Add markers to the map.
        for (const marker of geojson.features) {
        // Create a DOM element for each marker.
            const el = document.createElement('div');
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            el.className = 'marker';
            el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';

            el.addEventListener('click', () => {
                window.alert(marker.properties.message);
            });

        // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        }

        /* MARKER STYLING
        .marker {
            display: block;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            padding: 0;
        }
        */


        //Geocoder Code:
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );


        // Add geolocate control to the map.
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
        // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            })
        );
    }
    useEffect(initMap, [])

    return (
        <div id='map' style={{
            width: 700,
            height: 400
        }} />
    )
}

export default Map