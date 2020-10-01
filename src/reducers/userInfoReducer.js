import {GET_FAVOURITES_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from '../types';

const emptyStore = {
    id: null,
    name: null,
    surname: null,
    login: null,
    email: null,
    avatar_url: null,
    role: 'user',
    phone_number: null,
    verified: false,
    staySigned: false
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
