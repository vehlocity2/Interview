const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    slug: { type: String, required: true, unique: true, index: true},
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    status: { type: String, enum: ['draft', 'published'], default: 'draft'},
    tag: { type: [String], default: []},
    deletedAt: { type: Date, default: null},
    updatedAt: { type: Date, default: null},
    createdAt: { type: Date, default: Date.now}
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post