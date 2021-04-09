import './App.scss';
import MaterialUIPicker from './components/date-input/date-input.component';
import DetailView from './views/detail/detail-view';
import MapView from './views/map/map-view';
import { useState, useEffect } from 'react';
import { filterEarthquakes } from './services/eathquake/earthquake.service';
import { ISelectedDates } from './interfaces/selected-dates.interface';
import { IMapPoint } from './interfaces/map-point.interface';

const APP_TITLE = 'Earthquakes Map Visualizer';

const App = () => {

  const [selectedDates, setSelectedDates] = useState<ISelectedDates>({starttime: new Date(), endtime: null});
  const [earthquakes, setEarthquakes] = useState<IMapPoint[] | null>(null);

  useEffect(() => {
    loadFilteredEarthquakes();
  }, [selectedDates]);

  const loadFilteredEarthquakes = async() => {
    setEarthquakes(null);
    const res = await filterEarthquakes(selectedDates);
    setEarthquakes(res.features
      .filter((elem: any) => elem.geometry.type === 'Point')
      .map((elem: any) => ({
        id: elem.id,
        place: elem.properties.place,
        coords: {
          lng: elem.geometry.coordinates[0],
          lat: elem.geometry.coordinates[1],
        }
      })));
  }

  const handleInputChange = (field: 'starttime' | 'endtime', date: Date) => {
    setSelectedDates({...selectedDates, [field]: date});
  }

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
                onDateChange={(date: Date) => handleInputChange('starttime', date)}
              />
            </div>
            <div className="date-inputs__elem">
              <MaterialUIPicker
                id="to-date"
                label="To date"
                value={selectedDates.endtime}
                onDateChange={(date: Date) => handleInputChange('endtime', date)}
              />
            </div>
          </div>
        </div>
      </header>
      <section className="app__views">
        <div className="app__views-elem map">
          <MapView points={earthquakes}/>
        </div>
        <div className="app__views-elem detail">
          <DetailView />
        </div>
      </section>
    </div>
  );
}

export default App;
