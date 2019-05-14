import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getMissingComments(){
    const url = `${HEROKU_URL}/commentmissings`;
    return await axios.get(url);
}

export async function deleteMissingComments(id){
    const url = `${HEROKU_URL}/commentmissings/${id}`;
    return await axios.delete(url);
}