const Gallery = require('../models/Gallery');

const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch gallery', error: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const item = await Gallery.create({
      title,
      category: category || 'Resort',
      image: `/uploads/${req.file.filename}`
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create gallery item', error: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    return res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete gallery item', error: error.message });
  }
};

module.exports = { getGallery, createGalleryItem, deleteGalleryItem };
