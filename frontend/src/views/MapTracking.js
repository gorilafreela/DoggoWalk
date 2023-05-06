import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../utils/SectionProps";
import SectionHeader from "../components/sections/partials/SectionHeader";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from '../assets/images/logo-icon.png';
import L from 'leaflet';

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
    paragraph: "John is now in a walk with our pet",
  };

  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the position by adding a small random amount to the current position
      setPosition([
        position[0] + (Math.random() - 0.5) * 0.001,
        position[1] + (Math.random() - 0.5) * 0.001,
      ]);
    }, 250);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [position]);

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
            <MapContainer
              center={position}
              zoom={14}
              scrollWheelZoom={false}
            >
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
          </div>
        </div>
      </div>
    </section>
  );
};

MapTracking.propTypes = propTypes;
MapTracking.defaultProps = defaultProps;

export default MapTracking;