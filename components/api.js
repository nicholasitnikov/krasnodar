
import axios from "axios";

export default class Api {
    
    getFeatures() {
        return new Promise((resolve, reject) => {
            fetch('/api/features')
            .then((res) => { if(res.ok) { return res.json() } else { reject('Ошибка загрузки данных...') } })
            .then((data) => {
                resolve(data);
            })
        })
    }

    getBounds(ids) {
        return new Promise((resolve, reject) => {
            axios.post('/api/features/bounds', { ids }).then(data => {
                resolve(data);
            }).catch(() => {
                reject('Ошибка загрузки данных...')
            })
        })
    }

}