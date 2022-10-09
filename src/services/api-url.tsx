import axios from 'axios';

export default axios.create({
    baseURL: 'https://gendacproficiencytest.azurewebsites.net/api/ProductsAPI',
    headers: {
        'Content-type': 'application/json'
    }
});