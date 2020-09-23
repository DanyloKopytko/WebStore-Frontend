import post from '../utils/post';

import {SIGN_IN_SUCCESS} from '../types';

export function signUp(userData, staySigned) {
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
            staySigned ? localStorage.setItem('tokens', tokens) : sessionStorage.setItem('tokens', tokens);
            dispatch({type: SIGN_IN_SUCCESS, payload: user});
        } catch (e) {
            console.log(e);
        }
    };
}

export function signUpByToken() {
    return async dispatch => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('tokens') || sessionStorage.getItem('tokens')).accessToken;

            const {data: {user}} = await post('http://localhost:3000/auth/getUserByAccessToken', {accessToken: accessToken});
            console.log(user);
            dispatch({type: SIGN_IN_SUCCESS, payload: user});
        } catch (e) {
            console.log(e);
        }
    };
}