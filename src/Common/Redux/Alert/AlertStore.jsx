import { createStore } from "redux";
import AlertReducer from "./AlertReducer";

const AlertStore = createStore(AlertReducer);

export default AlertStore;
