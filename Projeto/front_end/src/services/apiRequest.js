import axios from "axios";




const baseUrl = "http://localhost:5000/"

const queryStringConverter = (params) => params ? '?' + Object.keys(params).filter(key => !!params[key]).map(key => key + '=' + params[key]).join('&') : '';

const get = async (endpoint, params) => {
    try {
        const data = await axios.get(`${baseUrl}${endpoint}${queryStringConverter(params)}`);
        return data.data;
    } catch (e) {
        throw e;
    }
}

const getOne = async (endpoint, id) => {
    try {
        if (id) {
            const data = await axios.get(`${baseUrl}${endpoint}/${id}`);
            return data.data;
        }

    } catch (e) {
        throw e;
    }

}

const post = async (endpoint, data, config = {}) => {
    try {
        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN || ''}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        const response = await axios.post(
            `${baseUrl}${endpoint}`,
            data,
            { headers }
        );
        return response.data;
    } catch (e) {
        throw e;
    }
}

const put = async (endpoint, data, id, config = {}) => {
    try {
        const response = await axios.put(
            `${baseUrl}${endpoint}/${id}`,
            data,
            config
        );
        return response.data;
    } catch (e) {
        throw e;
    }
}

const remove = async (endpoint, id) => {
    try {
        await axios.delete(`${baseUrl}${endpoint}/${id}`);
    } catch (e) {
        throw e;
    }
}

const downloadFile = async (endpoint, params, fileName) => {
    await axios({
        url: `${baseUrl}${endpoint}${queryStringConverter(params)}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN || ''}`
        }
    }).then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
}

export {
    queryStringConverter,
    post,
    put,
    get,
    getOne,
    remove,
    downloadFile,
    baseUrl
}
