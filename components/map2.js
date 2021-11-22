// ES6
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useCallback } from 'react';

export default () => {

    const Map = ReactMapboxGl({
        accessToken: 'pk.eyJ1IjoiYXNpdG5pa292IiwiYSI6ImNrbmUyaWdidTJneHcycXA5c2Q3a201aGsifQ.k6nUY_ib-JKfuhiKnzeAIg'
      });

    const [pattern, setPattern] = useState('');
    const [loaded, setLoaded] = useState(false);

    const mapClickHandler = useCallback((e) => {
        setPattern('03 401 ОПН МГ 5728')
    }) 
      
    return(
        <Map
            style="mapbox://styles/asitnikov/ckvsk4dkl14an15o7mzhs5330"
            center={[38.982, 45.054]}
            zoom={[15.13]}
            onStyleLoad={(map) => {
                setLoaded(true);
            }}
            containerStyle={{
                height: '100vh',
                width: '100vw'
            }}
            >

            <Source id="trace" tileJsonSource={{
                type: "vector",
                url: 'mapbox://asitnikov.ay0lkcob'
            }} />
            {
                loaded &&
                <>
                    <Layer onClick={(e) => mapClickHandler(e)} type="fill" id="base" sourceId="trace" sourceLayer="data-57grz2" paint={{
                        'fill-opacity': .2,
                        'fill-color': 'green'
                    }} />
                    <Layer type="fill" id="selected" sourceId="trace" sourceLayer="data-57grz2" filter={['==', 'ID_6993', pattern]} paint={{
                        'fill-opacity': .6,
                        'fill-color': 'yellow'
                    }} />
                </>
            }
        </Map>

    )
    
}


// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useState, useEffect, useRef } from "react";
// import { mapConfig, geoserverLayer } from "../utils/constants.js";
// import Api from './api.js';

// export default (props) => {

//     const [map, setMap] = useState(null);
//     const [filter, setFilter] = useState('');
//     const [loading, setLoading] = useState(true);
//     const mapNode = useRef(null);
//     const api = new Api();
    
//     useEffect(async () => {

//         if(props.features.length === 0) {
//             return;
//         }
    
//         const node = mapNode.current;
//         if (typeof window === "undefined" || node === null) return;
//         const mapboxMap = new mapboxgl.Map({...mapConfig, container: node});
        
//         setMap(mapboxMap);

        

//         return () => { mapboxMap.remove(); };

//     }, [props.features]);

//     if(!map) {
//         return <>
//         <input className="search" placeholder='Поиск' />
//         <div ref={mapNode} style={{ width: "100%", height: "100%" }} />
//         </>;
//     }

//     map.on('load', async (e) => {
        
//         setLoading(false);
        
    
//     })

//     if(filter !== '') {
//         

//         map.addLayer({
//             id: '1234',
//             type: 'fill',
//             'source': 'trace',
//             'source-layer': 'data-57grz2',
//             paint: {
//                 'fill-opacity': 0.5,
//                 'fill-color': 'red'
//             },
//             filter: ['==', 'ID_6993', filter]
//         });
//     }

//     if(!loading) { 
//         map.on('click', 'street', async (e) => {
//             setFilter(e.features[0].properties.ID_6993)
//         })
//         return <>
//         <input className="search" placeholder='Поиск' />
//         <div ref={mapNode} style={{ width: "100%", height: "100%" }} />
//         </>;
//     }
    

//     return <>
//     <input className="search" placeholder='Поиск' />
//     <div ref={mapNode} style={{ width: "100%", height: "100%" }} />
//     </>;

// }