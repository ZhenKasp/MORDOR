const initialState = {
  user: {
    id: 0,
    token: "",
    username: ""
  }
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: { ...action.value }
    }
  }
  if (action.type === "DELETE_USER") {
    return {
      ...state,
      user: { ...initialState.user }
    }
  }
  return state;
}

export default reducer;
