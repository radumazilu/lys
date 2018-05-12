export default (state = [], action) => {
  switch (action.type) {

    case "RECORD_BLOB":
      return action.payload || null;

    default:
      return state;
  }
};
