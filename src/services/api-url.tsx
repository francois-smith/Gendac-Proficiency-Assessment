import axios from 'axios';

/**
 * @description -  Boilerplate axios instance, used to do numerous requests to the API without needing to copy and paste the URL.
 */
export default axios.create({
    baseURL: 'https://gendacproficiencytest.azurewebsites.net/api/ProductsAPI',
    headers: {
        'Content-Type': 'application/json'
    }
});