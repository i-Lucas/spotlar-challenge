import React from "react";

export const Input: React.FC<IInputProps> = ({ label, type = "text", value, onChange }) => (
  <label>
    {label}
    <input type={type} value={value} onChange={onChange} />
  </label>
);

export const Select: React.FC<ISelectProps> = ({ label, value, options, onChange }) => (
  <label>
    {label}
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);