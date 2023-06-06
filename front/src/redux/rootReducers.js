import { combineReducers } from "redux";
import rootReducer from './reducers/index';

const rootReducers = combineReducers(
{ data: rootReducer }
);

export default rootReducers;