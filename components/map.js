import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useRef } from "react";
import { mapConfig, geoserverLayer } from "../utils/constants.js";
import Api from '../components/api.js';

export default (props) => {

    const [map, setMap] = useState(null);
    const mapNode = useRef(null);
    const api = new Api();
    
    useEffect(async () => {

        if(props.features.length === 0) {
            return;
        }
    
        const node = mapNode.current;
        if (typeof window === "undefined" || node === null) return;
        const mapboxMap = new mapboxgl.Map({...mapConfig, container: node});
        mapboxMap.on('load', function() {
            mapboxMap.addLayer(geoserverLayer);
        });

        setMap(mapboxMap);

        mapboxMap.on('click', 'Street', async (e) => {
            
            const currentId = e.features[0].properties.id_6993;
            const streetFeatures = props.features.filter(el => el.id_6993 === currentId);
            const ids = streetFeatures.map(el => el.idx);
            const bbox = await api.getBounds(ids);
            console.log(bbox)
        
        })

        return () => { mapboxMap.remove(); };

    }, [props.features]);

    return <>
    <input className="search" placeholder='Поиск' />
    <div ref={mapNode} style={{ width: "100%", height: "100%" }} />
    </>;

}