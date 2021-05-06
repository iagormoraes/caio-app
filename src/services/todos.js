import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://jsonplaceholder.typicode.com/'});

function TodoServiceFactory() {
    return {
        async getTodos() {
            return await axiosInstance.get('todos')
        },

        async getTodoItem(todoId) {
            return await axiosInstance.get(`todos/${todoId}`);
        }
    }
}

const todoService = TodoServiceFactory();

export default todoService;
