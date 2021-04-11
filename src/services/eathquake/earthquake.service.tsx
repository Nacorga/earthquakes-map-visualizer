import { ISelectedDates, ISelectedDatesMapTo } from '../../interfaces/selected-dates.interface';

const BASE_API_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

export const filterEarthquakes = async (selectedDates: ISelectedDates): Promise<any> => {
  const datesQueryParams = selectedDatesMapper(selectedDates);
  let url = `${BASE_API_URL}&starttime=${datesQueryParams.starttime}`;

  if (datesQueryParams.endtime) {
    url = url.concat(`&endtime=${datesQueryParams.endtime}`);
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

export const findEarthquake = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`${BASE_API_URL}&eventid=${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const selectedDatesMapper = (dates: ISelectedDates): ISelectedDatesMapTo => {
  return {
    starttime: dates.starttime ? dateParser(dates.starttime) : null,
    endtime: dates.endtime ? dateParser(dates.endtime) : null,
  };
};

const dateParser = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
