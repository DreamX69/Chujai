import React, { useEffect } from "react";

export const GoogleMap = ({ lat, lon }) => {
  useEffect(() => {
    const iframeData = document.getElementById("iframeId");
    iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=en&output=embed`;
  }, [lat, lon]);

  return (
    <div>
      <iframe id="iframeId" height="500px" width="100%"></iframe>
    </div>
  );
};
