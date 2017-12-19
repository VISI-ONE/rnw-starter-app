import { QR_HIDDEN, QR_VISIBLE, QR_RECEIVED } from '../actions/types';

const initialState = {
  isVisible: false,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QR_HIDDEN:
      return {
        ...state,
        isVisible: false,
      };
    case QR_VISIBLE:
      return {
        ...state,
        isVisible: true,
      };
    case QR_RECEIVED:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
