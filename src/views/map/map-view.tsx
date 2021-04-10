import './map-view.scss';
import MapComponent from "../../components/map/map.component";
import { IMapPoint } from "../../interfaces/map-point.interface";
import CircularProgress from '@material-ui/core/CircularProgress';

const MapView = (props: {points: IMapPoint[] | null}) => {

  return (
    <div className="map-view">
      {
        props.points ? 
        <MapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=es`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          points={props.points as IMapPoint[]}/> :
        <CircularProgress />
      }
    </div>
  );
}

export default MapView;
