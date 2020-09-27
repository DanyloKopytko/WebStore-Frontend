import {SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from '../types';

import requester from "../factories/requester";

export function signUp(userData) {
    return async dispatch => {
        try {
            const tokens = JSON.stringify({
                accessToken: userData.tokenPair?.accessToken,
                refreshToken: userData.tokenPair?.refreshToken
            });
            const user = {
                login: userData.login,
                mail: userData.mail,
                id: userData.id,
                avatar_url: userData.avatar_url,
                role: userData.role
            };

            JSON.parse(localStorage.getItem('staySigned')) ? localStorage.setItem('tokens', tokens) : sessionStorage.setItem('tokens', tokens);

            dispatch({type: SIGN_IN_SUCCESS, payload: user});
        } catch (e) {
            console.log(e);
        }
    };
}

export function signUpByToken(history, signOut) {
    return async dispatch => {
        try {
            const {data: {user}} = await requester('post', `${process.env.REACT_APP_BACKEND_URL}auth/getUserByAccessToken`, {}, history, signOut);

            dispatch({type: SIGN_IN_SUCCESS, payload: user});
        } catch (e) {
            console.log(e);
        }
    };
}

export function signOut() {
    return async dispatch => {
        try {
            localStorage.clear();
            sessionStorage.clear();
            dispatch({type: SIGN_OUT_SUCCESS});
        } catch (e) {
            console.log(e);
        }
    }
}
