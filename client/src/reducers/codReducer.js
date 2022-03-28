import {
    CASH_ON_DELIVERY,
    CASH_ON_DELIVERY_RESET,
} from '../constants/codConstants';

export const cashOnDeliveryReducer = (state = { cod: false }, action) => {
    const { type } = action;

    switch (type) {
        case CASH_ON_DELIVERY:
            return {
                cod: true,
            };
        case CASH_ON_DELIVERY_RESET:
            return {
                cod: false,
            };
        default:
            return state;
    }
};
