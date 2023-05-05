import React, { useState, useEffect } from "react";
import "../../css/cardWalker.css";
import SolicitationService from "../../services/SolicitationService";

const CardWalker = ({
  name,
  price,
  picture,
  description,
  id,
  pending,
  solicitationId,

}) => {
  const [isLoading, setIsLoading] = useState(pending === 1);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [solId, setSolId] = useState(solicitationId);

  useEffect(() => {
    if (isAccepted && isActive) {
      setIsSharingLocation(true);
      setIsLoading(false);
    }
  }, [isActive, isAccepted,isSharingLocation]);

  const handleBookClick = async () => {
  
    SolicitationService.book(id).then(
      (res) => {
        setSolId(res.data._id);
        setIsLoading(true);
        alert(`Please wait for ${name} share the geolocation`);
      },
      (err) => {
        alert(err.response.data.message);
      }
    );
  };

  const handleCancelClick = async () => {
    try {
      setIsLoading(false);
      await SolicitationService.cancel(id);
      setSolId('');
      alert(`Solicitaion canceled successfully`);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("solicitationId:", solId);
    console.log("isSharingLocation:", isSharingLocation);
  }, [isLoading,solId,isSharingLocation]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (solId) {
        SolicitationService.checkStatus(solId).then((response) => {
          console.log(response.data);
          setIsAccepted(response.data.accepted === 1);
          setIsActive(response.data.active === 1);
        });
      }
    }, 3000);
  
    
    if (!isLoading) {
      clearInterval(intervalId);
    }
  
    return () => clearInterval(intervalId);
  }, [isLoading, solId]);


  return (
    <div className="card">
      <img src={picture} alt={name} />
      <div className="card-details">
        <h3 style={{ marginTop: "0px", marginBottom: "8px" }}>{name}</h3>
        <p style={{ marginBottom: "8px" }}>{description}</p>
        <div className="card-price">{price}</div>
        {!isSharingLocation && (
        <button
          className="button button-primary  button-sm"
          onClick={handleBookClick}
          disabled={isLoading}
        >
          {isLoading ? "waiting..." : "Book"}
        </button>
       )}
        {isLoading && !isAccepted && (
          <button
            className="button button-sm"
            style={{ marginLeft: 8, background: "#FF6171", color: "#fff" }}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        )}

        {isSharingLocation && (
          <button
            className="button button-sm"
            style={{ marginLeft: 8, background: "#24E5AF", color: "#fff" }}
            onClick={handleCancelClick}
          >
            See live location
          </button>
        )}
      </div>
    </div>
  );
};

export default CardWalker;
