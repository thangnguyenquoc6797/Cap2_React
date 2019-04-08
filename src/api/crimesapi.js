import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getCrimeReports(){
    const url = `${HEROKU_URL}/crimes`;
    return await axios.get(url);
}

export async function deleteCrimeReport(id){
    const url = `${HEROKU_URL}/crimes/${id}`;
    return await axios.delete(url);
}

export async function addCrimeReport(crime){
    const url = `${HEROKU_URL}/crimes`;
    return await axios.post(url, crime);
}