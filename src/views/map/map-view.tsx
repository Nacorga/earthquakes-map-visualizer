import './map-view.scss';
import MapComponent from '../../components/map/map.component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { IEarthquakesListState, IState } from '../../interfaces/state.interface';

const MapView = ({ isLoading, list }: IEarthquakesListState) => {
  return (
    <div className="map-view">
      {isLoading ? (
        <div className="spinner-wrapper">
          <CircularProgress size={120} />
        </div>
      ) : (
        <MapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=es`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          points={list}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: IState): IEarthquakesListState => {
  return state.earthquakesList;
};

export default connect(mapStateToProps)(MapView);
