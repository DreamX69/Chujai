import React, { useState, useEffect } from "react";
import { GoogleMap } from "../GoogleMap/googlemap";
import "./getlocation.css";

export const GetLocation = () => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
      console.log(coordinates);
    } else {
      setCoordinates("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  return (
    <div>
      <p>กดปุ่มด้านล่างเพื่อแสดงที่อยู่ปัจจุบัน.</p>
      <button className="addressBTN" onClick={getLocation}>
        แสดงที่อยู่ปัจจุบัน
      </button>
      <div style={{ margin: 50 }}>
        {coordinates && (
          <GoogleMap lat={coordinates.latitude} lon={coordinates.longitude} />
        )}
      </div>
    </div>
  );
};
