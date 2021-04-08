import { ISelectedDates, ISelectedDatesMapTo } from "../../interfaces/selected-dates.interface";

const BASE_API_URL = "https://earthquake.usgs.gov";

export const filterEarthquakes = async (selectedDates: ISelectedDates): Promise<any> => {

  const datesQueryParams = selectedDatesMapper(selectedDates);
  let url = `${BASE_API_URL}/fdsnws/event/1/query?format=geojson&starttime=${datesQueryParams.starttime}`;

  if (datesQueryParams.endtime) {
    url = url.concat(`&endtime=${datesQueryParams.endtime}`);
  }

  try {

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return Promise.resolve(data);

  } catch(err) {
    console.error(err);
    return Promise.reject(err);
  }

}

const selectedDatesMapper = (dates: ISelectedDates): ISelectedDatesMapTo => {
  return { starttime: dateParser(dates.starttime), endtime: dates.endtime ? dateParser(dates.endtime) : null};
}

const dateParser = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`