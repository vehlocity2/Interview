const User = require("../Models/AuthModel")
const AppError = require("../utilities/AppError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createUser = async (req, res, next) =>{
    const { name, email, password } = req.body
    try {
        if(!name || !email || !password){
            return next(new AppError("All fields are required", 400))
        }
        const user = await User.findOne({email})
        if(user) return next(new AppError('Email already used by another user', 400))
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({status: 'user created', user: newUser})
    } catch (error) {
        next(error)
    }
}

const signIn = async (req, res, next ) =>{
    const { email, password} = req.body
    try {
        if(!email || !password){
            return next(new AppError("All fields are required", 400))
        }
        const user = await User.findOne({email})
        if(!user) return next(new AppError('no user found with this email', 404))
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return next(new AppError('Email or Password is incorrect', 400))
        const payLoad = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: "2hr"})
        res.cookie('access_token', token, {httpOnly: true, path: '/'})
        res.status(200).json({message: 'Login successful'})
    } catch (error) {
        next(error)
    }
}

const getLoggedUser = async(req, res, next)=>{
    const  {id}  = req.user
    try {
        const user = await User.findById(id).select('-password')
        if(!user) return next(new AppError('Not logged in', 403))
        res.status(200).json({message: 'this is the user', user})
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res, next) =>{
    try {
        const user = await User.find()
        if(!user) return next(new AppError('no user found', 404))
        res.status(200).json({message: " this is all the users list", count: user.length, user})
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id)
        if(!user) return next(new AppError('no user found with this id', 404))
        res.status(200).json({message: "this is the user with the id", user})
    } catch (error) {
        next(error)
    }
}

const getUserByEmail = async(req, res, next) =>{
    
    try {
        const { email } = req.query
        if(!email) return next(new AppError('email is required', 400))
        const user = await User.findOne({email})
        if(!user) return next(new AppError('no User Found with this email', 404))
        res.status(200).json({message: "this is the user with the email", user})
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) =>{
    const { id } = req.params
    const { name, password } = req.body
    try {
        const user = await User.findById(id)
        if(!user) return next(new AppError('no user found with this id', 404))
        if(password) user.password = await bcrypt.hash(password, 10)
        if(name) user.name = name
        const updatedUser = await user.save()
        res.status(200).json({message: "user updated successfully", user: updatedUser})  
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next)=>{
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if(!user) return next(new AppError('no user found with this id', 404))
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "user deleted successfully"})    
    } catch (error) {
        next(error)
    }
}



module.exports = {
    createUser,
    signIn,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    getLoggedUser
}