import slugify from 'slugify';
import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        if (await Product.findOne({ slug: req.body.slug })) {
            res.status(400).send('Product already created');
        } else {
            const newProduct = await new Product(req.body);
            console.log('newProduct', newProduct);
            await newProduct.save();
            res.json(newProduct);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

export const getProductsLimit = async (req, res) => {
    const products = await Product.find({})
        .limit(req.params.limit)
        .populate('category');
    res.json(products);
};

export const deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findOneAndDelete({
        slug: req.params.slug,
    });
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).send('Book not found');
    }
};
