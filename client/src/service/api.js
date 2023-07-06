import axios from 'axios'

const URL = 'http://localhost:3000'

export const signUp = async(data) => {
    try {
        return await axios.post(`${URL}/api/user/signup`, data)
    } catch (error) {
        console.log('Error while calling signup api', error.response.data);
    }
}

export const verify = async(data) => {
    try {
        return await axios.post(`${URL}/api/user/verify`, data)
    } catch (error) {
        console.log('Error while calling signup api', error.response.data);
    }
}

export const signIn = async(data) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/user/signin`, data, config)
        return result.data;
    } catch (error) {
        console.log('Error while calling signin api', error.response.data);
    }
}

export const getUser = async (data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/get/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getPdf = async (data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/pdf/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getExcel = async (data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/download/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}