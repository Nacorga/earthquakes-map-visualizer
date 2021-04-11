import './map-view.scss';
import MapComponent from '../../components/map/map.component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { IState } from '../../interfaces/state.interface';

const MapView = ({ earthquake, earthquakesList }: IState) => {
  return (
    <div className="map-view">
      {earthquakesList.isLoading || (earthquake.isLoading && earthquakesList.list.length === 0) ? (
        <div className="spinner-wrapper">
          <CircularProgress size={120} />
        </div>
      ) : (
        <MapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=es`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          earthquake={earthquake.detail}
          points={earthquakesList.list}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: IState): IState => {
  return state;
};

export default connect(mapStateToProps)(MapView);
