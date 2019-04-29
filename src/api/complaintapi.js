import axios from 'axios';
import { HEROKU_URL } from '../util/constant';

export async function getComplaintReport() {
    const url = `${HEROKU_URL}/complaints`;
    return await axios.get(url);
}

export async function addComplaintReport(complaint) {
    const url = `${HEROKU_URL}/complaints`;
    return await axios.post(url, complaint);
}
