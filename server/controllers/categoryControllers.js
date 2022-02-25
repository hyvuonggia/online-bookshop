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
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'List category failed',
        });
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
    try {
        const { name } = req.body;
        const category = await new Category({
            name,
            slug: slugify(name, { lower: true }),
        });
        console.log(category);
        await category.save();
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Create category failed',
        });
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
export const readCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            res.status(404).json({
                message: 'Category not found',
            });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Get category failed',
        });
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
    try {
        const updatedCategory = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true },
        );
        if (!updatedCategory) {
            res.status(404).json({
                message: 'Category not found',
            });
        }
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Update category failed',
        });
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
    try {
        const deletedCategory = await Category.findOneAndDelete({
            slug: req.params.slug,
        });
        if (!deletedCategory) {
            res.status(404).json({
                message: 'Category not found',
            });
        }
        res.json({
            message: 'Category deleted',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Delete category failed',
        });
    }
};
