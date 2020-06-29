import React from "react";
import { Field } from "react-final-form";
import PropTypes from "prop-types";

const CurrencyValueInput = ({
  name,
  placeholder,
  validate,
  label,
  editable,
  useFinalForm,
  value,
}) => {
  if (useFinalForm)
    return (
      <Field
        name={name}
        component="input"
        validate={(validatorValue) => {
          if (!validate) return null;
          if (!validatorValue) return "Wartość jest wymagana";
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(parseFloat(validatorValue))) return "Wartość nie jest liczbą";
          return null;
        }}
      >
        {({ input, meta }) => (
          <div className="ConverterForm_FullLine">
            <input
              {...input}
              type="text"
              placeholder={placeholder}
              id={`CurrencyValue-${name}`}
              readOnly={!editable}
            />
            {label && <label htmlFor={`CurrencyValue-${name}`}>{label}</label>}
            <span className="ConverterForm_Error">
              {meta.error && meta.error}
            </span>
          </div>
        )}
      </Field>
    );
  return (
    <div className="ConverterForm_FullLine">
      <input
        type="text"
        placeholder={placeholder}
        id={`CurrencyValue-${name}`}
        readOnly={!editable}
        value={value}
      />
      {label && <label htmlFor={`CurrencyValue-${name}`}>{label}</label>}
    </div>
  );
};

CurrencyValueInput.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.bool,
  useFinalForm: PropTypes.bool,
  value: PropTypes.string,
};

CurrencyValueInput.defaultProps = {
  placeholder: "",
  label: "",
  validate: true,
  editable: true,
  useFinalForm: true,
  value: "",
};

export default CurrencyValueInput;
