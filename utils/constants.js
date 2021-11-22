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
          property: 'no',
          stops: [
            [0, '#8A2BE2'],
            [5000, '#7FFF00'],
            [10000, '#DC143C'],
            [15000, '#FF8C00'],
            [20000, '#FF1493'],
            [25000, '#00FA9A'],
            [30000, '#0000FF']
          ]
        },
        'fill-outline-color': 'white'
    }
};