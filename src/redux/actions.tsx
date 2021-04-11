import { IEarthquake } from '../interfaces/earthquake.interface';
import { IMapPoint } from '../interfaces/map-point.interface';
import { ACTIONS } from './constants';

export const earthquakeLoaderToggle = (data: boolean) => {
  return { type: ACTIONS.EARTHQUAKE_LOADER_TOGGLE, data };
};

export const setEarthquake = (data: IEarthquake | null) => {
  return { type: ACTIONS.SET_EARTHQUAKE, data };
};

export const earthquakesListLoaderToggle = (data: boolean) => {
  return { type: ACTIONS.EARTHQUAKES_LIST_LOADER_TOGGLE, data };
};

export const setEarthquakesList = (data: IMapPoint[]) => {
  return { type: ACTIONS.SET_EARTHQUAKES_LIST, data };
};
