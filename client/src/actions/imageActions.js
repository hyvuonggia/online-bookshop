import axios from 'axios';
import { UPLOAD_IMAGE_SUCCESS } from '../constants/imageConstants';

export const uploadImage = (uri) => async (dispatch, getState) => {
    const {
        userLogin: { user },
    } = getState();

    const config = {
        headers: {
            Authorization: user.token.token,
        },
    };

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cloudinary/upload`,
        { image: uri },
        config,
    );

    dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
        payload: response,
    });

    return response;
};
