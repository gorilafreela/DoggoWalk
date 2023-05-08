import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../utils/SectionProps";
import SectionHeader from "../components/sections/partials/SectionHeader";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams, useHistory } from "react-router-dom";
import markerIcon from "../assets/images/logo-icon.png";
import L from "leaflet";
import SolicitationService from "../services/SolicitationService";
import { FaSpinner } from "react-icons/fa";
const myIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [23, 23],
  iconAnchor: [19, 38],
  popupAnchor: [0, -30],
});

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const MapTracking = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const { id } = useParams(); // Get the id parameter from the URL
  const history = useHistory();
  const [solicitation, setSolicitation] = useState({});
  const [position, setPosition] = useState([]);
  // Use the id to make a request to get the status
  useEffect(() => {
    const getStatus = async () => {
      SolicitationService.checkStatus(id).then(
        (res) => {
          setSolicitation(res.data);
          if (!res.data.accepted || !res.data.active) {
            alert("Not avaiable location");
            history.push("/");
            return;
          }
        },
        (err) => {
          alert(err.response.data.message);
          history.push("/");
        }
      );
    };

    getStatus();
  }, [id]);

  // useEffect(() => {
  //   const map = document.querySelector(".leaflet-container");
  //   map.scrollIntoView({ behavior: "smooth" });
  // }, [position]);

  useEffect(() => {
    if (solicitation) {
      const socket = new WebSocket(`ws://52.7.196.103:5001?solicitationId=${id}`);
      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        console.log(`WebSocket message received: ${event.data}`);

        const message = event.data;
        const coordinates = message.split(" ");
        console.log(coordinates);
        if (coordinates.length === 2) {
          const lat = parseFloat(coordinates[0]);
          const lng = parseFloat(coordinates[1]);

          if (!isNaN(lat) && !isNaN(lng)) {
            setPosition([lat, lng]);
          } else {
            setPosition(null); // or setPosition([]) if you prefer an empty array
          }
        }
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected");
      };

      return () => {
        console.log("WebSocket closing");
        socket.close();
      };
    }
  }, []);


  const outerClasses = classNames(
    "features-tiles section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-tiles-inner section-inner pt-0",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const sectionHeader = {
    title: "Live DoggoWalk",
    paragraph: `Your pet in real time`,
  };

  return (
    <section className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader
            style={{ marginTop: "80px" }}
            data={sectionHeader}
            className="center-content"
          />
          <div>
            {position && position.length === 2 ? (
              <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={myIcon}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  opacity: "0.4",
                }}
              >
                <div
                  style={{
                    animation: "spin 1s linear infinite",
                    marginRight: 16,
                  }}
                >
                  <FaSpinner size={24} />
                </div>
                Waiting for john start share location...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

MapTracking.propTypes = propTypes;
MapTracking.defaultProps = defaultProps;

export default MapTracking;
