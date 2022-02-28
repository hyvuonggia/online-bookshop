import slugify from 'slugify';
import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
    req.body.slug = slugify(req.body.title);
    if (await Product.findOne({ slug: req.body.slug })) {
        // res.status(400).send('Product already created');
        res.status(400);
        // throw new Error('Product already existed');
        res.json('Product already existed');
    } else {
        const newProduct = await new Product(req.body);
        console.log('newProduct', newProduct);
        await newProduct.save();
        res.json(newProduct);
    }
};
