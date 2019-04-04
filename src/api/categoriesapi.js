import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getCategories(){
    const url = `${HEROKU_URL}/categories`;
    return await axios.get(url);
}

export async function addCategories(category){
    const url = `${HEROKU_URL}/categories`;
    return await axios.post(url,category);
}

export async function deleteCategories(id){
    const url = `${HEROKU_URL}/categories/${id}`;
    return await axios.delete(url);
}

export async function editCategory(id, category){
    const url = `${HEROKU_URL}/categories/${id}`;
    return await axios.put(url, category);
}

export async function getCategoriesbyID(id){
    const url = `${HEROKU_URL}/categories/${id}`;
    return await axios.get(url);
}