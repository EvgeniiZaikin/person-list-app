import axios from 'axios';
import actions from '@actions';
import loader from './loader';
import getDataButton from './get-data-button';

const { toggleLoader } = loader;
const { showGetDataButton } = getDataButton;
const { personList: { SET_PERSON_LIST } } = actions;

const getRandomPersonList = async countPeople => {
    const url = `https://randomuser.me/api/?seed=foobar&results=${ countPeople }&page=1`;

    const { data } = await axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': 'Origin',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods' : 'GET',
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        proxy: {
            host: '104.236.174.88',
            port: 3128
        },
        crossdomain: true,
    });

    return data;
};

const setPersonList = countPeople => dispatch => {
    // 2500 delay is only for example
    setTimeout(async () => {
        try {
            const { results, error } = await getRandomPersonList(countPeople);
            dispatch({ type: SET_PERSON_LIST, payload: error ? [] : results });
        } catch (exception) {
            dispatch({ type: SET_PERSON_LIST, payload: [] });
        }
        dispatch(toggleLoader(false));
        dispatch(showGetDataButton(false));
    }, 2500);
};

export default {
    setPersonList,
};