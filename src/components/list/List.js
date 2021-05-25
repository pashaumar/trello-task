import React, { useState } from "react";
import styles from "./List.module.css";
import Portal from "../portal/Portal";
import Card from "../card/Card";
function List({
  list,
  onCardAddClick,
  onDeleteListClick,
  onDeleteCardClick,
  onDragStart,
  onDrop,
}) {
  const [addCard, setAddCard] = useState(false);
  const [draggedCard, setDraggedCard] = useState({});

  const onSubmitClick = (newCard) => {
    onCardAddClick(newCard);
  };

  const showCards = () => {
    return list.cards.map((card, index) => (
      <Card
        card={card}
        key={index + 1}
        onDeleteCardClick={onDeleteCardClick}
        listId={list.id}
        setDraggedCard={setDraggedCard}
        draggedCard={draggedCard}
        onDragStart={onDragStart}
      />
    ));
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = () => {
    onDrop(list.id);
  };

  return (
    <div
      className={styles.listContainer}
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
    >
      {addCard && (
        <Portal
          type="card"
          closePortal={() => setAddCard(false)}
          id={list.id}
          onSubmitClick={onSubmitClick}
        />
      )}
      <div className={styles.listHead}>
        <div>{list.title}</div>
        <i className="fas fa-times" onClick={() => onDeleteListClick(list)}></i>
      </div>
      {showCards()}
      <button onClick={() => setAddCard(true)}>Add Card</button>
    </div>
  );
}
export default List;
