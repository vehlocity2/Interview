const Post = require("../Models/PostModel")
const AppError = require("../utilities/AppError")

async function uniqueSlug ( title){
    let slug = title.toLowerCase().split(' ').join('_').concat('-', Date.now())
    let existing = await Post.findOne({ slug })
    let i = 0
    while (existing) {
        slug = title.toLowerCase().split(' ').join('_').concat('-', Date.now()) + `-${i}`
        existing = await Post.findOne({slug})
        i++
    }
    return slug
}


const createPost = async (req, res, next) =>{
    const { title, content, tag } = req.body
    const user = req.user.id
    try {
        const slug = await uniqueSlug(title)
        if(!title || !content ) return next(new AppError('All fields are required', 400))
        const post = await Post.create({
            title,
            content,
            tag,
            slug,
            author: user
        })
        res.status(201).json({message: 'Post created', post})
    } catch (error) {
        next(error)
    }
}

const publishPost = async (req, res, next ) =>{
    const { id } = req.params
    try {
        const post = await Post.findOne({_id: id, deletedAt: null})
        if(!post) return next(new AppError('Post not found', 404))
        post.status = "published"
        post.save()
        res.status(200).json({message: "Post published", post} )
    } catch (error) {
        next(error)
    }
}

const getAllPosts = async (req, res, next) =>{
    try {
        const { page = 1, limit = 10, search, tag, author, status } = req.query
        const query = { deletedAt: null }
        if(search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]   
        }
        if(tag) query.tag = tag
        if(author) query.author = author
        if(status) query.status = status
        const skip = (page - 1) * limit
        const total = await Post.countDocuments(query)


        const posts = await Post.find(query).populate('author', 'name email').skip(skip).limit(limit)
        if(posts.length === 0 ) return next(new AppError('No post found', 404))
            res.status(200).json({message: "this is all the posts", count: total, posts})
    } catch (error) {
        next(error)
    }
}

const getPostById = async (req, res, next) =>{
    const { id } = req.params
    try {
        const post = await Post.findOne({_id: id, deletedAt: null}).populate('author', 'name email ')
        if(!post) return next(new AppError('Post not found', 404))
        res.status(200).json({message: "this is the post with the id", post})
    } catch (error) {
        next(error)
    }
}


const updatePost = async( req, res, next) =>{
    const { id } = req.params
    const { title, content, tag } = req.body
    try {
        const post = await Post.findOne({ _id: id, deletedAt: null}).populate('author', 'name email')
        if(!post) return next(new AppError('Post not found', 404))
        if(title) {
            post.slug = await uniqueSlug(title)
            post.title = title
        }
        if(content) post.content = content
        if(tag) post.tag = tag
        post.updatedAt = Date.now()
        const updatedPost = await post.save()
        res.status(200).json({message: "Post updated successfully", post: updatedPost})
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) =>{
    const { id } = req.params
    try {
        const user = req.user.id

        const post = await Post.findOne({_id: id, deletedAt: null})
        if(!post) return next(new AppError('Post not found', 404))
        if(post.author.toString() !== user) return next(new AppError('You are not authorized to delete this post', 401)) 
        post.deletedAt = Date.now()
        await post.save()
        res.status(200).json({message: "Post deleted successfully"})    
    } catch (error) {
        next(error)
    }
}



module.exports = {
    createPost,
    publishPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}