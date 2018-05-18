const ArticlesReducer = function (state = [], action) {
  switch (action.type) {
    
    case "FETCH_ARTICLES":
      return action.payload;

    case 'CHANGE_ARTICLE_TITLE':
      // return the updated state
      let id = action.payload.id - 1;
      console.log("changing title.. " + id);
      return [
        ...state.slice(0, id),
        { ...state[id], title: "A changed title"},
        ...state.slice(id + 1)
      ];

    default:
      return state;
  }
};

export default ArticlesReducer;
