import { useEffect, useState } from 'react';
import MapComponent from '../components/map3.js';
import Api from "../components/api.js";

const Index = () => {

  const [features, setFeatures] = useState([]);
  const api = new Api();

  return <>
    <MapComponent features={features} />
  </>

}

export default Index;