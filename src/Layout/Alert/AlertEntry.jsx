import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertActions, {
  PROPTYPE_SHAPE,
  EMPTY,
} from "../../Common/Redux/Alert/AlertActions";

const AlertEntry = ({ alert, timeout, remove }) => {
  const [timeoutVar, setTimeoutVar] = useState(null);
  useEffect(() => {
    if (timeout !== 0)
      setTimeoutVar(
        setTimeout(() => {
          remove(alert.key);
        }, timeout * 1000)
      );
  }, [alert.key, remove, timeout]);
  return (
    <div className={`Alert_Entry Alert_Entry-${alert.type}`}>
      <p className="Alert_Entry_Header">{alert.header}</p>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      {alert.message !== "undefined" && (
        <p className="Alert_Entry_Message">{alert.message}</p>
      )}
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <button
        type="button"
        onClick={() => {
          if (timeoutVar !== null) clearTimeout(timeoutVar);
          remove(alert.key);
        }}
      >
        &#x274C;
      </button>
    </div>
  );
};

AlertEntry.propTypes = {
  alert: PROPTYPE_SHAPE,
  timeout: PropTypes.number,
  remove: PropTypes.func.isRequired,
};

AlertEntry.defaultProps = {
  alert: EMPTY,
  timeout: 10,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (key) => dispatch(AlertActions.Remove(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertEntry);
