export default (state = [], action) => {
  switch (action.type) {
    
    case "SEND_RECORDING_REF":
      return action.payload || null;

    default:
      return state;
  }
};
