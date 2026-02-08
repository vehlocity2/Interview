const express = require('express')
const router = express.Router()

const { createUser, getAllUsers, getUserById, getUserByEmail, updateUser, deleteUser, signIn, getLoggedUser } = require('../Controllers/AuthController')
const verifyToken = require('../Middlewares/ValidateToken')

router.post('/register', createUser)
router.post('/signin', signIn)
router.get('/logged-user', verifyToken, getLoggedUser)
router.get('/users', verifyToken, getAllUsers)
router.get('/user/:id', verifyToken, getUserById)
router.get('/user', verifyToken, getUserByEmail)
router.put('/user/:id', verifyToken, updateUser)



module.exports = router