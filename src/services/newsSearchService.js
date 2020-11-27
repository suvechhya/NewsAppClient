import axios from 'axios';

const apiUrl = 'https://newsappserver.herokuapp.com/api/search';

export const searchNewsArticlesByKeyword = (keyword, page) => {
    const url = `${apiUrl}?keyword=${keyword}&page=${page}`;
    return axios.get(url);
};

export const initialSearch = () => {
    const url = `${apiUrl}/initial`;
    return axios.get(url);
};