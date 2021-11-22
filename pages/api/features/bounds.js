// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import * as turf from '@turf/turf';

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const { ids } = req.body;
        const ps = [];

        ids.forEach(id => {
            
            ps.push(new Promise(async (resolve, reject) => {
                const data = await axios.get(`https://brainpain.ru/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeName=krasnodar:Street&featureID=Street.${id}&outputFormat=json`).then((response) => {
                    if(response) {
                        resolve(response.data);
                    } else {
                        reject('Ошибка загрузки bbox');
                    }
                })
            }))

        });

        Promise.all(ps).then(result => {

            const bbox1 = result[0].features[0].bbox;
            const bbox2 = result[1].features[0].bbox;
            
            // const bbox = turf.bbox(turf.bboxPolygon(bbox1).combine(turf.bboxPolygon(bbox2)));
            console.log(turf.bbox(turf.union(turf.bboxPolygon(bbox1), turf.bboxPolygon(bbox2))))

            
            // const poly1 = result[0]
            // 

        })

        // res.send(ids);

    }

    // var resBbox = ;

    // const ps = 

    // Promise.all()
  
    

    // await fetch(`https://brainpain.ru/
    //     geoserver/wfs
    //     ?service=wfs
    //     &version=1.1.0
    //     &request=GetFeature
    //     &typeName=krasnodar:Street
    //     &featureID=${id}`, {
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     }).then((res) => {
    //         if(res.ok) { return res.json(); }
    //     }).then((data) => {
    //         res.status(200).json(data)
    //     })
    

}

// https://brainpain.ru/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeName=krasnodar:Street&featureID=Street.13941&outputFormat=json