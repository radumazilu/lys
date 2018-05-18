export default (state = [], action) => {
  switch (action.type) {

    case "ENCODE_AUDIO":
      return action.payload || null;

    default:
      return state;
  }
};
