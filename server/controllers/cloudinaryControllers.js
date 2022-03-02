import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * @description Upload image
 * @route /api/cloudinary/upload
 * @access private/admin
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const upload = async (req, res) => {
    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};
