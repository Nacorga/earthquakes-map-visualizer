import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
interface IDateInputProps {
  id: string;
  label: string;
  value: Date | null;
  disabled: boolean;
  minDate?: Date | null;
  maxDate: Date;
  onDateChange(date: Date | null): void;
}

const MaterialUIPicker = (props: IDateInputProps) => {
  const handleDateChange = (date: Date | null) => {
    props.onDateChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        id={props.id}
        label={props.label}
        format="MM/dd/yyyy"
        value={props.value}
        disabled={props.disabled}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MaterialUIPicker;
