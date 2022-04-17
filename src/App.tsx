import axios from 'axios';
import cx from 'classnames';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Counter } from './Counter';
import { SingleCard } from './SingleCard';
import { loadingGif, Winner } from './assets';
import styles from './styles/App.module.scss';
import { APIResponse, Card } from './types';

/**
 * Component that contains the core logic of the game.
 *
 * @component
 */

export const App: FunctionComponent = () => {
  const [totalCount, setTotalCount] = useState(52);
  const [aceCount, setAceCount] = useState(4);
  const [drawnCards, setDrawnCards] = useState<Array<Card>>([]);
  const [deckId, setDeckId] = useState('new');
  const [loading, setLoading] = useState(false);
  const [isWinner, setWinner] = useState(false);
  const [isGameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (totalCount === 2 && aceCount >= 1) {
      setGameOver(true);
      setWinner(true);
    } else if (aceCount === 0) {
      setGameOver(true);
      setWinner(false);
    }
  }, [totalCount, aceCount]);

  const drawCards = async ({ count = 5, reset = false }: { count?: number; reset?: boolean }) => {
    let id = deckId;

    if (reset) {
      setGameOver(false);
      setWinner(false);
      setAceCount(4);
      setTotalCount(52);
      id = 'new';
    }

    setLoading(true);

    const {
      data: { cards, deck_id, remaining },
    }: { data: APIResponse } = await axios.get(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`
    );

    setLoading(false);

    if (deckId !== deck_id) {
      setDeckId(deck_id);
    }

    cards.forEach((card: Card) => {
      if (card.value === 'ACE') {
        setAceCount((prevCount) => prevCount - 1);
      }
    });

    setTotalCount(remaining);
    setDrawnCards(cards);
  };

  return (
    <div className={cx(styles.main, 'flex flex-col justify-center items-center')}>
      <div className="flex flex-col align-center relative">
        <div className="flex flex-wrap justify-center text-white">
          <Counter count={totalCount} text="Cards Left" />
          <Counter count={aceCount} text="Aces Left" />
        </div>
        {isWinner && (
          <Winner
            data-testid="winBanner"
            className={cx(styles.winBanner, 'animate__animated animate__fadeInDown')}
          />
        )}
      </div>
      <div className={cx(styles.cards, 'flex flex-wrap justify-center my-20')}>
        <>
          {loading ? (
            <img data-testid="loading-spinner" src={loadingGif} alt="loading" />
          ) : (
            drawnCards?.map((card, index) => (
              <SingleCard index={index} isGameOver={isGameOver} key={card.code} {...card} />
            ))
          )}
        </>
      </div>
      {isGameOver && !isWinner && (
        <p className="text-2xl lg:text-4xl text-white text-center">
          You lose. <br /> Better luck next time!
        </p>
      )}
      <div className={styles.buttons}>
        {!isGameOver && (
          <button
            data-testid="draw-button"
            disabled={loading}
            onClick={() => drawCards({})}
            type="button"
            className={cx(
              'animate__animated',
              { animate__bounce: !loading },
              { [styles.isDisabled]: loading },
              styles.dealButton
            )}
          >
            Deal
          </button>
        )}
        <button
          data-testid="reset-button"
          disabled={loading}
          onClick={() => drawCards({ reset: true })}
          type="button"
          className={cx(
            { [styles.isDisabled]: loading },
            { [styles.resetButton]: !isGameOver },
            { [styles.playAgainButton]: isGameOver }
          )}
        >
          {isGameOver ? 'Play Again ' : 'Reset'}
        </button>
      </div>
    </div>
  );
};
