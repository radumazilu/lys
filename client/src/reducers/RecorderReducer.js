export default (state = [], action) => {
  switch (action.type) {

    case "ENCODE_AUDIO":
      return action.payload || null;

    case "SEND_RECORDING_REF":
      return action.payload || null;

    default:
      return state;
  }
};
