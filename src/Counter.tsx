import React, { FunctionComponent } from 'react';
import styles from './styles/Counter.module.scss';

interface CounterProps {
  count: number;
  text: string;
}

/**
 * Component for rendering the counters.
 *
 * @component
 * @example
 * const count = 52;
 * const text = 'Cards Left';
 * return (
 *   <Counter count={count} text={text} />
 * )
 */
export const Counter: FunctionComponent<CounterProps> = ({ count, text }) => {
  return (
    <div data-testid="counter" className={styles.counter}>
      <p className="text-5xl">{count}</p>
      <p className="text-xl">{text}</p>
    </div>
  );
};
