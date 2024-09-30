
import axios from 'axios'

export const GetValueApi = async (Uri) => {
    try {
        return await axios.get(Uri)

    } catch (error) {
        return error
    }
}
export const GetValueIdApi = async (Url, Id) => {
    try {
        return await axios.get(`${Url}?id=${Id}`)

    } catch (error) {
        return error
    }
}


export const DeleteValueApi = async (Url, Id) => {
    try {
        return await axios.delete(`${Url}?id=${Id}`)
    } catch (error) {
        return error
    }

}

export const UpdateValueApi = async (Url, Id, data) => {
    console.log('obj', data);
    try {
        return await axios.patch(`${Url}?id=${Id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            },

        });
    } catch (error) {
        console.error('Error updating value:', error);
        return error;
    }
};
export const CreateValueApi = async (Url,  data) => {
    console.log('obj', data);
    try {
        return await axios.post(`${Url}`, data, {
            headers: {
                'Content-Type': 'application/json'
            },

        });
    } catch (error) {
        console.error('Error updating value:', error);
        return error;
    }
};