import _axios from 'axios'

const axios = _axios.create({
    // baseURL: 'http://192.168.0.6:8000/',
    baseURL: 'https://hidralpress.ngrok.app',
    withCredentials: false,
    headers: {
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': true,
    }
});

export default axios