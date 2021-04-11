import { IEarthquake } from "./earthquake.interface";
import { IMapPoint } from "./map-point.interface";

export interface IState {
    earthquake: IEarthquakeState;
    earthquakesList: IEarthquakesListState;
}

export interface IEarthquakeState {
    isLoading: boolean;
    detail: IEarthquake | null;
}
export interface IEarthquakesListState {
    isLoading: boolean;
    list: IMapPoint[];
}