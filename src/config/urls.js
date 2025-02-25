export const API_BASE_URL = 'https://dummyjson.com/todos';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;


export const GET_ALL_TODOS = getApiUrl('/user/');
export const ADD_NEW_TODO = getApiUrl('/add');
export const UPDATE_TODO = getApiUrl('/');
export const DELETE_TODO = getApiUrl('/');