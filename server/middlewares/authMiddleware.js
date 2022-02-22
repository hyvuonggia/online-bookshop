import admin from '../firebase/index.js';

export const authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        console.log(firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: 'Invalid or expired token',
        });
    }
};
