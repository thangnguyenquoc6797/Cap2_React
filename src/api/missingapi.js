import axios from 'axios';
import { HEROKU_URL } from '../util/constant';

export async function getMissingReport() {
    const url = `${HEROKU_URL}/missings`;
    return await axios.get(url);
}

export async function deleteMissingReport(id) {
    const url = `${HEROKU_URL}/missings/${id}`;
    return await axios.delete(url);
}

export async function addMissingReport(missing){
    const url = `${HEROKU_URL}/missings`;
    return await axios.post(url, missing);
}

export async function editMissingReport(id, missing){
    const url = `${HEROKU_URL}/missings/${id}`;
    return await axios.put(url, missing);
}

export async function getMissingReportbyID(id){
    const url = `${HEROKU_URL}/missings/${id}`;
    return await axios.get(url);
}