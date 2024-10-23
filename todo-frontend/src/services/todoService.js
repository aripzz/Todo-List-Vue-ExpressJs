import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const searchTodo = async (search) => {
    try {
        const response = await axios.get(`${API_URL}/search`, { params: { search } });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const createTodo = async (title, description) => {
    try {
        const response = await axios.post(API_URL, { title, description });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateTodo = async (id, title, description) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { title, description });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteTodo = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        handleAxiosError(error);
    }
};

const handleAxiosError = (error) => {
    if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    } else {
        console.error('Unexpected error:', error);
    }
};