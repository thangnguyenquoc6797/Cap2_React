import axios from 'axios';
import { HEROKU_URL } from '../util/constant';

export async function getRoles(){
    const url = `${HEROKU_URL}/roles`;
    return await axios.get(url);
}