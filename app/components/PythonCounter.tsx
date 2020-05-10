import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes.json';
import { pythonCounterType } from '../types';

type Props = {
  counter: pythonCounterType;
  pythonIncrement: () => void;
  pythonDecrement: () => void;
};

export default function PythonCounter(props: Props) {
  const { counter, pythonIncrement, pythonDecrement } = props;

  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={`counter ${styles.counter}`} data-tid="counter">
        {counter.value}
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={pythonIncrement}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-plus" />
        </button>
        <button
          className={styles.btn}
          onClick={pythonDecrement}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-minus" />
        </button>
      </div>
    </div>
  );
}
