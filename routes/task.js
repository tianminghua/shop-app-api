const Task = require('../models/Task');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')
const router = require('express').Router();

// router.post('/', async (req, res) => {
//     const newTask = new Task(req.body)

//     try {
//         const savedTask = await savedTask.save()
//         res.status(200).json(savedTask)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

//find all Tasks from one user
router.get('/find/:nickname', async (req, res) => {
    try {
        const object = await Task.findOne({ "nickname": req.params.nickname })
        res.status(200).json(object.tasks)
    } catch (err) {
        const newTask = new Task({
            nickname: req.params.nickname,
            tasks: [],
        })
        try {
            const savedObject = await newTask.save()
            res.status(201).json(savedObject.tasks)
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

router.put('/find/:nickname', async (req, res) => {
    try {
        const updatedReminder = await Task.findOneAndUpdate({ "nickname": req.params.nickname }, { $set: req.body })
        res.status(200).json(updatedReminder)
    } catch (err) {
        res.status(500).json(err)
    }
})


// //update PRODUCT info
// router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//         res.status(200).json(updatedProduct)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// //delete Product
// router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id)
//         res.status(200).json("Product hase been deleted...")
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// //find single PRODUCT
// router.get('/find/:id', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         res.status(200).json(product)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// //find All PRODUCTS
// router.get('/', async (req, res) => {
//     const qNew = req.query.new;
//     const qCategory = req.query.category;
//     try {
//         let products;
//         if (qNew) {
//             products = await Product.find().sort({ createdAt: -1 }).limit(5);
//         } else if (qCategory) {
//             //if there is a query for category, will only fetch product with such category name;
//             products = await Product.find({
//                 categories: { $in: [qCategory] }
//             })
//         } else {
//             products = await Product.find();
//         }
//         res.status(200).json(products)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router;