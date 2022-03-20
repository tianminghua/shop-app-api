const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')
const router = require('express').Router();

router.post('/', async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})


//update CART info
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { products: req.body.products }, { new: true })
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete CART
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart hase been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//find single CART by User ID
router.get('/find/:userId', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//find All CARTS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;