import { useState, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import InfoWindow from 'react-google-maps/lib/components/InfoWindow';
import { IMapPoint } from "../../interfaces/map-point.interface";
import { findEarthquake } from '../../services/eathquake/earthquake.service';
import store from '../../redux/store';
import { loaderToggle, setEarthquake } from '../../redux/actions';

const MapComponent = withScriptjs(withGoogleMap((props: any) => {

  const points: IMapPoint[] = props.points;

  const [map, setMap] = useState<GoogleMap | null>(null);

  const startMap = (): void => {
    if (map) {
      const gmPoints = points.map((elem) => getLatLngPoint(elem));
      const bounds = new google.maps.LatLngBounds();
      gmPoints.forEach((elem) => {
        bounds.extend(elem);
      });
      map.fitBounds(bounds);
    }
  };

  const getLatLngPoint = (elem: IMapPoint): google.maps.LatLng => {
    return new google.maps.LatLng(elem.coords.lat, elem.coords.lng);
  }
    
  useEffect(startMap, [map]);

  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState<string | null>(null);

  const openToggle = (id: string) => {
    setOpenInfoWindowMarkerId(openInfoWindowMarkerId && openInfoWindowMarkerId === id ? null : id);
  };

  const getEarthquakeDetails = async (id: string) => {
    store.dispatch(loaderToggle(true));
    const earthquake = await findEarthquake(id);
    store.dispatch(setEarthquake(earthquake));
    store.dispatch(loaderToggle(false));
  }

  const gmMap = () => {
    return (
      <GoogleMap
        ref={(ref) => { setMap(ref as GoogleMap); }}
        options={{streetViewControl: false, mapTypeControl: false, fullscreenControl: false}}>
        <MarkerClusterer
          onClick={props.onMarkerClustererClick}
          averageCenter
          enableRetinaIcons
          gridSize={60}>
          {points.map((marker: IMapPoint) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.coords.lat, lng: marker.coords.lng }}
              onClick={() => openToggle(marker.id)}>
                {openInfoWindowMarkerId === marker.id && <InfoWindow
                  onCloseClick={() => setOpenInfoWindowMarkerId(null)}>
                  <div style={{ padding: `8px` }}>
                    <h4 style={{ fontSize: '20px' }}>{marker.id}</h4>
                    <p style={{ fontSize: '16px' }}>{marker.place}</p>
                    <button style={{
                      color: '#fff',
                      backgroundColor: '#3a86ff',
                      fontSize: '16px',
                      padding: '4px 12px',
                      border: 'none'
                    }} onClick={() => getEarthquakeDetails(marker.id)}>Show details</button>
                  </div>
                </InfoWindow>}
            </Marker>
          ))}
        </MarkerClusterer>
      </GoogleMap>
    )
  }

  return <div className="map-container">{gmMap()}</div>;

}));

export default MapComponent;