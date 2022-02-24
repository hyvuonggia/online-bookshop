import admin from '../firebase/index.js';
import User from '../models/userModel.js';

export const authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authorization);
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

export const adminCheck = async (req, res, next) => {
    const { email } = req.user;
    try {
        const admin = await User.findOne({ email });
        if (admin.role !== 'admin') {
            res.status(403).json({
                error: 'Access denied',
            });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
    }
};
