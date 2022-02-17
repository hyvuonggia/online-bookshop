import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBv6_LXoZ6xU2HTP5cUBKLwm0eiv1yEZsg',
    authDomain: 'bookshop-e5881.firebaseapp.com',
    projectId: 'bookshop-e5881',
    storageBucket: 'bookshop-e5881.appspot.com',
    messagingSenderId: '80085982307',
    appId: '1:80085982307:web:5e14ce6866efbcaa23ec56',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
