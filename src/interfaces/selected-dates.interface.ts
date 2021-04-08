export interface ISelectedDates {
  starttime: Date;
  endtime: Date | null;
}

export interface ISelectedDatesMapTo {
  starttime: string;
  endtime?: string | null;
}