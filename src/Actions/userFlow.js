

import {SIGN_IN_SUCCESS} from '../Types'

export function signUp(userData, staySigned) {
    return async dispatch => {
        try {
            const tokens = JSON.stringify({
                accessToken: userData.tokenPair?.accessToken,
                refreshToken: userData.tokenPair?.refreshToken
            })
            const user = {login: userData.login, mail: userData.mail, id: userData.id, avatar_url: userData.avatar_url, role: userData.role}
            staySigned ? localStorage.setItem('tokens', tokens) : sessionStorage.setItem('tokens', tokens)
            dispatch({type: SIGN_IN_SUCCESS, payload: user})
        } catch (e) {
            console.log(e)
        }
    }
}