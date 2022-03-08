import Category from '../models/categoryModel.js';
import slugify from 'slugify';

/**
 * @description List all categories
 * @route GET /api/categories
 * @access public
 *
 * @param {*} req
 * @param {*} res
 */
export const listCategories = async (req, res) => {
    const categories = await Category.find({});
    if (categories) {
        res.json(categories);
    } else {
        res.status(404).send('List category failed');
    }
};

/**
 * @description
 * @route POST /api/categories
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
export const createCategory = async (req, res) => {
    const { name } = req.body;
    if (await Category.findOne({ slug: slugify(name) })) {
        res.status(400).send('Category already created');
    } else {
        const category = await new Category({
            name,
            slug: slugify(name, { lower: true }),
        });
        console.log(category);
        await category.save();
        res.json(category);
    }
};

/**
 * @description Get a category
 * @route GET /api/categories/:slug
 * @access public
 *
 * @param {*} req
 * @param {*} res
 */
export const getCategory = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug });
    if (category) {
        res.json(category);
    } else {
        res.status(404).send('Category not found');
    }
};

/**
 * @description Update a category
 * @route PUT /api/categories/:slug
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
export const updateCategory = async (req, res) => {
    const { name } = req.body;
    // TODO: Fix update already existed category
    const updatedCategory = await Category.findOneAndUpdate(
        { slug: req.params.slug },
        { name, slug: slugify(name) },
        { new: true },
    );
    if (updatedCategory) {
        res.json(updatedCategory);
    } else {
        res.status(404).send('Category not found');
    }
};

/**
 * @description Delete a category
 * @route DELETE /api/categories/:slug
 * @access private/admin
 *
 * @param {*} req
 * @param {*} res
 */
export const deleteCategory = async (req, res) => {
    const deletedCategory = await Category.findOneAndDelete({
        slug: req.params.slug,
    });
    if (deletedCategory) {
        res.json({
            message: 'Category deleted',
        });
    } else {
        res.status(404).send('Category not found');
    }
};
