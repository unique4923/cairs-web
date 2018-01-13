import {
    GET_CELL_PHONES
} from '../actionTypes/actionTypes';

const INITIAL_STATE = {
    filter: '',
    page: 1,
    itemsPerPage: 50,
    data: []
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_CELL_PHONES: 
            return { ...state, data: action.payload };
        default:
            return INITIAL_STATE;
    }
}