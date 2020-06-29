import { createStore } from "redux";
import ConversionHistoryReducer from "./ConversionHistoryReducer";

const ConversionHistoryStore = createStore(ConversionHistoryReducer);

export default ConversionHistoryStore;
