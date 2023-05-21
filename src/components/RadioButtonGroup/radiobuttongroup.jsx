import React, { useState, useEffect } from "react";
import "./radiobuttongroup.css";

export const RadioButtonGroup = ({ options, onChange, show }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  useEffect(() => {
    if (!selectedOption && show) {
      setSelectedOption(options[0]); // Select the first option by default
    }
  }, [selectedOption, show, options]);

  if (!show) {
    return null;
  }

  return (
    <div className="radio-button-group">
      {options.map((option, index) => (
        <label key={index} className="radio-button">
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};
