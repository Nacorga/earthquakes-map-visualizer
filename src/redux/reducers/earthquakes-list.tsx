import { IEarthquakesListState } from '../../interfaces/state.interface';
import { ACTIONS } from '../constants';

const initialState: IEarthquakesListState = {
  isLoading: false,
  list: [],
};

const earthquakesListReducer = (state = initialState, action: { type: ACTIONS; data: any }): IEarthquakesListState => {
  switch (action.type) {
    case ACTIONS.EARTHQUAKES_LIST_LOADER_TOGGLE:
      return Object.assign({}, state, { isLoading: action.data });
    case ACTIONS.SET_EARTHQUAKES_LIST:
      return Object.assign({}, state, { list: action.data });
    default:
      return state;
  }
};

export default earthquakesListReducer;
