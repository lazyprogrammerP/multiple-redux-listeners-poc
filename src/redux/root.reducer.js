import { combineReducers } from "redux";
import notificationsReducer from "./reducers/notifications/notifications.reducer";

export default combineReducers({
  notifications: notificationsReducer,
});
