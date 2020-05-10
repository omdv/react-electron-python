// import { Request } from 'zeromq';
import {
  // Dispatch,
  // GetState,
  // StateType,
  pythonActionType,
  // PYTHON_REQUEST,
  // PYTHON_SUCCESS,
  // PYTHON_FAILURE,
  // PYTHON_INCREMENT,
  // PYTHON_DECREMENT,
  // AppThunk,
  PYTHON_INCREMENT,
  PYTHON_DECREMENT
} from '../types';

export function pythonIncrement(): pythonActionType {
  return {
    type: PYTHON_INCREMENT
  };
}

export function pythonDecrement(): pythonActionType {
  return {
    type: PYTHON_DECREMENT
  };
}
