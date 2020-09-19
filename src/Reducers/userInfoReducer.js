import {GET_FAVOURITES_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from "../Types";

const emptyStore = {
    id: null,
    name: 'Guest',
    login: null,
    mail: null,
    avatar_url: null,
    role: 'user',
}
const initStore = {...emptyStore}

export default function reducer(store = initStore, {type, payload}) {
    switch (type) {
        case SIGN_IN_SUCCESS: {
            return {...store, ...payload}
        }
        case SIGN_OUT_SUCCESS: {
            return emptyStore
        }
        case GET_FAVOURITES_SUCCESS: {
            console.log(store)
            return {...store, ...payload}
        }
        default:
            return store;
    }
}