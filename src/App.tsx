import './App.scss';
import MaterialUIPicker from './components/date-input/date-input.component';
import DetailView from './views/detail/detail-view';
import MapView from './views/map/map-view';
import { useState, useEffect } from 'react';
import { filterEarthquakes, findEarthquake } from './services/eathquake/earthquake.service';
import { ISelectedDates } from './interfaces/selected-dates.interface';
import { connect } from 'react-redux';
import { IEarthquake, IEarthquakeMapTo } from './interfaces/earthquake.interface';
import { IState, IEarthquakeState } from './interfaces/state.interface';
import store from './redux/store';
import {
  earthquakeLoaderToggle,
  setEarthquake,
  earthquakesListLoaderToggle,
  setEarthquakesList,
} from './redux/actions';
import { useHistory } from 'react-router-dom';

const APP_TITLE = 'Earthquakes Map Visualizer';

const App = ({ isLoading, detail }: IEarthquakeState) => {
  const [selectedDates, setSelectedDates] = useState<ISelectedDates>({ starttime: null, endtime: null });

  const history = useHistory();

  const checkQuryParams = async () => {
    if (queryparamsEarthquakeId()) {
      store.dispatch(earthquakeLoaderToggle(true));
      const earthquake = await findEarthquake(queryparamsEarthquakeId() as string);
      store.dispatch(setEarthquake(earthquake));
      store.dispatch(earthquakeLoaderToggle(false));
    }
  };

  const queryparamsEarthquakeId = (): string | null => new URLSearchParams(history.location.search).get('id');

  useEffect(() => {
    checkQuryParams();
  }, []);

  useEffect(() => {
    if (detail) {
      history.push(`?id=${detail.id}`);
    }
  }, [detail]);

  const loadFilteredEarthquakes = async () => {
    store.dispatch(earthquakesListLoaderToggle(true));
    const res = await filterEarthquakes(selectedDates);
    store.dispatch(
      setEarthquakesList(
        res.features
          .filter((elem: any) => elem.geometry.type === 'Point')
          .map((elem: any) => ({
            id: elem.id,
            place: elem.properties.place,
            coords: {
              lng: elem.geometry.coordinates[0],
              lat: elem.geometry.coordinates[1],
            },
          }))
      )
    );
    store.dispatch(earthquakesListLoaderToggle(false));
  };

  useEffect(() => {
    if (selectedDates.starttime) {
      loadFilteredEarthquakes();
    }
  }, [selectedDates]);

  const handleInputChange = (field: 'starttime' | 'endtime', date: Date | null) => {
    if (date) {
      store.dispatch(setEarthquake(null));
      setSelectedDates({ ...selectedDates, [field]: date.toString() !== 'Invalid Date' ? date : null });
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-navbar">
          <h2 className="app-title">{APP_TITLE}</h2>
          <div className="date-inputs">
            <div className="date-inputs__elem">
              <MaterialUIPicker
                id="from-date"
                label="From date"
                value={selectedDates.starttime}
                disabled={false}
                maxDate={new Date()}
                onDateChange={(date: Date | null) => handleInputChange('starttime', date)}
              />
            </div>
            <div className="date-inputs__elem">
              <MaterialUIPicker
                id="to-date"
                label="To date"
                value={selectedDates.endtime}
                disabled={!!!selectedDates.starttime}
                minDate={selectedDates.starttime}
                maxDate={new Date()}
                onDateChange={(date: Date | null) => handleInputChange('endtime', date)}
              />
            </div>
          </div>
        </div>
      </header>
      <section className="app__views">
        <div className="app__views-elem map">
          <MapView />
        </div>
        <div className="app__views-elem detail">
          {isLoading || detail ? (
            <DetailView loading={isLoading} earthquakeDetails={detail ? mapEartquake(detail) : null} />
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

const mapEartquake = (earthquake: IEarthquake): IEarthquakeMapTo => ({
  id: earthquake.id,
  location: earthquake.properties.place,
  title: earthquake.properties.title,
  date: earthquake.properties.updated,
  type: earthquake.properties.type,
  magnitude: earthquake.properties.mag,
  state: earthquake.properties.status,
});

const mapStateToProps = (state: IState): IEarthquakeState => {
  return state.earthquake;
};

export default connect(mapStateToProps)(App);
