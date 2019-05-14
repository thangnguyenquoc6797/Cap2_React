import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getReportByPost(id){
    const url = `${HEROKU_URL}/reports/post/${id}`;
    return await axios.get(url);
}

export async function getReport(){
    const url = `${HEROKU_URL}/reports`;
    return await axios.get(url);
}