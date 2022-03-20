const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        //encrypt passowrd to store the hashcode in DB
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).json("Can not find such user!")
        // decrypt saved password hash to get the true password
        const existingPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        if (existingPassword !== req.body.password) return res.status(401).json("Wrong credentials!")
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' }
        )

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken })

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router; 