import React, { useState } from "react";
import styles from "./Main.module.css";
import uuid from "react-uuid";
import Portal from "../portal/Portal";
import List from "../list/List";
function Main() {
  const [lists, setLists] = useState([]);
  const [addList, setAddList] = useState(false);
  const [dragInfo, setDragInfo] = useState();

  const onCardAddClick = (card) => {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id === card.id) {
          return {
            ...list,
            cards: [...list.cards, { ...card, id: uuid() }],
          };
        } else {
          return list;
        }
      });
    });
  };

  const onSubmitClick = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  const onDeleteListClick = (deletedList) => {
    setLists((prevLists) => {
      return prevLists.filter((list) => list.id !== deletedList.id);
    });
  };

  const onDeleteCardClick = (deletedCard) => {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.cards.find((card) => card.id === deletedCard.id)) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== deletedCard.id),
          };
        } else {
          return list;
        }
      });
    });
  };

  const onDragStart = (info) => {
    setDragInfo(info);
  };

  const onDrop = (listId) => {
    const { card: draggedCard, removingFromListId } = dragInfo;
    setLists((prevList) => {
      return prevList.map((list) => {
        if (listId === removingFromListId) {
          return list;
        }
        if (list.id === removingFromListId) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== draggedCard.id),
          };
        }
        if (list.id === listId) {
          return {
            ...list,
            cards: [draggedCard, ...list.cards],
          };
        }
        return list;
      });
    });
  };

  const showLists = () => {
    return lists.map((list, index) => (
      <List
        key={index + 1}
        list={list}
        onCardAddClick={onCardAddClick}
        onDeleteListClick={onDeleteListClick}
        onDeleteCardClick={onDeleteCardClick}
        onDragStart={onDragStart}
        dragInfo={dragInfo}
        onDrop={onDrop}
      />
    ));
  };

  return (
    <div className={styles.main}>
      {addList && (
        <Portal
          closePortal={() => setAddList(false)}
          type="list"
          onSubmitClick={onSubmitClick}
        />
      )}
      <div className={styles.header}>
        <button onClick={() => setAddList(true)}>Add List</button>
      </div>
      <div className={styles.listContainer}>{showLists()}</div>
    </div>
  );
}

export default Main;
