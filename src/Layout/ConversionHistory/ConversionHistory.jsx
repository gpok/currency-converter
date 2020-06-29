import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./ConversionHistory.scss";
import { connect } from "react-redux";
import ConversionHistoryTable from "./ConversionHistoryTable";
import ConversionHistoryActions, {
  PROPTYPE_SHAPE,
} from "../../Common/Redux/ConversionHistory/ConversionHistoryActions";
import {
  Clear,
  GetEntries,
} from "../../Common/IndexedDB/ConversionHistoryIndexedDB";

const ConversionHistory = ({
  conversionHistory,
  clearConversionHistory,
  setConversionHistory,
  disableButtons,
}) => {
  useEffect(() => {
    GetEntries(
      (data) => {
        setConversionHistory(data);
      },
      () => {}
    );
  }, [setConversionHistory]);
  return (
    <div className="ConversionHistory">
      <ConversionHistoryTable
        data={[...conversionHistory].reverse()}
        style={{ height: "300px" }}
      />
      <button
        className="ConversionHistory_ClearButton"
        type="button"
        onClick={() => {
          clearConversionHistory();
          Clear(
            () => {},
            () => {}
          );
        }}
        disabled={disableButtons}
      >
        Wyczyść historię
      </button>
    </div>
  );
};

ConversionHistory.propTypes = {
  conversionHistory: PropTypes.arrayOf(PROPTYPE_SHAPE).isRequired,
  clearConversionHistory: PropTypes.func.isRequired,
  setConversionHistory: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool.isRequired,
};

ConversionHistory.defaultProps = {
  disableButtons: false,
};

const mapStateToProps = (state) => {
  return {
    conversionHistory: state.conversionHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearConversionHistory: () => dispatch(ConversionHistoryActions.Clear()),
    setConversionHistory: (data) =>
      dispatch(ConversionHistoryActions.Set(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversionHistory);
