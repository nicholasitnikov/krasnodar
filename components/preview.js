import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './document.js';

export default function Preview(props) {
    return <PDFViewer style={{frameBorder:"0"}} className="preview">
        <MyDocument key={1} selectedFeatures={props.selectedFeatures} />
    </PDFViewer>
}