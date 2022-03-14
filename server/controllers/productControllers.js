import slugify from 'slugify';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

/**
 * @description Create new book
 * @route POST /api/products
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
 * @route GET /api/products
 * @access public
 *
 * @param {*} req
 * @param {*} res
 */
export const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// /**
//  * @description Get all books limit
//  * @route GET /api/products
//  * @access public
//  *
//  * @param {*} req
//  * @param {*} res
//  */
// export const getProductsLimit = async (req, res) => {
//     const products = await Product.find({})
//         .limit(req.params.limit)
//         .populate('category');
//     res.json(products);
// };

/**
 * @description Delete a book
 * @route DELETE /api/products/:slug
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
 * @route GET /api/products/:slug
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
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
};

/**
 * @description Update a book
 * @route PUT /api/products/:slug
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

/**
 * @description Get products by new arrivals or best seller
 * @route GET /api/products/new-arrivals
 *
 * @param {*} req
 * @param {*} res
 */
export const getProductsByCreatedDate = async (req, res) => {
    const { limit } = req.body;
    const products = await Product.find({})
        .populate('category')
        .sort([['createdAt', 'desc']])
        .limit(limit);
    res.json(products);
};

/**
 * @description Get products by new arrivals or best seller
 * @route GET /api/products/best-sellers
 *
 * @param {*} req
 * @param {*} res
 */
export const getProductsBySold = async (req, res) => {
    const { limit } = req.body;
    const products = await Product.find({})
        .populate('category')
        .sort([['sold', 'desc']])
        .limit(4);
    res.json(products);
};

/**
 * @description Create review for product
 * @route POST /api/products/:slug/reviews
 * @access private
 *
 * @param {*} req
 * @param {*} res
 */
export const createProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const user = await User.findOne({ email: req.user.email });
        const product = await Product.findOne({ slug: req.params.slug });
        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user._id.toString() === user._id.toString(),
            );
            if (alreadyReviewed) {
                res.status(400).send('Already reviewed');
                return;
            }
            const review = {
                name: user.name,
                rating: Number(rating),
                comment,
                user,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => {
                    return Number(item.rating) + Number(acc);
                }, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({
                message: 'Review added',
            });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
};

export const searchFilters = async (req, res) => {
    const { query } = req.body;

    if (query) {
        console.log('query', query);
        await handleQuery(req, res, query);
    }
};

const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } }).populate(
        'category',
    );
    res.json(products);
};
