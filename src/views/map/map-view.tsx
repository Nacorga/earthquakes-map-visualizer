import './map-view.scss';
import MapComponent from "../../components/map/map.component";
import { useEffect, useState } from 'react';
import { loadMapApi } from "../../utils/GoogleMapsUtils";
import { IMapPoint } from "../../interfaces/map-point.interface";
import CircularProgress from '@material-ui/core/CircularProgress';

const MapView = (props: {points: IMapPoint[] | null}) => {

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <div className="map-view">
      {
        props.points &&  scriptLoaded ? <MapComponent points={props.points as IMapPoint[]}/> : <CircularProgress />
      }
    </div>
  );
}

export default MapView;
