import React from "react";
import "./Converter.scss";
import ConverterForm from "./ConverterForm";

const Converter = () => {
  return (
    <div className="Converter">
      <p className="Converter_Header">Konwerter walut</p>
      <ConverterForm />
    </div>
  );
};

Converter.propTypes = {};

Converter.defaultProps = {};

export default Converter;
