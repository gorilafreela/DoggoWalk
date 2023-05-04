import React, { useState } from "react";
import "../../css/cardWalker.css";
import { Link } from "react-router-dom";

const CardWalker = ({ name, price, picture, description }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBookClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const modal = (
    <div className="modal-background">
      <div className="modal">
        <h2>{name}</h2>
        <img src={picture} alt={name} />
        <p>{description}</p>
        <p>{price}</p>
        <p>Pick a date and time:</p>
        <input type="datetime-local" />
        <button onClick={handleModalClose}>Cancel</button>
        <button>Book Now</button>
      </div>
    </div>
  );

  return (
    <div className="card">
      <img src={picture} alt={name} />
      <div className="card-details">
        <h3 style={{ marginTop: "0px", marginBottom: "8px" }}>{name}</h3>
        <p style={{ marginBottom: "8px" }}>{description}</p>
        <div className="card-price">{price}</div>
        <Link
          to="#0"
          className="button button-primary button-wide-mobile button-sm"
          onClick={handleBookClick}
        >
          Book
        </Link>
        {showModal && modal}
      </div>
    </div>
  );
};

export default CardWalker;
