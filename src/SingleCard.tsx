import cx from "classnames";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Card, Suit } from "./types";
import { Clover, Diamond, Heart, Spade } from "./assets";
import styles from "./styles/SingleCard.module.scss";

interface SingleCardProps extends Card {
  index: number;
  isGameOver: boolean;
  className?: string;
  style?: Record<string, string>;
}

const convertValue = (value: string) => {
  switch (value) {
    case "QUEEN":
      return "Q";
    case "KING":
      return "K";
    case "JACK":
      return "J";
    case "ACE":
      return "A";
    default:
      return value;
  }
};

/**
 * Component for rendering the cards.
 *
 * @component
 * @example
 * const index = 0;
 * const isGameOver = false;
 * const card = {
 *    value: 'QUEEN',
 *    suit: 'CLUBS'
 * };
 * return (
 *   <SingleCard index={index} isGameOver={isGameOver} {...card} />
 * )
 */
export const SingleCard: FunctionComponent<SingleCardProps> = ({
  className = "",
  value,
  suit,
  style = {},
  index,
  isGameOver,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const sizeChecker = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", sizeChecker);
    return () => window.removeEventListener("resize", sizeChecker);
  }, []);

  const suitType = (type: string, props = {}) => {
    switch (type) {
      case Suit.Clubs:
        return <Clover {...props} />;
      case Suit.Diamonds:
        return <Diamond {...props} />;
      case Suit.Hearts:
        return <Heart {...props} />;
      case Suit.Spades:
        return <Spade {...props} />;
      default:
        return null;
    }
  };

  return (
    <div
      data-testid="single-card"
      style={style}
      className={cx(
        styles.main,
        `animate__animated animate__delay-${index + 1}s`,
        { animate__bounceInLeft: isMobile },
        { [styles[`card-${index}`]]: !isMobile && !isGameOver },
        { [className]: !!className },
        { [styles.clubs]: suit === Suit.Clubs },
        { [styles.spades]: suit === Suit.Spades },
        { [styles.diamonds]: suit === Suit.Diamonds },
        { [styles.hearts]: suit === Suit.Hearts }
      )}
    >
      <p>{convertValue(value)}</p>
      {suitType(suit)}
      {suitType(suit, { className: styles.enlarge })}
    </div>
  );
};
