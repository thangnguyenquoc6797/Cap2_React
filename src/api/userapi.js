import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function login(credentails){
    const url = `${HEROKU_URL}/login`;
    return await axios.post(url, credentails);
}

export async function getUser(){
    const url = `${HEROKU_URL}/users`;
    return await axios.get(url);
}
