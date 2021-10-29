import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; 
// импортируем стили mapbox-gl чтобы карта отображалась коррекно

function MapboxMap() {
  const [map, setMap] = useState();
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;
    
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: 'pk.eyJ1IjoiYXNpdG5pa292IiwiYSI6ImNrbmUyaWdidTJneHcycXA5c2Q3a201aGsifQ.k6nUY_ib-JKfuhiKnzeAIg',
      style: "mapbox://styles/asitnikov/ckvc0uptq17ev16s5ig8wq4cd",
      center: [38.991836, 45.073744],
      zoom: 12,
    });

    setMap(mapboxMap);

    mapboxMap.on('load', function() {
      mapboxMap.addLayer({
          "id": "str",
          "type": "fill",
          "source": {
              "type": "vector",
              "scheme": "tms",
              // http://62.84.119.249:8080/geoserver/krasnodar/wms?service=WMS&version=1.1.0&request=GetMap&layers=krasnodar%3Astr&bbox=38.759880065918%2C44.9751434326172%2C39.3837203979492%2C45.1954498291016&width=768&height=330&srs=EPSG%3A4326&styles=&format=application%2Fvnd.mapbox-vector-tile
              "tiles": ["http://62.84.119.249:8080/geoserver/gwc/service/tms/1.0.0/krasnodar:str@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"],
              "minzoom": 0,
              "maxzoom": 14
          },
          "source-layer": "str",
          "paint": {
              "fill-opacity": 0.6,
              "fill-color": "rgb(53, 175, 109)",
              'fill-outline-color': 'white'
          }
      });
    });

    return () => {
      mapboxMap.remove();
    };
  }, []);

    return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap