import { combineReducers } from "redux";
import AlertReducer from "./Alert/AlertReducer";
import ConversionHistoryReducer from "./ConversionHistory/ConversionHistoryReducer";

const CombinedReducers = combineReducers({
  alert: AlertReducer,
  conversionHistory: ConversionHistoryReducer,
});

export default CombinedReducers;
