const Order = require('../models/Order');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')
const router = require('express').Router();

router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//update Order info
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const oldOrder = await Order.findById(req.params.id);
        if (oldOrder.userId !== req.user.id) {
            return res.status(403).json('You are not allowed to do that!')
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete Order
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order hase been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//find Orders by User ID
router.get('/find/:userId', verifyToken, async (req, res) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json('You are not allowed to do that!')
    }
    console.log(req.user)
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ "createdAt": -1 })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

//find All OrderS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;