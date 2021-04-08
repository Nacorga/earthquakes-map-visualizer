import './App.scss';
import { Row, Col } from 'react-bootstrap';
import MaterialUIPicker from './components/date-input/date-input.component';
import DetailView from './views/detail/detail-view';
import MapView from './views/map/map-view';

const App = () => {

  const handleInputChange = (field: 'starttime' | 'endtime', date: Date) => {
    console.log(date);
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-navbar">
          <h2 className="app-title">Earthquakes Map Visualizer</h2>
          <div className="date-inputs">
            <div className="date-inputs__elem">
              <MaterialUIPicker
                id="from-date"
                label="From date"
                value={new Date()}
                onDateChange={(date: Date) => handleInputChange('starttime', date)}
              />
            </div>
            <div className="date-inputs__elem">
              <MaterialUIPicker
                id="to-date"
                label="To date"
                value={null}
                onDateChange={(date: Date) => handleInputChange('endtime', date)}
              />
            </div>
          </div>
        </div>
      </header>
      <section className="app-views">
        <Row className="justify-content-center">
          <Col md="6" lg="4">
            <DetailView />
          </Col>
          <Col md="6" lg="8">
            <MapView />
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default App;
