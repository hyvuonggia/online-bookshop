import Category from '../models/categoryModel.js';
import slugify from 'slugify';

export const listCategories = async (req, res) => {};

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
            message: 'Create product failed',
        });
    }
};

export const readCategory = async (req, res) => {};

export const updateCategory = async (req, res) => {};

export const deleteCategory = async (req, res) => {};
