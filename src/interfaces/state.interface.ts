import { IEarthquake } from "./earthquake.interface";

export interface IState {
    earthquake: IEarthquakeState;
}

export interface IEarthquakeState {
    isLoading: boolean;
    detail: IEarthquake | null;
}