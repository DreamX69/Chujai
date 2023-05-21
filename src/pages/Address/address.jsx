import React from "react";
import { GetLocation } from "../../components/GetLocation/getlocation";

export const Address = () => {
  return (
    <div style={{ marginTop: 60, textAlign: "center" }}>
      <h1>ที่อยู่ของฉัน</h1>
      <GetLocation />
    </div>
  );
};
