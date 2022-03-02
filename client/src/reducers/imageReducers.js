import { UPLOAD_IMAGE_SUCCESS } from '../constants/imageConstants';

export const uploadImageReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPLOAD_IMAGE_SUCCESS:
            return {
                image: payload,
            };
        default:
            return state;
    }
};
