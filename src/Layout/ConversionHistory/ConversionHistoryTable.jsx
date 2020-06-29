import React from "react";
import PropTypes from "prop-types";
import "./ConversionHistoryTable.scss";
import { PROPTYPE_SHAPE } from "../../Common/Redux/ConversionHistory/ConversionHistoryActions";

const ConversionHistoryTable = ({ data, style }) => {
  return (
    <table className="ConversionHistoryTable" style={style}>
      <thead>
        <tr>
          <th>Data</th>
          <th>Przed konwersją</th>
          <th style={{ width: "15px" }} />
          <th>Po konwersji</th>
        </tr>
      </thead>
      <tbody>
        {data.length < 1 ? (
          <tr>
            <td colSpan={3}>Brak zapisów historycznych</td>
          </tr>
        ) : (
          data.map((value) => {
            return (
              <tr key={`${value.id}`}>
                <td>{value.date}</td>
                <td>{value.entryValue}</td>
                <td style={{ width: "15px" }}>&#11157;</td>
                <td>{value.resultValue}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

ConversionHistoryTable.propTypes = {
  data: PropTypes.arrayOf(PROPTYPE_SHAPE),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

ConversionHistoryTable.defaultProps = {
  data: [],
  style: {},
};

export default ConversionHistoryTable;
