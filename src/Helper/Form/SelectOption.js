import React from "react";

export const SelectOption = ({
  register,
  id,
  label,
  error,
  options,

  ...inputProps
}) => {
  return (
    <div style={{ display: "block" }}>
      <label htmlFor={id}>{label}</label>
      <select ref={register} id={id} {...inputProps}>
        {options.map((option, index) => {
          if (!option.value)
            return (
              <option key={index} value={option.value} disabled selected>
                {option.label}
              </option>
            );
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {error && <div className="errorMessage">{error.message}</div>}
    </div>
  );
};
