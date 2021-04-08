import 'date-fns';
import { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface IDateInputProps {
  id: string;
  label: string;
  value: Date | null;
  onDateChange(date: Date): void;
}

const MaterialUIPicker = (props: IDateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(props.value);

  useEffect(() => {
    if (selectedDate) {
      props.onDateChange(selectedDate);
    }
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id={props.id}
          label={props.label}
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPicker;