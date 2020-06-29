import { ACTIONS } from "./ConversionHistoryActions";

function ConversionHistoryReducer(state = [], action) {
  switch (action.type) {
    case ACTIONS.ACTION_CLEAR:
      return [];
    case ACTIONS.ACTION_SET:
      return action.data;
    default:
      return state;
  }
}

export default ConversionHistoryReducer;
