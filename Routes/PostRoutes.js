const express = require('express')
const verifyToken = require('../Middlewares/ValidateToken')
const { createPost, publishPost, getAllPosts, getPostById, updatePost, deletePost } = require('../Controllers/PostController')
const router = express.Router()

router.post('/create-post', verifyToken, createPost)
router.put('/publish/:id', verifyToken, publishPost)
router.get('/post', verifyToken, getAllPosts)
router.get('/post/:id', verifyToken, getPostById)
router.patch('/post/:id', verifyToken, updatePost)
router.delete('/post/:id', verifyToken, deletePost)

module.exports = router