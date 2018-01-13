import { combineReducers } from 'redux';
import CellPhoneReducer from './CellPhoneReducer';
import MenuReducer from './MenuReducer';

export default combineReducers({
    cellPhones: CellPhoneReducer,
    menu: MenuReducer
});