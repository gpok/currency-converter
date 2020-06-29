import PropTypes from "prop-types";

export const ACTIONS = {
  ACTION_ADD_ERROR: "ACTION_ADD_ERROR",
  ACTION_ADD_WARNING: "ACTION_ADD_WARNING",
  ACTION_ADD_INFO: "ACTION_ADD_INFO",
  ACTION_ADD_SUCCESS: "ACTION_ADD_SUCCESS",
  ACTION_REMOVE_BY_KEY: "ACTION_REMOVE_BY_KEY",
};

export const ALERT_TYPE = {
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFO: "INFO",
  SUCCESS: "SUCCESS",
};

export const PROPTYPE_SHAPE = PropTypes.shape({
  type: PropTypes.oneOf(Object.keys(ALERT_TYPE)),
  header: PropTypes.string,
  message: PropTypes.string,
  key: PropTypes.string,
});
export const EMPTY = {
  type: ALERT_TYPE.WARNING,
  header: "NULL",
  message: "NULL",
  key: "0",
};

const AddError = (header, message) => {
  return { type: ACTIONS.ACTION_ADD_ERROR, header, message };
};
const AddWarning = (header, message) => {
  return { type: ACTIONS.ACTION_ADD_WARNING, header, message };
};
const AddInfo = (header, message) => {
  return { type: ACTIONS.ACTION_ADD_INFO, header, message };
};
const AddSuccess = (header, message) => {
  return { type: ACTIONS.ACTION_ADD_SUCCESS, header, message };
};
const Remove = (key) => {
  return { type: ACTIONS.ACTION_REMOVE_BY_KEY, key };
};

const AlertActions = { AddError, AddWarning, AddInfo, AddSuccess, Remove };
export default AlertActions;
