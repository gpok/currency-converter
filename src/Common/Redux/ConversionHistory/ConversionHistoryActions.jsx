import PropTypes from "prop-types";

export const ACTIONS = {
  ACTION_SET: "ACTION_SET",
  ACTION_CLEAR: "ACTION_CLEAR",
};

export const PROPTYPE_SHAPE = PropTypes.shape({
  id: PropTypes.number,
  date: PropTypes.string,
  entryValue: PropTypes.string,
  resultValue: PropTypes.string,
});
export const EMPTY = {
  date: "NULL",
  entryValue: "NULL",
  resultValue: "NULL",
};

const Set = (data) => {
  return { type: ACTIONS.ACTION_SET, data };
};
const Clear = () => {
  return { type: ACTIONS.ACTION_CLEAR };
};

const ConversionHistoryActions = { Clear, Set };
export default ConversionHistoryActions;
