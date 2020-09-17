import { TOGGLE_LOADER } from '../actions/types';

export default (state = { loader: false }, { type, payload }) => {
    switch(type) {
        case TOGGLE_LOADER:
            return { ...state, loader: payload };
        default:
            return { ...state, loader: false };
    }
};
