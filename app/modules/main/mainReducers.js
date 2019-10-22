import * as MAIN from './mainConstants';

const mainInitialState = {
  counter: 0,
  action: '',
};

export const mainReducers = (state = mainInitialState, action) => {
  switch (action.type) {
    case MAIN.TAMBAH:
      return {
        counter: state.counter + 1,
        action: action.type,
      };
    case MAIN.KURANG:
      return {
        counter: state.counter - 1,
        action: action.type,
      };
    default:
      return state;
  }
};