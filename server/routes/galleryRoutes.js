const express = require('express');
const { getGallery, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, adminOnly, upload.single('image'), createGalleryItem);
router.delete('/:id', protect, adminOnly, deleteGalleryItem);

module.exports = router;
