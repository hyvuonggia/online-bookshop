import { signOut } from 'firebase/auth';
import { LOGOUT } from '../constants/userConstants';
import { auth } from '../firebase';



export const logout = () => (dispatch) => {
    signOut(auth)
        .then(() => {
            dispatch({
                type: LOGOUT,
            });
            
        })
        .catch((error) => {
            console.log(error);
        });
};
