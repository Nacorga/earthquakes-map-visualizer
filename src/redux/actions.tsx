import { IEarthquake } from '../interfaces/earthquake.interface';
import { ACTIONS } from './constants';

export const loaderToggle = (data: boolean) => {
  return { type: ACTIONS.LOADER_TOGGLE, data };
};

export const setEarthquake = (data: IEarthquake | null) => {
  return { type: ACTIONS.SET_EARTHQUAKE, data };
};
