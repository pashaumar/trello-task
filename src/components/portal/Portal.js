import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Portal.module.css";
import uuid from "react-uuid";
function Portal({ closePortal, type, id, onSubmitClick }) {
  const OVERLAY_STYLES = {
    position: "fixed",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: "9999",
  };
  const PORTAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "white",
    padding: " 25px ",
    zIndex: "9999",
    border: "2px solid black",
    borderRadius: "4px",
    width: "300px",
  };
  const CLOSE_PORTAL_STYLES = {
    position: "absolute",
    width: "40px",
    height: "40px",
    backgroundColor: "black",
    color: "white",
    display: "flex",
    right: "-20px",
    top: "-20px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50px",
    cursor: "pointer",
  };
  const [listTitle, setListTitle] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      {type === "list" && (
        <div style={PORTAL_STYLES}>
          <div className={styles.list}>
            <input
              type="text"
              name="title"
              placeholder="Enter List Title"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </div>
          <button
            onClick={() =>
              onSubmitClick({ id: uuid(), title: listTitle, cards: [] })
            }
            className={styles.button}
            disabled={listTitle.length === 0}
          >
            Submit
          </button>
          <div
            style={CLOSE_PORTAL_STYLES}
            onClick={closePortal}
            color="primary"
            variant="contained"
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
      )}
      {type === "card" && (
        <div style={PORTAL_STYLES}>
          <div className={styles.card}>
            <input
              type="text"
              name="title"
              placeholder="Enter Card Title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Enter Description here"
              onChange={(e) => setCardDesc(e.target.value)}
              value={cardDesc}
            />
          </div>
          <button
            className={styles.button}
            disabled={cardTitle.length === 0 || cardDesc.length === 0}
            onClick={() => onSubmitClick({ id, cardTitle, cardDesc })}
          >
            Submit
          </button>
          <div
            style={CLOSE_PORTAL_STYLES}
            onClick={closePortal}
            color="primary"
            variant="contained"
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
}

export default Portal;
