import { ACTIONS, ALERT_TYPE } from "./AlertActions";

const generateKey = () => {
  return `${new Date().getUTCMilliseconds()}${Math.random()}`;
};

function AlertReducer(state = [], action) {
  switch (action.type) {
    case ACTIONS.ACTION_ADD_ERROR:
      return [
        ...state,
        {
          type: ALERT_TYPE.ERROR,
          header: `${action.header}`,
          message: `${action.message}`,
          key: generateKey(),
        },
      ];
    case ACTIONS.ACTION_ADD_WARNING:
      return [
        ...state,
        {
          type: ALERT_TYPE.WARNING,
          header: `${action.header}`,
          message: `${action.message}`,
          key: generateKey(),
        },
      ];
    case ACTIONS.ACTION_ADD_INFO:
      return [
        ...state,
        {
          type: ALERT_TYPE.INFO,
          header: `${action.header}`,
          message: `${action.message}`,
          key: generateKey(),
        },
      ];
    case ACTIONS.ACTION_ADD_SUCCESS:
      return [
        ...state,
        {
          type: ALERT_TYPE.SUCCESS,
          header: `${action.header}`,
          message: `${action.message}`,
          key: generateKey(),
        },
      ];
    case ACTIONS.ACTION_REMOVE_BY_KEY:
      // eslint-disable-next-line no-case-declarations
      const stateModed = [...state];
      // eslint-disable-next-line no-case-declarations
      const index = stateModed.findIndex((x) => x.key === action.key);
      if (index === -1) return state;
      stateModed.splice(index, 1);
      return stateModed;
    default:
      return state;
  }
}

export default AlertReducer;
