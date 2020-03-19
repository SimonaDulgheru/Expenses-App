import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,

    GET_PROFILES,

    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS

} from './types';

// get current users profile

export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/simona');
        dispatch({
            type: GET_PROFILE,
            userIdAuth: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            userIdAuth: {
                msg: err.response.statusText,
                status: err.response.status
            }


        });
    }
};

// create/update profile
export const createProfile = (formData,
    history,
    edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            userIdAuth: res.data

        });
        dispatch(setAlert(edit ? 'Profile Upadated' : 'Profile Created'));
        if (!edit) {
            history.push('/dashboard');
            // does the same as redirect
        }
    } catch (err) {
        const errors = err.response.data.errors;


        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            userIdAuth: { msg: err.response.statusText, status: err.response.status }
        });

    }
}