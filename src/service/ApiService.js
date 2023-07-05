import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/calculator/';

const auth = {
    withCredentials: true,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }};

class ApiService {
    addition(data) {
        return axios.post(API_URL + "addition", data, auth);
    }

    subtraction(data){
        return axios.post(API_URL + "subtraction", data, auth);
    }

    multiplication(data){
        return axios.post(API_URL + "multiplication", data, auth);
    }

    division(data){
        return axios.post(API_URL + "division", data, auth);
    }

    randomString(data){
        return axios.post(API_URL + "random-string", data, auth);
    }
    squareRoot(data){
        return axios.post(API_URL + "square-root", data, auth);
    }

    fetchRecords(page, size) {
        return axios.get(API_URL + 'records?page='+page+'&size='+size, auth);
    }

    deleteRecord(id) {
        return axios.delete(API_URL + 'records/' + id, auth);
    }


    logout(){
        return axios.post(API_URL + "logout", {}, auth);
    }

}

export default new ApiService();