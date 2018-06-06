const ArticlesReducer = function (state = [], action) {
  switch (action.type) {

    case "FETCH_ARTICLES":
      return action.payload;

    default:
      return state;
  }
};

export default ArticlesReducer;
