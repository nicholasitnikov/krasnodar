import ReactPDF from '@react-pdf/renderer';
import { useCallback, useState } from 'react';
import MyDocument from './document.js';

export default function Info(props) {

    const [editMode, setEditMode] = useState(false);

    

    const renderFeatures = () => {

        const firstProps = props.selectedFeatures.find(el => el.properties.type_zone === 2).properties

        const data = {
            'Наименование': 'ул. им. Гаврилова П.М.',
            'Административный округ': firstProps.district,
            'Идентификатор': firstProps.ID_6993,
            'Площадь территории': props.grassIsOpen ? '60287 м²' : '60094 м²',
            'Класс территории': firstProps.class,
            'Протяженность': '1520 м',
            'Протяженность проезжих частей с бордюром': props.selectedFeatures.reduce((res, current) => { 
                res += parseInt(current.properties.len_curb); return res; 
            }, 0) + ' м',
            'Протяженность проезжих частей без бордюров': props.selectedFeatures.reduce((res, current) => { 
                res += parseInt(current.properties.len_nocurb); return res; 
            }, 0) + ' м'
        }

        return Object.entries(data).map(([key,value]) => {
            return <div className="info__item" key={key}><span className='info__text'>{key}</span><h2 className='info__heading'>{value}</h2></div>
        })
    }

    const editPassportHandler = useCallback(() => {
        setEditMode(true);
    })

    const savePassportHandler = useCallback(() => {
        setEditMode(false);
    })

    const renderGrass = () => {
        return <div className="grass">
            <span className="grass__text">Газон</span>
            <span className="grass__text">230 м²</span>
            <button className="grass__delete">Удалить</button>
        </div>
    }

    return props.selectedFeatures.length > 0 ? <>
    <div className="info">
        { editMode ? 
        <>
            <p className="info__caption">В режиме редактирования, вы можете добавлять или удалять объекты из улицы</p>
            { props.grassIsOpen && renderGrass() }
        </> :
        renderFeatures() }
    </div>
    <button className="passports-button" onClick={props.createPassportHandler}>Создать паспорт</button>
    { editMode ? 
    <button className="passports-save" onClick={savePassportHandler}></button>
    :
    <button className="passports-edit" onClick={editPassportHandler}></button> }
    </> : '';

}