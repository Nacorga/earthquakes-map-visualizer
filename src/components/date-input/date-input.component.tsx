import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface IDateInputProps {
  id: string;
  label: string;
  value: Date | null;
  onDateChange(date: Date): void;
}

const MaterialUIPicker = (props: IDateInputProps) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      props.onDateChange(date);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        id={props.id}
        label={props.label}
        format="MM/dd/yyyy"
        value={props.value}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MaterialUIPicker;
