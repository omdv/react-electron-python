// import { bindActionCreators, Dispatch } from 'redux';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PythonCounter from '../components/PythonCounter';
import { pythonIncrement, pythonDecrement } from '../actions/pythonCounter';
import { CounterStateType } from '../types';

function mapStateToProps(state: CounterStateType) {
  return {
    counter: state.pythonCounter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      pythonIncrement,
      pythonDecrement
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PythonCounter);
