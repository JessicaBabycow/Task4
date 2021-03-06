import React from "react";

export const Input = ({ register, id, label, error, ...inputProps }) => {
  return (
    <div className="input-group" style={{ display: "block" }}>
      <label htmlFor={id}>{label}</label>
      <input ref={register} id={id} {...inputProps} />
      {error && <div className="errorMessage">{error.message}</div>}
    </div>
  );
};
