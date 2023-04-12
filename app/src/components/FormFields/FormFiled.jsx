import React from "react";

const getFeild = ({ ui, ...other }) => {
  switch (ui) {
    case "input":
      return (
        <>
          <label>
            {other.name}
            <input
              id={other.id}
              value={other.value}
              onChange={(e) => other.onChange(other.id, e.target.value)}
              type={other.type}
            />
            {other.error && <p className="error">{other.error}</p>}
          </label>
        </>
      );

    case "button":
      return (
        <>
          <button
            className="button"
            id="deploy"
            onClick={(e) => {
              e.preventDefault();
              other.onClick();
            }}
          >
            Deploy
          </button>
        </>
      );
    default:
      return null;
  }
};

const FormFiled = (props) => {
  return <>{getFeild(props)}</>;
};

FormFiled.propTypes = {};

export default FormFiled;
