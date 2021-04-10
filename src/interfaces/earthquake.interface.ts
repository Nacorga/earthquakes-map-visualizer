export interface IEarthquake {
    geometry: {
        type: string,
        coordinates: number[],
    };
    id: string;
    properties: IEarthquakeDetail;
    type: string;
}

export interface IEarthquakeDetail {
  alert: any;
  cdi: any;
  code: string;
  dmin: number;
  felt: any;
  gap: number;
  ids: string;
  mag: number;
  magType: string;
  mmi: null;
  net: string;
  nst: number;
  place: string;
  products: any;
  rms: number;
  sig: number;
  sources: string;
  status: string;
  time: number;
  title: string;
  tsunami: number;
  type: string;
  types: string;
  tz: null;
  updated: number;
  url: string;
}

export interface IEarthquakeMapTo {
  id: string;
  location: string;
  title: string;
  date: number;
  type: string;
  magnitude: number;
  state: string;
}