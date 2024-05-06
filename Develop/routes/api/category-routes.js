
const router = require('express').Router();
const { Category, Product, ProductTag} = require('../../models');

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
    const [rowsUpdated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsUpdated === 0) {
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
    const categoryId = req.params.id;

    // Delete records from product_tag table first
    await ProductTag.destroy({
      where: { product_id: null } // Assuming product_id is a foreign key in product_tag referencing product
    });

    // Then find and delete all products belonging to the category
    const products = await Product.findAll({
      where: { category_id: categoryId }
    });

    for (const product of products) {
      // Delete the product and its associated product_tag records
      await ProductTag.destroy({
        where: { product_id: product.id }
      });

      await product.destroy();
    }

    // Finally, delete the category record
    const deletedCategoryCount = await Category.destroy({
      where: { id: categoryId }
    });

    if (deletedCategoryCount === 0) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});





module.exports = router;

