

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag }
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get tags.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag }
    });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get tag.' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create tag.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    await Tag.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Tag updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update tag.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const deletedTagCount = await Tag.destroy({ where: { id: req.params.id } });
    if (deletedTagCount === 0) {
      return res.status(404).json({ error: 'Tag not found.' });
    }
    res.status(200).json({ message: 'Tag deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete tag.' });
  }
});

module.exports = router;
