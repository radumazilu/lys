// action creator example - just a function that is called from your application and returns an action
import { articlesRef, authRef, provider } from "../firebase";

export const addArticle = newArticle => async dispatch => {
  articlesRef.push().set(newArticle);
};

export const deleteArticle = articleId => async dispatch => {
  articlesRef.child(articleId).remove();
};

export const updateFirebaseArticle = (articleId, data) => async dispatch => {
  articlesRef.child(articleId).update(data);
}

export const fetchArticles = () => async dispatch => {
  console.log("fetching articles ...");
  articlesRef.on("value", snapshot => {
    dispatch({
      type: "FETCH_ARTICLES",
      payload: snapshot.val()
    });
  });
};

export const encodeAudio = (base64string) => dispatch => {
  dispatch({
    type: "ENCODE_AUDIO",
    payload: base64string
  })
}

export const fetchUser = () => dispatch => {
  // if the user exists (i.e. is logged in), send a payload with the user information
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: "FETCH_USER",
        payload: user
      });
    } else {
      dispatch({
        type: "FETCH_USER",
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef.signInWithPopup(provider)
    .then(result => {
      // Sign-in successful
    })
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef.signOut()
    .then(() => {
      // Sign-out successful
    })
    .catch(error => {
      console.log(error);
    });
};
