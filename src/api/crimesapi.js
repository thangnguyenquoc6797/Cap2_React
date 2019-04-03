import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getCrimeReports(){
    const url = `${HEROKU_URL}/crimes`;
    return await axios.get(url);
}