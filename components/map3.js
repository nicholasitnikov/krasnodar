import * as React from 'react';
import {useState, useMemo, useCallback, useEffect} from 'react';
import MapGL, {Popup, Source, Layer} from 'react-map-gl';
import Info from './info.js';
import Preview from './preview.js';
import { geoserverSource, geoserverLayer } from "../utils/constants.js";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXNpdG5pa292IiwiYSI6ImNrbmUyaWdidTJneHcycXA5c2Q3a201aGsifQ.k6nUY_ib-JKfuhiKnzeAIg'; // Set your mapbox token here

export default function GeoMap() {
  const [viewport, setViewport] = useState({
    latitude: 45.054,
    longitude: 38.982,
    zoom: 15,
    minZoom: 2,
    bearing: 0,
    pitch: 0
  });

  const [passportIsOpen, setPassportIsOpen] = useState(false);
  const [grassIsOpen, setGrassIsOpen] = useState(false);
  const [pdfIsOpen, setPdfIsOpen] = useState(false);
  const mapRef = React.useRef(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    const map = mapRef.current.getMap();
    map.on('sourcedata', () => {
      const highlightLoaded = map.getStyle().layers.find(el => el.id === "highlight");
      const grassLoaded = map.getStyle().layers.find(el => el.id === "grass");

      let layers = ['highlight']

      if(grassLoaded) {
        console.log('opened')
        layers.push('grass');
      }

      if(highlightLoaded) {
        const features = map.queryRenderedFeatures({layers});
        setSelectedFeatures(features)
      }
    })
  }, [mapRef])

  const clickHandler = useCallback(event => {
    if(passportIsOpen) {
      setGrassIsOpen(true);
    } else {
      setPassportIsOpen(true);
    }
  });

  const createPassportHandler = useCallback(() => {
    setPdfIsOpen(true);
  })

  // const baseLayer = {
  //   id: 'base',
  //   type: 'fill',
  //   source: 'base',
  //   'source-layer': 'data-57grz2',
  //   paint: {
  //       'fill-color': 'black',
  //       'fill-opacity': .2
  //   }
  // };
  // const highlightLayer = {
  //   id: 'highlight',
  //   type: 'fill',
  //   source: 'trace',
  //   'source-layer': 'gavrilova-9oe31s',
  //   paint: {
  //       "fill-color": {
  //         property: 'type_zone',
  //         stops: [
  //           [2, '#E30613'],
  //           [4, "#BF89BC"],
  //           [7, "#63C2CD"],
  //           [8, "#282E6A"],
  //           [9, "#E34A5E"],
  //           [18, "#294D9D"],
  //           [25, '#646363'],
  //           [29, '#A8D098'],
  //           [30, '#FFED00'],
  //         ]
  //       },
  //       'fill-opacity': .7  
  //   },
  //   layout: {
  //     "fill-sort-key": -999
  //   }
  // };

  // const grassLayer = {
  //   id: 'grass',
  //   type: 'fill',
  //   source: 'grass',
  //   'source-layer': 'grass-3r2skr',
  //   paint: {
  //       "fill-color": {
  //         property: 'type_zone',
  //         stops: [
  //           [2, '#E30613'],
  //           [4, "#BF89BC"],
  //           [7, "#63C2CD"],
  //           [8, "#282E6A"],
  //           [9, "#E34A5E"],
  //           [18, "#294D9D"],
  //           [25, '#646363'],
  //           [29, '#A8D098'],
  //           [30, '#FFED00'],
  //         ]
  //       },
  //       'fill-opacity': .7  
  //   },
  //   layout: {
  //     "fill-sort-key": -999
  //   }
  // };
  

  return (
    <>
        <MapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/asitnikov/ckvyscss85uk114nm5zubf9i4"
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={setViewport}
            onClick={clickHandler}
            ref={mapRef}
        >
            <Source {...geoserverSource}>
              <Layer {...geoserverLayer} />
            </Source>
        </MapGL>
    </>
  );
}