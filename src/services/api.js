import axios from "axios";

// Criação de uma instância do Axios em um arquivo separa apanas para organização

const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
});

export default api;