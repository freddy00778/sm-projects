import { store, authActions } from '../_store';
import axios, { AxiosResponse } from 'axios';

// define the shape of your data here
interface Data {
    // ...
}

// const baseUrl = process.env.REACT_APP_API_URL
const baseUrl = "http://localhost:5050"

export const fetchWrapper = {
    get: request<Data>('GET'),
    post: request<Data>('POST'),
    put: request<Data>('PUT'),
    patch: request<Data>('PATCH'),
    delete: request<Data>('DELETE'),
};

function request<T>(method: 'GET' | 'POST' | 'PUT' |'PATCH'| 'DELETE') {
    return (url: string, body?: any): Promise<T | null> => {
        const requestOptions = {
            method,
            headers: authHeader(url),
            body: body ? JSON.stringify(body) : undefined
        };

        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
        }

        return axios({
            method: method,
            url: url,
            data: requestOptions.body,
            headers: requestOptions.headers
        }).then(handleResponse);
    }
}

// helper functions
function authHeader(url: string) {
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(baseUrl as string);

    return { Authorization: `Bearer ${token}` };
}

function authToken(): string | undefined {
    return store.getState().auth.user?.token;
}

function handleResponse<T>(response: AxiosResponse): T | null {
    console.log("Handle response", response);
    return response && response.data;
}
