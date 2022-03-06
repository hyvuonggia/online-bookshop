import slugify from 'slugify';
import Product from '../models/productModel.js';

/**
 * @description Create new book
 * @route /api/products
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
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

/**
 * @description Get all books
 * @route /api/products
 * @access public
 *
 * @param {*} req
 * @param {*} res
 */
export const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

/**
 * @description Get all books limit
 * @route /api/products
 * @access public
 *
 * @param {*} req
 * @param {*} res
 */
export const getProductsLimit = async (req, res) => {
    const products = await Product.find({})
        .limit(req.params.limit)
        .populate('category');
    res.json(products);
};

/**
 * @description Delete a book
 * @route /api/products/:slug
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
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

/**
 * @description Get a book
 * @route /api/products/:slug
 * @access public
 *
 * @param {*} req
 * @param {*} res
 */
export const getProduct = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
        'category',
    );
    if (product) {
        console.log('==================>', product);
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
};

/**
 * @description Update a book
 * @route /api/products/:slug
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
export const updateProduct = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            req.body,
            { new: true },
        ).populate('category');
        res.json(updated);
    } catch (error) {
        console.log(error);
        res.status(400).send('Update failed');
    }
};
