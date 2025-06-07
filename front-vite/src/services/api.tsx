import axios from "axios";


const Api = axios.create({
    baseURL: 'http://localhost:4151'
})

export default Api