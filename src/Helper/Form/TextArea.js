import React from "react";

export const TextArea = ({ register, id, label, error, ...inputProps }) => {
  return (
    <div style={{ display: "block" }}>
      <label htmlFor={id}>{label}</label>
      <textarea ref={register} id={id} {...inputProps} />
      {error && <div className="errorMessage">{error.message}</div>}
    </div>
  );
};
