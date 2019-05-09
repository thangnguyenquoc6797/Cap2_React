import axios from 'axios';
import { HEROKU_URL } from '../util/constant';

export async function getHotlines(){
    const url = `${HEROKU_URL}/hotlines`;
    return await axios.get(url);
}