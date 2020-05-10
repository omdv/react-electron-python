import {
  pythonCounterType,
  pythonActionType,
  PYTHON_INCREMENT,
  PYTHON_DECREMENT,
  PYTHON_BACKEND_REQUEST,
  PYTHON_BACKEND_SUCCESS,
  PYTHON_BACKEND_FAILURE
} from '../types';

const initialState: pythonCounterType = {
  isFetching: false,
  value: 0,
  error: false
};

export default function pythonCounter(
  state = initialState,
  action: pythonActionType
) {
  switch (action.type) {
    case PYTHON_INCREMENT:
      return {
        ...state,
        value: state.value + 1
      };
    case PYTHON_DECREMENT:
      return {
        ...state,
        value: state.value - 1
      };
    case PYTHON_BACKEND_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case PYTHON_BACKEND_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        value: action.payload
      };
    case PYTHON_BACKEND_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}
