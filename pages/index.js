import { useEffect, useState } from 'react';
import MapComponent from '../components/map3.js';
import Api from "../components/api.js";
import Info from '../components/info.js';

export default () => {

  const [features, setFeatures] = useState([]);
  const api = new Api();

  // useEffect(async () => {
  //   const fetchedFeatures = await api.getFeatures();
  //   setFeatures(fetchedFeatures);  
  // }, [])
  

  return <>
    <MapComponent features={features} />
  </>

}