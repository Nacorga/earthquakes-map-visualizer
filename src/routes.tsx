import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import App from './App';

const Routes = () => (
  <Router>
    <Route path="/earthquakes-map-visualizer" component={App} />
    <Route exact path="/">
      <Redirect to="/earthquakes-map-visualizer" />
    </Route>
  </Router>
);

export default Routes;
