import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

// Create styles
const styles = StyleSheet.create({
  page: {
    background: 'white',
    padding: '30px 40px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#E4E4E4',
    fontFamily: "Roboto",
    fontWeight: 300
  },
  section: {
    padding: '20px 0 0',
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTop: {
    padding: '20px 0',
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center'
  },
  heading: {
    padding: '0 30px 30px',
    fontSize: '32px',
    width: '450px',
    textAlign: 'center'
  },
  subheading: {
    padding: '0 30px 100px',
    fontSize: '28px',
    width: '450px',
    marginTop: '30px',
    textAlign: 'center'
  },
  textvalue: {
    width: '100%',
    padding: '15px 30px',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #ccc'
  },
  textShort: {
    maxWidth: '50%',
    fontSize: '14px',
    fontWeight: '300'
  },
  textShortRight: {
    textAlign: 'right',
    maxWidth: '50%',
    fontSize: '14px',
    fontWeight: '300'
  },
  table: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  wideCall: {
    textAlign: 'center',
    fontSize: '12px',
    width: '50%',
    padding: '10px 5px',
    border: '1px solid #ccc',
  },
  mediumCall: {
    textAlign: 'center',
    fontSize: '12px',
    width: '50%',
    padding: '10px 5px',
    border: '1px solid #ccc'
  },
  smallCall: {
    textAlign: 'center',
    fontSize: '12px',
    width: '25%',
    padding: '10px 5px',
    border: '1px solid #ccc'
  },
  offset1: {
    width: '200px',
    height: '180px'
  },
  offset2: {
    width: '200px',
    height: '400px'
  }

});

// Create Document Component
export default function MyDocument(props) {

    const renderProperties = () => {

      const firstProps = props.selectedFeatures.find(el => el.properties.type_zone === 2).properties

      const data = {
        'Наименование': 'ул. им. Гаврилова П.М.',
        'Населенный пункт': 'Город Краснодар',
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
            return <View style={styles.textvalue}>
            <Text style={styles.textShort}>{key}</Text>
            <Text style={styles.textShortRight}>{value}</Text>
          </View>
        })
    }

    const renderTypes = () => {

      const data = {
        'Проезжая часть': props.selectedFeatures.filter(el => el.properties.type_zone === 2).reduce((res, current) => { 
          res += parseInt(current.properties.area); return res; 
      }, 0) + ' м²',
      'Газон': props.selectedFeatures.filter(el => el.properties.type_zone === 30).reduce((res, current) => { 
        res += parseInt(current.properties.area); return res; 
      }, 0) + ' м²',
      'Газон': props.selectedFeatures.filter(el => el.properties.type_zone === 29).reduce((res, current) => { 
        res += parseInt(current.properties.area); return res; 
      }, 0) + ' м²',
      'Обособленые парковки': props.selectedFeatures.filter(el => el.properties.type_zone === 8).reduce((res, current) => { 
          res += parseInt(current.properties.area); return res; 
      }, 0) + ' м²',
      'Открытые заездные карманы': props.selectedFeatures.filter(el => el.properties.type_zone === 7).reduce((res, current) => { 
        res += parseInt(current.properties.area); return res; 
      }, 0) + ' м²',
      'Разделительные полосы': props.selectedFeatures.filter(el => el.properties.type_zone === 4).reduce((res, current) => { 
        res += parseInt(current.properties.area); return res; 
      }, 0) + ' м²',
        
      }

        return Object.entries(data).map(([key,value]) => {
            return <View style={styles.textvalue}>
            <Text style={styles.textShort}>{key}</Text>
            <Text style={styles.textShortRight}>{value}</Text>
          </View>
        })
    }

    const renderFooter = (name, page, pages) => {
      return <View style={styles.footer}><View style={styles.table}>
          <Text style={styles.wideCall}>Карта-схема санитарного содержания МО г. Краснодар улица им. Кирова</Text>
          <Text style={styles.smallCall}>Лист: {page}</Text>
          <Text style={styles.smallCall}>Листов: {pages}</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.wideCall}>{name}</Text>
          <Text style={styles.mediumCall}>Демо режим</Text>
        </View>
      </View>
    }

  return(   
    <Document key={1}>
        <Page key={1} size="A4" style={styles.page}>
          <View style={styles.section}>
          <Text style={styles.author}>Демо-версия</Text>
          <Text style={styles.heading}>Карта-схема санитарного содержания муниципального образования г. Краснодар</Text>
          <Text style={styles.subheading}>ул. им. Гаврилова П.М.</Text>
          <View style={styles.textvalue}>
            <Text style={styles.text}>Главный инженер</Text>
            <Text style={styles.text}>ФИО</Text>
          </View>
          <Text style={styles.author}>АО «Геометрика» 2018 г</Text>
          </View>
        </Page>
        <Page key={2} size="A4" style={styles.page}>
          <View style={styles.sectionTop}>
          <Text style={styles.heading}>Общая информация</Text>
          { renderProperties() }
          <View style={styles.offset1}></View>
          { renderFooter('Общая информация', 1, 1) }
          </View>
        </Page>
        <Page key={2} size="A4" style={styles.page}>
          <View style={styles.sectionTop}>
          <Text style={styles.heading}>Экспликация</Text>
          { renderTypes() }
          <View style={styles.offset2}></View>
          { renderFooter('Экспликация', 1, 1) }
          </View>
        </Page>
        <Page key={2} size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src="/full.png"></Image>
          { renderFooter('Схема расположени автомобильной дороги', 1, 1) }
        </View>
        </Page>
        <Page key={2} size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src="/1.png"></Image>
          <View style={styles.offset2}></View>
          { renderFooter('Объекты санитарного содержания', 1, 3) }
        </View>
        </Page>
        <Page key={2} size="A4" style={styles.page}>
        <View style={styles.section}>
        <Image src="/2.png"></Image>
        <View style={styles.offset2}></View>
        { renderFooter('Объекты санитарного содержания', 2, 3) }
        </View>
        </Page>
        <Page key={2} size="A4" style={styles.page}>
        <View style={styles.section}>
        <Image src="/3.png"></Image>
        <View style={styles.offset2}></View>
        { renderFooter('Объекты санитарного содержания', 3, 3) }
        </View>
        </Page>
    </Document>
  )
}