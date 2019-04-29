import axios from 'axios';
import {HEROKU_URL} from '../util/constant';

export async function getComplaintCategories(){
    const url = `${HEROKU_URL}/complaintcategorys`;
    return await axios.get(url);
}

export async function addComplaintCate(categories){
    const url = `${HEROKU_URL}/complaintcategorys`;
    return await axios.post(url, categories);
}

export async function deleteComplaintCate(id){
    const url = `${HEROKU_URL}/complaintcategorys/${id}`;
    return await axios.delete(url);
}

export async function editComplaintCate(id, categories){
    const url = `${HEROKU_URL}/complaintcategorys/${id}`;
    return await axios.put(url, categories);
}

export async function getComplaintCategoriesbyID(id){
    const url = `${HEROKU_URL}/complaintcategorys/${id}`;
    return await axios.get(url);
}