const INITIAL_STATE = {
  snackbars: [],
  dialogs: {},
};

export const PUSH_DIALOG = "PUSH_DIALOG";

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUSH_DIALOG:
      return {
        ...state,
        dialogs: action.payload,
      };

    default:
      return state;
  }
};

export default notificationsReducer;
