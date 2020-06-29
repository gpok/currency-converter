import React from "react";
import { Field } from "react-final-form";
import PropTypes from "prop-types";
import CustomSelect from "../../Common/Components/CustomSelect/CustomSelect";

const CurrencyInput = ({ name, placeholder, options }) => {
  return (
    <div className="ConverterForm_Select">
      <Field
        name={name}
        component={CustomSelect}
        // component="select"
        placeholder={placeholder}
        initialValue={options.length > 0 ? options[0] : ""}
        options={options.map((currency) => ({
          value: currency,
          label: currency,
        }))}
      >
      </Field>
    </div>
  );

  // return (
  //     <div className="ConverterForm_Select">
  //         <Field
  //             name={name}
  //             component={CustomSelect}
  //             // component="select"
  //             placeholder={placeholder}
  //             initialValue={options.length > 0 ? options[0] : ""}
  //             options={options.map((currency) => ({
  //                 value: currency,
  //                 key: currency,
  //             }))}
  //         />
  //         {/* {options.map((value) => { */}
  //         {/*  return ( */}
  //         {/*    <option value={value} key={value}> */}
  //         {/*      {value} */}
  //         {/*    </option> */}
  //         {/*  ); */}
  //         {/* })} */}
  //         {/*</Field>*/}
  //     </div>
  // );
};

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
};

CurrencyInput.defaultProps = {
  placeholder: "",
  options: [],
};

export default CurrencyInput;
