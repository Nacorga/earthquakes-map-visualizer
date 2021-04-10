import './detail-view.scss';
import { IEarthquakeMapTo } from '../../interfaces/earthquake.interface';
import Moment from 'react-moment';
import CircularProgress from '@material-ui/core/CircularProgress';

const DetailView = ({
  loading,
  earthquakeDetails,
}: {
  loading: boolean;
  earthquakeDetails: IEarthquakeMapTo | null;
}) => (
  <div className="detail-view">
    {loading ? (
      <div className="detail-view__row">
        <CircularProgress></CircularProgress>
        <span className="ml-2">Loading details...</span>
      </div>
    ) : (
      <>
        {earthquakeDetails ? (
          <>
            <div className="detail-view__row header">
              <h2 className="title">{earthquakeDetails.id}</h2>
              <h3 className="subtitle">{earthquakeDetails.title}</h3>
            </div>
            <div className="detail-view__row">
              <div className="detail-view__row-col">
                <span>
                  <b>Location</b>: {earthquakeDetails.location}
                </span>
              </div>
              <div className="detail-view__row-col">
                <span>
                  <b>Date</b>: <Moment format="YYYY/MM/DD">{new Date(earthquakeDetails.date).toString()}</Moment>
                </span>
              </div>
              <div className="detail-view__row-col">
                <span>
                  <b>Type</b>: {earthquakeDetails.type}
                </span>
              </div>
              <div className="detail-view__row-col">
                <span>
                  <b>Magnitude</b>: {earthquakeDetails.magnitude}
                </span>
              </div>
              <div className="detail-view__row-col">
                <span>
                  <b>State</b>: {earthquakeDetails.state}
                </span>
              </div>
            </div>
          </>
        ) : (
          <span>No data</span>
        )}
      </>
    )}
  </div>
);

export default DetailView;
