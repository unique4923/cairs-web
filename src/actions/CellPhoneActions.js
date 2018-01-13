
import axios from 'axios';
import {
    GET_CELL_PHONES
} from '../actionTypes/actionTypes';

const instance = axios.create({
    baseURL: 'http://localhost:52069/api/Demo/'
});

export const getCellPhones = (page, itemsPerPage, filter) => {
    return async (dispatch) => {
        const response = await instance.get('GetCellPhones', {
            params: {
                page: page,
                itemsPerPage: itemsPerPage,
                filter: filter
            }
        });
        dispatch({ type: GET_CELL_PHONES, payload: response.data.Items });
    }
}

