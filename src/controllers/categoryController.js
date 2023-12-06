// controllers/categoryController.js
require("../models/database");
const Category = require('../models/Category');

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Category creation failed',
    });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      data: categories,
      message: 'Categories retrieved successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Error retrieving categories',
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: category,
      message: 'Category updated successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Category update failed',
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({
      success: true,
      data: null,
      message: 'Category deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Category deletion failed',
    });
  }
};

module.exports = {
  createCategory,
  listCategories,
  editCategory,
  deleteCategory,
};
