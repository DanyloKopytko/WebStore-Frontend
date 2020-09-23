import {GET_FAVOURITES_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from '../types';

const emptyStore = {
    id: null,
    name: 'Guest',
    surname: 'User',
    login: null,
    mail: null,
    avatar_url: null,
    role: 'user',
    phone_number: null,
    verified: false
};

const initStore = {...emptyStore};

export default function reducer(store = initStore, {type, payload}) {
    switch (type) {
        case SIGN_IN_SUCCESS: {
            return {...store, ...payload};
        }
        case SIGN_OUT_SUCCESS: {
            return emptyStore;
        }
        case GET_FAVOURITES_SUCCESS: {
            return {...store, ...payload};
        }
        default:
            return store;
    }
};