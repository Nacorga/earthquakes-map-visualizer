import { IEarthquakeState } from '../../interfaces/state.interface';
import { ACTIONS } from '../constants';

const initialState: IEarthquakeState = {
  isLoading: false,
  detail: null,
};

const earthquakeReduce = (state = initialState, action: { type: ACTIONS; data: any }): IEarthquakeState => {
  switch (action.type) {
    case ACTIONS.LOADER_TOGGLE:
      return Object.assign({}, state, { isLoading: action.data });
    case ACTIONS.SET_EARTHQUAKE:
      return Object.assign({}, state, { detail: action.data });
    default:
      return state;
  }
};

export default earthquakeReduce;
