import axios from 'axios';
import { HEROKU_URL } from '../util/constant';

export async function getHotlines(){
    const url = `${HEROKU_URL}/hotlines`;
    return await axios.get(url);
}

export async function getHotlinesbyID(id){
    const url = `${HEROKU_URL}/hotlines/${id}`;
    return await axios.get(url);
}

export async function addHotline(hotline){
    const url = `${HEROKU_URL}/hotlines`;
    return await axios.post(url, hotline);
}

export async function editHotline(id, hotline){
    const url = `${HEROKU_URL}/hotlines/${id}`;
    return await axios.put(url, hotline);
}

export async function deleteHotline(id){
    const url = `${HEROKU_URL}/hotlines/${id}`;
    return await axios.delete(url);
}