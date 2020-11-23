const actions = {
  SET_USER: "SET_USER",
  DELETE_USER: "DELETE_USER",
  CREATE_FLASH_MESSAGE: "CREATE_FLASH_MESSAGE",
  DESTROY_FLASH_MESSAGE: "DESTROY_FLASH_MESSAGE",
  CHANGE_THEME: "CHANGE_THEME"
}

const initialState = {
  user: {
    id: 0,
    token: "",
    username: ""
  },
  flashMessage: {
    text: "",
    variant: "danger"
  },
  theme: "light"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: { ...action.value }
      };
    case actions.DELETE_USER:
      return {
        ...state,
        user: { ...initialState.user }
      };
    case actions.CREATE_FLASH_MESSAGE:
      const text = typeof action.text === 'string' ? action.text : "Something went wrong";
      return {
        ...state,
        flashMessage: { text: text, variant: action.variant }
      };
    case actions.DESTROY_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: { text: "", variant: "danger" }
      };
    case actions.CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light"
      };
    default:
      return state;
  }
}

export default reducer;
