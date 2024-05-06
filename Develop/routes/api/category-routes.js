


const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories
    const categories = await Category.findAll({
      include: [Product], // Include associated products
    });
    res.json(categories); // Return the categories with associated products
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get categories.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      include: [Product], // Include associated products
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.json(category); // Return the category with associated products
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get category.' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory); // Return the newly created category
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create category.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedCategory[0] === 0) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.status(200).json({ message: 'Category updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update category.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deletedCategoryCount = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deletedCategoryCount === 0) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error(error);
    
  }
})

