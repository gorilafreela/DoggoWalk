import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

const Map = ({ lat, lng }) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: lat, lng: lng }}
    >
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  );
}

export default Map;
