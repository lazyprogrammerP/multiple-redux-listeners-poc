import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import rootReducer from "./root.reducer";

const makeStore = () => createStore(rootReducer);
const wrapper = createWrapper(makeStore);

export default wrapper;
