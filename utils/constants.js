export const mapConfig = {
    accessToken: 'pk.eyJ1IjoiYXNpdG5pa292IiwiYSI6ImNrbmUyaWdidTJneHcycXA5c2Q3a201aGsifQ.k6nUY_ib-JKfuhiKnzeAIg',
    style: "mapbox://styles/asitnikov/ckvyscss85uk114nm5zubf9i4",
    // center: [38.991836, 45.073744],
    // zoom: 14
    center: [38.982, 45.054],
    zoom: 15.13
}

export const geoserverSource = {
  "type": "vector",
  "scheme": "tms",
  "tiles": ["https://brainpain.ru/geoserver/gwc/service/tms/1.0.0/krasnodar:streets@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"],
  "minzoom": 0,
  "maxzoom": 14
}

export const geoserverLayer = {
    "id": "Street",
    "type": "fill",
    "source-layer": "streets",
    "paint": {
        "fill-opacity": 0.6,
        "fill-color": {
          property: 'id_6993_num',
          stops: [
            [0, '#8A2BE2'],
            [1000, '#7FFF00'],
            [2000, '#DC143C'],
            [3000, '#FF8C00'],
            [4000, '#FF1493'],
            [5000, '#00FA9A'],
            [5965, '#0000FF']
          ]
        },
        'fill-outline-color': 'white'
    }
};