import React from "react";
import styles from "./Card.module.css";
function Card({ card, onDeleteCardClick, listId, onDragStart }) {
  const handleDragStart = () => {
    onDragStart({ card, removingFromListId: listId });
  };
  const handleDragEnd = () => {};

  return (
    <div
      className={styles.cardContainer}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.cardHead}>
        <div>{card.cardTitle}</div>
        <i className="fas fa-times" onClick={() => onDeleteCardClick(card)}></i>
      </div>
      <div>{card.cardDesc}</div>
    </div>
  );
}
export default Card;
