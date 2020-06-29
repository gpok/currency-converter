import React, { useState, useEffect } from "react";
import "./ConverterForm.scss";
import { Form } from "react-final-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Offline } from "react-detect-offline";
import CurrencyValueInput from "./CurrencyValueInput";
import CurrencyInput from "./CurrencyInput";
import AlertActions from "../../Common/Redux/Alert/AlertActions";
import OpenExchangeRatesApi from "../../Common/Services/OpenExchangeRatesApi/OpenExchangeRatesApi";
import ConversionHistoryActions from "../../Common/Redux/ConversionHistory/ConversionHistoryActions";
import { AddEntry } from "../../Common/IndexedDB/ConversionHistoryIndexedDB";

const ConverterForm = ({ addError, AddInfo, SetConversionHistory }) => {
  const [currenciesList, setCurrenciesList] = useState(["USD"]);
  const [resultValue, setResultValue] = useState("");
  useEffect(() => {
    OpenExchangeRatesApi.GetCurrencies(
      (resultData) => {
        AddInfo("Zaktualizowano  liste walut");
        setCurrenciesList(resultData);
      },
      (errorData) => {
        addError("Nie udało się pobrać listy walut", errorData.message);
      }
    );
  }, [AddInfo, addError]);

  const onSubmit = ({ CurrencySource, CurrencyTarget, CurrencyValue }) => {
    OpenExchangeRatesApi.ConvertCurrency(
      CurrencySource,
      CurrencyTarget,
      parseFloat(CurrencyValue.replace(",", ".")),
      (resultData) => {
        AddEntry(
          {
            date: new Date().toLocaleDateString(),
            entryValue: `${CurrencyValue} ${CurrencySource}`,
            resultValue: `${resultData} ${CurrencyTarget}`,
          },
          (historyData) => {
            SetConversionHistory(historyData);
          },
          (error) => {
            console.log({ error });
          }
        );
        setResultValue(resultData);
      },
      (errorData) => {
        addError("Nie udało się przekonwertować waluty", errorData.message);
      }
    );
  };

  return (
    <Form
      onSubmit={(data) => {
        onSubmit(data);
      }}
      validate={({ CurrencySource, CurrencyTarget }) => {
        const errors = {};
        if (CurrencySource === CurrencyTarget)
          errors.CurrencySame =
            "Waluta docelowa nie może być identyczna z konwertowaną";
        return errors;
      }}
      mutators={{
        switchCurrencies: (args, state, tools) => {
          const { values } = state.formState;
          tools.changeValue(
            state,
            "CurrencySource",
            () => values.CurrencyTarget
          );
          tools.changeValue(
            state,
            "CurrencyTarget",
            () => values.CurrencySource
          );
          // tools.changeValue(state, "apples", () => 1);
        },
      }}
      render={({
        handleSubmit,
        submitting,
        pristine,
        invalid,
        errors,
        values,
        form,
      }) => (
        <form onSubmit={handleSubmit} className="ConverterForm">
          <CurrencyValueInput
            name="CurrencyValue"
            placeholder="Wpisz kwotę"
            label={values.CurrencySource}
          />
          <CurrencyValueInput
            name="CurrencyResult"
            placeholder="Wynik"
            validate={false}
            label={values.CurrencyTarget}
            editable={false}
            useFinalForm={false}
            value={`${resultValue}`}
          />
          <div className="ConverterForm_DoubleSelect">
            <CurrencyInput name="CurrencySource" options={currenciesList} />
            <button
              type="button"
              onClick={() => {
                form.mutators.switchCurrencies();
              }}
            >
              &#8644;
            </button>
            <CurrencyInput name="CurrencyTarget" options={currenciesList} />
            <span className="ConverterForm_Error">
              {errors.CurrencySame && errors.CurrencySame}
            </span>
          </div>
          <button type="submit" disabled={pristine || invalid || submitting}>
            KONWERTUJ
          </button>
          <Offline>
            <span className="ConverterForm_Error">
              Musisz mieć dostęp do internetu,
              <br /> by móc konwertować waluty z obecnym kursem.
            </span>
          </Offline>
        </form>
      )}
    />
  );
};

ConverterForm.propTypes = {
  addError: PropTypes.func.isRequired,
  AddInfo: PropTypes.func.isRequired,
  SetConversionHistory: PropTypes.func.isRequired,
};

ConverterForm.defaultProps = {};

const mapDispatchToProps = (dispatch) => {
  return {
    addError: (header, text) => dispatch(AlertActions.AddError(header, text)),
    AddInfo: (header, text) => dispatch(AlertActions.AddInfo(header, text)),
    SetConversionHistory: (data) =>
      dispatch(ConversionHistoryActions.Set(data)),
  };
};

export default connect(null, mapDispatchToProps)(ConverterForm);
