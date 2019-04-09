import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getMissingReport(){
    const url = `${HEROKU_URL}/missings`;
    return await axios.get(url);
}