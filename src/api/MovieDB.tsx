import axios from 'axios';


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'bf36d2307970e606bf76e22aa09324e4',
        language: 'es-ES'
    }
});

export default movieDB;