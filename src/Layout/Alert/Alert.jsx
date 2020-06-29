import React from "react";
import "./Alert.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  PROPTYPE_SHAPE,
  ALERT_TYPE,
} from "../../Common/Redux/Alert/AlertActions";
import AlertEntry from "./AlertEntry";

const Alert = ({ alert }) => {
  return (
    <div className="Alert_Wrapper">
      {alert.map((entry) => {
        switch (entry.type) {
          case ALERT_TYPE.ERROR:
            return <AlertEntry alert={entry} key={entry.key} timeout={30} />;
          case ALERT_TYPE.SUCCESS:
            return <AlertEntry alert={entry} key={entry.key} timeout={5} />;
          default:
            return <AlertEntry alert={entry} key={entry.key} timeout={10} />;
        }
      })}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.arrayOf(PROPTYPE_SHAPE),
};

Alert.defaultProps = {
  alert: [],
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps, null)(Alert);
