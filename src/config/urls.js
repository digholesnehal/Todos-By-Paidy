export const API_BASE_URL = 'https://shrimo.com/fake-api/todos';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;


export const GET_ALL_TODOS = getApiUrl('');
export const ADD_NEW_TODO = getApiUrl('');
export const UPDATE_TODO = getApiUrl('/');
export const DELETE_TODO = getApiUrl('/');