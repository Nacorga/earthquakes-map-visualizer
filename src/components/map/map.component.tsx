import React, {useEffect, useRef, useState} from 'react';
import { IMapPoint } from '../../interfaces/map-point.interface';
import { findEarthquake } from '../../services/eathquake/earthquake.service';
import './map.component.scss';

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Map = (props: {points: IMapPoint[]}) => {

  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleMap>();
  const [markers, setMarkers] = useState<GoogleMarker[]>([]);

  const startMap = (): void => {

    const gmPoints = props.points.map((elem) => ({
      ...elem, coords: getLatLngPoint(elem)
    }));;

    const bounds = new google.maps.LatLngBounds();

    gmPoints.forEach((elem) => {
      bounds.extend(elem.coords);
    });

    map ? map.fitBounds(bounds) : defaultMapStart(bounds);

    setMarkers(gmPoints.map((elem) => addMarker(elem.id, elem.place, elem.coords)));

  };

  const getLatLngPoint = (elem: IMapPoint): google.maps.LatLng => {
    return new google.maps.LatLng(elem.coords.lat, elem.coords.lng);
  }
    
  useEffect(startMap, [map]);

  const defaultMapStart = (bounds: google.maps.LatLngBounds): void => {
    initMap(4, bounds.getCenter());
  };

  const addMarker = (id: string, place: string, location: GoogleLatLng): GoogleMarker => {

    const marker: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: getIconAttributes('#000000'),
      animation: 2,
    });

    marker.set("metadata", {id, place});

    marker.addListener("click", () => {

      (map as GoogleMap).setZoom(8);
      (map as GoogleMap).setCenter(marker.getPosition() as google.maps.LatLng);

      const setterMarker = (marker as GoogleMarker & {metadata: {id: string, place: string}})

      const markerId = setterMarker.metadata.id;
      const markerPlace = setterMarker.metadata.place;

      const infowindow = new google.maps.InfoWindow({
        content: InfowindowContent(markerId, markerPlace) as string
      });

      infowindow.open(map, marker);

    });

    return marker;

  };

  const getEarthquakeDetails = async (id: string) => {
    const earthquakeDetail = await findEarthquake(id);
    console.log(earthquakeDetail);
  }

  const getIconAttributes = (iconColor: string) => {
    return {
      path: 'M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z',
      fillColor: iconColor,
      fillOpacity: 0.8,
      strokeColor: 'pink',
      strokeWeight: 2,
      anchor: new google.maps.Point(30, 50)
    };
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: true,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          draggableCursor: 'pointer',
        })
      );
    }
  };

  return (
    <div className="map-container">
      <div ref={ref} className="map-container__map"></div>
    </div>
  );
};

const InfowindowContent = (id: string, label: string): string => {
  return `
    <h4>${id}</h4>
    <p>${label}</p>
  `;
};



export default Map;