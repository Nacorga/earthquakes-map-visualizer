export interface ISelectedDates {
  starttime: Date | null;
  endtime: Date | null;
}

export interface ISelectedDatesMapTo {
  starttime: string | null;
  endtime?: string | null;
}