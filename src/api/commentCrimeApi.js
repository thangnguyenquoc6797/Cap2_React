import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getCrimeComments(){
    const url = `${HEROKU_URL}/commentcrimes`;
    return await axios.get(url);
}

export async function deleteCrimeComments(id){
    const url = `${HEROKU_URL}/commentcrimes/${id}`;
    return await axios.delete(url);
}