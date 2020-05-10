import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type pythonCounterType = {
  isFetching: boolean;
  value: number;
  error: boolean;
};

export type counterStateType = {
  counter: number;
  pythonCounter: pythonCounterType;
};

export const PYTHON_INCREMENT = 'PYTHON_INCREMENT';
export const PYTHON_DECREMENT = 'PYTHON_DECREMENT';
export const PYTHON_BACKEND_REQUEST = 'PYTHON_BACKEND_REQUEST';
export const PYTHON_BACKEND_SUCCESS = 'PYTHON_BACKEND_SUCCESS';
export const PYTHON_BACKEND_FAILURE = 'PYTHON_BACKEND_FAILURE';

interface PythonIncrementAction {
  type: typeof PYTHON_INCREMENT;
}

interface PythonDecrementAction {
  type: typeof PYTHON_DECREMENT;
}

interface PythonBackendRequestAction {
  type: typeof PYTHON_BACKEND_REQUEST;
  payload: string;
}

interface PythonBackendSuccessAction {
  type: typeof PYTHON_BACKEND_SUCCESS;
  payload: number;
}

interface PythonBackendFailureAction {
  type: typeof PYTHON_BACKEND_FAILURE;
  payload: string;
}

export type pythonActionType =
  | PythonIncrementAction
  | PythonDecrementAction
  | PythonBackendRequestAction
  | PythonBackendSuccessAction
  | PythonBackendFailureAction;

export type GetState = () => counterStateType;
export type Dispatch = ReduxDispatch<Action<string>>;
export type Store = ReduxStore<counterStateType, Action<string>>;
