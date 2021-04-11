import { useState, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import InfoWindow from 'react-google-maps/lib/components/InfoWindow';
import { IMapPoint } from '../../interfaces/map-point.interface';
import { findEarthquake } from '../../services/eathquake/earthquake.service';
import store from '../../redux/store';
import { earthquakeLoaderToggle, setEarthquake } from '../../redux/actions';
import { IEarthquake } from '../../interfaces/earthquake.interface';

interface IGmConfig {
  zoom: number;
  center: google.maps.LatLng;
}

const MapComponent = withScriptjs(
  withGoogleMap((props: any) => {
    const earthquake: IEarthquake | null = props.earthquake;
    const points: IMapPoint[] = props.points;

    const [map, setMap] = useState<GoogleMap>();
    const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState<string | null>(null);
    const [queryPoint, setQueryPoint] = useState<IMapPoint>();
    const [gmDefaultConfig, setGmDefaultConfig] = useState<IGmConfig>();

    useEffect(() => {
      if (earthquake) {
        const lng = earthquake.geometry.coordinates[0];
        const lat = earthquake.geometry.coordinates[1];
        setQueryPoint({
          id: earthquake.id,
          place: earthquake.properties.place,
          coords: { lat, lng },
        });
      }
    }, []);

    const startMap = (): void => {
      if (map) {
        if (queryPoint) {
          setGmDefaultConfig({
            zoom: 8,
            center: new google.maps.LatLng(queryPoint.coords.lat, queryPoint.coords.lng),
          });
        } else if (points && points.length > 0) {
          const gmPoints = points.map((elem) => getLatLngPoint(elem));
          const bounds = new google.maps.LatLngBounds();
          gmPoints.forEach((elem) => {
            bounds.extend(elem);
          });
          map.fitBounds(bounds);
        } else {
          setGmDefaultConfig({
            zoom: 2,
            center: new google.maps.LatLng(0, 0),
          });
        }
      }
    };

    const getLatLngPoint = (elem: IMapPoint): google.maps.LatLng => {
      return new google.maps.LatLng(elem.coords.lat, elem.coords.lng);
    };

    useEffect(startMap, [map, points]);

    const openToggle = (id: string) => {
      setOpenInfoWindowMarkerId(openInfoWindowMarkerId && openInfoWindowMarkerId === id ? null : id);
    };

    const getEarthquakeDetails = async (id: string) => {
      store.dispatch(earthquakeLoaderToggle(true));
      const res = await findEarthquake(id);
      store.dispatch(setEarthquake(res));
      store.dispatch(earthquakeLoaderToggle(false));
    };

    const onInfowindowClose = () => {
      setOpenInfoWindowMarkerId(null);
      store.dispatch(setEarthquake(null));
    };

    const markerEl = (marker: IMapPoint) => (
      <Marker
        key={marker.id}
        position={{ lat: marker.coords.lat, lng: marker.coords.lng }}
        onClick={() => openToggle(marker.id)}
      >
        {openInfoWindowMarkerId === marker.id && (
          <InfoWindow onCloseClick={() => onInfowindowClose()}>
            <div style={{ padding: `8px` }}>
              <h4 style={{ fontSize: '20px' }}>{marker.id}</h4>
              <p style={{ fontSize: '16px' }}>{marker.place}</p>
              <button
                style={{
                  color: '#fff',
                  backgroundColor: '#3a86ff',
                  fontSize: '16px',
                  padding: '4px 12px',
                  border: 'none',
                }}
                onClick={() => getEarthquakeDetails(marker.id)}
              >
                Show details
              </button>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );

    return (
      <div className="map-container">
        <GoogleMap
          zoom={gmDefaultConfig?.zoom}
          center={gmDefaultConfig?.center}
          ref={(ref) => {
            setMap(ref as GoogleMap);
          }}
          options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
        >
          {queryPoint || (points && points.length > 0) ? (
            queryPoint ? (
              markerEl(queryPoint)
            ) : (
              <MarkerClusterer onClick={props.onMarkerClustererClick} averageCenter enableRetinaIcons gridSize={60}>
                {points.map((marker: IMapPoint) => markerEl(marker))}
              </MarkerClusterer>
            )
          ) : (
            <></>
          )}
        </GoogleMap>
      </div>
    );
  })
);

export default MapComponent;
