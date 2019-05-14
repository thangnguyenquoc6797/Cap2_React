import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getReportCategories(){
    const url = `${HEROKU_URL}/reportcategories`;
    return await axios.get(url);
}

export async function addReportCategories(reportcate){
    const url = `${HEROKU_URL}/reportcategories`;
    return await axios.post(url,reportcate);
}

export async function deleteReportCategories(id){
    const url = `${HEROKU_URL}/reportcategories/${id}`;
    return await axios.delete(url);
}
